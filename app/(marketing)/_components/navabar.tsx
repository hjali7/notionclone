'use client'

import {useConvexAuth} from 'convex/react'
import {SignInButton, UserButton} from '@clerk/clerk-react'

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from '@/components/ui/button'

import Logo from "./logo"
import { Spinner } from '@/components/spinner'
import Link from 'next/link'

export default function NavBar () {
    const { isAuthenticated , isLoading } = useConvexAuth()
    console.log(isAuthenticated);
    
    const scrolled = useScrollTop()
    return (
        <div className={cn('z-50 bg-background  fixed top-0 items-center w-full p-6 flex', scrolled && 'border-b shadow-sm')}>
            <Logo />
            <div className="md:justify-end md:ml-auto flex justify-between gap-x-2 w-full items-center">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode='modal'>
                            <Button variant={'ghost'} size={'sm'}>
                                Log In
                            </Button>
                        </SignInButton>
                        <SignInButton mode='modal'>
                            <Button variant={'default'} size={'sm'}>
                                Get Aotion Free
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant='ghost' size='sm' asChild >
                            <Link href='/documents' >
                                Enter Aotion
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}