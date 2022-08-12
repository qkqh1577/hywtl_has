import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width:  '100%',
}));

export default AppBar;
