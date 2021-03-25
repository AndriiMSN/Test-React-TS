import React from 'react';
import '/src/styles/index.scss';
import {Header} from './Header/Header'
import {auth} from "../firebase";
import {Route, Switch, useHistory, Link} from "react-router-dom";
import {Routes} from "./Routes";
import {Login} from "./Login/Login";
import {Confirm} from "./Confirm/Confirm";


export const App: React.FC = () => {

    const history = useHistory();

    const [isLogged, setIsLogged] = React.useState<boolean>(false)
    const [isVerified, setIsVerified] = React.useState<boolean>(false)

    React.useEffect(() => {
        console.log('use')
        if (auth.isSignInWithEmailLink(window.location.href)) {
            let email: string = window.localStorage.getItem('emailForSignIn')!;
            if (!email) {
                //   @TODO IF ANOTHER DEVISE CONFIRMATION
                email = "";
            }
            auth.signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    console.log(result)
                    history.push('/home')
                    setIsVerified(true)
                })
                .catch((e) => {
                    console.log(e)
                });

        }

        auth
            .onAuthStateChanged(authUser => {
                console.log(authUser)
                if (authUser && authUser.emailVerified) {
                    setIsVerified(true)
                    setIsLogged(true)
                    history.push('/home')
                } else if (authUser) {
                    setIsLogged(true)
                    history.push('/confirm')
                } else if (!authUser) {
                    setIsLogged(false)
                    setIsVerified(false)
                    history.push('/login')
                }
            })
    })

    return (
        <>
            <Header></Header>
            <div className="container">
                <Switch>
                    <Routes isLogged={isLogged} isVerified={isVerified}/>
                    <Route path={'*'}>
                        <h1>Please login or confirm you account</h1>
                    </Route>
                </Switch>
            </div>
        </>
    )
}