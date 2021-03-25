import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {Home} from "./Home/Home";
import {Confirm} from "./Confirm/Confirm";


export const Verified: React.FC = () => {
    return (
        <Route exact path={"/home"}>
            <Home/>
        </Route>
    )
};
export const NotVerified: React.FC = () => {
    return (
        <Route exact path={"/confirm"}>
            <Confirm/>
        </Route>
    )
};