import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { TestServiceTemplateView } from 'services/standard_data/test_service_template';
import { useDialog } from 'components';

export default function () {

  const { rollback } = useDialog();
  const { setFieldValue } = useFormikContext<TestServiceTemplateView>();

  const handleClick = useCallback(() => {
    rollback(() => setFieldValue('edit', false));
  }, []);

  return (
    <Button
      color="secondary"
      onClick={handleClick}
      children="취소"
    />
  );
}