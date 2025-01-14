import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import { Separator } from '../_components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../_components/ui/card';
import { Button } from '../_components/ui/button';
import Link from 'next/link';
import { LogoMark } from '../_components/Logo';
import { CurrencyComboBox } from '../_components/CurrencyComboBox';

async function page() {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in')
    }

    return (
        <div className='container flex max-w-2xl flex-col items-center justify-between gap-4'>
            <div>
                <h1 className='text-center text-3xl'>
                    Seja bem vindo, <span className='ml-2 font-bold'>{user.firstName}! 👋</span>
                </h1>
                <h2 className="mt-4 text-center text-base text-muted-foreground">
                    Vamos começars configurando a sua moeda corrente.
                </h2>
                <h3 className="mt-2 text-center text-sm text-muted-foreground">
                    Você pode mudar essa configuração a qualquer momento.
                </h3>
            </div>
            <Separator />

            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Moeda Corrente</CardTitle>
                    <CardDescription>Selecione a moeda que usará nas suas transações</CardDescription>
                </CardHeader>
                <CardContent>
                    <CurrencyComboBox />
                </CardContent>
            </Card>
            <Separator />
            <Button className='w-full' asChild>
                <Link href={"/"}>
                    Tudo pronto! Leve-me ao Dashboard
                </Link>
            </Button>
            <div className='mt-8'>
                <LogoMark
                    width={120}
                    height={120}
                />
            </div>
        </div>
    )
}

export default page