import React from 'react';
import ProjectBasicDesignSection from 'project_basic/view/DesignSection';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function ProjectBasicDesignRoute() {
  const { design } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      city:               design?.city || '',
      address:            design?.address || '',
      complexCount:       design?.complexCount?.toString() || '',
      purpose1:           design?.purpose1 || '',
      purpose2:           design?.purpose2 || '',
      lotArea:            design?.lotArea?.toString() || '',
      totalArea:          design?.totalArea?.toString() || '',
      totalBuildingCount: design?.totalBuildingCount?.toString() || '',
      householdCount:     design?.householdCount?.toString() || '',
      maximumFloor:       design?.maximumFloor?.toString() || '',
      maximumHeight:      design?.maximumHeight?.toString() || '',
    },
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectBasicDesignSection />
    </FormikProvider>
  );
}
