import { FieldStatus } from 'components/DataFieldProps';
import TextField from 'components/TextField';
import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import {
  TestServiceDetailTemplateView,
  TestServiceTemplateView
} from 'services/standard_data/test_service_template';

function getTotalPrice(detailList: TestServiceDetailTemplateView[] | undefined) {
  if (!detailList || detailList.length === 0) {
    return '';
  }
  return detailList.map(detail => detail.unitPrice || 0)
                   .reduce((a,
                            b
                   ) => a + b, 0);
}

export default function TestServiceDetailTotalPriceField() {

  const { values, setFieldValue } = useFormikContext<TestServiceTemplateView>();

  const totalPrice = getTotalPrice(values.detailList);
  useEffect(() => {
    setFieldValue('totalPrice', totalPrice);
  }, [totalPrice]);

  return (
    <TextField
      status={FieldStatus.ReadOnly}
      type="number"
      name="totalPrice"
      label="총액"
    />
  );
}