import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Drawer, IconButton, Toolbar, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Taskbar } from '../components/Taskbar/Taskbar.tsx';

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Tooltip title="Открыть меню">
            <IconButton edge="start" onClick={() => setIsOpen(true)}>
              <MenuIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Taskbar />
      </Drawer>

      <Outlet />
    </div>
  );
};
