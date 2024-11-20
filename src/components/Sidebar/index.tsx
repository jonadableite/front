"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaRobot,
  FaSitemap,
  FaRocketchat,
  FaYoutube,
  FaBezierCurve,
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
  FaChalkboardTeacher,
} from "react-icons/fa";
import Link from "next/link";
import type { UserType } from "@/types";
import api from "@/services/api";
import { destroyCookie } from "nookies";
import { useTheme } from "../ThemeProvider";
import { GrTrigger } from "react-icons/gr";
import { SiNginxproxymanager } from "react-icons/si";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState<string | null>('/');
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getClientAuthenticatedAction();
      setUserData(data);
    };
    fetchUserData();
  }, []);

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
      className={`shadow-md hover:shodow-lg bg-gradient-to-t from-darkBlue/75 via-azuluro/30 to-darkBlue  text-white ${isOpen && isSidebarOpen ? "w-60" : "w-0"
        } flex flex-col transition-all duration-300 `}   //BG da barra do menu lateral esquedo
    >
      <div
        className="py-4 pl-4 col-span-full h-[64px] lg:h-[64px] px-4 lg:pr-8  flex items-center justify-center"
        style={{ position: "relative" }}
      >
        <img src="/assets/12045674.png" alt="Logo" className="w-40 h-auto mt-4" />
      </div>
      <div>
        <div className="p-4">
          {isOpen && (
            <>
              <div
                className="dark:bg-gray-800/15 bg-gray-100  parent-container rounded-lg py-1 pl-2 dar:hover:bg-neutral-800 w-100 flex flex-col items-start justify-start md:flex-row hover:text-zinc-600 transition-all duration-300 mb-2 "
              >
                <div className="py-4 pl-4">
                  <p className="text-[10px] dark:text-gray-300  text-gray-500">
                    {userData?.profile === "master"
                      ? "Administrador master"
                      : userData?.profile === "manager"
                        ? "Gerente"
                        : "Empreendimento"}

                  </p>
                  <p className="text-[12px] dark:text-gray-300  text-gray-500">
                    Pertence á{" "}
                    <span className="text-greenUro dark:text-greenUro font-bold">
                      {" "}
                      {userData && userData.company?.name}
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
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue hover:text-zinc-600 font-medium mb-1 py-3 pl-2 rounded-md w-full flex items-center transition-all duration-300 ${activeLink === "/" ? "text-white bg-primary" : ""
                  }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
                Home
              </Link>

              <Link
                href="/dashboard/empresa"
                onClick={() => {
                  handleLinkClick("/dashboard/empresa");
                  closeAllSubmenus();
                }}
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue hover:text-zinc-600 font-medium rounded-md mb-1 py-3 pl-2 w-full flex items-center transition-all duration-300 ${activeLink === "/dashboard/empresa" ? "text-white bg-primary" : ""
                  }`}
              >
                <FaSitemap className="mr-2 text-neutral-400" />
                Campanhas
              </Link>

              {userData && ["master", "admin"].includes(userData.profile) && (
                <>
                  <Link
                    href="https://chat.whatlead.com.br"
                    onClick={() => {
                      handleLinkClick("https://chat.whatlead.com.br");
                      closeAllSubmenus();
                    }}
                    className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3 pl-2 w-full flex items-center transition-all duration-300 ${activeLink === "/dashboard/manager" ? "text-white bg-primary" : ""
                      }`}
                  >
                    <FaRocketchat className="mr-2" />
                    Bate-Papo CRM
                  </Link>
                </>
              )}



              {/* <Link
                href="/dashboard/comando"
                onClick={() => {
                  handleLinkClick("/dashboard/comando");
                  closeAllSubmenus();
                }}
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center  transition-all duration-300 ${activeLink === "/dashboard/comando" ? "text-white bg-primary" : ""
                  }`}
              >
                <FaHome className="mr-2 text-neutral-400" />
                Comandos
              </Link> */}

              <div
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3 pl-2 w-full flex items-center cursor-pointer transition-all duration-300 ${isSubmenuOpen(4) ? "text-white bg-primary" : ""
                  }`}
                onClick={() => {
                  toggleSubmenu(4);
                  handleLinkClick("#");
                }}
              >
                <FaBezierCurve className="mr-2" />
                Gerenciador de Disparos
                <FaChevronDown className="py-1 pl-1 mr-2" />
              </div>

              {isSubmenuOpen(4) && (
                <div className="pl-0 transition ease-in-out duration-500">
                  {userData && ["master", "admin"].includes(userData.profile) && (
                    <>
                      <Link
                        href="https://flowbot.whatlead.com.br"
                        onClick={() => {
                          handleLinkClick("https://flowbot.whatlead.com.br");
                          closeAllSubmenus();
                        }}
                        className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3 pl-2 w-full flex items-center transition-all duration-300 ${activeLink === "/dashboard/manager" ? "text-white bg-primary" : ""
                          }`}
                      >
                        <FaRobot className="mr-2" />
                        Chat Bot
                      </Link>
                    </>
                  )}
                  {userData && ["master", "user", "admin"].includes(userData.profile) && (
                    <Link
                      href="/dashboard/manager/managerTrigger"
                      onClick={() => {
                        handleLinkClick("/dashboard/manager/managerTrigger");
                        closeAllSubmenus();
                      }}
                      className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3 pl-2 w-full flex items-center transition-all duration-300 ${activeLink === "/dashboard/manager/managerTrigger"
                        ? "text-white bg-primary"
                        : ""
                        }`}
                    >
                      <GrTrigger className="mr-2 text-neutral-400" />
                      Disparador
                    </Link>
                  )}
                </div>
              )}



              {/* <div
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center cursor-pointer  transition-all duration-300 
             
              ${isSubmenuOpen(3) ? "text-white bg-primary" : ""}`}
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

                </div>
              )}

              <div
                className={`text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3  pl-2 w-full flex items-center cursor-pointer  transition-all duration-300 ${isSubmenuOpen(1) ? "text-white bg-primary" : ""
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

                </div>
              )} */}

              <Link
                href="https://youtube.com/playlist?list=PLIxHNIj-Jwn1dTQdp_mnqjlJc838hWH0n&si=sPQ0HnlijRqZyq5o"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3  pl-2  w-full flex items-center"
                target="_blank"
              >
                <FaYoutube className="mr-2" />
                Instrução de uso
              </Link>

              <Link
                href="https://flowapi.whatlead.com.br/my-typebot-cb95kq7"
                target="_blank"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3  pl-2  w-full flex items-center"
              >
                <FaWhatsapp className="mr-2" />
                Suporte WhatsApp
              </Link>


              <Link
                target="_blank"
                href="https://t.me/JonadabLeite"
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue font-medium rounded-md mb-1 py-3  pl-2  w-full flex items-center"
              >
                <FaTelegram className="mr-2" />
                Suporte Telegram
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm dark:text-white text-neutral-800 hover:bg-gray-200 dark:hover:bg-darkBlue rounded-md mb-1 py-3  pl-2  w-full flex items-center transition-all duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </div >
  );
};

export default Sidebar;
