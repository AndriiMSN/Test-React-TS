import React from 'react';
import './Header.scss'

import {Logo} from './icons'


export const Header: React.FC = () => {

    const NavBarLinks: Array<{ name: string, link: string }> = [
        {name: 'Find partner', link: '#'},
        {name: 'Blog', link: '#'},
        {name: 'Login', link: '#'},
    ]

    return (
        <header className={'header'}>
            <a href="/"><Logo></Logo></a>
            <nav className={'header-nav'}>
                {NavBarLinks
                    .map((el, index) =>
                        <a key={index} href={el.link}>{el.name}</a>)}
                <button className={'btn-blue medium'}>
                    Post a pitch
                </button>
            </nav>
        </header>
    )
}