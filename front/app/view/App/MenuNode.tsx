import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  CancelPresentation as UnusableIcon,
  Folder as MenuGroupIcon,
  HorizontalRule as MenuIcon
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React from 'react';
import { Menu } from 'app/domain/menu';


interface MenuNodeProps {
  menu: Menu;
  depth?: number;
}

export default function MenuNode({
                                   menu,
                                   depth = 0,
                                 }: MenuNodeProps) {

  const navigate = useNavigate();
  const location = useLocation();
  const getIcon = () => {
    if (menu.children) {
      return MenuGroupIcon;
    }
    if (menu.path) {
      return MenuIcon;
    }
    return UnusableIcon;
  };
  const icon = getIcon();
  return (
    <>
      <ListItem
        button
        disabled={!menu.path && !menu.children}
        sx={{
          padding: 0,
          paddingLeft:     `${8 + (depth ?? 0) * 12}px`,
          backgroundColor: location.pathname === menu.path ? 'rgb(245,244,250)' : 'transparent',
        }}
        onClick={() => {
          if (menu.path) {
            navigate(menu.path);
          }
        }}>
        <ListItemIcon>
          {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText primary={menu.title} />
      </ListItem>
      {menu.children && (
        <List component="div" sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
          padding:  0,
        }}>
          {menu.children.map((item) => (
            <MenuNode key={item.title} menu={item} depth={depth + 1} />
          ))}
        </List>
      )}
    </>
  );
}