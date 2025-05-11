import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";

export const metadata: Metadata = {
    title: "NextCommerce",
    description: "NextCommerce is a full-stack e-commerce web app built with Next.js",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <NavBar />
        {children}
        </body>
        </html>
    );
}