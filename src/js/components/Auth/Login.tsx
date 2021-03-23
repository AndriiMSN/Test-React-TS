import React from "react";
import './Login.scss'

export const Login: React.FC = () => {
    return (
        <div className="login-page">
            <div className={'login-page-form'}>
                <h1>Create Account</h1>
                <div className="input-long">
                    <label htmlFor="login-email">Email</label>
                    <input type={'email'} name={'login-email'} id={'login-email'}
                           placeholder={'you@example.com'}/>
                </div>
                <div className="input-long">
                    <label htmlFor="'login-password'">Password <span>(min 8 symbols)</span></label>
                    <input type={'password'} name={'login-password'} id={'login-password'}
                           placeholder={'••••••••••••••••••••'}/>
                </div>
                <button className={'btn-blue circle full'}>
                    Create Account
                </button>
            </div>
        </div>
    )
}