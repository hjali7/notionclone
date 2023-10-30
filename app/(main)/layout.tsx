'use client'

import { Spinner } from '@/components/spinner'
import {useConvexAuth} from 'convex/react'
import { redirect } from 'next/navigation'
import Navigation from './_components/navigation'


export default function MainLayOut ({children} : {children : React.ReactNode}) {
    const {isAuthenticated , isLoading } = useConvexAuth()
    if(isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <Spinner size='lg' />
            </div>
        )
    }else if(!isAuthenticated) {
        return redirect('/')
    }else {
        return (
            <div className="h-full flex dark:bg-[#1f1f1f] bg-background">
                <Navigation />
                <main className="flex-1 h-full overflow-y-auto">
                    {children}
                </main>
            </div>
        )
    }
    
}