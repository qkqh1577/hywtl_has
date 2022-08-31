import React from 'react';
import {
  Box,
  BoxProps
} from '@mui/material';
import TextField from 'components/TextField';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectField from 'components/SelectField';

export interface SearchFormProps {
  openFilter: boolean;
  toggleFilter: () => void;
  searchFormRef: React.RefObject<HTMLDivElement>;
}

function ItemBox(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        justifyContent: 'space-between',
        overflowX:      'hidden',
        display:        'flex',
        width:          '100%',
        paddingBottom:  '10px',
        flexWrap:       'unwrap',
        alignItems:     'center',
      }}
    />
  );
}

export default function (props: SearchFormProps) {

  return (
    <Box
      ref={props.searchFormRef}
      sx={{
        display:    'flex',
        width:      '100%',
        overflowX:  'hidden',
        padding:    '15px 10px',
        flexWrap:   'wrap',
        alignItems: 'center',
      }}>
      <ItemBox>
        <TextField
          variant="outlined"
          name="keyword"
          label="프로젝트명 검색"
          placeholder="프로젝트명, 단지 명, ..."
          labelProps={{
            disableLabel: true,
          }}
        />
        <IconButton
          onClick={props.toggleFilter}
          children={<FontAwesomeIcon icon={props.openFilter ? 'angle-up' : 'angle-down'} />}
        />
      </ItemBox>
      <ItemBox>
        <SelectField
          labelProps={{
            disableLabel: true,
          }}
          variant="outlined"
          name="test"
          label="조건문"
          options={['진행현황', '견적분류']}
        />
        <SelectField
          labelProps={{
            disableLabel: true,
          }}
          variant="outlined"
          name="test2"
          label="진행현황"
          options={['Y', 'N']}
        />
      </ItemBox>

    </Box>
  );
}