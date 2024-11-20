// Importações necessárias do React e de componentes externos
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaReply, FaSun, FaMoon } from "react-icons/fa";
import SliderButton from "../buttom/menuSlider"; // Importa o componente SliderButton (talvez um botão do menu)
import { useTheme } from "../ThemeProvider"; // Importa o hook useTheme para acessar o contexto de tema
import { UserType } from "@/types"; // Importa o tipo UserType
import { getClientAuthenticatedAction } from "@/actions/users/get-client-authenticated.action"; // Importa a função de ação para obter dados do cliente autenticado
import { FaBarsStaggered } from "react-icons/fa6"; // Importa o ícone FaBarsStaggered (pode ser um ícone personalizado)

// Definição das propriedades esperadas pelo Navbar
interface NavbarProps {
  toggleSidebar: () => void; // Função para alternar a barra lateral
  isOpen: boolean; // Estado para verificar se a barra lateral está aberta ou fechada
  theme: string; // Tema atual da aplicação (escuro ou claro)
  onThemeToggle: () => void // Função para alternar o tema
}

// Componente funcional Navbar que recebe as props definidas acima
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen, theme }) => {
  const [userData, setUserData] = useState<UserType | null>(null); // Estado para armazenar os dados do usuário autenticado
  const { toggleTheme } = useTheme(); // Utiliza o hook useTheme para acessar a função toggleTheme do contexto de tema

  // Efeito para carregar os dados do usuário autenticado ao montar o componente
  useEffect(() => {
    getAuthenticatedUserData();
  }, []);

  // Função assíncrona para buscar os dados do usuário autenticado
  const getAuthenticatedUserData = async () => {
    try {
      const data = await getClientAuthenticatedAction(); // Chama a função que retorna os dados do cliente autenticado
      setUserData(data); // Define os dados do usuário no estado
    } catch (error) {
      console.error("Error fetching user data:", error); // Exibe um erro caso ocorra algum problema na busca dos dados
    }
  };

  // Função para lidar com ação de alternar a barra lateral
  const handleToggleSidebar = () => {
    toggleSidebar(); // Chama a função recebida por props para alternar a barra lateral
  };

  // Função para lidar com ação de alternar o tema
  const handleToggleTheme = () => {
    toggleTheme(); // Chama a função toggleTheme do contexto de tema para alternar entre os temas escuro e claro
  };

  // Renderização do componente Navbar
  return (
    <div className="col-span-full h-[64px] lg:h-[64px] px-4 lg:pr-8 bg-gradient-to-l from-darkBlue via-azuluro/10 to-darkBlue/10 dark:bg-gradient-to-r border border-transparent border-b-roxouro1 flex items-center justify-between">
      <div className="flex justify-between items-center w-140">
        {/* Botão para alternar a barra lateral */}
        <button
          className="py-4 pl-4 col-span-full h-[72px] lg:h-[70px] px-4 lg:pr-8 border border-transparent flex items-center justify-between"
          onClick={toggleSidebar} // Ação ao clicar no botão (alternar a barra lateral)
          style={{ position: "relative" }}
        >
          {isOpen ? ( // Verifica se a barra lateral está aberta
            <FaBarsStaggered className="text-greenUro dark:text-white dark:hover:text-greenUro hover:text-greenUro" /> // Ícone quando a barra está aberta
          ) : (
            <FaBars className="dark:text-greenUro dark:hover:text-greenUro" /> // Ícone quando a barra está fechada
          )}
        </button>
      </div>
      <div className="flex justify-center items-center gap-4 w-40">
        {/* Componente SliderButton para interação */}
        <SliderButton />
        {/* Botão para alternar entre tema escuro e claro */}
        <button
          onClick={handleToggleTheme} // Ação ao clicar no botão (alternar o tema)
          className="p-3 rounded-full text-greenUro dark:text-white hover:text-neutral-700"
        >
          {/* Ícone de sol ou lua dependendo do tema atual */}
          {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar; // Exporta o componente Navbar para uso em outros componentes
