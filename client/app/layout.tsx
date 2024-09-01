import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexi Mart",
  description: "Built with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body>
      <main>{children}</main>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
