"use client";

import { Fragment, useState, useEffect } from "react";
import { useTheme } from "../ThemeProvider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaReply,
  FaSun,
  FaMoon,
  FaUser,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import type { UserType } from "@/types";
import { destroyCookie } from "nookies";
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action";
import { IUser } from "@/interfaces";
import Link from "next/link";


type LoginButtonType = {
  load: boolean;
};

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  onThemeToggle: () => void;
  theme: string;
}

export default function SliderButton() {


  const [userData, setUserData] = useState<UserType | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClientAuthenticatedAction();
        setUserData(data as unknown as UserType);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    }

    fetchData();
  }, []);
  const userName = userData && userData.name ? userData.name : '';

  const [isDropdownUserOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownUserOpen);
  };
  //console.log(userData, "aspectos");
  const handleLogout = () => {
    destroyCookie(undefined, "acl1");
    destroyCookie(undefined, "acl0");
    router.replace("/login");
  };

  return (
    <div className="relative inline-block text-left">
      <div className="relative left-0 p-2">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center justify-center p-2 w-10 h-10 text-sm font-medium text-white hover:text-neutral-700 focus:outline-none rounded-full"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <FaUser size={18} />
        </button>
      </div>

      {isDropdownUserOpen && (
        <div
          style={{ marginRight: "10px!important" }}
          className="w-auto min-w-44 z-40 absolute top-16 -right-16 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-darkBlue dark:divide-gray-600"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li className="flex flex-row justify-center items-center hover:bg-gray-100 dark:hover:bg-darkBlue gap-2">
              <span className="ml-2 flex justify-center items-center text-white  text-sm font-bold  w-[30px] h-[30px] dark:bg-rose-700 bg-rose-700 rounded-full">
                {userData && userData.name.substr(0, 2).toUpperCase()}
              </span>
              <div className="flex flex-col py-4">
                <span className="flex flex-row gap-2 px-4  py-1 text-xs">
                  {userData && userData.name.split(" ")[0]}
                </span>
                <span className="flex flex-row gap-2 px-4  py-1 text-xs">
                  {userData?.email.substr(0, 25)}
                </span>
              </div>
            </li>

            <li>
              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBlue dark:hover:text-white">
                Company
              </span>
              <span className="px-4 py-2 text-[10px] dark:text-gray-300  text-gray-500">
                {userData && userData.profile === "master"
                  ? "Administrador"
                  : "Empreendimento"}
              </span>
            </li>
            <li>
              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBlue dark:hover:text-white">
                Conta
              </span>
              <span className="flex flex-row gap-2 text-xs   text-rose-700  px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBlue">
                <FaHome size={15} /> {userData?.company?.name}
              </span>
            </li>
          </ul>

          <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkBlue dark:hover:text-white">
            <button

              onClick={handleLogout}
              className="dark:text-white text-sm text-rose-700 rounded-md mb-1 py-3  pl-2 hover:bg-gray-100 dark:hover:bg-darkBlue w-full flex items-center transition-all duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
