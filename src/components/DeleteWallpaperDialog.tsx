import { useDeleteWallpaperMutation } from "@/app/(main)/wallpapers/mutations";
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

    const mutation = useDeleteWallpaperMutation();

    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose();
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
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
                        onClick={() => mutation.mutate(wallpaper.id, {
                            onSuccess: onClose
                        })}
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