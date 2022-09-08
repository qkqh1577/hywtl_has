import { Box, } from '@mui/material';
import React, { useRef } from 'react';
import { Menu } from 'app/domain/menu';
import Drawer from 'layouts/Drawer';
import Button from 'layouts/Button';
import { ColorPalette } from 'app/view/App/theme';
import Depth1Menu from 'app/view/App/MenuDrawer/Depth1Menu';

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

  const ganttBoxRef = useRef<HTMLDivElement>(null);
  const ganttBoxHeight = ganttBoxRef.current?.offsetHeight;
  return (
    <Drawer open={openMenu} padding="10px" openedWidth={230} sx={{
      backgroundColor: ColorPalette._2d3a54,
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
        height:                       `calc(100% - ${ganttBoxHeight ?? 58}px)`,
        '&::-webkit-scrollbar':       {
          width:           '10px',
          backgroundColor: ColorPalette._697183
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ColorPalette._4c576d
        }
      }}>
        <Box sx={{
          display:      'flex',
          width:        '100%',
          flexWrap:     'wrap',
          padding:      '10px',
          alignContent: 'flex-start',
        }}>
          {menu.map((item) => (
            <Depth1Menu
              key={item.title}
              {...item}
            />
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}