import { useState } from "react";
import { toast } from "sonner";
import { useUploadThing } from "../lib/uploadthing";

export interface Image {
    file: File;
    imageId?: string;
    isUploading: boolean;
}

export default function useImageUpload() {
    const [images, setImages] = useState<Image[]>([]);

    const [uploadProgress, setUploadProgress] = useState<number>();

    const { startUpload, isUploading } = useUploadThing("image", {
        onBeforeUploadBegin(files) {

            console.log("Images are this:");
            const renamedImages = files.map(file => {
                const extension = file.name.split(".").pop();
                return new File(
                    [file],
                    `image_${crypto.randomUUID()}.${extension}`,
                    {
                        type: file.type
                    }
                );
            });

            setImages(renamedImages.map(file => ({ file, isUploading: true })));

            return renamedImages;
        },
        onUploadProgress: setUploadProgress,
        onClientUploadComplete(res) {
            const result = res[0];

            setImages(prev =>
                prev.map(image => ({
                    ...image,
                    imageId: result.serverData.id,
                    isUploading: false
                }))
            );
        },
        onUploadError(e) {
            setImages([]);
            toast.error(e.message);
        },
    });

    function handleStartUpload(files: File[]) {
        if (files.length > 1) {
            toast.error("You can only upload one image");
            return;
        }
        startUpload(files);
    }

    function removeImage() {
        setImages([]);
        setUploadProgress(undefined);
    }

    return {
        startUpload: handleStartUpload,
        images,
        isUploading,
        uploadProgress,
        removeImage,
    };
}