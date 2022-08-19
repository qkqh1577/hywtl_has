import React from 'react';
import { Box } from '@mui/material';
import ProjectBasicSection from 'project/view/Basic/BasicSection';
import { FormikPartial } from 'type/Form';
import { ProjectVO } from 'project/domain';
import { FormikContextType } from 'formik';

interface Props {
  basicFormik: FormikContextType<FormikPartial<ProjectVO>>;
}

export default function ProjectBasic(props: Props) {

  return (
    <Box sx={{
      width: '100%',
    }}>
      <ProjectBasicSection formik={props.basicFormik} />
    </Box>
  );
}