"use client";

import useImageUpload, { Image as ImageType } from "@/app/hooks/useImageUpload";
import { imageSchema, ImageValues } from "@/app/lib/validation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export default function Upload() {

    const form = useForm<ImageValues>({
        resolver: zodResolver(imageSchema),
        defaultValues: {
            title: "",
            description: "",
            category: ""
        }
    });

    const {
        startUpload,
        images,
        isUploading,
        uploadProgress,
        removeImage,
        reset: resetImageUpload
    } = useImageUpload();

    return (
        <div className="p-5 space-y-5">
            <UploadedImagePreview
                images={images}
            />
            <ImageInputButton
                onImageSelected={startUpload}
                disabled={false}
                isUploading={isUploading}
                uploadProgress={uploadProgress || 0}
            />
            <Form {...form}>
                <form className="space-y-3">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. A Supercar" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="e.g. A Pagani Huayra on a mountain with doors opened" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}

interface ImageInputButtonProps {
    onImageSelected: (file: File[]) => void;
    disabled: boolean;
    isUploading: boolean;
    uploadProgress: number;
}

function ImageInputButton({
    onImageSelected,
    disabled,
    isUploading,
    uploadProgress
}: ImageInputButtonProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full space-y-5">
            <div className="flex items-center gap-3">
                <Button
                    variant="secondary"
                    className="transition-colors hover:bg-card hover:cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                >
                    Choose image
                    <PlusCircle size={20} />
                </Button>
                {isUploading && (
                    <>
                        <LoaderCircle className="size-5 animate-spin" />
                        <span className="text-sm">
                            {uploadProgress} %
                        </span>
                    </>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden sr-only"
                onChange={(e) => {
                    const images = Array.from(e.target.files || []);

                    if (images) {
                        onImageSelected(images);

                    }
                }}
            />
        </div>
    );
}

interface UploadedImagePreviewProps {
    images: ImageType[];
}

function UploadedImagePreview({
    images
}: UploadedImagePreviewProps) {

    const image = images?.length
        ? images[0].file
        : undefined;

    if (image) {

        const src = URL.createObjectURL(image);
        console.log("SRCCCC", src);

        return (
            <Image
                src={src}
                alt="Preview"
                width={100}
                height={100}
                className="max-h-[600px] object-cover rounded-2xl size-fit"
            />
        );
    }
}