import React from 'react';
import { Box } from '@mui/material';
import ProjectBasicSection from 'project/view/Basic/BasicSection';
import { FormikPartial } from 'type/Form';
import { ProjectVO } from 'project/domain';
import { FormikContextType } from 'formik';
import ProjectBasicBusinessSection from 'project/view/Basic/BusinessSection';

interface Props {
  basicFormik: FormikContextType<FormikPartial<ProjectVO>>;
  businessFormik: FormikContextType<any>;
}

export default function ProjectBasic(props: Props) {

  return (
    <Box sx={{
      width: '100%',
    }}>
      <ProjectBasicSection formik={props.basicFormik} />
      <ProjectBasicBusinessSection formik={props.businessFormik} />
    </Box>
  );
}