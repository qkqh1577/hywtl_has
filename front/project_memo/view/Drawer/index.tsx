import Drawer from 'layouts/Drawer';
import React from 'react';
import {
  Box,
} from '@mui/material';
import IconButton from 'components/IconButton';
import { ArrowLeft as LeftIcon } from '@mui/icons-material';
import Fade from 'components/Fade';
import { ColorPalette } from 'app/view/App/theme';

interface Props {
  form: React.ReactNode;
  filter: React.ReactNode;
  list: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProjectMemoDrawer(props: Props) {
  const closedWidth = 42;
  return (
    <>
      <Box sx={{
        position:        'absolute',
        width:           `${closedWidth}px`,
        right:           0,
        top:             '50px',
        display:         'flex',
        justifyContent:  'center',
        backgroundColor: 'transparent',
        padding:         '15px 0',
        alignItems:      'center',
        zIndex:          (theme) => theme.zIndex.drawer + 1,
      }}>
        <Fade
          in={!props.open}
          title="프로젝트 메모 열기"
          timeout={{
            enter: 0,
          }}
          children={
            <Box sx={{
              display:         'flex',
              width:           '100%',
              justifyContent:  'center',
              backgroundColor: 'transparent',
              paddingRight:    '10px',
            }}>
              <IconButton
                children={<LeftIcon />}
                onClick={() => {
                  props.setOpen(true);
                }}
              />
            </Box>
          }
        />
      </Box>
      <Drawer
        open={props.open}
        direction="right"
        openedWidth={310}
        closedWidth={closedWidth}
        sx={{
          backgroundColor: ColorPalette._f1f5fc,
        }}>
        <Box sx={{
          display:         'flex',
          width:           '100%',
          flexWrap:        'wrap',
          backgroundColor: props.open ? 'inherit' : 'transparent',
        }}>
          {props.form}
          <hr style={{
            borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
            width:        '100%',
            margin:       '15px 10px',
            padding:      0,
          }}
          />
          {props.filter}
          {props.list}
        </Box>
      </Drawer>
    </>
  );
}