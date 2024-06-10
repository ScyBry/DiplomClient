import { AppBar, Button, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  setIsOpen: (open: boolean) => void;
};

export const Header: FC<HeaderProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <AppBar
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
      position="static"
    >
      <Toolbar className="flex justify-between" variant="dense">
        <Tooltip title="Открыть меню">
          <IconButton edge="start" onClick={() => setIsOpen(true)}>
            <MenuIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Tooltip>

        <Button
          sx={{ color: '#fff' }}
          variant="outlined"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
};
