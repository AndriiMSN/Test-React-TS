import React from 'react';
import {Route} from 'react-router-dom';
import {Login} from "./Login/Login";
import {Confirm} from "./Confirm/Confirm";
import {Home} from "./Home/Home";

interface Routes {
    isLogged: boolean,
    isVerified: boolean
}

export const Routes: React.FC<Routes> = ({isLogged, isVerified}) => {
    let routes = (<div></div>);

    if (isLogged && isVerified) {
        routes = (
            <>
                <Route exact path={"/home"}>
                    <Home/>
                </Route>
                <Route exact path={"/login"}>
                    <Login/>
                </Route>
            </>
        )
    } else if (isLogged && !isVerified) {
        routes = (
            <>
                <Route exact path={"/login"}>
                    <Login/>
                </Route>
                <Route exact path={"/confirm"}>
                    <Confirm/>
                </Route>

            </>
        )
    } else {
        routes = (
            <>
                <Route exact path={"/login"}>
                    <Login/>
                </Route>
            </>
        )
    }

    return routes
};