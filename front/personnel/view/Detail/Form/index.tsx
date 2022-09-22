import React, { useContext } from 'react';
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
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';

export interface FormListProps {
  personnelVO: PersonnelVO | undefined;
}

export default function FormList({ personnelVO }: FormListProps) {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const { edit } = formikContext.values;
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
      <BasicForm basic={personnelVO?.basic} edit={edit} />
      <Divider />
      <CompanyForm company={personnelVO?.company} edit={edit}/>
      <Divider />
      <JobForm jobList={personnelVO?.jobList} edit={edit}/>
      <Divider />
      <AcademicForm academicList={personnelVO?.academicList} edit={edit}/>
      <Divider />
      <CareerForm careerList={personnelVO?.careerList} edit={edit}/>
      <Divider />
      <LicenseForm licenseList={personnelVO?.licenseList} edit={edit}/>
      <Divider />
      <LanguageForm languageList={personnelVO?.languageList} edit={edit}/>
    </Box>
  );
}
