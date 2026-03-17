"use client";

import { Eye } from "lucide-react";

interface ViewCounterProps {
    views: number;
}

export function ViewCounter({ views }: ViewCounterProps) {
    return (
        <div className="flex items-center gap-1.5 text-muted-foreground">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
                {views.toLocaleString()}
            </span>
        </div>
    );
}
