import { ColorPalette } from 'app/view/App/theme';
import { Box } from '@mui/material';
import React from 'react';
import DataBox from 'project_status/view/StatusBar/DataBox';
import Input from 'layouts/Input';

function cut10000(amount: number | undefined): number {
  if (!amount) {
    return 0;
  }
  const result = Math.floor(amount / 10000);
  return +result.toFixed(0);
}

interface Props {
  targetTest: string | undefined;
  testAmount: number | undefined;
  reviewAmount: number | undefined;

}

export default function ProjectStatusRightBar(props: Props) {

  const amount = `${cut10000(props.testAmount)
  .toLocaleString()} + ${cut10000(props.reviewAmount)
  .toLocaleString()}`;
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
          <Input
            readOnly
            variant="outlined"
            key={props.targetTest}
            defaultValue={props.targetTest ?? ''}
          />
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
          <Input
            readOnly
            variant="outlined"
            key={amount}
            defaultValue={amount}
          />
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