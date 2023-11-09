'use client'

import Image from "next/image";

import { useMutation } from "convex/react";
import {api} from '@/convex/_generated/api'

import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

export default function DocumentsPage () {

    const {user} = useUser()
    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({title : 'Untitle'})

        toast.promise(promise , {
            loading : 'Creating a new note ...' ,
            success : 'new note create!' ,
            error : 'Faild to create new note.'
        })
    }
    
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">

            <Image height='300' width='300' alt="empty"  src='/empty.png' className="dark:hidden" />
            <Image height='300' width='300'  alt="empty" src='/empty-dark.png' className="hidden dark:block" />

            <h2 className="text-lg font-meduim">
                Welcome To {user?.firstName}&apos;s Aotion
            </h2>

            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create new note
            </Button>
            
        </div>
    )
}