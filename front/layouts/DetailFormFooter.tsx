import React, { useContext } from 'react';
import {
  Box,
} from '@mui/material';
import { FormikContext } from 'formik';
import useDialog from 'components/Dialog';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

function CancelButton(props: { onClick?: DefaultFunction }) {

  const formikContext = useContext(FormikContext);
  const { rollback } = useDialog();
  const onClick = () => {
    rollback(() => {
      if (props.onClick) {
        props.onClick();
      }
      if (formikContext) {
        formikContext.handleReset();
      }
    });
  };
  return (
    <Button
      shape="basic2"
      children="취소"
      onClick={onClick}
      disabled={formikContext?.isSubmitting}
    />
  );
}

function SubmitButton(props: { onClick?: DefaultFunction }) {
  const formikContext = useContext(FormikContext);

  const onClick = () => {
    if (formikContext) {
      const { handleSubmit } = formikContext;
      handleSubmit();
    }
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <Button
      children="저장"
      onClick={onClick}
      disabled={formikContext?.isSubmitting}
      sx={{
        marginRight: '10px',
      }}
    />
  );
}

export interface DetailFormFooterProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit?: DefaultFunction;
  onClose?: DefaultFunction;
}

export default function DetailFormFooter(props: DetailFormFooterProps) {

  return (
    <Box sx={{
      display:        'flex',
      justifyContent: 'center',
      flexWrap:       'nowrap',
      width:          '100%',
    }}>
      {props.children}
      {(props.left || props.right) && (
        <>
          <Box sx={{
            display: 'flex',
            width:   '50%',
          }}>
            {props.left}
          </Box>
          <Box sx={{
            display:        'flex',
            justifyContent: 'flex-end',
            width:          '50%',
          }}>
            <SubmitButton onClick={props.onSubmit} />
            <CancelButton onClick={props.onClose} />
            {props.right}
          </Box>
        </>
      )}
      {!props.children && !props.left && !props.right && (
        <>
          <SubmitButton onClick={props.onSubmit} />
          <CancelButton onClick={props.onClose} />
        </>
      )}
    </Box>
  );
}