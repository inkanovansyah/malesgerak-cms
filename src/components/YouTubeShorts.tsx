"use client";

import { useState, useCallback } from "react";
import { Youtube, Eye, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    views: string;
    publishedAt: string;
}

interface YouTubeShortsProps {
    channelId?: string;
    limit?: number;
}

// Sample data - ganti dengan data asli dari API YouTube @maknauang-h2l nanti
const SAMPLE_SHORTS: Video[] = [
    {
        id: "short1",
        title: "Tips Investasi Pemula 2024",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "125K",
        publishedAt: "2 hari lalu"
    },
    {
        id: "short2",
        title: "Cara Hemat Uang Belanja",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "98K",
        publishedAt: "5 hari lalu"
    },
    {
        id: "short3",
        title: "Strategi Tabungan Efektif",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "76K",
        publishedAt: "1 minggu lalu"
    },
    {
        id: "short4",
        title: "Investasi vs Trading Bedanya?",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "65K",
        publishedAt: "2 minggu lalu"
    },
    {
        id: "short5",
        title: "5 Aplikasi Keuangan Terbaik",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "54K",
        publishedAt: "3 minggu lalu"
    },
    {
        id: "short6",
        title: "Cara Mengatur Keuangan Bulanan",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "48K",
        publishedAt: "1 bulan lalu"
    },
    {
        id: "short7",
        title: "Tips Cepat Kaya Halal",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "42K",
        publishedAt: "1 bulan lalu"
    },
    {
        id: "short8",
        title: "Review Aplikasi Saham",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "38K",
        publishedAt: "2 bulan lalu"
    },
    {
        id: "short9",
        title: "Cara Daftar IPO Saham",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "35K",
        publishedAt: "2 bulan lalu"
    },
    {
        id: "short10",
        title: "Analisa Pasar Saham Hari Ini",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        views: "32K",
        publishedAt: "3 bulan lalu"
    }
];

export function YouTubeShorts({ channelId = "@maknauang-h2l", limit = 10 }: YouTubeShortsProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [videos, setVideos] = useState<Video[]>(SAMPLE_SHORTS.slice(0, limit));

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 4 },
        }
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const handleVideoClick = (video: Video) => {
        setSelectedVideo(video);
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    return (
        <>
            <section className="relative border-y border-border py-8 bg-background overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 relative group">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1">
                                YouTube Shorts
                            </h2>
                            <p className="text-muted-foreground text-xs">
                                Video pendek dari <span className="text-neon font-bold">@maknauang-h2l</span>
                            </p>
                        </div>
                        <a
                            href={`https://www.youtube.com/@${channelId}/shorts`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 bg-neon text-black px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors rounded-sm"
                        >
                            <Youtube className="w-4 h-4" />
                            Subscribe
                        </a>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-neon text-black hidden md:flex items-center justify-center -ml-4 shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-neon text-black hidden md:flex items-center justify-center -mr-4 shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className="min-w-0 flex-[0_0_50%] sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] pl-4 group/shorts cursor-pointer select-none"
                                    onClick={() => handleVideoClick(video)}
                                >
                                    <div className="relative aspect-[9/16] w-full bg-muted rounded-lg overflow-hidden border-2 border-border hover:border-neon transition-all duration-300">
                                        {/* Thumbnail */}
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover/shorts:scale-105 transition-transform duration-300"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/shorts:opacity-100 transition-opacity duration-300" />

                                        {/* Play Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/shorts:opacity-100 transition-opacity duration-300">
                                            <div className="w-12 h-12 bg-neon/90 rounded-full flex items-center justify-center">
                                                <Youtube className="w-6 h-6 text-black" />
                                            </div>
                                        </div>

                                        {/* Video Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <h3 className="text-white font-bold text-sm uppercase tracking-tight mb-2 line-clamp-2 group-hover/shorts:text-neon transition-colors">
                                                {video.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-white/70 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="w-3 h-3" />
                                                    <span>{video.views}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{video.publishedAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={handleCloseModal}
                >
                    <div
                        className="relative w-full max-w-md aspect-[9/16] bg-black rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-neon text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            ✕
                        </button>

                        {/* YouTube Embed */}
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                            title={selectedVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
}
