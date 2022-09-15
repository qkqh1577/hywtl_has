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
            width:          '45%',
            display:        'flex',
            flexWrap:       'unwrap',
            alignItems:     'center',
            justifyContent: 'space-between'
          }}>
            <Box sx={{ width: 'calc(100% - 160px)' }}>
              <DateField
                autoSubmit
                name="beginDate"
                label="입찰 공고 기간"
              />
            </Box>
            <Text variant="body4">~</Text>
            <Box sx={{ width: '160px' }}>
              <DateField
                disableLabel
                autoSubmit
                name="closeDate"
                label="입찰 공고 기간"
              />
            </Box>
          </Box>
          <Box sx={{
            width:    '30%',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <BusinessSelector
              autoSubmit
              labelWidth={40}
              name="business"
              label="낙찰 업체"
            />
          </Box>
          <Box sx={{
            width:    '24%',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <TextField
              autoSubmit
              labelWidth={40}
              name="bidOrganization"
              label="입찰 기관"
            />
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
            width:          '280px',
            display:        'flex',
            flexWrap:       'unwrap',
            alignItems:     'center',
            justifyContent: 'space-between'
          }}>
            <Text variant="body4">입찰 일자</Text>
            <Box sx={{ width: '200px' }}>
              <DateField
                disableLabel
                autoSubmit
                name="bidDate"
                label="입찰 일자"
              />
            </Box>
          </Box>
          <Box sx={{
            width:    '175px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <TextField
              labelWidth={60}
              autoSubmit
              type="amount"
              name="testAmount"
              label="풍동 금액"
            />
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <TextField
              autoSubmit
              labelWidth={25}
              type="amount"
              name="reviewAmount"
              label="구검"
            />
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <TextField
              autoSubmit
              labelWidth={25}
              type="amount"
              name="totalAmount"
              label="총액"
            />
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <TextField
              autoSubmit
              labelWidth={25}
              name="expectedDuration"
              label="일정"
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
      </Box>
    </SectionLayout>
  );
}