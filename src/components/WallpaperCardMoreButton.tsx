import { WallpaperData } from "@/app/lib/types";
import { Ellipsis, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface WallpaperCardMoreButtonProps {
    wallpaper: WallpaperData;
    className?: string;
}

export default function WallpaperCardMoreButton({
    wallpaper,
    className
}: WallpaperCardMoreButtonProps) {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className={className}>
                        <Ellipsis className="size-5 cursor-pointer" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <span className="flex items-center gap-3 text-destructive">
                            <Trash className="size-4" />
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}