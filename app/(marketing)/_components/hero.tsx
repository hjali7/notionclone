
import Image from "next/image"
export default function Hero () {
    return(
        <div className="flex flex-col justify-center items-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:h-[350px] sm:w-[350px] md:w-[400px] md:h-[400px]">
                    <Image fill src='/documents.png' alt="documents" className="object-contain dark:hidden" />
                    <Image fill src='/documents-dark.png' alt="documents" className="object-contain hidden dark:block" />
                </div>
                <div className="relative hidden md:block w-[400px] h-[400px]">
                    <Image src='/reading.png' alt="reading" className="object-contain dark:hidden" fill />
                    <Image src='/reading-dark.png' alt="reading" className="object-contain hidden dark:block" fill />
                </div>
            </div>
        </div>
    )
}