import { Button } from '@mui/material';
import React from 'react';
import {
  TestServiceTemplateQuery,
  useTestServiceTemplate
} from 'services/standard_data/test_service_template';
import { useFormikContext } from 'formik';

export default function TestServiceListSearchFormClearButton() {

  const { clearFilter } = useTestServiceTemplate();
  const { resetForm } = useFormikContext<TestServiceTemplateQuery>();
  const handleClear = () => {
    clearFilter();
    resetForm();
  };
  return (
    <Button
      color="secondary"
      onClick={handleClear}
      children="초기화"
    />
  );
}