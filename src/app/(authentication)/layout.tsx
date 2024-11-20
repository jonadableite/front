// "use client"
// import { Inter } from "next/font/google";
// import "@/globals.css";
// import { Fragment, ReactNode, useState, useEffect } from "react";
// import NavBar from "@/components/NavBar";
// import type { UserType } from "@/types";
// import Sidebar from "@/components/Sidebar";
// import { getUserLogged } from "@/repository/users/getUserLogged";
// import { useTheme } from "@/components/ThemeProvider";
// import { ThemeProvider } from "@/components/ThemeProvider";

// const inter = Inter({ subsets: ["latin"] });

// export default function Layout({ children }: { children: ReactNode }) {
//   const { theme, toggleTheme } = useTheme();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [userData, setUserData] = useState<UserType | null>(null);

//   useEffect(() => {
//     getUserLogged()
//       .then((userData) => {
//         setUserData(userData);
//       })
//       .catch((error) => {
//         console.error("Erro ao obter dados do usuário:", error);
//       });
//   }, []);

//   useEffect(() => {
//     document.documentElement.className = theme;
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };
//   const handleThemeToggle = () => {
//     toggleTheme();
//   };

//   return (
//     <html lang="en">
//       <body className={`${inter.className} ${theme === "dark" ? "dark" : ""}`}>
//         <ThemeProvider>
//           <div className={`flex h-full min-h-screen ${theme === 'dark' ? 'bg-neutral-800/30' : 'bg-slate-50'}`}>
//             <Sidebar isOpen={isSidebarOpen} />
//             <div className="flex-1">
//               <NavBar
//                 toggleSidebar={toggleSidebar}
//                 isOpen={isSidebarOpen}
//                 //onThemeToggle={handleThemeToggle}
//                 theme={theme}
//               />
//               <div className="flex-1">{children}</div>
//             </div>
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }



import "../../styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";


import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <ThemeProvider>
  
                {children}
            
        </ThemeProvider>
       
        </body>
    </html>
  );
}


