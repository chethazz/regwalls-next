"use client";

import { logInSchema, LogInValues } from "@/app/lib/validation";
import LoadingButton from "@/components/LoadingButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { logIn } from "./actions";

export default function LogInForm() {

    const [error, setError] = useState<string>();

    const [isPending, startTransition] = useTransition();

    const form = useForm<LogInValues>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function onSubmit(values: LogInValues) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await logIn(values);
            if (error) setError(error);
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-3"
            >
                {error && <p className="text-center text-destructive">{error}</p>}

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Username"
                                    {...field}
                                    className="transition-colors border-none bg-secondary focus:bg-card"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                    className="transition-colors border-none bg-secondary focus:bg-card"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <LoadingButton
                    type="submit"
                    className="w-full cursor-pointer"
                    loading={isPending}
                >
                    Log In
                </LoadingButton>
            </form>
        </Form>
    );
}