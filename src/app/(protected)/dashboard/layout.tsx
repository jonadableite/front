"use client"

import "@/styles/globals.css";
import { Fragment, ReactNode, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";

import { useTheme } from "@/components/ThemeProvider";



export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (

    <div className={`flex h-full min-h-screen bg-slate-50 dark:bg-darkBlue `}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1">
        <NavBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} onThemeToggle={handleThemeToggle} theme={theme} />
        <div className="flex-1">

          {children}</div>
      </div>
    </div>


  );
}


