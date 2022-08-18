import React from 'react';
import {
  Box,
  Container,
} from '@mui/material';
import BasicInformationForm from 'business/view/Detail/Form/BasicInformationForm';
import ManagerInformationForm from 'business/view/Detail/Form/ManagerInformationForm';
import Title from 'components/Title';
import ComponentButtons from 'business/view/Detail/Form/Button/ComponentButtons';

export default function () {
  return (
    <Container>
      <Box>
        <Title title="업체 정보"/>
      </Box>
      <Box>
        <BasicInformationForm />
      </Box>
      <Box>
        <Title title="담당자 정보" titleRightComponent={<ComponentButtons />} />
      </Box>
      <Box>
        <ManagerInformationForm />
      </Box>
    </Container>
  );
};
