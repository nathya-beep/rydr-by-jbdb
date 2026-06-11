import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "RYDR by JBDB — Electric Streets. Real Style.",
  description: "Streetwear born from e-bike culture. Bold drops for riders who move different.",
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
