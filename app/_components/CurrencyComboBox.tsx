"use client"

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "./ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "./ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import { Currencies, Currency } from "@/lib/currencies"
import { useMutation, useQuery } from "@tanstack/react-query"
import SkeletonWrapper from "./SkeletonWrapper"
import { UserSettings } from "@prisma/client"
import { UpdateUserCurrency } from "../wizard/_actions/userSettings"
import { toast } from "sonner"

export function CurrencyComboBox() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
        null
    );

    const userSettings = useQuery<UserSettings>({
        queryKey: ["userSettings"],
        queryFn: () => fetch("api/user-settings").then((res) => res.json()),
    })

    React.useEffect(() => {
        if (!userSettings.data) return;

        const userCurrency = Currencies.find(
            (currency) => currency.value === userSettings.data.currency
        );
        if (userCurrency) {
            setSelectedOption(userCurrency);
        }
    }, [userSettings.data])

    const mutation = useMutation({
        mutationFn: UpdateUserCurrency,
        onSuccess: (data: UserSettings) => {
            toast.success("Moeda atualizada com sucesso! 🎉", {
                id: "update-currency",
            });

            setSelectedOption(
                Currencies.find((c) => c.value === data.currency) || null
            );
        },
        onError: (e) => {
            console.error(e);
            toast.error("Algo deu errado... 😥", {
                id: "update-currency",
            })
        }
    });

    const selectOption = React.useCallback(
        (currency: Currency | null) => {
            if (!currency) {
                toast.error("Por favor, selecione uma moeda válida.");
                return;
            }

            toast.loading("Atualizando moeda...", {
                id: "update-currency",
            });

            mutation.mutate(currency.value);
        },
        [mutation]
    )


    if (isDesktop) {
        return (
            <SkeletonWrapper isLoading={userSettings.isFetching} fullWidth={false}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            disabled={mutation.isPending}
                        >
                            {selectedOption ? <>{selectedOption.label}</> : <>Escolher Moeda</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <OptionList setOpen={setOpen} setSelectedOption={selectOption} />
                    </PopoverContent>
                </Popover>
            </SkeletonWrapper>
        )
    }

    return (
        <SkeletonWrapper isLoading={userSettings.isFetching} fullWidth={false}>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        disabled={mutation.isPending}
                    >
                        {selectedOption ? <>{selectedOption.label}</> : <>Escolher Moeda</>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <OptionList setOpen={setOpen} setSelectedOption={selectOption} />
                    </div>
                </DrawerContent>
            </Drawer>
        </SkeletonWrapper>
    )
}

function OptionList({
    setOpen,
    setSelectedOption,
}: {
    setOpen: (open: boolean) => void
    setSelectedOption: (status: Currency | null) => void
}) {
    return (
        <Command>
            <CommandInput placeholder="Filtrar moedas..." />
            <CommandList>
                <CommandEmpty>Não há essa moeda 😥</CommandEmpty>
                <CommandGroup>
                    {Currencies.map((currency: Currency) => (
                        <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={(value) => {
                                setSelectedOption(
                                    Currencies.find((priority) => priority.value === value) || null
                                )
                                setOpen(false)
                            }}
                        >
                            {currency.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
