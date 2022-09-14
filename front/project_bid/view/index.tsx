import { ProjectBidVO } from 'project_bid/domain';
import SectionLayout from 'layouts/SectionLayout';
import { Box } from '@mui/material';
import BusinessSelector from 'components/BusinessSelector';
import TextField from 'components/TextField';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import DateField from 'components/DateField';
import Text from 'layouts/Text';

interface Props {
  detail?: ProjectBidVO;
  onChange: DefaultFunction;
}

export default function ProjectBidSection(props: Props) {


  return (
    <SectionLayout
      title="입찰 정보"
      modifiedAt={props.detail?.modifiedAt}
    >
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
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
            <DateField
              name="beginDate"
              label="입찰 공고 기간"
            />
            <Text variant="body4">~</Text>
            <DateField
              disableLabel
              name="closeDate"
              label="입찰 공고 기간"
            />
          </Box>
          <Box sx={{
            width:    '280px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <BusinessSelector
              labelWidth={40}
              name="business"
              label="낙찰 업체"
              afterChange={props.onChange}
            />
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <TextField
              labelWidth={25}
              name="bidOrganization"
              label="입찰 기관"
              onBlur={props.onChange}
            />
          </Box>
          <Box sx={{
            width:          '80px',
            display:        'flex',
            flexWrap:       'unwrap',
            justifyContent: 'flex-end'
          }}>
          </Box>
        </Box>
        <Box sx={{
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
            <DateField
              name="bidDate"
              label="입찰 일자"
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
        </Box>
      </Box>
    </SectionLayout>
  );
}