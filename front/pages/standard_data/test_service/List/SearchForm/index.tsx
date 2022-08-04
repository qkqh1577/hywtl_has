import {
  Form,
  Formik,
} from 'formik';
import {
  Grid
} from '@mui/material';
import {
  testTypeList,
  useTestServiceTemplate,
} from 'services/standard_data/test_service_template';
import SelectField from 'components/SelectField';
import CheckboxField from 'components/CheckboxField';
import TextField from 'components/TextField';
import React from 'react';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';

export default function TestServiceListSearchForm() {
  const { filter, setFilter } = useTestServiceTemplate();

  return (
    <Formik
      enableReinitialize
      onSubmit={(values,
                 { setSubmitting }
      ) => {
        setFilter(values);
        setSubmitting(false);
      }}
      initialValues={filter}
    >
      <Form style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item sm={10}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <CheckboxField
                  name="testType"
                  label="실험 타입"
                  options={testTypeList}
                />
              </Grid>
              <Grid container spacing={2} item sm={12}>
                <Grid item sm={4}>
                  <SelectField
                    name="keywordType"
                    label="검색 대상"
                    options={[
                      {
                        key:  'by_title',
                        text: '용역 항목'
                      },
                    ]}
                    defaultValue="by_title"
                  />
                </Grid>
                <Grid item sm={8}>
                  <TextField
                    name="keyword"
                    label="검색어"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item
            sm={2}
            sx={{
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'space-around',
              alignContent:   'center'
            }}>
            <SubmitButton />
            <ClearButton />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}