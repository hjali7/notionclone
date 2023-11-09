'use client'

import { SignOutButton, useUser } from "@clerk/clerk-react"

import { ChevronsLeftRight } from "lucide-react"

import { Avatar , AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu , DropdownMenuItem ,DropdownMenuContent , DropdownMenuTrigger , DropdownMenuLabel ,DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export default function UserItem () {

    const {user} = useUser()
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5" role='button'>
                    <div className="flex items-center max-w-[150px] gap-x-2">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className="font-medium text-start line-clamp-1">
                            {user?.fullName}&apos;s Aotion
                        </span>
                    </div>
                    <ChevronsLeftRight className="w-4 h-4 text-muted-foreground ml-2 text-sm rotate-90" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-sx font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0]?.emailAddress}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <div className="bg-secondary p-1 rounded-md">
                            <Avatar className="h-8 w-88">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foregournd">{user?.fullName}&apos;s Aotion</p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild >
                    <SignOutButton>
                        Sign out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}