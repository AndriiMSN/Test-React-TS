import React from "react";
import {auth} from "../../firebase";
import {Link} from "react-router-dom";

export const Confirm: React.FC = () => {

    return (
        <div className={'confirm-page'}>
            <div className={"confirm-page-content"}>
                <h1>Confirm account</h1>
                <p>Please confirm your email by clicking on the link in the
                    confirmation email that we sent to {auth.currentUser?.email}</p>
                <button className="btn-blu circle full">
                    Resend
                </button>
                <Link to={'/login'}/>
            </div>
        </div>
    )
}