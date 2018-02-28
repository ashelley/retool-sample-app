
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Application,PageLayout } from '@retool/app'
import * as standardControls  from '@retool/standard-controls'
import * as controls from './controls'
import { createBrowserHistory as createHistory } from "history";
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

var app = new Application("SampleApp");

app.controls.import(controls);

import * as templates from "./templates"
app.templates.import(templates);

import * as objects from "./objects/index"
app.objects.import(objects);


const launchAppBuilder = () => {
    app.launchAppBuilder()
}

const LaunchButton = (props) =>
    <button className="slds-button" style={{ position: "absolute", top: 5, right: 5}} onClick={launchAppBuilder}>
    Launch App Builder</button>

let history = createHistory();  
let appRoot = "/app";  

app.handleNavigate = ({ object, pageType, params, isLoginRedirect }) => {
    console.log("navigating", object, pageType, params)
    var url = "/" + object;
    if (pageType && pageType != "index") {
        url += "/" + pageType;
    }
    var q = [];
    if (params) {
        for (var key in params) {
            q.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
        }
        url += "?" + q.join("&");
    }        
    return history.push(appRoot + url)
}

ReactDOM.render(<div>
    <Router history={history}>
        <Switch>
            <Route path={appRoot + "/:object"} render={({match, location}) => {               
                let searchParams = new URLSearchParams(location.search)
                let params = {}
                for(let kv of searchParams.entries()) {
                    console.log(kv[0], kv[1])
                    params[kv[0]] = kv[1]
                }
                let pageType = null;
                return <PageLayout app={app} route={{ object: match.params.object, pageType, params}} />
            }} />
            <Route render={() => (
                <h1>Not found</h1>
            )} />
        </Switch>
    </Router>
    {!app.hasOpenBuilder ? <LaunchButton /> : null}
</div>, document.getElementById('root'));


