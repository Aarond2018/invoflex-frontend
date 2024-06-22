import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RQProvider from "@/components/QueryClientProvider/RQProvider";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoFlex",
  description: "No 1. Invoicing Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RQProvider>
        <body className={`${inter.className} text-dark bg-[#F9FAFB]`}>
          {children}
          <Toaster />
        </body>
      </RQProvider>
    </html>
  );
}
