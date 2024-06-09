import { Drawer } from '@mui/material';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Taskbar } from '../components/Taskbar/Taskbar.tsx';
import { Header } from '../components/AppBar.tsx';

export const MainLayout: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Header setIsOpen={setIsOpen} />

      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Taskbar />
      </Drawer>

      <Outlet />
    </div>
  );
};
