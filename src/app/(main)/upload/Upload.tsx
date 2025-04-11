"use client";

import useImageUpload, { Image as ImageType } from "@/app/hooks/useImageUpload";
import { imageSchema, ImageValues, UploadValues } from "@/app/lib/validation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { post } from "./actions";

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
    } = useImageUpload();

    function onSubmit(input: UploadValues) {
        post(input)
    }

    return (
        <div className="p-5 space-y-5">
            <UploadedImagePreview
                images={images}
                removeImage={removeImage}
                isUploading={isUploading}
                uploadProgress={uploadProgress || 0}
            />
            <ImageInputButton
                onImageSelected={startUpload}
                disabled={false}
            />
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="flex justify-between">
                        <Button
                            type="submit"
                            className="cursor-pointer"
                        >
                            Post
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="border cursor-pointer"
                            onClick={() => {
                                form.reset();
                                removeImage();
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

interface ImageInputButtonProps {
    onImageSelected: (file: File[]) => void;
    disabled: boolean;
}

function ImageInputButton({
    onImageSelected,
    disabled,
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
    removeImage: () => void;
    isUploading: boolean;
    uploadProgress: number;
}

function UploadedImagePreview({
    images,
    removeImage,
    isUploading,
    uploadProgress
}: UploadedImagePreviewProps) {

    const image = images?.length
        ? images[0].file
        : undefined;

    if (image) {

        const src = URL.createObjectURL(image);
        console.log("SRCCCC", src);

        return (
            <div className="relative size-fit">
                <div>
                    <Image
                        src={src}
                        alt="Preview"
                        width={100}
                        height={100}
                        className={cn(
                            "max-h-[600px] object-cover rounded-2xl size-fit",
                            isUploading && "animate-pulse"
                        )}
                    />
                    {isUploading && (
                        <div className="absolute flex p-1 rounded-full bottom-1 left-1 bg-secondary/60">
                            <LoaderCircle className="size-5 animate-spin" />
                            <span className="text-sm">
                                {uploadProgress} %
                            </span>
                        </div>
                    )}
                </div>
                <button
                    onClick={removeImage}
                    className="absolute p-1 rounded-full cursor-pointer top-2 right-2 bg-secondary/60"
                    title="Remove image"
                >
                    <X size={20} />
                </button>
            </div>
        );
    }
}