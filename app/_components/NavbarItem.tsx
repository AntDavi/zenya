'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { buttonVariants } from './ui/button';

function NavbarItem({ href, label, onClick }: { href: string, label: string, onClick?: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <div className="relative flex items-center">
            <Link href={href} className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full text-lg text-muted-foreground hover:text-foreground flex items-center justify-center",
                isActive && "text-foreground"
            )}
                onClick={() => {
                    if (onClick) onClick();
                }}
            >
                {label}
            </Link>
            {
                isActive && (
                    <div className="absolute -bottom-[1px] left-1/2 h-[2px] hidden w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
                )
            }
        </div>
    )

}

export default NavbarItem