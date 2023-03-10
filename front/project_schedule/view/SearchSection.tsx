import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';
import { ProjectScheduleProps } from 'project_schedule/view/index';
import Input from 'layouts/Input';

function BackToCalendarButton(props: Pick<ProjectScheduleProps, | 'setKeyword'>) {

  const formik = useContext(FormikContext);
  const onClick = () => {
    props.setKeyword('');
    formik.setFieldValue('keyword', undefined);
  };

  return (
    <Button shape="basic2" onClick={onClick}>
      달력으로 돌아가기
    </Button>
  );
}

function SubmitButton() {
  const formikContext = useContext(FormikContext);
  const onClick = () => {
    formikContext?.handleSubmit();
  };

  return (
    <Button
      children="검색"
      disabled={formikContext?.isSubmitting}
      onClick={onClick}
    />
  );
}

export default function SearchSection(props: Pick<ProjectScheduleProps, | 'isSearchForm' | 'setKeyword'>) {
  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
    }}>
      <Box sx={{
        display: 'flex',
        width:   '60%',
      }}>
        <Box sx={{
          width:       '100%',
          marginRight: '10px'
        }}>
          <Input
            placeholder="일정을 검색해주세요"
            variant="outlined"
            key={formik.values.keyword}
            defaultValue={formik.values.keyword ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.keyword !== value) {
                formik.setFieldValue('keyword', value);
              }
            }}
          />
        </Box>
        <Box>
          <SubmitButton />
        </Box>
      </Box>
      <Box>
        {props.isSearchForm && (<BackToCalendarButton setKeyword={props.setKeyword} />)}
      </Box>
    </Box>
  );
};
