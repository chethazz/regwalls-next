import { useState } from "react";
import { toast } from "sonner";
import { useUploadThing } from "../lib/uploadthing";

interface Image {
    file: File | undefined;
    imageId?: string;
    isUploading: boolean;
}

export default function useMediaUpload() {
    const [images, setImages] = useState<Image[]>([]);

    const [uploadProgress, setUploadProgress] = useState<number>();

    const { startUpload, isUploading } = useUploadThing("image", {
        onBeforeUploadBegin(files) {
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

            setImages([
                {
                    file: new File([], result.name),
                    imageId: result.serverData.id,
                    isUploading: false
                }
            ]);
        },
        onUploadError(e) {
            setImages([
                {
                    file: undefined,
                    isUploading: false
                }
            ]);
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
    }

    function reset() {
        setImages([]);
        setUploadProgress(undefined);
    }

    return {
        startUpload: handleStartUpload,
        images,
        isUploading,
        uploadProgress,
        removeImage,
        reset
    };
}