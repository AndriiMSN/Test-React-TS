import React from 'react';
import '/src/styles/index.scss';
import {Header} from './Header/Header'
import {Login} from "./Auth/Login";
import {auth} from "../firebase";
import {Link, useHistory, Switch, Route} from "react-router-dom";


export const App: React.FC = () => {
    const history = useHistory();

    const [isLogged, setIsLogged] = React.useState<boolean>(false)
    const [isVerified, setIsVerified] = React.useState<boolean>(false)

    React.useEffect(() => {

        if (auth.isSignInWithEmailLink(window.location.href)) {
            let email: string = window.localStorage.getItem('emailForSignIn')!;
            if (!email) {
                console.log('')
            } else {
                auth.signInWithEmailLink(email, window.location.href)
                    .then((result) => {
                        window.localStorage.removeItem('emailForSignIn');
                    })
                    .catch((e) => {
                        console.log(e)
                    });
            }
        }

        auth
            .onAuthStateChanged(authUser => {
                console.log('USER IS -->', authUser?.email);
                console.log(authUser?.emailVerified)
                if (!authUser) {
                    history.push('/login')
                }
            })
    })

    return (
        <>
            <Header></Header>
            <div className="container">
                <button onClick={() => auth.signOut()}>Sign out</button>
                <Switch>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                </Switch>
            </div>
        </>
    )
}