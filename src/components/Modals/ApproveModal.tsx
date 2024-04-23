import { FC } from 'react';
import { Button, Typography } from '@mui/material';
import { Modal } from '../Modal/Modal';

type ApproveModalProps = {
  text: string;
  isOpen: boolean;
  handleClose: any;
  func: any;
};

export const ApproveModal: FC<ApproveModalProps> = ({
  text,
  isOpen,
  handleClose,
  func,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <Typography variant="h6" component="h2">
          Подтвердите
        </Typography>
        <Typography>{text}</Typography>
        <div className="flex gap-2">
          <Button variant={'contained'} onClick={func}>
            Удалить
          </Button>
          <Button variant={'outlined'} onClick={() => handleClose()}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};
