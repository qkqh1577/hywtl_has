import React from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';

interface Props {
  detailAddress: string;
  setDetailAddress: (detailAddress: string) => void;
}

function DetailAddressInput({detailAddress, setDetailAddress}: Props) {
  return (
    <Box sx={{
      display:   'flex',
      width:     '100%',
      flexWrap:  'nowrap',
      padding:   '10px',
      border:    `1px solid ${ColorPalette._e4e9f2}`,
      marginTop: '10px',
    }}>
      <Box sx={{
        display:     'flex',
        flexWrap:    'nowrap',
        width:       '100%',
        marginRight: '10px',
      }}>
        <DataFieldWithLabel label="상세주소">
          <Input
            variant="outlined"
            placeholder="입력"
            value={detailAddress ?? ''}
            onChange={(e) => {
              const value = e.target.value || '';
              if (value !== detailAddress) {
                setDetailAddress(value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}

export default DetailAddressInput;
