import { Loader } from "lucide-react";

import { cva , type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
    'text-muted-foreground animate-spin',
    {
        variants : {
            size : {
                default : 'h-6 w-6',
                sm: 'h-2 w-2',
                lg : 'h-6 w-6', 
                icon : 'h-10 w-10'
            } ,
            intent : {
                primary: [
                "text-white",
                "border-transparent",
              ],
            }
        },
        defaultVariants : {
            size : "default",
            intent : 'primary'
        }
    }
)

interface SpinnerProps extends VariantProps <typeof spinnerVariants > {}

export const Spinner = ({size}:SpinnerProps) => {
    return (
        <Loader className={cn(spinnerVariants({size}))} />
    )
}