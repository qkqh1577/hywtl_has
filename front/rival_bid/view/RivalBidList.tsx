import React, {
  useEffect,
  useState
} from 'react';
import SectionLayout from 'layouts/SectionLayout';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import { RivalBidParameter } from 'rival_bid/parameter';
import {
  RivalBidId,
  RivalBidVO
} from 'rival_bid/domain';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import BusinessSelector from 'components/BusinessSelector';
import Input from 'layouts/Input';
import TextBox from 'layouts/Text';
import { toAmount } from 'util/NumberUtil';

interface Props {
  list: RivalBidVO[] | undefined;
  onPush: DefaultFunction;
  onUpdate: DefaultFunction<RivalBidParameter>;
  onDelete: DefaultFunction<RivalBidId>;
}

export default function ProjectRivalBidList(props: Props) {

  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if (!props.list || props.list.length === 0) {
      setModifiedAt(undefined);
      return;
    }

    setModifiedAt(props.list.map(item => item.modifiedAt)
                       .filter(date => typeof date !== 'undefined')
                       .map(date => dayjs(date))
                       .reduce((a,
                                b
                       ) => a.isAfter(b) ? a : b)
                       .toDate());
  }, [props.list]);

  return (
    <SectionLayout
      title="경쟁 업체 입찰 정보"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <Button shape="small" onClick={props.onPush}>
          +등록
        </Button>
      }>
      <Box sx={{
        width:     '100%',
        display:   'flex',
        flexWrap:  'wrap',
        '& > div': {
          marginBottom:   '10px',
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'space-between',
          alignItems:     'center',
          '& > div':      {
            marginRight: '10px',
          }
        }
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
        {props.list?.map(item => (
          <Box key={item.id}>
            <Box sx={{ width: '220px' }}>
              <DataFieldWithLabel label="타 업체">
                <BusinessSelector
                  value={item.business?.id}
                  onChange={(value) => {
                    props.onUpdate({ id: item.id, businessId: value });
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
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
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
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
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
              <DataFieldWithLabel label="총액">
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
            <Box sx={{ width: 'calc((100% - 325px) / 4)' }}>
              <DataFieldWithLabel label="일정">
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
            <Box sx={{ width: '55px' }}>
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