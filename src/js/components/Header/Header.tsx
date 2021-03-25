import React from 'react';
import './Header.scss'

import {Logo} from './icons'
import {Link,NavLink} from "react-router-dom";


export const Header: React.FC = () => {

    const NavBarLinks: Array<{ name: string, link: string }> = [
        {name: 'Find partner', link: '/find-partner'},
        {name: 'Blog', link: '/blog'},
        {name: 'Login', link: '/login'},
    ]

    return (
        <header className={'header'}>
            <Link to="/home"><Logo/></Link>
            <nav className={'header-nav'}>
                {NavBarLinks
                    .map((el, index) =>
                        <Link key={index} to={el.link}>{el.name}</Link>)}
                <button className={'btn-blue medium'}>
                    Post a pitch
                </button>
            </nav>
        </header>
    )
}