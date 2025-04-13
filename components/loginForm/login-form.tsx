"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/lib/schema/loginSchema"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import ButtonAuth from "../buttonAuth/ButtonAuth";
import { signIn } from "next-auth/react";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    // Configuración del formulario utilizando useForm
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        
        console.log(values)

        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Ingresa tu email para iniciar sesión en tu cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="m@example.com" {...field} type="email" />
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
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <ButtonAuth /> */}

                            <Button type="submit" className="w-full">
                                Iniciar sesión
                            </Button>

                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>

                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        ¿No tienes una cuenta?{" "}
                        <a href="#" className="underline underline-offset-4">
                            Regístrate
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
