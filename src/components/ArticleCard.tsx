"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface ArticleCardProps {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    authorSlug?: string;
    imageUrl: string;
    className?: string;
    priority?: boolean;
    variant?: "vertical" | "horizontal";
    views?: number;
}

export function ArticleCard({
    id,
    category,
    title,
    excerpt,
    author,
    authorSlug,
    date,
    imageUrl,
    className,
    priority = false,
    variant = "vertical",
    views,
}: ArticleCardProps) {
    const [isLoading, setIsLoading] = useState(true);



    if (variant === "horizontal") {
        return (
            <div className={cn("group flex flex-col md:flex-row gap-6 py-6 border-b border-border last:border-0", className)}>
                {/* Image */}
                <Link href={`/news/${id}`} className="relative aspect-video md:w-5/12 shrink-0 overflow-hidden bg-muted">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className={cn(
                            "object-cover transition-transform duration-500 group-hover:scale-105",
                            isLoading ? "opacity-0" : "opacity-100"
                        )}
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority={priority}
                        onLoad={() => setIsLoading(false)}
                    />
                    {isLoading && <Skeleton className="absolute inset-0 z-10" />}
                </Link>

                {/* Content */}
                <div className="flex flex-col justify-center gap-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-bold text-neon uppercase tracking-wider">
                            {category}
                        </span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-neon text-foreground transition-colors line-clamp-2">
                        <Link href={`/news/${id}`}>{title}</Link>
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wide mt-1">
                        <span>By {author}</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            {views ?? 3}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("group flex flex-col gap-4 mb-8", className)}>
            {/* Image */}
            <Link href={`/news/${id}`} className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className={cn(
                        "object-cover transition-transform duration-500 group-hover:scale-105",
                        isLoading ? "opacity-0" : "opacity-100"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                    onLoad={() => setIsLoading(false)}
                />
                {isLoading && <Skeleton className="absolute inset-0 z-10" />}
            </Link>

            {/* Content */}
            <div className="flex flex-col gap-3">
                {/* Category with Green Underline */}
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground underline decoration-neon underline-offset-4 decoration-2">
                        {category}
                    </span>
                </div>

                <h3 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-neon text-foreground transition-colors line-clamp-2">
                    <Link href={`/news/${id}`}>{title}</Link>
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-3">
                    {excerpt}
                </p>

                {/* Metadata with Avatar */}
                <div className="mt-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <div className="h-6 w-6 rounded-full bg-muted overflow-hidden relative">
                        {/* Placeholder Avatar */}
                        <Image
                            src={`https://ui-avatars.com/api/?name=${author}&background=random`}
                            alt={author}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-foreground">{author}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ArticleCardSkeleton({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) {
    if (variant === "horizontal") {
        return (
            <div className="flex flex-col md:flex-row gap-6 py-6 border-b border-border last:border-0 w-full animate-pulse">
                {/* Image Skeleton */}
                <div className="aspect-video md:w-5/12 shrink-0 bg-muted/50 rounded-sm" />

                {/* Content Skeleton */}
                <div className="flex flex-col justify-center gap-3 w-full">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-20 bg-muted/50 rounded-sm" />
                        <div className="h-3 w-2 bg-muted/50 rounded-full" />
                        <div className="h-3 w-24 bg-muted/50 rounded-sm" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-6 w-3/4 bg-muted/50 rounded-sm" />
                        <div className="h-6 w-1/2 bg-muted/50 rounded-sm" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-3 w-full bg-muted/50 rounded-sm" />
                        <div className="h-3 w-5/6 bg-muted/50 rounded-sm" />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-3 w-32 bg-muted/50 rounded-sm" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 mb-8 w-full animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-video w-full bg-muted/50 rounded-sm" />

            {/* Content Skeleton */}
            <div className="flex flex-col gap-3">
                {/* Category */}
                <div className="h-3 w-24 bg-muted/50 rounded-sm" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-6 w-full bg-muted/50 rounded-sm" />
                    <div className="h-6 w-2/3 bg-muted/50 rounded-sm" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-muted/50 rounded-sm" />
                    <div className="h-4 w-5/6 bg-muted/50 rounded-sm" />
                    <div className="h-4 w-4/6 bg-muted/50 rounded-sm" />
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 mt-2">
                    <div className="h-6 w-6 rounded-full bg-muted/50" />
                    <div className="h-3 w-32 bg-muted/50 rounded-sm" />
                </div>
            </div>
        </div>
    );
}
