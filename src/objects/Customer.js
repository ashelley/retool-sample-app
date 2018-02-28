import * as React from 'react'
import { Controller, Lookup} from '@retool/app'
import { Card, Heading } from '../controls'
import { CustomerApi } from "../api/MockApi"

export default class Customer {
    Name = "";
    City = "";
    State = "";

    static fields = {
        Name:{label:"Name"},
        City:{label:"City"},
        State:{label:"State"}
    }  
}

export class HomeController extends Controller {

    customer = null

    init(params){
        return CustomerApi.get(params.id).then(customer => this.customer = customer);
    }

    static DefaultLayout = {
        template:"RecordPage",        
        Header: (
            <Heading text="Customer" textSize="medium" />
        ),
        Body: (
            <Card title="{Name}">
            </Card>
        )
    }
}  

export class DefaultLookup extends Lookup {
    placeholder = "Search on customer name...";

    async fill(partialEntry, props){
        let data = await CustomerApi.list()
        return Promise.resolve({
            filter:{field:'Name'},
            options:data
        })
    }

    async find(id, props) {
        let data = await CustomerApi.get(id)
        for(let i = 0 ; i < data.length; i++){
            if (data[i].Id == id) return data[i];
        }
    }

    formatDroplist(props) {
        return {
            height: 8,
            showAddNew: true
        }
    }

    formatOption(option, props){
        return {
            icon: "standard/account",
            text: option.Name,
            details: ['Customer']
        }
    }

    formatInput(value, props) {
        return {
            icon: "standard/account",
            text:value.Name
        }
    }
}
