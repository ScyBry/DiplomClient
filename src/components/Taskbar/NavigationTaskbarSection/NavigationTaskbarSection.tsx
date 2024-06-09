import { FC, useEffect } from 'react';
import {
  Divider,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { TASKBAR_NAVIGATION } from '../../../constants.ts';
import { Link } from 'react-router-dom';
import { userApi } from '../../../services/user.service.ts';

type NavigationTaskbarSectionProps = {
  sectionTitle: string;
};

export const NavigationTaskbarSection: FC<NavigationTaskbarSectionProps> = ({
  sectionTitle,
}) => {
  const { data: user, isSuccess } = userApi.useGetProfileQuery();

  return (
    <>
      {isSuccess && (
        <>
          <ListSubheader component="div" id="nested-list-subheader">
            {sectionTitle}
          </ListSubheader>
          <div>
            {user.isAdmin && (
              <Link to={'/users'}>
                <ListItemButton>
                  <ListItemText primary={'Пользователи'} />
                </ListItemButton>
              </Link>
            )}

            {TASKBAR_NAVIGATION.map(nav => (
              <Link key={nav.route} to={nav.route}>
                <ListItemButton>
                  <ListItemText primary={nav.title} />
                </ListItemButton>
              </Link>
            ))}
          </div>
          <Divider />
        </>
      )}
    </>
  );
};
