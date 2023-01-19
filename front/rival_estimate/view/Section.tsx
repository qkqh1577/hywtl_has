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
import { toAmount } from 'util/NumberUtil';
import CircularProgress from "../../components/CircularProgress";
import Fade from 'components/Fade';

interface Props {
  list: RivalEstimateVO[] | undefined;
  loading: boolean,
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
        width:     '100%',
        minHeight: '60px',
        display:   'flex',
        flexWrap:  'wrap',
        '& > div': {
          marginBottom:   '10px',
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'space-between',
          alignItem: 'start',
          '& > div':      {
            marginRight: '10px',
          }
        }
      }}>
        { props.list?.length === 0 && (
          <Box sx={{
            width:          '100%',
            height:         '100%',
            display:        'flex',
            flexWrap:       'unwrap',
            justifyContent: 'center',
          }}>
            <Fade in={true}>
              <TextBox variant="body2" sx={{display:'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                {props.loading && (
                  <CircularProgress size={30} sx={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}/>
                )}
                {!props.loading && (
                  <span>
                    등록된 정보가 없습니다.
                  </span>
                )}
              </TextBox>
            </Fade>
          </Box>
        )}
        { props.list?.map(item => (
          <Box key={item.id} sx={{width: '100%'}}>
            <Box sx={{ width: '15%' }}>
              <DataFieldWithLabel label="타 업체">
                <BusinessSelector
                  value={item.business?.id ?? ''}
                  onChange={(business) => {
                    if (item.business?.id !== business.id) {
                      props.onUpdate({
                        id:         item.id,
                        businessId: business.id,
                      });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '20%' }}>
              <DataFieldWithLabel label="풍동 금액">
                <Input
                  isAmount
                  key={item.testAmount}
                  defaultValue={item.testAmount?.toLocaleString() ?? ''}
                  onBlur={(e) => {
                    const value = toAmount(e.target.value) || undefined;
                    if (item.testAmount !== value) {
                      props.onUpdate({ id: item.id, testAmount: value });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '20%' }}>
              <DataFieldWithLabel label="구검">
                <Input
                  isAmount
                  key={item.reviewAmount}
                  defaultValue={item.reviewAmount?.toLocaleString() ?? ''}
                  onBlur={(e) => {
                    const value = toAmount(e.target.value) || undefined;
                    if (item.reviewAmount !== value) {
                      props.onUpdate({ id: item.id, reviewAmount: value });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '20%' }}>
              <DataFieldWithLabel labelWidth={25} label="총액">
                <Input
                  isAmount
                  key={item.totalAmount}
                  defaultValue={item.totalAmount?.toLocaleString() ?? ''}
                  onBlur={(e) => {
                    const value = toAmount(e.target.value) || undefined;
                    if (item.totalAmount !== value) {
                      props.onUpdate({ id: item.id, totalAmount: value });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '20%' }}>
              <DataFieldWithLabel labelWidth={25} label="일정">
                <Input
                  key={item.expectedDuration}
                  defaultValue={item.expectedDuration ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (item.expectedDuration !== value) {
                      props.onUpdate({ id: item.id, expectedDuration: value });
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '5%' }}>
              <Button
                shape="basic3"
                onClick={() => {
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
