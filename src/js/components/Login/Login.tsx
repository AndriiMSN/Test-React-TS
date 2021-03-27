import React from "react";
import './Login.scss'
import {AuthServices} from "../AuthService";
import {useHistory} from "react-router-dom";
import {auth} from "../../firebase";
import {SetLocalStorage} from "../LocalStorage";


export const Login: React.FC = () => {
    const history = useHistory();

    const Email = React.useRef<HTMLInputElement>(null);
    const Password = React.useRef<HTMLInputElement>(null);

    const [isLoading, setLoading] = React.useState<boolean>(false)
    const [isError, setError] = React.useState<boolean>(false)
    const [errMessage, setErrorMessage] = React.useState<string>('')

    const SignIn = (e: React.FormEvent): void => {

        e.preventDefault();
        const EnteredEmail = Email.current!.value;
        const EnteredPassword = Password.current!.value;

        if (AuthServices.validation(Email, EnteredEmail, Password, EnteredPassword)) {
            setLoading(true)
            auth
                .createUserWithEmailAndPassword(EnteredEmail, EnteredPassword)
                .then((auth) => {
                    SetLocalStorage.setCounterAndDate()
                    setLoading(false)
                    history.push('/confirm')
                })
                .catch((e) => {
                    setError(true)
                    setErrorMessage(e.message)
                    setLoading(false)
                })
            !isError && AuthServices.sendEmail(EnteredEmail)
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
            <p className={'error text' + `${isError ? ' show' : ''}`}>
                {isError && errMessage}
            </p>
            <button disabled={isLoading} type={"submit"} className={'btn-blue circle full'}>
                {!isLoading && 'Create Account'}
                {isLoading && 'Loading..'}
            </button>
        </form>
    )
}