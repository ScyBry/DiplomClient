import { Typography } from '@mui/material';
import Logo from '../assets/cropped-180-1@2x.png';
import { ExportToExcel } from '../components/Excel/Excel';

export const MainPage = () => {
  return (
    <div className="flex gap-4  items-center justify-center min-h-screen">
      <img src={Logo} alt="Logo" className="w-52 h-52" />
      <div className=" flex flex-col gap-2">
        <Typography variant="h2">ВИТГТК | Расписание</Typography>
        <Typography className="max-w-[600px]" variant="body1">
          Филиал учреждения образования «Белорусский государственный
          технологический университет» «Витебский государственный
          технологический колледж»
        </Typography>
        <ExportToExcel />
      </div>
    </div>
  );
};
