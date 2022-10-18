import { Box } from '@mui/material';
import React, {
  useContext,
  useMemo
} from 'react';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import { ColorPalette } from 'app/view/App/theme';
import dayjs from 'dayjs';
import TextBox from 'layouts/Text';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const basic = formik.values.basic ?? {};
  const year = useMemo(() => dayjs(basic.contractDate)
  .year(), [basic.contractDate]);
  const month = useMemo(() => dayjs(basic.contractDate)
  .month() + 1, [basic.contractDate]);
  const day = useMemo(() => dayjs(basic.contractDate)
  .date(), [basic.contractDate]);

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
      margin:         '10px 0px',
      padding:        '10px',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <Box sx={{ width: '70px' }}>
        <Input
          variant="outlined"
          key={year}
          readOnly={!edit}
          defaultValue={year ?? ''}
          onBlur={(e) => {
            const value = +(e.target.value) || undefined;
            if (year !== value) {
              formik.setFieldValue('basic.contractDate', dayjs(`${value}-${month}-${day}`)
              .format('YYYY-MM-DD'));
            }
          }}
        />
      </Box>
      <TextBox variant="body9" sx={{ margin: '10px' }}>년</TextBox>

      <Box sx={{ width: '70px' }}>
        <Input
          variant="outlined"
          key={month}
          readOnly={!edit}
          defaultValue={month ?? ''}
          onBlur={(e) => {
            const value = +(e.target.value) || undefined;
            if (month !== value) {
              formik.setFieldValue('basic.contractDate', dayjs(`${year}-${value}-${day}`)
              .format('YYYY-MM-DD'));
            }
          }}
        />
      </Box>
      <TextBox variant="body9" sx={{ margin: '10px' }}>월</TextBox>

      <Box sx={{ width: '70px' }}>
        <Input
          variant="outlined"
          key={day}
          readOnly={!edit}
          defaultValue={day ?? ''}
          onBlur={(e) => {
            const value = +(e.target.value) || undefined;
            if (day !== value) {
              formik.setFieldValue('basic.contractDate', dayjs(`${year}-${month}-${value}`)
              .format('YYYY-MM-DD'));
            }
          }}
        />
      </Box>
      <TextBox variant="body9" sx={{ margin: '10px' }}>일</TextBox>
    </Box>
  );
}