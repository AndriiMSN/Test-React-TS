import {render} from "react-dom";
import React from "react";
import {App} from './components/App'
import {createBrowserHistory} from "history";
import {Router} from 'react-router-dom'
import {auth} from "./firebase";
import {Header} from "./components/Header/Header";
import {SetLocalStorage} from "./components/LocalStorage";

const history = createBrowserHistory()

const Auth = () => {
    const [isLogged, setIsLogged] = React.useState((localStorage.getItem('log') === 'true'))
    const [isVerified, setIsVerified] = React.useState((localStorage.getItem('ver') === 'true'))
    const [isChecking, setIsChecking] = React.useState(false)
    const [error, setError] = React.useState('')

    React.useEffect(() => {
        // EMAIL VERIFICATION
        if (auth.isSignInWithEmailLink(window.location.href)) {
            setIsChecking(true)
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                //   @TODO IF ANOTHER DEVISE CONFIRMATION
                email = "";
            }
            auth.signInWithEmailLink(email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    setIsLogged(true)
                    setIsVerified(() => true)
                    SetLocalStorage.setUserAndVerification(true, true)
                    history.push('/home')
                    setIsChecking(false)
                })
                .catch((e) => {
                    console.log(e)
                    setError('Broken or old link, check email')
                });
        }

        // CHECK USER CONDITION
        auth
            .onAuthStateChanged(authUser => {
                if (authUser?.emailVerified) {
                    setIsVerified(true)
                    setIsLogged(true)
                    SetLocalStorage.setUserAndVerification(true, true)
                } else if (authUser?.email) {
                    setIsVerified(false)
                    setIsLogged(true)
                    SetLocalStorage.setUserAndVerification(true, false)
                } else {
                    setIsLogged(false)
                    setIsVerified(false)
                    SetLocalStorage.setUserAndVerification(false, false)
                }
            })


    }, [])

    return (
        <Router history={history}>
            <Header/>
            <div className="container">
                {(isChecking  ? <h1>{error ? error : 'Loading'}</h1> : <App
                    isLogged={isLogged}
                    setIsLogged={(x) => setIsLogged(x)}
                    isVerified={isVerified}
                    setIsVerified={(x) => setIsVerified(x)}
                />)}
            </div>
        </Router>
    )
}

render(
    <Auth/>,
    document.getElementById('root'));