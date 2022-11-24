import React from 'react';
import { ColorPalette } from 'assets/theme';
import { Box } from '@mui/material';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import { addressModalAction } from 'components/AddressModal/action';
import { AddressQuery } from 'components/AddressModal/query';
import { useDispatch } from 'react-redux';

interface Props {
  query : AddressQuery;
  setQuery : (query) => void;
}

function AddressSearchSection({query, setQuery}: Props) {
  const dispatch = useDispatch();
  return (
    <Box sx={{
      display:      'flex',
      width:        '100%',
      flexWrap:     'nowrap',
      padding:      '10px',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      marginBottom: '10px',
    }}>
      <Box sx={{
        display:     'flex',
        flexWrap:    'nowrap',
        width:       '100%',
        marginRight: '10px',
      }}>
        <Input
          variant="outlined"
          placeholder="입력"
          value={query.keyword ?? ''}
          onChange={(e) => {
            const value = e.target.value || undefined;
            if (value !== query.keyword) {
              setQuery((prevState) => ({ ...prevState, keyword: value, page: 1 }));
            }
          }}
        />
      </Box>
      <Box sx={{
        display:  'flex',
        flexWrap: 'nowrap',
      }}>
        <Button sx={{ marginRight: '10px' }} onClick={() => {
          dispatch(addressModalAction.setFilter(query));
        }}>
          검색
        </Button>
      </Box>
    </Box>
  );
}

export default AddressSearchSection;
