import { Backdrop, CircularProgress } from '@mui/material';

export const LoadingCircle = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};
