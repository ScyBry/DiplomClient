import { Backdrop as BackdropMUI } from '@mui/material';
import { FC, ReactElement } from 'react';

type SimpleBackdropProps = {
  open: boolean;
  children: ReactElement;
};

export const Backdrop: FC<SimpleBackdropProps> = ({ open, children }) => {
  return <BackdropMUI open={open}>{children}</BackdropMUI>;
};
