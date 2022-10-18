import React, { useMemo } from 'react';
import SectionLayout from 'layouts/SectionLayout';
import Button from 'layouts/Button';
import { Box } from '@mui/material';
import TextBox from 'layouts/Text';
import { DefaultFunction } from 'type/Function';
import {
  RivalEstimateId,
  RivalEstimateVO
} from 'rival_estimate/domain';
import { RivalEstimateParameter } from 'rival_estimate/parameter';
import dayjs from 'dayjs';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import BusinessSelector from 'components/BusinessSelector';
import Input from 'layouts/Input';

interface Props {
  list: RivalEstimateVO[] | undefined;
  onAdd: DefaultFunction;
  onUpdate: DefaultFunction<RivalEstimateParameter>;
  onDelete: DefaultFunction<RivalEstimateId>;
}

export default function RivalEstimateListSection(props: Props) {

  return (
    <SectionLayout
      title="경쟁 업체 견적 정보"
      modifiedAt={useMemo(() => {
        if (!props.list || props.list.length === 0) {
          return undefined;
        }
        return props.list.map(item => dayjs(item.modifiedAt))
                    .reduce((a,
                             b
                    ) => a.isAfter(b) ? a : b)
                    ?.toDate();
      }, [props.list])}
      titleRightComponent={
        <Button shape="small" onClick={props.onAdd}>+ 등록</Button>
      }>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        {(!props.list || props.list.length === 0) && (
          <Box sx={{
            width:          '100%',
            display:        'flex',
            flexWrap:       'unwrap',
            justifyContent: 'center',
          }}>
            <TextBox variant="body2">
              등록된 정보가 없습니다.
            </TextBox>
          </Box>
        )}
        {props.list && props.list.map(item => (
          <Box
            key={item.id}
            sx={{
              width:          '100%',
              display:        'flex',
              flexWrap:       'unwrap',
              justifyContent: 'space-between',
              alignItems:     'center'
            }}>
            <Box sx={{
              width:    '200px',
              display:  'flex',
              flexWrap: 'unwrap',
            }}>
              <DataFieldWithLabel label="타 업체">
                <BusinessSelector
                  value={item.business?.id ?? ''}
                  onChange={(value) => {
                    if (item.business?.id !== value) {
                      props.onUpdate({
                        id:         item.id,
                        businessId: value,
                      });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:    '175px',
              display:  'flex',
              flexWrap: 'unwrap',
            }}>
              <DataFieldWithLabel label="풍동 금액">
                <Input
                  type="number"
                  key={item.testAmount}
                  defaultValue={item.testAmount ?? ''}
                  onBlur={(e) => {
                    const value = +(e.target.value) || undefined;
                    if (item.testAmount !== value) {
                      props.onUpdate({
                        id:         item.id,
                        testAmount: value,
                      });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>

            <Box sx={{
              width:    '140px',
              display:  'flex',
              flexWrap: 'unwrap',
            }}>
              <DataFieldWithLabel label="구검">
                <Input
                  type="number"
                  key={item.reviewAmount}
                  defaultValue={item.reviewAmount ?? ''}
                  onBlur={(e) => {
                    const value = +(e.target.value) || undefined;
                    if (item.reviewAmount !== value) {
                      props.onUpdate({
                        id:           item.id,
                        reviewAmount: value,
                      });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:    '140px',
              display:  'flex',
              flexWrap: 'unwrap',
            }}>
              <DataFieldWithLabel labelWidth={25} label="총액">
                <Input
                  type="number"
                  key={item.totalAmount}
                  defaultValue={item.totalAmount ?? ''}
                  onBlur={(e) => {
                    const value = +(e.target.value) || undefined;
                    if (item.totalAmount !== value) {
                      props.onUpdate({
                        id:          item.id,
                        totalAmount: value,
                      });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:    '140px',
              display:  'flex',
              flexWrap: 'unwrap',
            }}>
              <DataFieldWithLabel labelWidth={25} label="일정">
                <Input
                  key={item.expectedDuration}
                  defaultValue={item.expectedDuration ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (item.expectedDuration !== value) {
                      props.onUpdate({
                        id:               item.id,
                        expectedDuration: value,
                      });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:          '80px',
              display:        'flex',
              flexWrap:       'unwrap',
              justifyContent: 'flex-end'
            }}>
              <Button shape="basic3" onClick={() => {
                props.onDelete(item.id);
              }}>
                삭제
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </SectionLayout>
  );


}