import avatarPlaceholder from '@/assets/avatarPlaceholder.png';
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UserAvatarProps {
    avatarUrl: string | null | undefined;
    size?: number;
    className?: string;
}

export default function UserAvatar({
    avatarUrl,
    size,
    className
}: UserAvatarProps) {
    return (
        <Image
            src={avatarUrl || avatarPlaceholder}
            alt="User Avatar"
            width={size || 40}
            height={size || 40}
            className={cn("aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
                className
            )}
        />
    );
}