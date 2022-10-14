import React, { useContext } from 'react';
import {
  Box,
  BoxProps,
  MenuItem
} from '@mui/material';
import IconButton from 'layouts/IconButton';
import Input from 'layouts/Input';
import Select from 'layouts/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormikContext } from 'formik';

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

  const formik = useContext(FormikContext);

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
        <Input
          key={formik.values.keyword}
          defaultValue={formik.values.keyword ?? ''}
          variant="outlined"
          placeholder="프로젝트명, 단지 명, ..."
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.keyword !== value) {
              formik.setFieldValue('keyword', value);
            }
          }}
        />
        <IconButton
          onClick={props.toggleFilter}
          children={
            <FontAwesomeIcon
              icon={props.openFilter ? 'angle-up' : 'angle-down'}
            />
          }
          sx={{
            marginLeft: '10px',
          }}
        />
      </ItemBox>
      <ItemBox>
        <Box sx={{ width: '45%' }}>
          <Select
            variant="outlined"
            value={formik.values.test ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.test !== value) {
                formik.setFieldValue('test', value);
              }
            }}
          >
            <MenuItem value="진행현황">진행 현황</MenuItem>
            <MenuItem value="견적분류">견적 분류</MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: '45%' }}>
          <Select
            variant="outlined"
            value={formik.values.test2 ? 'Y' : 'N'}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (value === 'Y') {
                formik.setFieldValue('test2', true);
              }
              else {
                formik.setFieldValue('test2', false);
              }
            }}>
            <MenuItem value="Y">Y</MenuItem>
            <MenuItem value="N">N</MenuItem>
          </Select>
        </Box>
      </ItemBox>

    </Box>
  );
}