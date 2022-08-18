import React from 'react';
import {
  Box,
} from '@mui/material';
import BasicInformationForm from 'business/view/Detail/Form/BasicInformationForm';
import ManagerInformationForm from 'business/view/Detail/Form/ManagerInformationForm';
import Divider from 'components/Divider';
import { RegistrationNumberCheckButtonProps } from 'business/view/Detail/Form/RegistrationNumberCheckButton';

interface Props
  extends RegistrationNumberCheckButtonProps {}

export default function (props: Props) {
  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      <BasicInformationForm {...props} />
      <Divider />
      <ManagerInformationForm />
    </Box>
  );
};
