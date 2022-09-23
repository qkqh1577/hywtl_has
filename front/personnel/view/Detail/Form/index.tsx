import React from 'react';
import {
  Box,
  Divider
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import AccountForm from 'personnel/view/Detail/Form/AccountForm';
import BasicForm from 'personnel/view/Detail/Form/BasicForm';
import CompanyForm from 'personnel/view/Detail/Form/CompanyForm';
import JobForm from 'personnel/view/Detail/Form/JobForm';
import AcademicForm from 'personnel/view/Detail/Form/AcademicForm';
import CareerForm from 'personnel/view/Detail/Form/CareerForm';
import LicenseForm from 'personnel/view/Detail/Form/LicenseForm';
import LanguageForm from 'personnel/view/Detail/Form/LanguageForm';
import { Option } from 'components/DataFieldProps';

export interface FormProps {
  list: Option[]
}

export default function FormList(props: FormProps) {
  return (
    <Box sx={{
      display:       'flex',
      width:         '100%',
      flexDirection: 'column',
      padding:       '15px 20px',
      border:        `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:  '5px',
      marginBottom:  '20px',
    }}>
      <AccountForm />
      <Divider />
      <BasicForm />
      <Divider />
      <CompanyForm />
      <Divider />
      <JobForm departmentList={props.list}/>
      <Divider />
      <AcademicForm/>
      <Divider />
      <CareerForm/>
      <Divider />
      <LicenseForm/>
      <Divider />
      <LanguageForm/>
    </Box>
  );
}
