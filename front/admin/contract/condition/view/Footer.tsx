import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import { FormikContext } from 'formik';
import TextBox from 'layouts/Text';

export interface Props {
  onCancel: DefaultFunction;
}

export default function Footer(props: Props) {
  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: 'center',
      flexWrap:       'wrap',
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        justifyContent: 'center',
      }}>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          sx={{
            marginRight: '10px',
          }}>
          저장
        </Button>
        <Button shape="basic2" onClick={props.onCancel}>
          취소
        </Button>
      </Box>
      <Box sx={{ marginTop: '15px' }}>
        <TextBox variant="body4">
          &#183; 내용 변경 후, 저장 하지 않고 페이지를 이동 할 경우 변경입력된 내용은 반영되지 않습니다.
        </TextBox>
      </Box>
    </Box>
  );
};
