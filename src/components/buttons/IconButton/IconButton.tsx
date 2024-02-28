import { IconButton as MUIIconButton } from '@mui/material';
import { FC, ReactElement } from 'react';

type IconButtonProps = {
  children: ReactElement;
};

export const IconButton: FC<IconButtonProps> = ({ children }) => {
  return <MUIIconButton sx={{ padding: '4px' }}>{children}</MUIIconButton>;
};
