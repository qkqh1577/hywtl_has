import React, { useCallback } from 'react';
import Confirm from 'dialog/view/Confirm';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { dialogAction } from 'dialog/action';

export default function ConfirmRoute() {

  const dispatch = useDispatch();
  const { confirmProps } = useSelector((root: RootState) => root.dialog);
  const onClose = useCallback(() => dispatch(dialogAction.close()), [dispatch]);

  if (!confirmProps) {
    return null;
  }
  return (
    <Confirm
      {...confirmProps}
      open={typeof confirmProps !== 'undefined'}
      onClose={() => {
        if (confirmProps?.afterClose) {
          confirmProps.afterClose();
        }
        onClose();
      }}
      onConfirm={() => {
        if (confirmProps?.afterConfirm) {
          confirmProps.afterConfirm();
        }
        onClose();
      }}
    />
  );
}