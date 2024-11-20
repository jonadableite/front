"use client"; // Declaração para usar o cliente do Next.js

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'; // Importa funções e hooks do React necessários

// Definindo o tipo de dados do contexto de tema
interface ThemeContextType {
  theme: string; // Tipo de tema (dark ou light)
  toggleTheme: () => void; // Função para alternar entre temas
}

// Criação do contexto de tema com valor padrão
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark', // Tema padrão é 'dark' (escuro)
  toggleTheme: () => { }, // Função vazia inicial para alternar o tema
});

// Props esperadas pelo ThemeProvider
interface ThemeProviderProps {
  children: ReactNode; // Componentes filhos que serão envolvidos pelo ThemeProvider
}

// Componente provedor de tema
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark'); // Estado para armazenar o tema atual

  useEffect(() => {
    // Verifica se o tema foi salvo localmente
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme); // Define o tema salvo localmente
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark'); // Define o tema como escuro se corresponder à preferência do usuário
    }
  }, []); // Executa apenas uma vez, ao montar o componente

  // Função para alternar entre temas
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'; // Alterna entre 'dark' e 'light'
    setTheme(newTheme); // Atualiza o estado com o novo tema
    localStorage.setItem('theme', newTheme); // Salva o tema escolhido localmente
    console.log('Tema alterado para:', newTheme); // Exibe mensagem no console sobre a mudança de tema
  };

  // Renderiza o provedor de contexto de tema com os filhos envolvidos
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children} {/* Renderiza os componentes filhos */}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext); // Obtém o contexto de tema atual
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider'); // Lança um erro se o hook for usado fora do ThemeProvider
  }
  return context; // Retorna o contexto de tema
};
