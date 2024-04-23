import { Modal as MUIModal, Paper } from '@mui/material';
import { FC, ReactElement } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
};

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <MUIModal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={isOpen}
      onClose={onClose}
    >
      <Paper
        sx={{ padding: '16px 32px 24px', maxWidth: '500px', minWidth: '400px' }}
      >
        {children}
      </Paper>
    </MUIModal>
  );
};
