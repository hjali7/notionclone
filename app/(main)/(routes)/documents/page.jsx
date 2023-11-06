'use client'

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";

export default function DocumentsPage () {

    const {user} = useUser()
    
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">

            <Image height='300' width='300' alt="empty"  src='/empty.png' className="dark:hidden" />
            <Image height='300' width='300'  alt="empty" src='/empty-dark.png' className="hidden dark:block" />

            <h2 className="text-lg font-meduim">
                Welcome To {user?.firstName}&apos;s Aotion
            </h2>
            
        </div>
    )
}