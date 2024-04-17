import { Modal as MUIModal } from '@mui/material';
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
      {children}
    </MUIModal>
  );
};
