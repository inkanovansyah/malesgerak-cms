import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/providers/QueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAKNAUANG | DARI PERGOLAKAN DUNIA MENUJU STABILITAS FINANCIAL",
  description: "Berita dan analisis mendalam tentang ekonomi dan stabilitas finansial.",
  metadataBase: new URL('https://www.maknauang.com'),
  openGraph: {
    title: "MAKNAUANG | DARI PERGOLAKAN DUNIA MENUJU STABILITAS FINANCIAL",
    description: "Berita dan analisis mendalam tentang ekonomi dan stabilitas finansial.",
    type: 'website',
    locale: 'id_ID',
    siteName: 'MaknaUang',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MAKNAUANG | DARI PERGOLAKAN DUNIA MENUJU STABILITAS FINANCIAL",
    description: "Berita dan analisis mendalam tentang ekonomi dan stabilitas finansial.",
    images: ['/twitter-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
