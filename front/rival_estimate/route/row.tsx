import {
  FormikProvider,
  useFormik
} from 'formik';
import RivalEstimateRow from 'rival_estimate/view/Row';
import {
  RivalEstimateId,
  RivalEstimateVO
} from 'rival_estimate/domain';
import { RivalEstimateParameter } from 'rival_estimate/parameter';
import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import { rivalEstimateAction } from 'rival_estimate/action';

interface Props {
  item: RivalEstimateVO;
}

export default function RivalEstimateRowRoute(props: Props) {

  const dispatch = useDispatch();
  const update = useCallback((params: RivalEstimateParameter) => dispatch(rivalEstimateAction.update(params)), [dispatch]);
  const deleteOne = useCallback((id: RivalEstimateId) => dispatch(rivalEstimateAction.deleteOne(id)), [dispatch]);

  const formik = useFormik<RivalEstimateVO>({
    initialValues: props.item,
    onSubmit:      (values) => {
      update({
        ...values,
        businessId: values.business?.id || undefined,
      });
    }
  });


  return (
    <FormikProvider value={formik}>
      <RivalEstimateRow
        onChange={() => {
          formik.handleSubmit();
        }}
        onDelete={() => {
          deleteOne(formik.values.id);
        }}
      />
    </FormikProvider>
  );
}