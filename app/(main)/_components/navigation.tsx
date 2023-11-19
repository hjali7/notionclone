'use client'

import { ElementRef, useRef, useState , useEffect} from "react"
import { usePathname, useRouter } from "next/navigation"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import { useMediaQuery } from "usehooks-ts"

import {Popover , PopoverContent , PopoverTrigger} from '@/components/ui/popover'
import { cn } from "@/lib/utils"
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react"

import UserItem from "./useritem"
import Item from "./item"
import DocumentList from "./document-list"

import { toast } from "sonner"

export default function Navigation () {
    const router = useRouter()
    const create = useMutation(api.documents.create)

    const pathname = usePathname()
    const isMobile = useMediaQuery('(max-width: 768px)')
    
    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<'aside'>>(null)
    const navbarRef = useRef<ElementRef<'div'>>(null)
    
    const [ isResetting , setIsResetting ] = useState(false)
    const [ isCollapsed , setIsCollapsed ] = useState(isMobile)
    
    useEffect(() => {
        if(isMobile) {
            Collapse()
        }else {
            ResetWidth()
        }
    }, [isMobile])
    useEffect(() => {
        if(isMobile) {
            Collapse()
        }
    }, [pathname , isMobile])
    const handleCreate = () => {
        const promise = create({title : 'Untitled'})
            .then(
                documentId => router.push(`/documents/${documentId}`))

        toast.promise(promise , {
            loading : 'Please Wait ...',
            success : 'New Note created!',
            error   : 'Failed to Create New Note!'
        })
    }
    const handleMouseDown = (event : React.MouseEvent<HTMLElement , MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener("mouseup" , handleMouseUp)
        isResizingRef.current = true ;
    }

    const handleMouseMove = (event : MouseEvent) => {
        if(!isResizingRef.current) return ;

        let NewSize = event.clientX

        if(NewSize > 480) {
            NewSize = 480
        }else if (NewSize < 240) {
            NewSize = 240
        }

        if(sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${NewSize}px`
            navbarRef.current.style.setProperty('left' , `${NewSize}px`)
            navbarRef.current.style.setProperty('width' , `calc(100% - ${NewSize}px)`)
        }
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup' , handleMouseUp)
        isResizingRef.current = false ;
    }

    const ResetWidth = () => {
        if(sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width =  isMobile ? " 100% ": "280px" ;
            navbarRef.current.style.setProperty('width' , isMobile ? '0' : 'calc(100%-240px)')
            navbarRef.current.style.setProperty('left' , isMobile ? '100%' : '240px')
            
            setTimeout(() => {
                setIsResetting(false)
            }, 300);
        }        
    }

    const Collapse = () => {
        if(sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = '0'
            navbarRef.current.style.setProperty('width' , '100%')
            navbarRef.current.style.setProperty('left' , '0')
            
            setTimeout(() => {
                setIsResetting(false)
            }, 300);
        }
    }
        
    return (
        <>
            <aside
             ref={sidebarRef}
             className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col z-[99999] w-60",
             isMobile && 'w-0',
             isResetting && 'transition-all ease-in-out duration-300'
             )}>
                <div role="button" onClick={Collapse} className={cn("h-6 w-6 text-muted-foreground absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-sm",
                 isMobile && 'opacity-100')}>
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                
                <div>
                    <UserItem />    
                    <Item isSearch label="search" icon={Search} onClick={()=>{}} />
                    <Item label="setting" icon={Settings} onClick={()=>{}} />
                    <Item onClick={()=>{}} label='new label' icon={PlusCircle} />
                </div>                

                <div className="mt-4">
                    <DocumentList />
                    <Item label="Add New Note" onClick={handleCreate} icon={Plus} />
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item icon={Trash} label="Trash" />
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72" side={isMobile ? 'bottom' : 'right'}>
                            <p>Trash box</p>
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                 onMouseDown={handleMouseDown}
                 onClick={ResetWidth}
                 className="opacity-0 group-hover/sidebar:opacity-100 h-full absolute w-1 bg-primary/10 transition cursor-ew-resize top-0 right-0" />
            </aside>

            <div className={cn('absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]',
             isResetting && 'transition-all ease-in-out duration-300',
             isMobile && 'left-0 w-full'
            )} ref={navbarRef} >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon role="butotn" onClick={ResetWidth} className="h-6 w-6 text-muted-foreground" />}
                </nav>
            </div>
        </>
    )
}