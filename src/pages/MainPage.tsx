import { Grid, Typography } from '@mui/material';
import Logo from '../assets/cropped-180-1@2x.png';
import { ExportToExcel } from '../components/Excel/Excel';

export const MainPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '92vh' }}
    >
      <img src={Logo} className="w-52 h-52" />
      <Grid item>
        <Typography variant="h2">ВИТГТК | Расписание</Typography>
        <Typography className="max-w-[700px]" variant="body1">
          Филиал учреждения образования «Белорусский государственный
          технологический университет» «Витебский государственный
          технологический колледж»
        </Typography>
        <ExportToExcel></ExportToExcel>
      </Grid>
    </Grid>
  );
};
