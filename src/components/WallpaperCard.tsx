import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { WallpaperData } from "@/app/lib/types";

interface WallpaperCardProps {
    wallpaper: WallpaperData;
}

export function WallpaperCard({
    wallpaper,
}: WallpaperCardProps) {


    console.log(wallpaper.imageUrl);

    return (
        <Link
            href={`/wallpaper/${wallpaper.id}`}
        >
            <Card>
                <CardContent className="relative h-64 overflow-hidden p-0">
                    <Image
                        src={wallpaper.imageUrl}
                        alt={wallpaper.title || "Untitled"}
                        fill
                        className="object-cover"
                    />
                </CardContent>
                <CardHeader>
                    <CardTitle>{wallpaper.user?.displayName}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}