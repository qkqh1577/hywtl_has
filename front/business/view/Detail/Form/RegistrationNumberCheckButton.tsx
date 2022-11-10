import React, { useContext } from 'react';
import { FormikContext, } from 'formik';
import useDialog from 'dialog/hook';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';

export interface Props {
  onCheck: DefaultFunction<string>;
}

export default function RegistrationNumberCheckButton(props: Props) {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const edit = formik.values.edit === false ? !formik.values.id : (formik.values.id && formik.values.edit);

  if (!edit) {
    return null;
  }

  return (
    <Button
      shape="small"
      children="중복 조회"
      onClick={() => {
        const value = formik.values.registrationNumber || undefined;
        console.log("registrationNumber check value : ", value)
        if (!value) {
          error('사업자 번호를 입력해 주시기 바랍니다.');
          return;
        }
        props.onCheck(value);
      }}
    />
  );
}
