import React from 'react'
import Navbar from '../_components/Navbar'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='relative flex h-screen w-full flex-col'>
            <div className="w-dull">
                <Navbar />
                {children}
            </div>
        </div>
    )
}

export default layout