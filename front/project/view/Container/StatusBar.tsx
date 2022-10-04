import {
  Box,
  Typography
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';

interface DataBoxProps {
  title: string;
  width: number;
  children: React.ReactNode;
  backgroundColor: string;
}

function DataBox(props: DataBoxProps) {
  return (
    <Box sx={{
      display:         'flex',
      flexWrap:        'wrap',
      flexDirection:   'column',
      alignContent:    'stretch',
      alignItems:      'center',
      backgroundColor: props.backgroundColor,
      padding:         '10px',
      borderRadius:    '5px',
      flex:            1,
    }}>
      <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
        {props.title}
      </Typography>
      {props.children}
    </Box>
  );
}

function ProjectSummary() {
  return (
    <Box sx={{
      display:                    'flex',
      width:                      'calc(50% - 10px)',
      flexWrap:                   'nowrap',
      justifyContent:             'space-between',
      '& > div:not(:last-child)': {
        marginRight: '8px'
      }
    }}>
      <DataBox
        title="실험 종류"
        width={6}
        backgroundColor={ColorPalette._cddaf5}
        children={
          <Box>TBD</Box>
        }
      />
      <DataBox
        title="진행율"
        width={6}
        backgroundColor={ColorPalette._cddaf5}
        children={
          <Box>TBD</Box>
        }
      />
      <DataBox
        title="계약 금액"
        width={10}
        backgroundColor={ColorPalette._cddaf5}
        children={
          <Box>TBD</Box>
        }
      />
      <DataBox
        title="최근 수금"
        width={20}
        backgroundColor={ColorPalette._cddaf5}
        children={
          <Box>TBD</Box>
        }
      />
    </Box>
  );
}

interface Props {
  status: React.ReactNode;
}

export function ProjectContainerStatusBar({ status }: Props) {
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      padding:        '0 20px 20px 20px',
      justifyContent: 'space-between',
    }}>
      {status}
      <ProjectSummary />
    </Box>
  );
}
