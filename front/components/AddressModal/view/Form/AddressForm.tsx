import React from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import TextBox from 'layouts/Text';
import { Address } from 'components/AddressModal/domain';

interface Props {
  boxRef: React.MutableRefObject<any>;
  setAddressValue: (addressValue: Address) => void;
  item: Address;
  index: number;
}

function AddressForm({
                   boxRef,
                   setAddressValue,
                   item,
                   index
                 }: Props) {
  return (
    <Box
      ref={boxRef}
      onClick={() => {
        boxRef.current = item;
        setAddressValue(boxRef.current);
      }}
      sx={{
        display:         'flex',
        width:           '100%',
        flexWrap:        'nowrap',
        padding:         '10px',
        border:          `1px solid ${ColorPalette._e4e9f2}`,
        marginBottom:    '3px',
        flexDirection:   'column',
        cursor:          'pointer',
        backgroundColor: (boxRef.current?.roadAddr ?? null) === item.roadAddr ? ColorPalette._e4e9f2 : ColorPalette._ffffff,
      }}>
      <TextBox variant="body1">{item.zipNo}</TextBox>
      <TextBox variant="body2">{item.roadAddr}</TextBox>
      <TextBox variant="body2">{item.jibunAddr}</TextBox>
    </Box>
  );
}

export default AddressForm;
