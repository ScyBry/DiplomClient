import { Drawer } from '@mui/material';
import { FC, useState } from 'react';
import { Taskbar } from '../components/taskbar/taskbar';

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div>
        <Drawer open={isOpen} onClose={handleClose}>
          <Taskbar></Taskbar>
        </Drawer>
        <button onClick={handleOpen}>Открыть</button>
      </div>
    </div>
  );
};
