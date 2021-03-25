import React from 'react';
import '/src/styles/index.scss';
import {Header} from './Header/Header'
import {auth} from "../firebase";
import {Route, Switch, useHistory, Link, Router} from "react-router-dom";
import {NotVerified, Verified} from "./Routes";
import {Login} from "./Login/Login";
import {Home} from "./Home/Home";
import {Confirm} from "./Confirm/Confirm";


export const App: React.FC = () => {

    const history = useHistory();

    const [isLogged, setIsLogged] = React.useState<boolean>(false)
    const [isVerified, setIsVerified] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (auth.isSignInWithEmailLink(window.location.href)) {
            let email: string = window.localStorage.getItem('emailForSignIn')!;
            if (!email) {
                //   @TODO IF ANOTHER DEVISE CONFIRMATION
                email = "";
            }
            auth.signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    setIsVerified(true)
                    history.push('/home')
                })
                .catch((e) => {
                    console.log(e)
                });

        }

        auth
            .onAuthStateChanged(authUser => {
                console.log(authUser?.emailVerified, authUser?.email)
                if (authUser?.emailVerified) {
                    setIsVerified(true)
                    setIsLogged(true)
                    console.log(isLogged, isVerified)
                } else if (authUser?.email) {
                    setIsVerified(false)
                    setIsLogged(true)
                    console.log(isLogged, isVerified)
                } else {
                    setIsLogged(false)
                    setIsVerified(false)
                    console.log(isLogged, isVerified)
                }
            })
    })


    return (
        <>
            <Header></Header>
            <div className="container">
                <Switch>
                    <Route exact path={"/login"}>
                        <Login/>
                    </Route>

                    {isLogged && !isVerified &&
                    <Route exact path={"/confirm"}>
                        <Confirm/>
                    </Route>
                    }

                    {isLogged && isVerified &&
                    <Route exact path={"/home"}>
                        <Home/>
                    </Route>}


                    {isLogged && !isVerified &&
                    <Route path={'*'}>
                        <Link to={'/confirm'}>Please confirm your account</Link>
                    </Route>}

                    {isLogged && isVerified &&
                    <Route exact path={"*"}>
                        <h1>Page in progress...</h1>
                    </Route>}

                    {!isLogged && !isVerified &&
                    <Route path={'*'}>
                        <Link to={'/login'}>Please login in your account</Link>
                    </Route>}
                </Switch>
            </div>
        </>
    )
}