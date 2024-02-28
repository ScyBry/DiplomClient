import { FC } from 'react';
import styles from './menuAddButton.module.sass';
import AddIcon from '@mui/icons-material/Add';

type MenuAddButtonProps = {
  onClick: () => void;
  text: string;
};

export const MenuAddButton: FC<MenuAddButtonProps> = ({ onClick, text }) => {
  return (
    <div onClick={onClick} className={(styles.addGroup, styles.option)}>
      <AddIcon fontSize="small"></AddIcon>
      <span>{text}</span>
    </div>
  );
};
