import {auth} from "../firebase";
import {useHistory} from "react-router-dom";

class AuthServiceWithEmailAndPassword {
    private actionCodeSetting = {
        url: 'http://localhost:8080/',
        handleCodeInApp: true
    }

    validation(
        Email: { current: any; }, EnteredEmail: string,
        Password: { current: any }, EnteredPassword: string
    ): boolean {
        const EmailReg = /\S+@\S+\.\S+/;
        let isValid: boolean = true;
        if (!EmailReg.test(EnteredEmail)) {
            Email.current!.classList.add('error')
            isValid = false
        }
        if (EnteredPassword.length < 8) {
            Password.current!.classList.add('error')
            isValid = false
        }
        return isValid
    }

    createUser(email: string, password: string): void {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    sendEmail(
        email: string,
        actionCodeSetting = this.actionCodeSetting
    ): void {
        if (email !== '') {
            auth
                .sendSignInLinkToEmail(email, actionCodeSetting)
                .then(() => {
                    window.localStorage.setItem('emailForSignIn', email);
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    signOut = (e?: { preventDefault: () => void; }) => {
        e && e.preventDefault()
        console.log('s')
        auth.signOut().then(() => {
            useHistory().push('/login')
        }).catch((error) => {
            console.log(e)
        });
    }
}

export const AuthServices = new AuthServiceWithEmailAndPassword();