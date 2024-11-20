import React from "react";

interface LevelButtonProps {
  buttonType: string;
  onButtonClick: (buttonType: string) => void;
  activeButton: string;
}

const LevelButton: React.FC<LevelButtonProps> = ({
  buttonType,
  onButtonClick,
  activeButton,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onButtonClick(buttonType);
  };

  return (
    <button
      className={`linear rounded-[20px] px-4 py-2 text-base font-medium transition duration-200 hover:bg-gray-100 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 focus:ring-whatgreen/50 focus:outline-none ${
        activeButton === buttonType
          ? "bg-lightPrimary focus:ring-whatgreen/50 focus:outline-none"
          : ""
      }`}
      onClick={handleClick}
    >
      {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
    </button>
  );
};

export default LevelButton;
