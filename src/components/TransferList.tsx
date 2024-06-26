import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Typography, TextField, InputAdornment } from '@mui/material';
import { ITeacher } from '../types/types';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

interface ITeacherListProps {
  teachers: ITeacher[];
  assignedTeachers: ITeacher[];
  leftTitle: string;
  rightTitle: string;
  onTransfer: (teachers: ITeacher[]) => void;
  isLoading: boolean;
}

function not(a: readonly string[], b: readonly string[]) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: readonly string[], b: readonly string[]) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export const TransferList: React.FC<ITeacherListProps> = ({
  teachers,
  assignedTeachers,
  leftTitle,
  rightTitle,
  onTransfer,
  isLoading,
}) => {
  const [checked, setChecked] = React.useState<readonly string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [left, setLeft] = React.useState<readonly string[]>(() => {
    const filteredTeachers = teachers?.filter(
      teacher =>
        !assignedTeachers.some(
          assignedTeacher => assignedTeacher.id === teacher.id,
        ),
    );
    return filteredTeachers.map(teacher => teacher.id);
  });
  const [right, setRight] = React.useState<readonly string[]>(
    assignedTeachers.map(assignedTeacher => assignedTeacher.id),
  );

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLeft = left.filter(id => {
    const teacher = teachers.find(teacher => teacher.id === id);
    return teacher?.fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredRight = right.filter(id => {
    const teacher = teachers.find(teacher => teacher.id === id);
    return teacher?.fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const customList = (items: readonly string[]) => (
    <Paper sx={{ width: 500, height: 300, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value: string) => {
          const teacher = teachers.find(teacher => teacher.id === value);
          if (!teacher) return null;

          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={teacher.fullName} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  const handleTransfer = () => {
    const selectedTeachers = teachers.filter(teacher =>
      right.includes(teacher.id),
    );
    onTransfer(selectedTeachers);
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h6">{leftTitle}</Typography>
        <TextField
          fullWidth
          placeholder="Поиск..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {customList(filteredLeft)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
          <LoadingButton
            loading={isLoading}
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleTransfer}
            aria-label="transfer"
          >
            сохранить
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6">{rightTitle}</Typography>
        {customList(filteredRight)}
      </Grid>
    </Grid>
  );
};
