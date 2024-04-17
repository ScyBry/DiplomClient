import { IconButton as MUIIconButton } from '@mui/material';
import { FC, ReactElement } from 'react';

type IconButtonProps = {
  children: ReactElement;
  handleClick: () => void;
};

export const IconButton: FC<IconButtonProps> = ({ children, handleClick }) => {
  return (
    <MUIIconButton onClick={handleClick} sx={{ padding: '4px' }}>
      {children}
    </MUIIconButton>
  );
};
