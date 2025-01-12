'use client'

import React from 'react'
import { LogoIcon, LogoMark } from './Logo'
import { NavbarNavigation } from '../_config/site'
import NavbarItem from './NavbarItem'
import { UserButton } from '@clerk/nextjs'
import ThemeSwitcherBtn from './ThemeSwitcherBtn'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

function Navbar() {
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
        </>
    )
}

function DesktopNavbar() {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <div className='flex h-[80px] min-h-[60px] items-center fap-x-4 gap-5'>
                    <LogoMark />
                    <div className="flex h-full gap-2">
                        {NavbarNavigation.map(item => (
                            <NavbarItem
                                key={item.id}
                                label={item.label}
                                href={item.href}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeSwitcherBtn />
                    <UserButton afterSwitchSessionUrl='/sign-in' />
                </div>
            </nav>
        </div>
    )
}

export function MobileNavbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className='container flex items-center justify-between px-8'>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <LogoIcon />
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={'ghost'} size={'icon'}>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-[400px] sm:w-[540px] items-center justify-between flex flex-col h-full' side='right'>
                        <LogoMark />
                        <div className="flex flex-col gap-1 pt-4">
                            {NavbarNavigation.map(item => (
                                <NavbarItem
                                    key={item.id}
                                    label={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(prev => !prev)}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeSwitcherBtn />
                            <UserButton afterSwitchSessionUrl='/sign-in' />
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default Navbar