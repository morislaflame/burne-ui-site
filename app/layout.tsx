import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteProviders } from "@/components/site-providers";
import { THEME_MONO_FONTS_URL, THEME_SANS_FONTS_URL } from "@/lib/theme-font-links";

export const metadata: Metadata = {
  title: "Burne UI",
  description: "Modern Design System for your project on Tailwind CSS v4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-dvh antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={THEME_SANS_FONTS_URL} />
        <link rel="stylesheet" href={THEME_MONO_FONTS_URL} />
      </head>
      <body className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
        <SiteProviders>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </SiteProviders>
      </body>
    </html>
  );
}
