import { Alert, IconButton, Paper, Table, TableContainer } from '@mui/material';
import { FC } from 'react';
import { subjectApi } from '../../services/subjects.service';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

type SubjectsTableProps = {
  id: string;
};

export const SubjectsTable: FC<SubjectsTableProps> = ({ id }) => {
  const {
    data: subjects,

    isSuccess,
  } = subjectApi.useGetAllGroupSubjectsQuery(id);

  if (isSuccess) {
    console.log(subjects);
  }

  return (
    <>
      <IconButton>
        <AddIcon />
      </IconButton>

      <TableContainer
        component={Paper}
        sx={{
          minWidth: '650px',

          height: '90vh',
          overflow: 'auto',
        }}
      >
        <Table></Table>
      </TableContainer>
    </>
  );
};
