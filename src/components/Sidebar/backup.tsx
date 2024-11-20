"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaWhatsapp,
  FaTelegram,
  FaBars,
  FaTimes,
  FaServer,
  FaChartBar,
  FaRegFilePdf,
  FaChevronDown,
} from "react-icons/fa";
import Link from "next/link";
import type { UserType } from "@/types";
import api from "@/services/api";
import { destroyCookie } from "nookies";
import { useTheme } from "../ThemeProvider";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";

const Sidebar =  ({
  isOpen,

}: {
  isOpen: boolean;

}) => {
 
  const router = useRouter();
 const userData = getClientAuthenticatedAction();
// console.log(userData,'no slider')
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState<string | null>('/');
  const { toggleTheme } = useTheme();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const toggleSubmenu = (submenuId: number) => {
    setActiveSubmenu((prevSubmenu) =>
      prevSubmenu === submenuId ? null : submenuId
    );
  };

  const isSubmenuOpen = (submenuId: number) => activeSubmenu === submenuId;

  const closeAllSubmenus = () => {
    setActiveSubmenu(null);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 950;

      if (isMobile) {
        closeAllSubmenus();
        setIsSidebarOpen(false);
      } else if (isOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleLogout = () => {
    destroyCookie(undefined, "acl1");
    destroyCookie(undefined, "acl0");
    router.replace("/login");
  };

  return (
    <div
      className={`dark:bg-neutral-800 bg-white  text-white ${
        isOpen && isSidebarOpen ? "w-60" : "w-0"
      } flex flex-col transition-all duration-300 `}
    >
      <div
        className="py-4 pl-4 col-span-full h-[64px] lg:h-[64px] px-4 lg:pr-8  border border-transparent border-b-stone-700 flex items-center justify-center"
        style={{ position: "relative" }}
      >
        <img src="/assets/ivera.svg" alt="Logo" className="w-48 h-7" />
      </div>
      <div>
        <div className="p-4">


          {isOpen && (
            <>
              {/* dark:bg-neutral-800/30 parent-container rounded-lg py-5 pl-2  hover:bg-neutral-800 w-full md:w-100 flex flex-col md:flex-row items-start justify-start hover:text-zinc-600 transition-all duration-300 m-4 */}
              <div
                className="dark:bg-gray-800/15 bg-gray-100 hover:bg-gray-200 parent-container rounded-lg py-1 pl-2 dar:hover:bg-neutral-800 w-100 flex flex-col items-start justify-start md:flex-row hover:text-zinc-600 transition-all duration-300 mb-2 "
                //  style={{ background: "rgb(0 0 0 / 30%)" }}
              >
                {/* <div className="w-10 py-5 flex items-center justify-center">
                  <img
                    src="https://app.rocketseat.com.br/_next/image?url=https%3A%2F%2Fxesque.rocketseat.dev%2Fplatform%2F1701448027187.png&w=640&q=100"
                    alt="Logo"
                    className="h-15 w-auto"
                  />
                </div> */}
                <div className="py-4 pl-4">
                  {/* <span className=" text-sm dark:text-gray-300  text-gray-500">
                    {userData && userData.name}
                  </span> */}
                  <p className="text-[10px] dark:text-gray-300  text-gray-500">
                    {/* {userData?.profile === "master"
                      ? "Administrador"
                      : "Empreendimento"} */}
                  </p>
                  <p className="text-[12px] dark:text-gray-300  text-gray-500">
                    Pertence á{" "}
                    <span className="text-purpleivera dark:text-rose-700 font-bold">
                      {" "}
                      {/* {userData && userData.company?.name} */}
                    </span>
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard"
                onClick={() => {
                  closeAllSubmenus();
                  handleLinkClick("/");
                }}
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-zinc-600 font-medium mb-1 py-3  pl-2  rounded-md w-full flex items-center  transition-all duration-300 ${
                  activeLink === "/" ? "text-white dark:bg-rose-700 bg-purpleivera" : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
                Home
              </Link>

              {/* {userData && userData.profile === "master" &&(
            <div
              className={`dark:text-white text-neutral-800 font-medium py-4 pl-4 w-full flex items-center cursor-pointer hover:bg-zinc-800 transition-all duration-300 ${
                isSubmenuOpen(2) ? "text-white dark:bg-rose-700 bg-rose-700" : "" 
              } ${
                activeLink === "/" ? "text-gray-700 dark:bg-rose-700" : ""
              }`}
              onClick={() => {
                toggleSubmenu(2);
                handleLinkClick("/app/admin");
              }}
            >
              <FaServer className="mr-2" />
              Administrativo
              <FaChevronDown className="py-1 pl-1 mr-2" />
            </div>
          )}

          {isSubmenuOpen(2) && (
            <div className="pl-0 transition ease-in-out duration-500">
               <Link
                href="/app/admin/investimentos"
                onClick={() => {
                  handleLinkClick("/app/admin/investimentos");
                  closeAllSubmenus();
                }}
                className={`dark:text-white text-neutral-800 font-medium py-4 pl-6 w-full flex items-center hover:bg-zinc-800 transition-all duration-300 ${
                  activeLink === "/app/admin/investimentos"
                    ? "text-white dark:bg-rose-700 bg-rose-700"
                    : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
                Todos investimentos
              </Link>
              <Link
                href="/app/admin"
                onClick={() => {
                  handleLinkClick("/app/admin");
                  closeAllSubmenus();
                }}
                className={`dark:text-white text-neutral-800 font-medium py-4 pl-6 w-full flex items-center hover:bg-zinc-800 transition-all duration-300 ${
                  activeLink === "/app/admin"
                    ? "text-white dark:bg-rose-700 bg-rose-700"
                    : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
                Analise de investimentos
              </Link>
              <Link
                href="/app/admin/users"
                onClick={() => {
                  handleLinkClick("/app/users");
                  closeAllSubmenus();
                }}
                className={`dark:text-white text-neutral-800 font-medium py-4 pl-6 w-full flex items-center hover:bg-zinc-800 transition-all duration-300 ${
                  activeLink === "/app/users"
                    ? "text-white dark:bg-rose-700 bg-rose-700"
                    : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
                Todos usuarios
              </Link>
            </div>
          )}  */}

              <Link
                href="/dashboard/empresa"
                onClick={() => {
                  handleLinkClick("/dashboard/empresa");
                  closeAllSubmenus();
                }}
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-zinc-600 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center  transition-all duration-300 ${
                  activeLink === "/dashboard/empresa" ? "text-white dark:bg-rose-700 bg-purpleivera" : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
               Bots
              </Link>
              {userData && userData?.profile === "master" && (
              <Link
                href="/dashboard/comando"
                onClick={() => {
                  handleLinkClick("/dashboard/comando");
                  closeAllSubmenus();
                }}
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center  transition-all duration-300 ${
                  activeLink === "/dashboard/comando" ? "text-white dark:bg-rose-700 bg-purpleivera" : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
               Comandos
              </Link>
             )}
              {userData && userData.profile === "master" && ( 
              <Link
                href="/dashboard/manager"
                onClick={() => {
                  handleLinkClick("/dashboard/manager");
                  closeAllSubmenus();
                }}
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center transition-all duration-300 ${
                  activeLink === "/dashboard/manager" ? "text-white dark:bg-rose-700 bg-purpleivera" : ""
                }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
               Manager
              </Link>
               )} 
              <div
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center cursor-pointer  transition-all duration-300 
             
              ${isSubmenuOpen(3) ? "text-white dark:bg-rose-700 bg-purpleivera" : ""}`}
                onClick={() => {
                  toggleSubmenu(3);
                  handleLinkClick("/app/empresa");
                }}
              >
                <FaServer className="mr-2" />
                Companies
                <FaChevronDown className="py-1 pl-1 mr-2" />
              </div>

              {isSubmenuOpen(3) && (
                <div className="pl-0 transition ease-in-out duration-500">
                  <Link
                    href="/dashboard/admin/users"
                    onClick={() => {
                      handleLinkClick("/dashboard/users");
                      closeAllSubmenus();
                    }}
                    className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center  transition-all duration-300 ${
                      activeLink === "/dashboard/users"
                        ? "text-white dark:bg-rose-700 bg-purpleivera"
                        : ""
                    }`}
                  >
                    <FaHome className="mr-2 text-neutral-400" />
                    Todos usuarios
                  </Link>
                </div>
              )}

              <div
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center cursor-pointer  transition-all duration-300 ${
                  isSubmenuOpen(1) ? "text-white dark:bg-rose-700 bg-purpleivera" : ""
                }`}
                onClick={() => {
                  toggleSubmenu(1);
                  handleLinkClick("/app/accout");
                }}
              >
                <FaUser className="mr-2" />
                Minha Conta
                <FaChevronDown className="py-1 pl-1 mr-2" />
              </div>

              {isSubmenuOpen(1) && (
                <div className="pl-0 transition-all duration-600">
                  <Link
                    href="/dashboard/minha-conta"
                    onClick={() => {
                      handleLinkClick("/dashboard/minha-conta");
                      closeAllSubmenus();
                    }}
                    className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center  transition-all duration-300 ${
                      activeLink === "/dashboard/minha-conta"
                        ? "text-white dark:bg-rose-700 bg-purpleivera"
                        : ""
                    }`}
                  >
                    <FaHome className="mr-2 text-neutral-400" />
                    Meus investimentos
                  </Link>
                  <Link
                    href="/dashboard/minha-conta/atualizar"
                    onClick={() => {
                      handleLinkClick("/dashboard/minha-conta/atualizar");
                      closeAllSubmenus();
                    }}
                    className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center  transition-all duration-300 ${
                      activeLink === "/dashboard/minha-conta/atualizar"
                        ? "text-white dark:bg-rose-700 bg-purpleivera"
                        : ""
                    }`}
                  >
                    <FaHome className="mr-2 text-neutral-400" />
                    Configurar
                  </Link>
                </div>
              )}

              <Link
                href="/assets/intrucao_uso_aibit.pdf"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2  w-full flex items-center"
                target="_blank"
              >
                <FaRegFilePdf className="mr-2" />
                Instrução de uso
              </Link>

              <Link
                href="https://chat.whatsapp.com/FgSB6TXXvM40LjXC80y9W2?text=Olá, gostaria de tirar uma dúvida."
                target="_blank"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2  w-full flex items-center"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </Link>

              <Link
                target="_blank"
                href="https://t.me/AiBitTrade"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2  w-full flex items-center"
              >
                <FaTelegram className="mr-2" />
                Telegram Global
              </Link>
              <Link
                target="_blank"
                href=" https://t.me/+P18bK5QsLRw0ZDM5"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 font-medium rounded-md mb-1 py-3  pl-2 hover:bg-zinc-200  w-full flex items-center"
              >
                <FaTelegram className="mr-2" />
                Telegram BR
              </Link>

              <button
                //</>href="/dashboard/sair"
                onClick={handleLogout}
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-md mb-1 py-3  pl-2  w-full flex items-center transition-all duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
