import {auth, firebaseConfig} from "../firebase";
import {useHistory} from "react-router-dom";

class AuthServiceWithEmailAndPassword {
    readonly actionCodeSetting = {
        url: 'http://localhost:8080/confirm',
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

                })
        }
    }

    signOut = (e?: { preventDefault: () => void; }) => {
        e && e.preventDefault()
        auth.currentUser?.delete()
        auth.signOut().then(() => {
            useHistory().push('/login')
        }).catch((error) => {
            console.log(e)
        });
    }
}

export const AuthServices = new AuthServiceWithEmailAndPassword();