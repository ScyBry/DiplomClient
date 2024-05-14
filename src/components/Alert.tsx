import { Alert as MUIAlert } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';

type AlertProps = {
  severity: 'success' | 'info' | 'warning' | 'error';
  children: ReactNode;
  duration?: number;
};

export const Alert: FC<AlertProps> = ({
  severity,
  children,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeoutId); // Clean up timer on unmount
  }, [duration]);
  return (
    isVisible && (
      <MUIAlert className="absolute bottom-2 left-2" severity={severity}>
        {children}
      </MUIAlert>
    )
  );
};
