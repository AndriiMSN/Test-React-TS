import React from "react";
import './Login.scss'
import {AuthServices} from "../AuthService";
import {useHistory} from "react-router-dom";
import {auth} from "../../firebase";


export const Login: React.FC = () => {
    const history = useHistory();
    const Email = React.useRef<HTMLInputElement>(null);
    const Password = React.useRef<HTMLInputElement>(null);

    const [isLoading, setLoading] = React.useState<boolean>(false)

    const SignIn = (e: React.FormEvent): void => {

        e.preventDefault();
        const EnteredEmail = Email.current!.value;
        const EnteredPassword = Password.current!.value;

        if (AuthServices.validation(Email, EnteredEmail, Password, EnteredPassword)) {
            setLoading(true)
            AuthServices.createUser(EnteredEmail, EnteredPassword)
            AuthServices.sendEmail(EnteredEmail)
            auth.onAuthStateChanged((user) => {
                if (user) {
                    history.push('/confirm')
                    setLoading(false)
                }
            })
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
            <button disabled={isLoading} type={"submit"} className={'btn-blue circle full'}>
                {!isLoading && 'Create Account'}
                {isLoading && 'Loading..'}
            </button>
        </form>
    )
}