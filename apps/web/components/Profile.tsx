import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { useUserStore } from '@/lib/store/userStore';
import { Skeleton } from "@workspace/ui/components/skeleton"
const Profile = () => {
        const { user } = useUserStore()
    const getInitials = (fullName: string) => {
        const parts = fullName.trim().split(" ");
        if (parts.length === 1) return (parts[0]?.[0] ?? '').toUpperCase();
        const firstInitial = parts[0]?.[0] ?? '';
        const lastInitial = parts[parts.length - 1]?.[0] ?? '';
        return (firstInitial + lastInitial).toUpperCase();
        };
    return (
        <div className='rounded-lg bg-accent flex flex-col items-center pt-10 space-y-3 w-full lg:h-96 mb-2.5 h-60'>
                {user?<Avatar className='size-15'>
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className='text-3xl font-bold bg-primary text-secondary'>{getInitials(user?.name||"")}</AvatarFallback>
            </Avatar>:<Skeleton className="size-15 rounded-full bg-ring" />}
            {user?<h1 className=' capitalize'>Name: {user?.name}</h1>:<Skeleton className="bg-ring w-30 h-5" />}
            {user?<p>Username: @{user?.username}</p>:<Skeleton className="bg-ring w-72 h-5" />}
            {user?<p className='break-words'>Email: {user?.email}</p>:<Skeleton className="bg-ring md:w-96 w-72 h-5" />}
        </div>
    )
}

export default Profile