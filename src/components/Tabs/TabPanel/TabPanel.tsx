import { Box } from '@mui/material';
import { FC } from 'react';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '100vh', overflow: 'auto' }}>{children}</Box>
      )}
    </div>
  );
};
