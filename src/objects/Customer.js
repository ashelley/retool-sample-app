import * as React from 'react'
import {Controller,Lookup} from '@retool/app'

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


export class DefaultLookup extends Lookup {
    placeholder = "Search on customer name...";

    static data = [
        {Id:"1000",Name:"Acme Industries"},
        {Id:"1001",Name:"Active Manufacturing"},
        {Id:"1002",Name:"Brownfield, Inc."}
    ];
    
    fill(partialEntry, props){
        return {
            filter:{field:'Name'},
            options:DefaultLookup.data
        }
    }

    find(id, props) {
        var data = DefaultLookup.data;
        for(var i = 0 ; i < data.length; i++){
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
