'use client'; // Declaração para usar o cliente do Next.js

import Link from "next/link"; // Importa o componente Link do Next.js para navegação entre páginas
import { usePathname } from 'next/navigation'; // Importa o hook usePathname do Next.js para obter o pathname da URL
import { JSX, useEffect, useState } from "react"; // Importa JSX, useEffect e useState do React para criação de componentes e gerenciamento de estado

interface BreadcrumbProps {
  pageName: string; // Propriedade pageName do tipo string recebida pelo componente
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const [pathParts, setPathParts] = useState<string[]>([]); // Estado para armazenar partes do caminho da URL
  const pathname = usePathname(); // Obtém o pathname atual usando o hook usePathname do Next.js

  // Efeito para atualizar as partes do caminho quando o pathname muda
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Divide o pathname em partes, removendo partes vazias e atualiza o estado pathParts
      const parts = pathname.split('/').filter((part) => part);
      setPathParts(parts);
    }
  }, [pathname]); // Dependência do efeito: pathname

  // Função para gerar os itens de breadcrumb com base nas partes do caminho
  const generateBreadcrumbItems = () => {
    const breadcrumbItems: JSX.Element[] = []; // Array para armazenar elementos JSX dos itens de breadcrumb
    let path = ''; // Variável para montar o caminho atual

    pathParts.forEach((part, index) => {
      path += `/${part}`; // Atualiza o caminho atual com a próxima parte
      breadcrumbItems.push(
        <>
          {/* Link para a parte do breadcrumb atual */}
          <Link key={path} href={path} className="flex flex-row gap-2 dark:hover:text-rose-100">
            {/* Item de breadcrumb */}
            <li className={`capitalize font-bold ${index === 0 ? 'text-rose-700' : 'text-neutral-500'} dark:${index === 0 ? 'text-rose-700' : 'text-white'}`}>
              {decodeURIComponent(part)} {/* Decodifica a parte do caminho, exibindo o texto */}
            </li>
          </Link>
          {/* Separador entre os itens do breadcrumb */}
          {index !== pathParts.length - 1 && (
            <span className={`font-bold ${index === 0 ? 'text-rose-700' : 'text-neutral-500'} dark:${index === 0 ? 'text-rose-700' : 'text-white'}`}>
              {" | "} {/* Barra vertical como separador */}
            </span>
          )}
        </>
      );
    });

    return breadcrumbItems; // Retorna os itens de breadcrumb gerados
  };

  // Renderiza o componente de breadcrumb na interface
  return (
    <div className="mb-0 flex flex-col gap-3 h-9 pl-4 sm:flex-row sm:items-center sm:justify-between dark:bg-roxouro1 bg-white border border-transparent border-b-stone-200 dark:border-darkBlue">
      {/* Container do componente de breadcrumb */}
      <nav className="">
        {/* Lista ordenada que contém os itens de breadcrumb */}
        <ol className="flex items-center gap-2">
          {/* Chama a função para gerar os itens de breadcrumb */}
          {generateBreadcrumbItems()}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb; // Exporta o componente de breadcrumb como padrão
