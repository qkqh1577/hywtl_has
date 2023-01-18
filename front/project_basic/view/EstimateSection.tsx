import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import BusinessSelector from 'components/BusinessSelector';
import { ProjectFinalEstimateVO } from 'project_estimate/domain';
import { RivalEstimateVO } from 'rival_estimate/domain';
import {
  ProjectBasicBidType,
  ProjectVO
} from 'project/domain';

interface Props {
  project: ProjectVO | undefined;
  detail: ProjectFinalEstimateVO | undefined;
  rivalList: RivalEstimateVO[] | undefined;
}

export default function ProjectBasicEstimateSection({ detail, rivalList, project }: Props) {

  return (
    <SectionLayout title="최종 견적 정보">
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
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="견적 일자">
              <Input
                readOnly
                key={detail?.estimateDate ? dayjs(detail?.estimateDate)
                .format('YYYY-MM-DD') : undefined}
                defaultValue={detail?.estimateDate ? dayjs(detail?.estimateDate)
                .format('YYYY-MM-DD') : ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="견적 번호">
              <Input
                readOnly
                key={detail?.code}
                defaultValue={detail?.code ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="풍동 금액">
              <Input
                readOnly
                isAmount
                key={detail?.testAmount}
                defaultValue={detail?.testAmount?.toLocaleString() ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="구검">
              <Input
                readOnly
                isAmount
                key={detail?.reviewAmount}
                defaultValue={detail?.reviewAmount?.toLocaleString() ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="총액">
              <Input
                readOnly
                isAmount
                key={detail?.totalAmount}
                defaultValue={detail?.totalAmount?.toLocaleString() ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
            <DataFieldWithLabel label="일정">
              <Input
                readOnly
                key={detail?.schedule}
                defaultValue={detail?.schedule}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        {project && project.bidType === ProjectBasicBidType.DEFAULT && rivalList?.map(item => (
          <Box key={item.id}>
            <Box sx={{ width: '220px' }}>
              <DataFieldWithLabel label="타 업체">
                <BusinessSelector
                  readOnly
                  value={item.business?.id}
                  onChange={() => {}}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
              <DataFieldWithLabel label="풍동 금액">
                <Input
                  readOnly
                  isAmount
                  key={item.testAmount}
                  defaultValue={item.testAmount?.toLocaleString() ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
              <DataFieldWithLabel label="구검">
                <Input
                  readOnly
                  isAmount
                  key={item.reviewAmount}
                  defaultValue={item.reviewAmount?.toLocaleString() ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
              <DataFieldWithLabel label="총액">
                <Input
                  readOnly
                  isAmount
                  key={item.totalAmount}
                  defaultValue={item.totalAmount?.toLocaleString() ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
              <DataFieldWithLabel label="일정">
                <Input
                  readOnly
                  key={item.expectedDuration}
                  defaultValue={item.expectedDuration ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
          </Box>
        ))}
      </Box>
    </SectionLayout>
  );
}
