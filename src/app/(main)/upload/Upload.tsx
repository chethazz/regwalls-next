"use client";

import { imageSchema, ImageValues } from "@/app/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
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

    return (
        <div className="p-5 space-y-5">
            <ImageInput />
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

function ImageInput() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full">
            <input type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden sr-only"
            />
            <button
                type="button"
                onClick={() => { }}
                className="relative block group"
            >
                <div className="w-full rounded-2xl overflow-hidden relative max-h-[700px]">
                    <Image
                        src={backgroundImage}
                        alt="Image"
                        className="object-cover"
                    />
                    <span className="absolute flex bg-primary/60 top-[50%] p-1 rounded-2xl left-[50%] items-center justify-center -translate-x-1/2 -translate-y-1/2">
                        <PlusCircle className="text-secondary/60" size={56} />
                    </span>
                </div>
            </button>
        </div>
    );
}