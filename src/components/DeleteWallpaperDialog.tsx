import { deleteWallpaper } from "@/app/(main)/wallpapers/actions";
import { WallpaperData } from "@/app/lib/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface DeleteWallpaperDialogProps {
    wallpaper: WallpaperData;
    open: boolean;
    onClose: () => void;
}

export default function DeleteWallpaperDialog({
    wallpaper,
    open,
    onClose
}: DeleteWallpaperDialogProps) {

    async function onDelete(id: string) {
        await deleteWallpaper(id);
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Delete wallpaper?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this wallpaper? This action can&apos;t be undone
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => onDelete(wallpaper.id)}
                    >
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}