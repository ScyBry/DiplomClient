import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { ISubject } from '../../../types/types.ts';

type RowProps = {
  row: ISubject;
  handleEditClick: (data: ISubject) => void;
  deleteSubject: () => void;
};

export const Row: FC<RowProps> = ({ row, handleEditClick, deleteSubject }) => {
  const [extend, setExtend] = useState<boolean>(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExtend(!extend)}
          >
            {extend ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleEditClick(row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => deleteSubject(row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.hoursPerGroup}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={extend} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>Преподаватели</TableHead>
                <TableBody>
                  <TableRow>
                    {row.Teachers.map(teacher => (
                      <TableCell>{teacher.lastName}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
