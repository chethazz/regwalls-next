import { WallpaperData } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface WallpaperCardProps {
    wallpaper: WallpaperData;
}

export function WallpaperCard({
    wallpaper,
}: WallpaperCardProps) {

    if (!wallpaper.image) return null;

    return (
        <Link
            href={`/wallpaper/${wallpaper.id}`}
        >
            <Card className="h-full gap-4 pt-0 pb-4 overflow-hidden">
                <CardContent className="relative h-64 overflow-hidden">
                    <Image
                        src={wallpaper.image.imageUrl}
                        alt={wallpaper.title}
                        fill
                        className="object-cover"
                    />
                </CardContent>
                <CardHeader className="px-4">
                    <CardTitle>{wallpaper.title}</CardTitle>
                    {wallpaper.description && (
                        <CardDescription
                            dangerouslySetInnerHTML={{ __html: wallpaper.description }}
                            className="line-clamp-2"
                        />
                    )}
                </CardHeader>
            </Card>
        </Link>
    );
}