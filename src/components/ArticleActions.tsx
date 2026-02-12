"use client";

import { Share2, MessageSquare, Bookmark } from "lucide-react";

interface ArticleActionsProps {
    views: number;
}

export function ArticleActions({ views }: ArticleActionsProps) {
    return (
        <div className="flex gap-4 items-center">
            {/* 
               Note: Views are currently static or passed from server. 
               We kept the Eye icon in the parent server component for simplicity, 
               but if we want to update views client-side, we can move it here.
               For now, this component handles the interactive buttons.
            */}
            <button className="p-2 hover:bg-muted rounded-full transition-colors text-foreground">
                <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors text-foreground">
                <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors text-foreground">
                <MessageSquare className="w-5 h-5" />
            </button>
        </div>
    );
}
