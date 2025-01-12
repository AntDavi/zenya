import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Componente LogoIcon
export function LogoIcon({ width = 32, height = 32 }) {
    return (
        <Link href="/">
            <Image
                src="/logo-icon.svg"
                alt="Logo"
                width={width}
                height={height}
            />
        </Link>
    );
}

// Componente LogoMark
export function LogoMark({ width = 80, height = 80 }) {
    return (
        <Link href="/">
            <Image
                src="/logo-mark.svg"
                alt="Logo"
                width={width}
                height={height}
            />
        </Link>
    );
}
