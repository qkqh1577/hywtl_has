import React from 'react';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { useContext } from 'react';
import { FormValues } from 'business/view/Detail';
import { Button } from '@mui/material';
import useDialog from 'components/Dialog';

export interface RegistrationNumberCheckButtonProps {
  handleRegistrationNumberSubmit: (registrationNumber: string) => void;
}

export default function (props: RegistrationNumberCheckButtonProps) {
  const { error } = useDialog();
  const formikContext: FormikContextType<FormValues> = useContext(FormikContext);
  const edit: boolean = formikContext?.values.edit ?? true;

  if (!edit) {
    return null;
  }

  return (
    <Button
      children="중복 조회"
      onClick={() => {
        const registrationNumber = formikContext?.values.registrationNumber;
        if (!registrationNumber) {
          error('사업자 번호를 입력해 주시기 바랍니다.');
          return;
        }
        props.handleRegistrationNumberSubmit(registrationNumber);
      }}
    />
  );
}