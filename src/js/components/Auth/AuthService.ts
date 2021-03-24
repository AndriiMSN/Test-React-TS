import {auth} from "../../firebase";

class AuthServiceWithEmailAndPassword {
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

    sendEmail(email: string, actionCodeSetting: { url: string, handleCodeInApp: boolean }): void {
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

export const AuthServices = new AuthServiceWithEmailAndPassword();