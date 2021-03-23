import React from 'react';
import '/src/styles/index.scss';
import {Header} from './Header/Header'
import {Login} from "./Auth/Login";

export const App: React.FC = () => {

    const token:string = '123'

    return (
        <>
            <Header></Header>
            <Login></Login>
        </>
    )
}