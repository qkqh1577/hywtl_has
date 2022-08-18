import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import useId from 'services/useId';

interface ButtonProps {
  children: string;
  path: string;
}

const propsList: ButtonProps[] = [{
  children: '기본 정보',
  path:     'basic',
}, {
  children: '단지 정보',
  path:     'building',
}, {
  children: '견적/게약',
  path:     'estimate_contract',
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
      display:        'flex',
      flexWrap:       'nowrap',
      padding:        '4px 24px',
      paddingBottom:  0,
      width:          '100%',
      height:         '48px',
      justifyContent: 'space-around',
      alignItems:     'flex-end',
      alignContent:   'flex-end',
    }}>
      {propsList.map((props) => {

        const selected = pathname.endsWith(`/${props.path}`);
        return (
          <Button
            key={props.path}
            variant={'outlined'}
            children={props.children}
            sx={{
              borderRadius:    0,
              border:          '1px solid #0000001f',
              width:           `${100 / (propsList.length + 1)}%`,
              height:          '36px',
              backgroundColor: selected ? 'rgb(241, 234, 255)' : '#fff',
              cursor:          selected ? 'default' : 'pointer',
              color:           '#000'
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