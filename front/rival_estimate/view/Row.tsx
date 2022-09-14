import { Box } from '@mui/material';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import React from 'react';
import BusinessSelector from 'components/BusinessSelector';
import { DefaultFunction } from 'type/Function';

interface Props {
  onChange: DefaultFunction;
  onDelete: DefaultFunction;
}

export default function RivalEstimateRow(props: Props) {

  return (
    <Box
      sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'unwrap',
        justifyContent: 'space-between',
        alignItems:     'center'
      }}>
      <Box sx={{
        width:    '280px',
        display:  'flex',
        flexWrap: 'unwrap',
      }}>
        <BusinessSelector
          labelWidth={40}
          name="business"
          label="타업체"
          afterChange={props.onChange}
        />
      </Box>
      <Box sx={{
        width:    '175px',
        display:  'flex',
        flexWrap: 'unwrap',
      }}>
        <TextField
          labelWidth={60}
          type="amount"
          name="testAmount"
          label="풍동 금액"
          onBlur={props.onChange}
        />
      </Box>
      <Box sx={{
        width:    '140px',
        display:  'flex',
        flexWrap: 'unwrap',
      }}>
        <TextField
          labelWidth={25}
          type="amount"
          name="reviewAmount"
          label="구검"
          onBlur={props.onChange}
        />
      </Box>
      <Box sx={{
        width:    '140px',
        display:  'flex',
        flexWrap: 'unwrap',
      }}>
        <TextField
          labelWidth={25}
          type="amount"
          name="totalAmount"
          label="총액"
          onBlur={props.onChange}
        />
      </Box>
      <Box sx={{
        width:    '140px',
        display:  'flex',
        flexWrap: 'unwrap',
      }}>
        <TextField
          labelWidth={25}
          name="expectedDuration"
          label="일정"
          onBlur={props.onChange}
        />
      </Box>
      <Box sx={{
        width:          '80px',
        display:        'flex',
        flexWrap:       'unwrap',
        justifyContent: 'flex-end'
      }}>
        <Button shape="basic2" onClick={props.onDelete}>삭제</Button>
      </Box>
    </Box>
  );
}