import React from 'react';
import '/src/styles/index.scss';
import {Route, Switch, useHistory, Link, Router, Redirect} from "react-router-dom";
import {Login} from "./Login/Login";
import {Home} from "./Home/Home";
import {Confirm} from "./Confirm/Confirm";

interface App {
    isLogged: boolean,

    setIsLogged(p: () => boolean): void

    isVerified: boolean,

    setIsVerified(p: () => boolean): void
}

export const App: React.FC<App> = ({isLogged, setIsLogged, isVerified, setIsVerified}) => {

    let routes = (<></>)
    if (isLogged && !isVerified) {
        routes = (
            <Switch>
                <Route path={'/confirm'} component={Confirm}/>
                <Redirect to={'/confirm'}/>
            </Switch>
        );
    } else if (isLogged && isVerified) {
        routes = (
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/home'} component={Home}/>
                <Route path={'*'}>
                    <h1>Developing</h1>
                </Route>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Redirect to={'/login'}/>
            </Switch>
        );
    }
    return routes;
}