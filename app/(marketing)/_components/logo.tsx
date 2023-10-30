import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets : ['latin'],
    weight : ['400' , '600']
})

export default function Logo () {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image src='/logo.svg' alt='Aotion' width={40} height={40} className="dark:hidden" />
            <Image src='/logo-dark.svg' alt='Aotion' width={40} height={40} className="hidden dark:block" />
            <p className={cn('font-semibold' , font.className)}>Aotion</p>
        </div>
    )
}