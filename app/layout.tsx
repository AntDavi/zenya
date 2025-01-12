import type { Metadata } from "next";
import { Kufam } from "next/font/google"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import RootProviders from "./_components/providers/RootProviders";

const kufam = Kufam({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenya",
  description: "Zenya is a modern, minimal, and accessible application for tracking your money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" className="dark" style={{ colorScheme: "dark" }}>
        <body
          className={`${kufam.className} antialiased`}
        >
          <RootProviders>
            {children}
          </RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
