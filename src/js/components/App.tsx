import React from 'react';
import '/src/styles/index.scss';
import {Header} from './Header/Header'
import {auth} from "../firebase";
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

    auth
        .onAuthStateChanged(authUser => {
            console.log(authUser?.emailVerified, authUser?.email)
            if (authUser?.emailVerified) {
                setIsVerified(() => true)
                setIsLogged(() => true)
            } else if (authUser?.email) {
                setIsVerified(() => false)
                setIsLogged(() => true)
            } else {
                setIsLogged(() => false)
                setIsVerified(() => false)
            }
        })

    let routes = (<></>)
    if (isLogged && !isVerified) {
        routes = (
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/confirm'} component={Confirm}/>
                <Route path={'*'}>
                    <Link to={'/confirm'}>Confirm your account please</Link>
                </Route>
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
                {!isLogged && <Redirect to={'/login'}/>}
            </Switch>
        );
    }
    return routes;
}