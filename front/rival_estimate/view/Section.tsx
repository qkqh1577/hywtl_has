import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import SectionLayout from 'layouts/SectionLayout';
import Button from 'layouts/Button';
import { Box } from '@mui/material';
import TextBox from 'layouts/Text';
import RivalEstimateRowRoute from 'rival_estimate/route/row';
import { RivalEstimateVO } from 'rival_estimate/domain';
import { DefaultFunction } from 'type/Function';

interface Props {
  list?: RivalEstimateVO[];
  onAdd: DefaultFunction;
}

export default function RivalEstimateListSection(props: Props) {

  const {
          list
        } = props;
  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if (!list || list.length === 0) {
      setModifiedAt(undefined);
    }
    else {
      setModifiedAt(
        list
        .map(item => item.modifiedAt)
        .map(date => dayjs(date))
        .reduce((a,
                 b
        ) => a.isAfter(b) ? a : b)
        .toDate()
      );
    }
  }, [list]);

  return (
    <SectionLayout
      title="경쟁 업체 견적 정보"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <Button shape="small" onClick={props.onAdd}>+ 등록</Button>
      }>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        {(!list || list.length === 0) && (
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
        {list && list.map((item) => (
          <RivalEstimateRowRoute key={item.id} item={item} />
        ))}
      </Box>
    </SectionLayout>
  );


}