"use client"
import CreateRoom from "@/components/CreateRoom";
import Profile from "@/components/Profile";
import Rooms from "@/components/Rooms";

const Dashboard = () => {
    return (
        <div className="flex justify-between mx-3 md:mx-10 lg:flex-row flex-col-reverse">
            <div className="border flex rounded-lg bg-accent lg:h-[85vh] h-full pt-5 mt-5 lg:mt-0">
                <Rooms/>
            </div>
            <div className=" flex flex-col rounded-lg font-mono w-full lg:ml-5">
                <Profile/>
                <CreateRoom />
            </div>
        </div>
    )
}

export default Dashboard