import React from "react";
import './Login.scss'
import {AuthServices} from "./AuthService";

export const Login: React.FC = () => {

    const Email = React.useRef<HTMLInputElement>(null);
    const Password = React.useRef<HTMLInputElement>(null);

    const SignIn = (e: React.FormEvent): void => {
        e.preventDefault();
        const EnteredEmail = Email.current!.value;
        const EnteredPassword = Password.current!.value;

        if (AuthServices.validation(Email, EnteredEmail, Password, EnteredPassword)) {
            AuthServices.createUser(EnteredEmail, EnteredPassword)
            let actionCodeSetting = {
                url: 'http://localhost:8080/',
                handleCodeInApp: true
            }
            AuthServices.sendEmail(EnteredEmail, actionCodeSetting)
        }

    }

    return (
            <form onSubmit={SignIn} className={'login-page-form'}>
                <h1>Create Account</h1>
                <div className={"input-long"}>
                    <label htmlFor={"login-email"}>Email</label>
                    <input ref={Email} type={'email'} name={'login-email'} id={'login-email'}
                           placeholder={'you@example.com'}/>
                </div>
                <div className={"input-long"}>
                    <label htmlFor={'login-password'}>Password <span>(min 8 symbols)</span></label>
                    <input ref={Password} type={'password'} name={'login-password'} id={'login-password'}
                           placeholder={'••••••••••••••••••••'}/>
                </div>
                <button type={"submit"} className={'btn-blue circle full'}>
                    Create Account
                </button>
            </form>
    )
}