import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'components/DataFieldLabel';

interface Props {
  onClose: DefaultFunction;
}

export default function ProjectSystemEstimateModalForm() {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between'
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        justifyContent: edit ? 'space-between' : 'flex-end',
        padding:        '10px',
      }}>
        {!edit && (
          <Box sx={{
            display:        'flex',
            flexWrap:       'nowrap',
            width:          '60%',
            justifyContent: 'space-between',
            alignItems:     'center',
          }}>
            <Box sx={{ width: '30%' }}>
              <DataFieldWithLabel label="견적 구분">
                <Input
                  disabled
                  defaultValue="시스템"
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '30%' }}>
              <DataFieldWithLabel label="견적 번호">
                <Input
                  disabled
                  value={formik.values.code ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '30%' }}>
              <DataFieldWithLabel label="최종 여부">
                <Input
                  disabled
                  value={formik.values.confirmed ? 'Y' : 'N'}
                />
              </DataFieldWithLabel>
            </Box>
          </Box>
        )}
        <Box sx={{
          display:        'flex',
          justifyContent: 'flex-end',
          alignItems:     'center',
        }}>
          {edit && (
            <Button sx={{
              marginRight: '10px',
            }}>
              저장
            </Button>
          )}
          {edit && (
            <Button shape="basic2">취소</Button>
          )}
          {!edit && (
            <Button shape="basic3">삭제</Button>

          )}
        </Box>
      </Box>

      <Box sx={{
        width:        '40%',
        display:      'flex',
        flexWrap:     'wrap',
        alignContent: 'flex-start',
        height:       '100%',
        overflow:     'hidden',
      }}>
        <Box sx={{
          width:    '100%',
          display:  'flex',
          flexWrap: 'nowrap',
          margin:   '10px 0px',
          padding:  '10px',

        }}>

        </Box>
      </Box>


    </Box>
  );
}