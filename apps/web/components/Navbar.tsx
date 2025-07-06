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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import { LogOutIcon, Moon, Sun, User } from "lucide-react"
interface NavbarProps {
    isSidebar: boolean;
}
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@workspace/ui/components/tooltip"
const Navbar = ({ isSidebar }: NavbarProps) => {
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
        <div className={isSidebar ? "" : "bg-accent sm:py-5 py-1 sm:my-5 mt-1 mb-1 md:mx-10 mx-3 rounded-xl flex justify-between"}>
            <h1 className={isSidebar ? "hidden" : "text-3xl pl-10"}>Sketchly</h1>
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
            {isSidebar ? <div className="bg-accent inline-block px-5 py-2 rounded-lg absolute z-30 right-5 top-5">
                <ul className="flex items-center">
                    <Tooltip>
                        <TooltipTrigger><Link className=" cursor-pointer hover:underline flex" href={"/dashboard"}><User /></Link></TooltipTrigger>
                        <TooltipContent>
                            <p>Dashboard</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger><li className="px-5 hover:underline cursor-pointer" onClick={logoutHandler}><LogOutIcon /></li></TooltipTrigger>
                        <TooltipContent>
                            <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        {
                            toggle ? <TooltipTrigger className="p-2 rounded-md cursor-pointer hover:opacity-90 bg-foreground text-background" onClick={lightThemeHandler}><Sun /></TooltipTrigger> :
                                <TooltipTrigger className="p-2 rounded-md cursor-pointer hover:opacity-90 bg-foreground text-background" onClick={darkThemeHandler}><Moon /></TooltipTrigger>
                        }
                        <TooltipContent>
                            <p>Theme</p>
                        </TooltipContent>
                    </Tooltip>
                    {/* <Link className="pr-5 cursor-pointer hover:underline" href={"/dashboard"}><User /></Link>
                    <li className="pr-5 hover:underline cursor-pointer" onClick={logoutHandler}><LogOutIcon /></li>
                    {
                        toggle ? <Button className="px-5" onClick={lightThemeHandler}><Sun /></Button> :
                            <Button className="px-5" onClick={darkThemeHandler}><Moon /></Button>
                    } */}
                </ul>
            </div> :
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
            }

        </div>
    )
}

export default Navbar