import React from 'react'
import { LogoMark } from './Logo'
import NavHeader from './NavHeader'

function Header() {
    return (
        <nav className='w-full h-20'>
            <div className='container flex items-center gap-8'>
                <LogoMark
                    width={90}
                />
                <NavHeader />
            </div>
        </nav>
    )
}

export default Header