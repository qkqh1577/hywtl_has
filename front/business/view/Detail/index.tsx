import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import { BusinessVO } from 'business/domain';
import Footer from 'business/view/Detail/Footer';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import BasicInformationForm from 'business/view/Detail/Form/BasicInformationForm';
import ManagerInformationForm from 'business/view/Detail/Form/ManagerInformationForm';
import { DefaultFunction } from 'type/Function';
import Divider from 'layouts/Divider';

export interface FormValues
  extends BusinessVO {
  edit: boolean;
}

interface Props {
  handleRegistrationNumberSubmit: DefaultFunction<string>;
  involvedProjectList: React.ReactNode;
  rivalStatistic: React.ReactNode;
  rivalProjectList: React.ReactNode;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
}

export default function BusinessDetail(props: Props) {
  const formik = useContext(FormikContext);
  return (
    <PageLayout
      title={formik.values.id ? '업체 정보 상세' : '업체 등록'}
      body={
        <Box sx={{ width: '100%' }}>
          <BasicInformationForm onCheck={props.handleRegistrationNumberSubmit} />
          <Divider />
          {props.involvedProjectList}
          <Divider />
          {props.rivalStatistic}
          {props.rivalProjectList}
          <Divider />
          <ManagerInformationForm />
        </Box>
      }
      footer={
        <Footer
          onCancel={props.onCancel}
          onDelete={props.onDelete}
        />
      }
    />
  );
};
