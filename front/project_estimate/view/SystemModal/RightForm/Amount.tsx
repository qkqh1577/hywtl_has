import { Box } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import { toAmountKor } from 'util/NumberUtil';
import React, {
  useContext,
  useEffect,
  useMemo
} from 'react';
import { FormikContext } from 'formik';

export default function () {

  const formik = useContext(FormikContext);
  const templateList = formik.values.templateList;
  const discountAmount = formik.values.plan?.discountAmount ?? 0;

  const totalAmount = useMemo((): number => {
    if (!templateList || !Array.isArray(templateList) || templateList.length === 0) {
      return 0;
    }
    const onlyUse = templateList.map(template => template.detailList)
                                .reduce((a,
                                         b
                                ) => [...a, ...b])
                                .filter(detail => detail.inUse);

    if (!Array.isArray(onlyUse) || onlyUse.length === 0) {
      return 0;
    }
    return onlyUse.map(detail => detail.totalAmount ?? 0)
                  .reduce((a,
                           b
                  ) => a + b);
  }, [templateList]);

  useEffect(() => {
    formik.setFieldValue('plan.totalAmount', totalAmount - discountAmount);
  }, [totalAmount, discountAmount]);

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
      <TextBox variant="body2" sx={{ marginRight: '4px' }}>합계(부가세 별도):</TextBox>
      <TextBox variant="body1" sx={{ marginRight: '4px' }}>{toAmountKor(formik.values.plan?.totalAmount ?? 0)}</TextBox>
      <TextBox variant="body1">{`(￦${(formik.values.plan?.totalAmount ?? 0).toLocaleString()})`}</TextBox>
    </Box>
  );
}