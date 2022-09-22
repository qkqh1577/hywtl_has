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
import { PersonnelVO } from 'personnel/domain';

export interface FormListProps {
  personnelVO: PersonnelVO | undefined;
}

export default function FormList({ personnelVO }: FormListProps) {
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
      <BasicForm basic={personnelVO?.basic} />
      <Divider />
      <CompanyForm company={personnelVO?.company} />
      <Divider />
      <JobForm jobList={personnelVO?.jobList} />
      <Divider />
      <AcademicForm academicList={personnelVO?.academicList} />
      <Divider />
      <CareerForm careerList={personnelVO?.careerList} />
      <Divider />
      <LicenseForm licenseList={personnelVO?.licenseList} />
      <Divider />
      <LanguageForm languageList={personnelVO?.languageList} />
    </Box>
  );
}
