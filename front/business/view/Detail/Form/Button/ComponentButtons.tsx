import React, { useContext } from 'react';
import { Button } from '@mui/material';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { BusinessManagerVO } from 'business/domain';

const onAddClick = () => {
  console.log('add')
}

const onDeleteClick = () => {
  console.log('delete');
}
export default function () {
  const formikContext: FormikContextType<BusinessManagerVO> = useContext(FormikContext);
  const list = formikContext?.values;
  console.log(list);
  return(
    <>
      <Button children="+추가" onClick={onAddClick} />
      <Button children="삭제" onClick={onDeleteClick}/>
    </>
  )
};
