"use client";

import { Share2, MessageSquare, Bookmark, Check, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";

interface ArticleActionsProps {
    views: number;
    slug?: string;
    title?: string;
}

export function ArticleActions({ views, slug, title }: ArticleActionsProps) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    // Get current URL
    const getCurrentUrl = useCallback(() => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return '';
    }, []);

    // Copy link to clipboard
    const copyToClipboard = useCallback(async () => {
        const url = getCurrentUrl();
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    }, [getCurrentUrl]);

    // Share to Facebook
    const shareToFacebook = useCallback(() => {
        const url = encodeURIComponent(getCurrentUrl());
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    }, [getCurrentUrl]);

    // Share to Twitter/X
    const shareToTwitter = useCallback(() => {
        const url = encodeURIComponent(getCurrentUrl());
        const text = encodeURIComponent(title || 'Check out this article!');
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    }, [getCurrentUrl, title]);

    // Share to WhatsApp
    const shareToWhatsApp = useCallback(() => {
        const url = encodeURIComponent(getCurrentUrl());
        const text = encodeURIComponent(title || 'Check out this article!');
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    }, [getCurrentUrl, title]);

    // Native Web Share API (for mobile)
    const nativeShare = useCallback(async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || 'Article',
                    url: getCurrentUrl(),
                });
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            // Fallback: show share menu
            setShowShareMenu(!showShareMenu);
        }
    }, [title, getCurrentUrl, showShareMenu]);

    // Toggle bookmark
    const toggleBookmark = useCallback(() => {
        setBookmarked(!bookmarked);
        toast(bookmarked ? 'Removed from bookmarks' : 'Saved to bookmarks');
    }, [bookmarked]);

    return (
        <div className="flex gap-2 items-center relative">
            {/* Share Button */}
            <div className="relative">
                <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 hover:bg-muted rounded-full transition-colors text-foreground"
                    aria-label="Share"
                >
                    <Share2 className="w-5 h-5" />
                </button>

                {/* Share Dropdown Menu */}
                {showShareMenu && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowShareMenu(false)}
                        />

                        {/* Menu */}
                        <div className="absolute right-0 top-full mt-2 z-50 bg-popover border border-border rounded-lg shadow-lg p-2 min-w-[200px] animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-1">
                                {/* Copy Link */}
                                <button
                                    onClick={copyToClipboard}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <LinkIcon className="w-4 h-4" />
                                    )}
                                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                                </button>

                                {/* Facebook */}
                                <button
                                    onClick={shareToFacebook}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                                >
                                    <Facebook className="w-4 h-4 text-blue-600" />
                                    <span>Facebook</span>
                                </button>

                                {/* Twitter/X */}
                                <button
                                    onClick={shareToTwitter}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                                >
                                    <Twitter className="w-4 h-4" />
                                    <span>Twitter / X</span>
                                </button>

                                {/* WhatsApp */}
                                <button
                                    onClick={shareToWhatsApp}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                                >
                                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                    <span>WhatsApp</span>
                                </button>

                                {/* Native Share (Mobile) */}
                                {navigator.share && (
                                    <button
                                        onClick={nativeShare}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left md:hidden"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        <span>More options...</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Bookmark Button */}
            <button
                onClick={toggleBookmark}
                className="p-2 hover:bg-muted rounded-full transition-colors text-foreground"
                aria-label="Bookmark"
            >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-neon text-neon' : ''}`} />
            </button>

            {/* Comments Button (scroll to comments) */}
            <button
                onClick={() => {
                    const commentsSection = document.querySelector('#comments-section');
                    commentsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-2 hover:bg-muted rounded-full transition-colors text-foreground"
                aria-label="Comments"
            >
                <MessageSquare className="w-5 h-5" />
            </button>
        </div>
    );
}
