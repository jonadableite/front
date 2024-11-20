

"use client"
import { Fragment, ReactNode, useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "@/styles/globalsfront.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <ThemeProvider>
        <body className={GeistSans.className}>

          {children}


        </body>
      </ThemeProvider>
    </html>
  );
}

