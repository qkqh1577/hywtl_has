import React from 'react';
import { Box } from '@mui/material';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useId from 'services/useId';
import { ColorPalette } from 'app/view/App/theme';

interface ButtonProps {
  children: string;
  path: string;
}

const propsList: ButtonProps[] = [{
  children: '기본 정보',
  path:     'basic',
}, {
  children: '단지 정보',
  path:     'complex',
}, {
  children: '견적/계약',
  path:     'estimate_contract',
}, {
  children: '진행 정보',
  path:     'progress',
}, {
  children: '자료',
  path:     'document',
}, {
  children: '일정',
  path:     'schedule',
}, {
  children: '이력',
  path:     'log'
}];

export default function ProjectContainerTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = useId();

  if (!id) {
    return null;
  }

  return (
    <Box sx={{
      display:                    'flex',
      flexWrap:                   'nowrap',
      padding:                    '0 20px',
      width:                      '100%',
      justifyContent:             'space-between',
      borderBottom:               `2px solid ${ColorPalette._e4e9f2}`,
      height:                     '38px',
      '& > div:not(:last-child)': {
        marginRight: '5px',
      }
    }}>
      {propsList.map((props) => {
        const selected = pathname.endsWith(`/${props.path}`);
        return (
          <Box
            key={props.path}
            children={props.children}
            sx={{
              flex:            1,
              display:         'flex',
              justifyContent:  'center',
              alignItems:      'center',
              borderRadius:    '5px 5px 0 0',
              border:          `2px solid ${ColorPalette._e4e9f2}`,
              borderBottom:    'none',
              height:          '38px',
              backgroundColor: selected ? ColorPalette._ffffff : ColorPalette._e4e9f2,
              cursor:          selected ? 'default' : 'pointer',
              fontSize:        '14px',
              fontWeight:      selected ? 'bold' : 'inherit',
              color:           ColorPalette._252627,
            }}
            onClick={() => {
              navigate(`/project/sales-management/${id}/${props.path}`);
            }}
          />
        );
      })}
    </Box>
  );
}