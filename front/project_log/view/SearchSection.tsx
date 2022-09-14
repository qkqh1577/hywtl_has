import React from 'react';
import SearchForm from 'layouts/SearchForm';
import {
  Box,
  Typography,
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import SelectField from 'components/SelectField';

interface Props {
  totalCount: number | undefined;
}

export default function ({ totalCount }: Props) {

  return (
    <SearchForm>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'flex-end'

      }}>
        <Box sx={{
          width: '100%',
        }}>
          <Typography>{`총 ${totalCount ? totalCount : 0}건`}</Typography>
        </Box>
        <Box sx={{
          width: '100%',
        }}>
          <SelectField
            disableLabel
            name="tabName"
            label="탭명 검색"
            variant="outlined"
            options={[
              '기본 정보',
              '단지 정보',
              '견적/계약',
              '진행 정보',
              '자료',
              '일정',
              '이력'
            ]}
          />
        </Box>
        <Box sx={{
          width: '100%',
        }}>
          <DateField
            disableLabel
            name="createdAt"
            label="날짜"
          />
        </Box>
        <Box sx={{
          width: '100%',
        }}>
          <TextField
            disableLabel
            name="keyword"
            label="검색어"
            placeholder="ID 검색"
            variant="outlined"
          />
        </Box>
      </Box>
    </SearchForm>
  );
}
