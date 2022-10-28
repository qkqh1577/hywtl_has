import React, { useCallback } from 'react';
import Alert from 'dialog/view/Alert';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { dialogAction } from 'dialog/action';

export default function AlertRoute() {

  const dispatch = useDispatch();
  const { alertProps } = useSelector((root: RootState) => root.dialog);
  const onClose = useCallback(() => dispatch(dialogAction.close()), [dispatch]);

  if (!alertProps) {
    return null;
  }

  return (
    <Alert
      {...alertProps}
      open={typeof alertProps !== 'undefined'}
      onClose={() => {
        onClose();
        if (alertProps?.afterClose) {
          alertProps.afterClose();
        }
      }}
    />
  );

}