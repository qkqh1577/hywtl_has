import { ColorPalette } from 'app/view/App/theme';
import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const siteList = formik.values.siteList;
  const buildingList = formik.values.buildingList;
  const templateList = formik.values.templateList;

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
      margin:         '10px 0px',
      padding:        '10px',
      justifyContent: 'center',
      alignItems:     'center',
    }}>

    </Box>
  );
}