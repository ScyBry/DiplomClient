import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Taskbar } from '../components/Taskbar/Taskbar.tsx';
import { IconButton } from '../components/buttons/IconButton/IconButton';

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <IconButton
        children={<MenuIcon fontSize="large" />}
        handleClick={() => setIsOpen(true)}
      />

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Taskbar />
      </Drawer>

      <Outlet />
    </div>
  );
};
