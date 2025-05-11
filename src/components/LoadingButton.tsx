import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
}

export default function LoadingButton({
    children,
    loading,
    disabled,
    className,
    ...props
}: LoadingButtonProps) {
    return (
        <Button
            disabled={loading || disabled}
            className={cn("flex items-center gap-2", className)}
            {...props}
        >
            {loading && (
                <LoaderCircle className="size-5 animate-spin" />
            )}
            {children}
        </Button>
    );
}