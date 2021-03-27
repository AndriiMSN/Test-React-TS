import React from "react";
import {auth, firebaseConfig} from "../../firebase";
import {AuthServices} from "../AuthService";

import './Confirm.scss'
import {Mail} from "./icons";
import {SetLocalStorage} from "../LocalStorage";

export const Confirm: React.FC = () => {

    const CurrentUserEmail = auth.currentUser?.email ? auth.currentUser.email : ''

    const [timeResend, setTimeResend] = React.useState<number>(0)

    React.useEffect(() => {
        const lastDate = localStorage.getItem('lastDate')
        const lastCounter = localStorage.getItem('lastCounter')
        if (lastDate && lastCounter) {
            const oldDate: number = +lastDate
            const oldSeconds: number = +lastCounter * 1000

            let currentDate: number = new Date().getTime()
            let diff: number = currentDate - (oldDate + oldSeconds)
            if (diff < 0) {
                setTimeResend(Math.floor((diff * -1) / 1000))
            }
        }
    }, [])


    React.useEffect(() => {
        let id: NodeJS.Timeout
        if (timeResend >= 1) {
            id = setInterval(() => {
                setTimeResend(timeResend - 1);
                SetLocalStorage.setCounterAndDate(timeResend + '')
            }, 1000);
        }
        return () => {
            clearInterval(id)
        }
    });

    const [sending, isSending] = React.useState<boolean>(false)

    const Resend = () => {
        setTimeResend(+SetLocalStorage.counter)
        isSending(true)
        auth
            .sendSignInLinkToEmail(CurrentUserEmail, AuthServices.actionCodeSetting)
            .then(() => {
                isSending(false)
                window.localStorage.setItem('emailForSignIn', CurrentUserEmail);
            })
            .catch((e) => {

            })
    }


    return (
        <div className={'confirm-page'}>
            <div className={"confirm-page-content"}>
                <h1>Confirm account</h1>
                <p>Please confirm your email by clicking on the link in the
                    confirmation email that we sent to <span>{CurrentUserEmail}</span></p>
                <button disabled={!!timeResend}
                        onClick={Resend}
                        className={'btn-blue circle full'}>
                    {!sending && <span>Resend {!!timeResend && 'in ' + timeResend + 's'}</span>}
                    {sending && <span>Loading</span>}
                </button>
                <div onClick={AuthServices.signOut}>Sign out</div>
            </div>
            <div className="confirm-page-icon">
                <Mail/>
            </div>
        </div>
    )
}