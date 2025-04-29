import { useRef } from "react";
import { Cropper, CropperRef } from 'react-advanced-cropper';
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface CropImageDialogProps {
    src: string;
    cropAspectRatio: number;
    onCropped: (blob: Blob | null) => void;
    onClose: () => void;
}

export default function CropImageDialog({
    src,
    cropAspectRatio,
    onCropped,
    onClose
}: CropImageDialogProps) {

    const cropperRef = useRef<CropperRef>(null);

    function crop() {
        const cropper = cropperRef.current?.getCanvas();
        if (!cropper) return;

        cropper.toBlob((blob) => onCropped(blob), "image/webp");
        onClose();
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crop image</DialogTitle>
                </DialogHeader>
                <Cropper
                    src={src}
                    stencilProps={{
                        aspectRatio: cropAspectRatio
                    }}
                    ref={cropperRef}
                />
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={crop}>Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}