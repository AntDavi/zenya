import React from 'react'
import { LogoMark } from '../_components/Logo'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative flex h-screen w-full flex-col items-center justify-center'>
            <LogoMark width={150} height={150} />
            <div className='mt-12'>
                {children}
            </div>
        </div>
    )
}

export default layout