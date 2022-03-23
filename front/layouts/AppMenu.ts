import DashboardIcon from "@mui/icons-material/Dashboard";
import {SvgIcon} from "@mui/material";

export interface AppMenuItemPropTypes {
  name: string,
  path: string,
  icon: typeof SvgIcon
}

export const menuData: AppMenuItemPropTypes[] = [
  {
    name: 'Department',
    path: '/department',
    icon: DashboardIcon
  },{
    name: 'User',
    path: '/user',
    icon: DashboardIcon
  },{
    name: 'HR',
    path: '/hr/card',
    icon: DashboardIcon
  },{
    name: 'SALES',
    path: '/sales',
    icon: DashboardIcon
  },{
    name: 'PROJECT',
    path: '/project',
    icon: DashboardIcon
  }
];

