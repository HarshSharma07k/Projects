import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ExitModal } from "@/components/exit-modal";

const font = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluently",
  description: "A language learning app for lifelong learners",
  icons: {
    icon: "/mascot.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${font.variable} ${font.variable} antialiased`}
        >
          <Toaster />
          <ExitModal />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
