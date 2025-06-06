"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@workspace/ui/components/form"
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { BACKEND_URL } from "@/lib/config"
const SignupSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),
    photo: z
        .string()
        .url({ message: 'Photo must be a valid URL' })
        .optional()
        .or(z.literal('')),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
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
        <div className=" w-96">
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
                        render={({ field }) => (
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
                        render={({ field }) => (
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
                        render={({ field }) => (
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
                        render={({ field }) => (
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