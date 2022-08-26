import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React from 'react';
import { Menu } from 'app/domain/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartGantt,
  faFilePowerpoint,
  faAddressCard,
  faBuilding,
  faListOl,
  faGear,
  faCircle,
  faMinus
} from '@fortawesome/free-solid-svg-icons';
import { ColorPalette } from 'app/view/App/theme';

library.add(
  faChartGantt,
  faFilePowerpoint,
  faAddressCard,
  faBuilding,
  faListOl,
  faGear,
  faCircle,
  faMinus
);

interface MenuNodeProps {
  menu: Menu;
  depth?: number;
}

export default function MenuNode({
                                   menu,
                                   depth = 1,
                                 }: MenuNodeProps) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <ListItem
        button
        disabled={!menu.path && !menu.children}
        sx={{
          padding:         '0 10px',
          marginBottom:    '5px',
          height:          '40px',
          color:           ColorPalette.White,
          backgroundColor: location.pathname === menu.path ? ColorPalette.Blue['2'] : 'transparent',
        }}
        onClick={() => {
          if (menu.path) {
            navigate(menu.path);
          }
        }}>
        <ListItemIcon sx={{
          minWidth:    'initial',
          marginRight: '10px',
        }}>
          <FontAwesomeIcon icon={menu.icon} color={ColorPalette.Blue['2']} fontSize={depth === 1 ? '16px' : '6px'} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={menu.title}
          sx={{
            fontSize: '13px',
            color:    ColorPalette.Grey['3']
          }}
        />
      </ListItem>
      {menu.children && (
        <List component="div" sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
        }}>
          {menu.children.map((item) => (
            <MenuNode key={item.title} menu={item} depth={depth + 1} />
          ))}
        </List>
      )}
    </>
  );
}