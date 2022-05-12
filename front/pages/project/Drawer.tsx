import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { iconWidth, projectDrawerWidth } from 'layouts/data';

const ProjectDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: `${projectDrawerWidth}px`,
      height: '100%',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: `${iconWidth}px`
      }),
    },
  }),
);

export default ProjectDrawer;
