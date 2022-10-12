import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';
import Basic from './Basic';
import ComplexSite from './ComplexSite';
import ComplexBuilding from './ComplexBuilding';

interface Props {
  openDocumentModal: DefaultFunction<number>;
}

export default function ProjectSystemEstimateModalLeftForm(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      width:        '40%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
      height:       '100%',
      padding:      '10px',
    }}>
      <Basic />
      <Box sx={{
        width:                        '100%',
        overflow:                     'scroll',
        height:                       'calc(100% - 220px)',
        display:                      'flex',
        flexWrap:                     'wrap',
        alignContent:                 'flex-start',
        border:                       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:                 '5px',
        padding:                      '10px',
        '&::-webkit-scrollbar':       {
          width:           '10px',
          height:          '10px',
          backgroundColor: ColorPalette._e4e9f2,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ColorPalette._697183,
        }
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          marginBottom: '10px',
        }}>
          <TextBox variant="body19" sx={{ marginRight: '10px' }}>형상비</TextBox>
          {edit && (
            <TextBox variant="body12">이곳에서 수정된 대지모형 정보와 동 정보는 실제 '단지 정보'에 반영되지 않습니다</TextBox>
          )}
        </Box>
        <Box sx={{
          display:   'flex',
          flexWrap:  'wrap',
          minWidth:  '1000px',
          minHeight: '1000px',
        }}>
          <ComplexSite />
          <ComplexBuilding openDocumentModal={props.openDocumentModal} />
        </Box>
      </Box>
    </Box>
  );
}