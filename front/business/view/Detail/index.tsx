import React, { useContext } from 'react';
import PageLayout from 'layouts/PageLayout';
import Footer from 'business/view/Detail/Footer';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import { DefaultFunction } from 'type/Function';
import Divider from 'layouts/Divider';
import BusinessManagerListSection from 'business/view/Detail/Form/ManagerList';
import { BusinessManagerId } from 'business/domain';
import { UpdateByFormik } from 'components/AddressModal/AddressModal';

interface Props {
  basic: React.ReactNode;
  involvedProjectList: React.ReactNode;
  rivalStatistic: React.ReactNode;
  rivalProjectList: React.ReactNode;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  openProjectListModal: (id:BusinessManagerId) => void;
  onAddressModal: DefaultFunction;
  setAddress: DefaultFunction<UpdateByFormik>;
}

export default function BusinessDetail(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <PageLayout
      title={formik.values.id ? '업체 정보 상세' : '업체 등록'}
      body={
        <Box sx={{ width: '100%' }}>
          {props.basic}
          {!edit && (<Divider />)}
          {formik.values.id && props.involvedProjectList}
          {!edit && (<Divider />)}
          {formik.values.id && props.rivalStatistic}
          {formik.values.id && props.rivalProjectList}
          <Divider />
          <BusinessManagerListSection
            openProjectListModal={props.openProjectListModal}
            onAddressModal={props.onAddressModal}
            setAddress={props.setAddress}
          />
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
