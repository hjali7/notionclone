import { Button } from "@/components/ui/button";
import Logo from "./logo";


export default function Footer () {
    return (
        <div className="z-50 flex items-center w-full p-6 bg-background">
            <Logo />
            <div className="flex md:justify-end gap-x-2 w-full md:ml-auto justify-between items-center text-muted-foreground">
                <Button variant={"ghost"} size="sm">Privecy</Button>
                <Button variant={"ghost"} size="sm">Terms & Condition</Button>
            </div>
        </div>
    )
}