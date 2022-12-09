import React, {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { toAmount } from 'util/NumberUtil';
import dayjs from 'dayjs';

interface Detail {
  name: string;
  rate: number;
  amount: number;
  expectedDate: string;
  note?: string;
}

interface Props {
  totalAmount: number | undefined;
}

export default function ({ totalAmount }: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const dirty = formik.values.dirty;
  const amount = formik.values.amount;
  const rate = useMemo(() => {
    if (!amount || !totalAmount) {
      return undefined;
    }
    return amount / totalAmount * 100;
  }, [amount, totalAmount]);

  const [detail, setDetail] = useState<Detail>();

  useEffect(() => {
    if (!edit) {
      setDetail(undefined);
    }
    else {
      setDetail({
        name:         formik.values.name,
        rate:         formik.values.rate,
        amount:       formik.values.amount,
        expectedDate: dayjs(formik.values.expectedDate)
                      .format('YYYY-MM-DD'),
        note:         formik.values.note,
      });
    }
  }, [edit]);

  useEffect(() => {
    if (!dirty && detail &&
      (
        detail.name !== formik.values.name
        || detail.amount !== formik.values.amount
        || detail.expectedDate !== dayjs(formik.values.expectedDate)
        .format('YYYY-MM-DD')
        || detail.note !== formik.values.note
      )
    ) {
      formik.setFieldValue('dirty', true);
    }
    else if (dirty && detail && (
      detail.name === formik.values.name
      && detail.amount === formik.values.amount
      && detail.expectedDate === dayjs(formik.values.expectedDate)
      .format('YYYY-MM-DD')
      && detail.note === formik.values.note
    )) {
      formik.setFieldValue('reason', undefined);
      formik.setFieldValue('dirty', undefined);
    }
  }, [formik.values]);

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
      }}>
        <TextBox variant="body7">기본 정보</TextBox>
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '80%',
        justifyContent: 'space-between',
        alignItems:     'flex-start'
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginRight:  '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="기성명" labelPosition="top">
            <Input
              readOnly={!edit}
              key={formik.values.name}
              defaultValue={formik.values.name ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (formik.values.name !== value) {
                  formik.setFieldValue('name', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel required={edit} label="금액" labelPosition="top">
            <Input
              isAmount
              readOnly={!edit}
              key={formik.values.amount}
              defaultValue={formik.values.amount?.toLocaleString() ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = toAmount(e.target.value) || undefined;
                if (formik.values.amount !== value) {
                  formik.setFieldValue('amount', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '47%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="비율" labelPosition="top">
            <Input
              readOnly
              type="number"
              key={rate}
              defaultValue={rate?.toFixed(1) ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          width:        '100%',
          marginBottom: '15px',
        }}>
          <DataFieldWithLabel label="기성 조건" labelPosition="top">
            <Input
              readOnly={!edit}
              key={formik.values.note}
              defaultValue={formik.values.note ?? ''}
              onBlur={(e) => {
                if (!edit) {
                  return;
                }
                const value = e.target.value || undefined;
                if (formik.values.note !== value) {
                  formik.setFieldValue('note', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        {dirty && (
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel required label="변경 사유" labelPosition="top">
              <Input
                key={formik.values.reason}
                defaultValue={formik.values.reason ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.reason !== value) {
                    formik.setFieldValue('reason', value);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        )}
      </Box>
    </Box>
  );
}
