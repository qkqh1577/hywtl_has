import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import ContractInfoForm from 'project_contract/view/AddModal/ContractInfoForm';
import ContractEstimateForm from 'project_contract/view/AddModal/ContractEstimateForm';
import ServiceAgreementForm from 'project_contract/view/AddModal/ServiceAgreementForm';
import OrdererForm from 'project_contract/view/AddModal/OrdererForm';
import ContractorForm from 'project_contract/view/AddModal/ContractorForm';
import ServiceContractTermsForm from 'project_contract/view/AddModal/ServiceContractTermsForm';
import ContractInfoHeader from 'project_contract/view/AddModal/ContractInfoHeader';
import ContractDateForm from 'project_contract/view/AddModal/ContractDateForm';

interface Props
  extends FormikLayoutProps<any>{
  onClose: ModalLayoutProps['onClose'];
  totalRatioCell: React.ReactNode;
}

export default function ProjectContractAddModal(props: Props) {
  const {
          onClose,
          formik
        } = props;

  const { addModal } = useSelector((root: RootState) => root.projectContract);
  const onSubmit = () => {formik.handleSubmit();};
  return (
    <ModalLayout
      title="계약서 등록"
      width="90vw"
      open={addModal || false}
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <FormikProvider value={formik}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ContractInfoHeader formik={formik} />
              </Grid>
              <Grid item xs={12} md={3}>
                <ContractInfoForm formik={formik} />
                <ContractEstimateForm formik={formik} />
              </Grid>
              <Grid item xs={12} md={9}>
                <ServiceAgreementForm {...props} />
                <ContractDateForm formik={formik} />
                <OrdererForm formik={formik} />
                <ContractorForm formik={formik} />
                <ServiceContractTermsForm formik={formik} />
              </Grid>
            </Grid>
          </FormikProvider>
        </Box>
      }
    />
  );
}
