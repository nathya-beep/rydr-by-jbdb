import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "RYDR by JBDB — Electric Streets. Real Style.",
  description: "Streetwear born from e-bike culture. Bold drops for riders who move different.",
  metadataBase: new URL("https://rydr-by-jbdb.vercel.app"),
  openGraph: {
    title: "RYDR by JBDB — Electric Streets. Real Style.",
    description: "Streetwear born from e-bike culture. Bold drops for riders who move different.",
    url: "https://rydr-by-jbdb.vercel.app",
    siteName: "RYDR by JBDB",
    images: [
      {
        url: "/logo-color.png",
        width: 1336,
        height: 784,
        alt: "RYDR by JBDB",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RYDR by JBDB — Electric Streets. Real Style.",
    description: "Streetwear born from e-bike culture. Bold drops for riders who move different.",
    images: ["/logo-color.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0d0d0d]">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
