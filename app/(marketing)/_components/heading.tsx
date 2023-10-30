'use client'

import {useConvexAuth} from 'convex/react'
import Link from 'next/link'
import { Spinner } from '@/components/spinner'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SignInButton } from '@clerk/clerk-react'

export default function Heading () {
    const {isLoading , isAuthenticated} = useConvexAuth()
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">Your Ideas , Documents , & Plans , Unified . Welcome to <span className="underline">Aotin</span></h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-meduim">Aotion is the connected workspace where <br/> better , faster work happens.</h3>
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href='/documents'>
                        Enter Aotin
                        <ArrowRight className="w-4 h-4 ml-2"/>
                    </Link>
                </Button>
            )}
            {isLoading && (
                <div className='w-full flex items-center justify-center'>
                    <Spinner size='lg' />
                </div>
            )}
            {!isAuthenticated && !isLoading && (
                <>
                    <SignInButton mode='modal'>
                        <Button>
                            Get Aotion Free
                            <ArrowRight className='h-4 w-4 ml-2'/>
                        </Button>
                    </SignInButton>
                </>
            )}
        </div>
    )
}