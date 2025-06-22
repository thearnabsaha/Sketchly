import { BACKEND_URL } from "@/lib/config"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
interface Room {
    id: string;
    slug: string;
}
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@workspace/ui/components/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RoomSlugSchema } from '@workspace/common/types';
import { Input } from "@workspace/ui/components/input";
import toast, { Toaster } from "react-hot-toast";
const Rooms = () => {
    const [disabled, setdisabled] = useState(false)
    const roomSlugform = useForm<z.infer<typeof RoomSlugSchema>>({
        resolver: zodResolver(RoomSlugSchema),
        defaultValues: {
            roomSlug: "",
        },
    })
    const roomUpdateform = useForm<z.infer<typeof RoomSlugSchema>>({
        resolver: zodResolver(RoomSlugSchema),
        defaultValues: {
            roomSlug: "",
        },
    })
    const [roomData, setroomData] = useState<Room[]>([])
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}/room/`, { headers: { Authorization: token } })
            .then((e) => {
                setroomData(e.data.room)
            })
            .catch((e) => console.log(e))
    }, [])
    const joinHandler = (slug: string) => {
        localStorage.setItem("roomId", slug)
        router.push(`/room/${slug}`)
    }
    const deleteRoom = (slug: string) => {
        const token = localStorage.getItem("token")
        axios.delete(`${BACKEND_URL}/room/${slug}`, { headers: { Authorization: token } })
            .then((e) => {
                toast.success("Room Deleted")
                window.location.reload()
            }).catch((e) => {
                console.log(e)
            })
    }
    const updateRoom = (slug: string, newSlug: string) => {
        const token = localStorage.getItem("token")
        axios.put(`${BACKEND_URL}/room/${slug}`, { slug: newSlug }, { headers: { Authorization: token } })
            .then((e) => {
                toast.success("Room Updated")
                window.location.reload()
            }).catch((e) => {
                console.log(e)
            })
    }
    return (
        <div className=" overflow-auto w-full">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <h1 className="text-center pt-5 text-2xl px-2">You Are Admin of These Rooms</h1>
            {
                roomData.length ? roomData.map((e) => {
                    function onDeleteSubmit(values: z.infer<typeof RoomSlugSchema>) {
                        if (values.roomSlug === e.slug) {
                            setdisabled(true)
                            deleteRoom(e.slug)
                        } else {
                            toast.error("Wrong Room ID")
                        }
                    }
                    function onRenameSubmit(values: z.infer<typeof RoomSlugSchema>) {
                        if (values.roomSlug === e.slug) {
                            toast.error("Room ID is Same")
                        } else {
                            setdisabled(true)
                            updateRoom(e.slug, values.roomSlug)
                        }
                    }
                    return (
                        <div key={e.id} className="w-full px-5">
                            <div className="flex flex-col md:flex-row md:justify-between items-center p-5 lg:w-[32vw] w-full border my-5 rounded-md border-ring">
                                <h1 className="text-xl font-bold">Room No: {e.slug}</h1>
                                <div className="space-x-3">
                                    <Button className="bg-chart-2 text-white hover:bg-chart-4" onClick={() => joinHandler(e.slug)}>Join</Button>
                                    <Dialog>
                                        <DialogTrigger className="bg-destructive text-white hover:bg-destructive-foreground px-4 py-1.5 rounded-md cursor-pointer my-3">
                                            Delete
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl text-center">Are you sure to Delete Rooms</DialogTitle>
                                                <DialogDescription className="text-center">
                                                    This action cannot be undone. This will permanently delete your Room and remove your data from our servers.
                                                </DialogDescription>
                                                <Form {...roomSlugform}>
                                                    <form onSubmit={roomSlugform.handleSubmit(onDeleteSubmit)} className="space-y-2">
                                                        <FormField
                                                            control={roomSlugform.control}
                                                            name="roomSlug"
                                                            disabled={disabled}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder="Room ID" {...field} />
                                                                    </FormControl>
                                                                    <FormDescription>
                                                                        Type "{e.slug}" to Confirm Delete Permanently
                                                                    </FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <Button type="submit" className="bg-destructive text-white hover:bg-destructive-foreground w-full" disabled={disabled}>Delete Permanently</Button>
                                                    </form>
                                                </Form>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog>
                                        <DialogTrigger className="bg-chart-3 text-white hover:bg-chart-5 px-4 py-1.5 rounded-md cursor-pointer">
                                            Rename
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl text-center">Are you sure to Rename Room</DialogTitle>
                                                <DialogDescription className="text-center">
                                                    Update the Room Name by Clicking a Button
                                                </DialogDescription>
                                                <Form {...roomUpdateform}>
                                                    <form onSubmit={roomUpdateform.handleSubmit(onRenameSubmit)} className="space-y-4">
                                                        <FormField
                                                            control={roomUpdateform.control}
                                                            name="roomSlug"
                                                            disabled={disabled}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input placeholder="Room ID" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <Button type="submit" className="bg-chart-3 text-white hover:bg-chart-5 w-full" disabled={disabled}>Rename Room</Button>
                                                    </form>
                                                </Form>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div>
                    {["a", "b", "c", "d", "e", "f"].map((e) => {
                        return (
                            <Skeleton className="p-8 md:w-[32vw] w-72 md:mx-[1vw] ml-8 sm:ml-0 my-10 rounded-md bg-ring" key={e} />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Rooms