import type { Metadata } from "next";
import { Archivo } from 'next/font/google'
import "./globals.css";
import { Toaster } from "sonner";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const appName = process.env.APP_NAME
const appDescription = process.env.APP_DESCRIPTION
const appLang = process.env.APP_LANG

export const metadata: Metadata = {
  title: appName,
  description: appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={appLang}>
      <body
        className={`${archivo.variable} antialiased min-h-screen flex flex-col justify-between overflow-x-hidden`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
