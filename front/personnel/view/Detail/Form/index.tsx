import React from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import AccountForm from 'personnel/view/Detail/Form/AccountForm';
import BasicForm from 'personnel/view/Detail/Form/BasicForm';
import CompanyForm from 'personnel/view/Detail/Form/CompanyForm';
import JobForm from 'personnel/view/Detail/Form/JobForm';
import AcademicForm from 'personnel/view/Detail/Form/AcademicForm';
import CareerForm from 'personnel/view/Detail/Form/CareerForm';
import LicenceForm from 'personnel/view/Detail/Form/LicenceForm';
import LanguageForm from 'personnel/view/Detail/Form/LanguageForm';
import Divider from 'layouts/Divider';
import { DepartmentShortVO } from 'department/domain';

interface Props {
  departmentList: DepartmentShortVO[] | undefined;
}

export default function FormList(props: Props) {
  return (
    <Box sx={{
      display:      'flex',
      flexWrap:     'wrap',
      width:        '100%',
      padding:      '30px',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
    }}>
      <AccountForm />
      <Divider />
      <BasicForm />
      <Divider />
      <CompanyForm />
      <Divider />
      <JobForm departmentList={props.departmentList} />
      <Divider />
      <AcademicForm />
      <Divider />
      <CareerForm />
      <Divider />
      <LicenceForm />
      <Divider />
      <LanguageForm />
    </Box>
  );
}
