import {
  Box,
  List,
} from '@mui/material';
import React from 'react';
import MenuNode from 'app/view/App/MenuNode';
import { Menu } from 'app/domain/menu';
import Drawer from 'layouts/Drawer';
import Button from 'layouts/Button';
import { ColorPalette } from 'app/view/App/theme';

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
    <Drawer open={openMenu} padding="10px" openedWidth={230} sx={{
      backgroundColor: ColorPalette.DarkBlue['1'],
    }}>
      <Box sx={{
        display:       'flex',
        width:         '100%',
        padding:       '10px',
        paddingBottom: '20px',
      }}>
        <Button shape="small">
          새탭에서 간트 열기
        </Button>
      </Box>
      <Box sx={{
        display:                      'flex',
        width:                        '100%',
        overflowY:                    'scroll',
        height:                       'calc(100% - 58px)',
        '&::-webkit-scrollbar':       {
          width:           '10px',
          backgroundColor: ColorPalette.DarkBlue['5']
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ColorPalette.DarkBlue['4']
        }
      }}>
        <List component="div" sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'wrap',
          padding:  '10px',
        }}>
          {menu.map((item) => (
            <MenuNode key={item.title} menu={item} />
          ))}
        </List>
      </Box>
    </Drawer>
  );

}