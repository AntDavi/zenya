"use client";

import { TransactionType } from "@/lib/types";

interface Props {
    trigger: React.ReactNode;
    type: TransactionType;
}

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import CategoryPicker from "./CategoryPicker";

const typeTranslation: Record<TransactionType, string> = {
    income: "Receita",
    expense: "Despesa"
};

function CreateTransactionDialog({ trigger, type }: Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Criar uma nova {" "} <span className={cn("m-1", type === "income" ? "text-emerald-500" : "text-rose-500")}>
                            {typeTranslation[type]}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field} />
                                    </FormControl>
                                    <FormDescription>Descrição de transação (opcional)</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantia</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={0} {...field} type="number" />
                                    </FormControl>
                                    <FormDescription>Quantia da Transação (obrigatorio)</FormDescription>
                                </FormItem>
                            )}
                        />

                        <div className="flecx items-center justify-between gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <FormControl>
                                            <CategoryPicker
                                                type={type}
                                            />
                                        </FormControl>
                                        <FormDescription>Selecione uma categoria para essa transação</FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTransactionDialog