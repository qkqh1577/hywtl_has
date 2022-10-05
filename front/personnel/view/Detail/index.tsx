import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import FormList from 'personnel/view/Detail/Form';
import Footer from 'personnel/view/Detail/Footer';
import { FormikContext } from 'formik';
import { DepartmentShort } from 'department/domain';
import { DefaultFunction } from 'type/Function';

interface Props {
  departmentList: DepartmentShort[] | undefined;
  onCancel: DefaultFunction;
}

export default function PersonnelDetail(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  return (
    <PageLayout
      title={edit ? '인사카드 수정' : '인사카드 상세'}
      body={<FormList departmentList={props.departmentList} />}
      footer={<Footer onCancel={props.onCancel} />}
    />
  );
}
