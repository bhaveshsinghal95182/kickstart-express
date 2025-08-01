import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Kickstart Express - Documentation",
  description:
    "A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
      },
    ],
  },
  openGraph: {
    title: "Kickstart Express - Documentation",
    description:
      "A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices",
    url: "https://kickstart-express.vercel.app/docs",
    siteName: "Kickstart Express",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kickstart Express Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kickstart Express - Documentation",
    description:
      "A powerful CLI tool to quickly scaffold Express.js projects with modern tooling and best practices",
    images: ["/og-image.png"],
    creator: "@bhaveshsinghal95182",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
