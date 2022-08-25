import Drawer from 'layouts/Drawer';
import React from 'react';
import {
  Box,
} from '@mui/material';
import IconButton from 'components/IconButton';
import { ArrowLeft as LeftIcon } from '@mui/icons-material';
import Fade from 'components/Fade';

interface Props {
  form: React.ReactNode;
  filter: React.ReactNode;
  list: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProjectMemoDrawer(props: Props) {

  return (
    <>
      <Box sx={{
        position:        'absolute',
        width:           '40px',
        right:           0,
        top:             '64px',
        minHeight:       '50px',
        display:         'flex',
        justifyContent:  'center',
        alignItems:      'flex-start',
        backgroundColor: 'transparent',
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
              backgroundColor: 'transparent'
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
      <Drawer open={props.open} direction="right" openedWidth={320} closedWidth={40}>
        <Box sx={{
          display:         'flex',
          width:           '100%',
          flexWrap:        'wrap',
          backgroundColor: props.open ? 'inherit' : 'transparent',
        }}>
          {props.form}
          {props.filter}
          {props.list}
        </Box>
      </Drawer>
    </>
  );
}