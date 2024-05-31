import { Helmet } from 'react-helmet-async';
import { ExportToExcel } from '../components/Excel/Excel';

export const ExportExcelPage = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Helmet>
        <title>{`Экспорт | Расписание`}</title>
      </Helmet>
      <ExportToExcel />
    </div>
  );
};
