import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Box } from '@mui/material';
import { ProjectBasicFailReasonVO } from 'project_basic/domain';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import BusinessSelector from 'components/BusinessSelector';
import Input from 'layouts/Input';
import { toAmount } from 'util/NumberUtil';

interface Props {
  detail: ProjectBasicFailReasonVO | undefined;
  onUpdate: (params: Partial<ProjectBasicFailReasonParameter>) => void;
}

export default function ProjectBasicFailReasonSection(props: Props) {
  const detail = props.detail ?? {} as ProjectBasicFailReasonVO;
  return (
    <SectionLayout
      title="수주실패 정보"
      modifiedAt={detail.modifiedAt}
    >
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
        '&> div': {
          width:        '100%',
          display:      'flex',
          flexWrap:     'nowrap',
          alignItems:   'center',
          marginBottom: '10px',
          '& > div':    {
            marginRight: '10px',
          }
        }
      }}>
        <Box>
          <Box sx={{ width: '220px' }}>
            <DataFieldWithLabel label="타 업체">
              <BusinessSelector
                value={detail.win?.id}
                onChange={(business) => {
                  if (detail.win?.id !== business.id) {
                    props.onUpdate({ winId: business.id });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="풍동 금액">
              <Input
                isAmount
                key={detail.testAmount}
                defaultValue={detail.testAmount?.toLocaleString() ?? ''}
                onBlur={(e) => {
                  const value = toAmount(e.target.value) || undefined;
                  if (detail.testAmount !== value) {
                    props.onUpdate({ testAmount: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="구검">
              <Input
                isAmount
                key={detail.reviewAmount}
                defaultValue={detail.reviewAmount?.toLocaleString() ?? ''}
                onBlur={(e) => {
                  const value = toAmount(e.target.value) || undefined;
                  if (detail.reviewAmount !== value) {
                    props.onUpdate({ reviewAmount: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="총액">
              <Input
                isAmount
                key={detail.totalAmount}
                defaultValue={detail.totalAmount?.toLocaleString() ?? ''}
                onBlur={(e) => {
                  const value = toAmount(e.target.value) || undefined;
                  if (detail.totalAmount !== value) {
                    props.onUpdate({ totalAmount: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="일정">
              <Input
                key={detail.expectedDuration}
                defaultValue={detail.expectedDuration ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (detail.expectedDuration !== value) {
                    props.onUpdate({ expectedDuration: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        <Box>
          <Box sx={{ width: '100%' }}>
            <DataFieldWithLabel label="원인">
              <Input
                multiline
                key={detail.reason}
                defaultValue={detail.reason ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (detail.reason !== value) {
                    props.onUpdate({ reason: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </SectionLayout>
  );
}
