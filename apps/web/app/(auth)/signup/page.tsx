"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,ControllerRenderProps } from "react-hook-form"
import {Form,FormControl,FormField,FormItem,FormMessage} from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from "@/lib/config"
import { SignupSchema } from '@workspace/common/types';

const Signup = () => {
    const SignupForm = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            username: "",
            name: "",
            email: '',
            password: '',
        },
    })
    function onSubmit(values: z.infer<typeof SignupSchema>) {
        axios.post(`${BACKEND_URL}/signup`, { username: values.username, email: values.email, password: values.password, name: values.name, photo: values.photo })
            .then((e) => toast.success(e.data.message))
            .catch((e) => {
                toast.error("Signup Failed")
                console.log(e)
            })
        SignupForm.reset()
    }
    return (
        <div className=" md:w-96 w-full p-5">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Form {...SignupForm}>
                <h1 className="text-3xl text-center">Make a New Account</h1>
                <p className="text-center pt-3 pb-5 text-ring">User registration page to create account with email and password.</p>
                <form onSubmit={SignupForm.handleSubmit(onSubmit)} className="space-y-4 flex justify-center flex-col">
                    <FormField
                        control={SignupForm.control}
                        name="username"
                        render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={SignupForm.control}
                        name="name"
                        render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={SignupForm.control}
                        name="email"
                        render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={SignupForm.control}
                        name="password"
                        render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Link href={"signin"} className="text-end underline">Already Have a Account? Signin</Link>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default Signup