import {
  Button,
  Divider,
  List,
} from '@mui/material';
import React from 'react';
import MenuNode from 'app/view/App/MenuNode';
import { Menu } from 'app/domain/menu';
import Drawer from 'layouts/Drawer';

export interface MenuDrawerProps {
  menu: Menu[];
  openMenu: boolean;
  toggleMenu: () => void;
}

export default function (props: MenuDrawerProps) {

  const {
          openMenu,
          menu,
        } = props;

  return (
    <Drawer open={openMenu}>
      <Button>
        새탭에서 간트 열기
      </Button>
      <Divider />
      <List component="div" sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'wrap',
        padding:  0,
      }}>
        {menu.map((item) => (
          <MenuNode key={item.title} menu={item} />
        ))}
      </List>
    </Drawer>
  );

}