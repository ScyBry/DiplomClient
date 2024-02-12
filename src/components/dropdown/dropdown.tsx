import React, { useState } from 'react';
import styles from './dropdown.module.sass';

interface DropdownMenuProps {
  title: string;
  menuOptions: any;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, menuOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownMenu}>
      <button className={styles.toggleButton} onClick={toggleMenu}>
        {title}
      </button>
      {isOpen && (
        <ul className={styles.dropdown__content}>
          {menuOptions.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
