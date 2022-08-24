import Drawer from 'layouts/Drawer';
import React, { useState } from 'react';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectMemoQuery } from 'project_memo/parameter';
import ProjectMemoForm from 'project_memo/view/Drawer/Form';
import ProjectMemoList, { ProjectMemoListProps } from 'project_memo/view/Drawer/List';
import {
  Box,
} from '@mui/material';
import IconButton from 'components/IconButton';
import { ArrowLeft as LeftIcon } from '@mui/icons-material';
import Fade from 'components/Fade';

interface Props
  extends ProjectMemoListProps,
          FormikLayoutProps<ProjectMemoQuery> {
}

export default function ProjectMemoDrawer(props: Props) {

  const [open, setOpen] = useState<boolean>(true);

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
          in={!open}
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
                  setOpen(true);
                }}
              />
            </Box>
          }
        />
      </Box>
      <Drawer open={open} direction="right" openedWidth={320} closedWidth={40}>
        <Box sx={{
          display:         'flex',
          width:           '100%',
          flexWrap:        'wrap',
          backgroundColor: open ? 'inherit' : 'transparent',
        }}>
          <FormikProvider value={props.formik}>
            <ProjectMemoForm open={open} setOpen={setOpen} />
            <ProjectMemoList list={props.list} />
          </FormikProvider>
        </Box>
      </Drawer>
    </>
  );
}