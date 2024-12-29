import React from 'react'
import { Button } from './ui/button'

function NavHeader() {
    return (
        <nav>
            <ul>
                <li>
                    <Button variant={'ghost'}>
                        Transações
                    </Button>
                </li>
            </ul>
        </nav>
    )
}

export default NavHeader