import { FC } from 'react';
import { ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { TASKBAR_NAVIGATION } from '../../../constants.ts';
import { Link } from 'react-router-dom';

type NavigationTaskbarSectionProps = {
  sectionTitle: string;
};

export const NavigationTaskbarSection: FC<NavigationTaskbarSectionProps> = ({
  sectionTitle,
}) => {
  return (
    <>
      <ListSubheader component="div" id="nested-list-subheader">
        {sectionTitle}
      </ListSubheader>
      <div>
        {TASKBAR_NAVIGATION.map(nav => (
          <Link to={nav.route}>
            <ListItemButton>
              <ListItemText primary={nav.title} />
            </ListItemButton>
          </Link>
        ))}
      </div>
    </>
  );
};
