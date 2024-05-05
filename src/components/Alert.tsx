import { Alert as MUIAlert } from '@mui/material';
import { FC, ReactNode } from 'react';

type AlertProps = {
  severity: 'success' | 'info' | 'warning' | 'error';
  children: ReactNode;
};

export const Alert: FC<AlertProps> = ({ severity, children }) => {
  return (
    <MUIAlert className="absolute bottom-2 left-2" severity={severity}>
      {children}
    </MUIAlert>
  );
};
