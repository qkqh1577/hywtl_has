import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import { Box } from '@mui/material';
import ProjectAppBar from 'app/view/App/ProjectDrawer/AppBar';
import SearchBar from 'app/view/App/SearchBar';
import NotificationButton from 'app/view/App/NotificationButton';
import AccountButton from 'app/view/App/AccountButton';
import LogoutButton, { LogoutButtonProps } from 'app/view/App/LogoutButton';
import React from 'react';
import MenuAppBar from 'app/view/App/MenuDrawer/AppBar';
import { ProjectDrawerProps } from 'app/view/App/ProjectDrawer';
import { MenuDrawerProps } from 'app/view/App/MenuDrawer';

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width:  '100%',
}));

interface Props {
  isProjectPage: boolean;
  projectDrawerProps: ProjectDrawerProps;
  logoutButtonProps: LogoutButtonProps;
  menuDrawerProps: MenuDrawerProps;
}

export default function AppBar({
                                 isProjectPage,
                                 projectDrawerProps,
                                 logoutButtonProps,
                                 menuDrawerProps
                               }: Props) {

  return (
    <StyledAppBar color="transparent">
      <Box sx={{
        top:             0,
        position:        'absolute',
        width:           '100%',
        height:          '56px',
        backgroundColor: '#3c3757',
        display:         'flex',
        justifyContent:  'space-between',
      }}>
        <Box sx={{
          display: 'flex',
        }}>
          <MenuAppBar {...menuDrawerProps} />
          {isProjectPage && (<ProjectAppBar {...projectDrawerProps} />)}
        </Box>
        <Box sx={{
          display:         'flex',
          backgroundColor: '#3c3757',
        }}>
          <SearchBar />
          <NotificationButton />
          <AccountButton />
          <LogoutButton {...logoutButtonProps} />
        </Box>
      </Box>
    </StyledAppBar>
  );
}