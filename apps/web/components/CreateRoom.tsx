"use client"
import { useRoomStore } from "@/lib/store/roomStore";
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { useState } from "react";
import { GoCopy, GoCheck } from "react-icons/go";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@workspace/ui/components/form"
import { useUserStore } from "@/lib/store/userStore";
import { Skeleton } from "@workspace/ui/components/skeleton";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import toast, { Toaster } from "react-hot-toast";
import { RoomInputSchema } from '@workspace/common/types';
const CreateRoom = () => {
    const router = useRouter();
    const [toggle, setToggle] = useState(false)
    const [open, setOpen] = useState(false)
    const [RoomString, setRoomString] = useState("")
    const { setRoom } = useRoomStore()
    const { user } = useUserStore()
    const copyHandler = () => {
        setToggle(true)
        navigator.clipboard.writeText(RoomString)
        setTimeout(() => {
            setToggle(false)
        }, 800);
    }
    const randomStringGenerator = () => {
        const values = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890"
        let roomString = ""
        for (let i = 0; i < 6; i++) {
            const x = Math.floor(Math.random() * 36)
            roomString += values[x]
        }
        setRoomString(roomString)
        setRoom({ RoomId: roomString })
    }
    const createHandler = () => {
        randomStringGenerator()
        setOpen(true)
    }
    const RoomInputForm = useForm<z.infer<typeof RoomInputSchema>>({
        resolver: zodResolver(RoomInputSchema),
        defaultValues: {
            roomId: "",
        },
    })
    function onSubmit(values: z.infer<typeof RoomInputSchema>) {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}/room/${values.roomId}`, { headers: { Authorization: token } })
            .then((e) => {
                localStorage.setItem("roomId", values.roomId)
            })
            .then(() => {
                router.push(`/room/${values.roomId}`)
            })
            .catch((e) => {
                if (e.status) {
                    axios.post(`${BACKEND_URL}/room`, { slug: values.roomId }, { headers: { Authorization: token } })
                        .then((e) => {
                            localStorage.setItem("roomId", values.roomId)
                        })
                        .then(() => {
                            router.push(`/room/${values.roomId}`)
                        })
                        .catch((e) => {
                            toast.error(e.response.data.message)
                            console.log(e)
                        })
                }
            })
    }
    return (
        <div className="rounded-lg bg-accent flex justify-center items-center lg:h-full md:h-[600px] mt-2.5 p-5 lg:p-0">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {user ? <div className="rounded-xl flex flex-col md:w-[600px] sm:p-16 lg:h-[400px] p-6 bg-card w-full">
                <h1 className="text-3xl font-bold pb-1 text-center sm:text-start">Real Time Chat</h1>
                <p className=" font-bold text-ring pb-5 text-center sm:text-start">Make a Room by just clicking a Button</p>
                <Form {...RoomInputForm}>
                    <form onSubmit={RoomInputForm.handleSubmit(onSubmit)} className=" space-y-4 flex w-full flex-col md:flex-row">
                        <FormField
                            control={RoomInputForm.control}
                            name="roomId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Room No." {...field} className="border border-ring md:w-84" />
                                    </FormControl>
                                    <FormMessage className="text-xs mt-2" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="md:ml-4 text-md font-bold md:w-fit mb-5">Join Room</Button>
                    </form>
                </Form>
                <Button className="font-bold text-md py-3" onClick={createHandler}>Create a New Room</Button>
                {open && <div className="flex flex-col items-center mt-5 bg-accent p-5 rounded-lg">
                    <p className=" text-center sm:text-start">Share this code with your friend</p>
                    <div className="flex items-center justify-center">
                        <h1 className="text-3xl font-black pt-3">{RoomString}</h1>
                        <div onClick={copyHandler}>
                            {
                                toggle ?
                                    <GoCheck className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg" /> :
                                    <GoCopy className="text-5xl ml-3 translate-y-1 hover:bg-ring cursor-pointer w-10 h-10 p-2 rounded-lg" />
                            }
                        </div>
                    </div>
                </div>}
            </div> : <Skeleton className="bg-ring rounded-xl w-[600px] h-60" />}
        </div>
    )
}

export default CreateRoom