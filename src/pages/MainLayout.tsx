import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Taskbar } from '../components/Taskbar/Taskbar.tsx';

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="">
      <Tooltip title="Открыть меню">
        <IconButton onClick={() => setIsOpen(true)}>
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Taskbar />
      </Drawer>

      <Outlet />
    </div>
  );
};
