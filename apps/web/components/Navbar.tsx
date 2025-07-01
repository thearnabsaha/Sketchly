"use client"
import { BACKEND_URL } from "@/lib/config"
import { useUserStore } from "@/lib/store/userStore"
import { Button } from "@workspace/ui/components/button"
import axios from "axios"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "@workspace/ui/components/dropdown-menu"
const Navbar = () => {
    const router = useRouter()
    const { setUser } = useUserStore()
    const { setTheme } = useTheme()
    const [toggle, setToggle] = useState<Boolean | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/signin")
        }
        const theme = localStorage.getItem("theme")
        setToggle(theme == "light" ? false : true)
        axios.get(`${BACKEND_URL}/me`, { headers: { Authorization: token } })
            .then((e) => {
                setUser(e.data.message)
            })
            .catch((e) => console.log(e))
    }, [router])
    const lightThemeHandler = () => {
        setTheme("light")
        setToggle(false)
    }
    const darkThemeHandler = () => {
        setTheme("dark")
        setToggle(true)
    }
    const logoutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("roomId")
        router.push("/signin")
    }
    return (
        <div className="bg-accent sm:py-5 py-1 sm:my-5 mt-1 mb-1 md:mx-10 mx-3 rounded-xl flex justify-between">
            <h1 className="text-3xl pl-10">Sketchly</h1>
            <DropdownMenu>
                <DropdownMenuTrigger className="md:hidden px-4 py-1.5 rounded-md cursor-pointer mr-10"><RxHamburgerMenu className="text-3xl" /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><Link className="pr-5 cursor-pointer hover:underline" href={"/dashboard"}>Dashboard</Link></DropdownMenuItem>
                    <DropdownMenuItem><p className="pr-5 hover:underline cursor-pointer" onClick={logoutHandler}>Logout</p></DropdownMenuItem>
                    {
                        toggle ? <DropdownMenuItem className="" onClick={lightThemeHandler}>Light Mode</DropdownMenuItem> :
                            <DropdownMenuItem className="" onClick={darkThemeHandler}>Dark Mode</DropdownMenuItem>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:block">
                <ul className="flex pr-10 items-center">
                    <Link className="pr-5 cursor-pointer hover:underline" href={"/dashboard"}>Dashboard</Link>
                    <li className="pr-5 hover:underline cursor-pointer" onClick={logoutHandler}>Logout</li>
                    {
                        toggle ? <Button className="px-5" onClick={lightThemeHandler}>Light Mode</Button> :
                            <Button className="px-5" onClick={darkThemeHandler}>Dark Mode</Button>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar