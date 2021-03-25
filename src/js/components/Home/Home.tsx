import React from "react";
import {AuthServices} from "../AuthService";
import './Home.scss'

export const Home: React.FC = () => {
    return (
        <div className={'home'}>
            <h1>Home page</h1>
            <button onClick={AuthServices.signOut} className={'btn-blue circle full'}>Sign out</button>
        </div>
    )
}