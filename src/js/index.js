import {render} from "react-dom";
import React from "react";
import {App} from './components/App'
import {createBrowserHistory} from "history";
import {Router} from 'react-router-dom'
import {auth} from "./firebase";
import {Header} from "./components/Header/Header";

const history = createBrowserHistory()
const Auth = () => {
    const [isLogged, setIsLogged] = React.useState(false)
    const [isVerified, setIsVerified] = React.useState(false)

    React.useEffect(() => {
        auth
            .onAuthStateChanged(authUser => {
                if (authUser?.emailVerified) {
                    setIsVerified(true)
                    setIsLogged(true)
                } else if (authUser?.email) {
                    setIsVerified(false)
                    setIsLogged(true)
                } else {
                    setIsLogged(false)
                    setIsVerified(false)
                }
            })

        if (auth.isSignInWithEmailLink(window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                //   @TODO IF ANOTHER DEVISE CONFIRMATION
                email = "";
            }
            auth.signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    setIsVerified(() => true)
                    history.push('/home')
                })
                .catch((e) => {
                    console.log(e)
                });
        }
    })

    return (
        <Router history={history}>
            <Header/>
            <div className="container">
                <App
                    isLogged={isLogged}
                    setIsLogged={(x) => setIsLogged(x)}
                    isVerified={isVerified}
                    setIsVerified={(x) => setIsVerified(x)}
                />
            </div>
        </Router>
    )
}

render(
    <Auth/>,
    document.getElementById('root'));