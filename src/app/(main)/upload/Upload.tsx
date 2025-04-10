"use client";

import useImageUpload from "@/app/hooks/useImageUpload";
import { imageSchema, ImageValues } from "@/app/lib/validation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import backgroundImage from "../../../../public/background-light.jpg";

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
            <ImageInputButton
                onImageSelected={startUpload}
                disabled={false}
                removeImage={removeImage}
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
    removeImage: () => void;
}

function ImageInputButton({
    onImageSelected,
    disabled,
    removeImage
}: ImageInputButtonProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full space-y-5">
            <Image
                src={backgroundImage}
                alt="Preview"
                className="max-h-[600px] object-cover rounded-2xl"
            />
            <div className="flex gap-3">
                <Button
                    variant="secondary"
                    className="transition-colors hover:bg-card hover:cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={disabled}
                >
                    Choose image
                    <PlusCircle size={20} />
                </Button>
                <Button
                    variant="secondary"
                    className="transition-colors hover:bg-card hover:cursor-pointer"
                    onClick={() => removeImage()}
                >
                    Remove image
                    <MinusCircle size={20} />
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
                        e.target.value = "";
                    }
                }}
            />
        </div>
    );
}