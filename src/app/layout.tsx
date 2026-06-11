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
        url: "/hero-riders.png",
        width: 1920,
        height: 1080,
        alt: "RYDR by JBDB — E-Bike Streetwear",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RYDR by JBDB — Electric Streets. Real Style.",
    description: "Streetwear born from e-bike culture. Bold drops for riders who move different.",
    images: ["/hero-riders.png"],
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
