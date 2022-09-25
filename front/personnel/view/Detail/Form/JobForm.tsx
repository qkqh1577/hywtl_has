import React, { useContext } from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import {
  initialPersonnelJobVO,
  PersonnelVO
} from 'personnel/domain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import IconButton from 'components/IconButton';
import SelectField from 'components/SelectField';
import RadioField from 'components/RadioField';

export default function JobForm(props) {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const jobList = formikContext.values.jobList;
  const edit = formikContext?.values.edit ?? true;
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      {edit && (
        <Grid container justifyContent="space-between">
          <Grid item sm={10}>
            <Typography>
              소속 정보
            </Typography>
          </Grid>
          {jobList.length === 0 && (
            <Grid container item sm={2} justifyContent="flex-end">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('jobList', [...(jobList ?? []), initialPersonnelJobVO]);
                }}
              />
            </Grid>
          )}
          {jobList.length > 0 && (
            <Grid container item sm={1} justifyContent="center">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('jobList', [...(jobList ?? []), initialPersonnelJobVO]);
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
      {!edit && (
        <Grid container>
          <Grid item sm={12}>
            <Typography>
              소속 정보
            </Typography>
          </Grid>
        </Grid>
      )}
      {jobList.map((job,
                    index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={3}>
              <RadioField
                label="대표 정보"
                name={`jobList.${index}.isRepresentative`}
                options={['대표정보']}
              />

            </Grid>
            <Grid item sm={edit ? 8.6 : 9}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  {edit && (
                    <SelectField
                      label="소속부서"
                      labelPosition="top"
                      name={`jobList.${index}.department.id`}
                      options={props.departmentList}
                    />
                  )}
                  {!edit && (
                    <TextField
                      label="소속부서"
                      labelPosition="top"
                      name={`jobList.${index}.department.name`}
                    />
                  )}
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="직함"
                    labelPosition="top"
                    name={`jobList.${index}.jobTitle`}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="직종"
                    labelPosition="top"
                    name={`jobList.${index}.jobType`}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="직위"
                    labelPosition="top"
                    name={`jobList.${index}.jobPosition`}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="직급"
                    labelPosition="top"
                    name={`jobList.${index}.jobClass`}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    label="직책"
                    labelPosition="top"
                    name={`jobList.${index}.jobDuty`}
                  />
                </Grid>
              </Grid>
            </Grid>
            {edit && (
              <Grid container item sm={0.4} justifyContent="center" alignItems="center">
                <IconButton
                  shape="square"
                  onClick={() => {
                    formikContext!.setFieldValue('jobList', jobList.filter((manager,
                                                                            j
                    ) => index !== j));
                  }}
                  sx={{
                    backgroundColor: ColorPalette._e4e9f2,
                  }}
                  children={
                    <FontAwesomeIcon
                      style={{
                        color: ColorPalette._9bb6ea,
                      }}
                      icon="trash"
                    />}
                />
              </Grid>
            )}
          </Grid>
        );
      })}
      {jobList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          소속 정보가 없습니다.
        </Box>
      )}
    </Box>
  );
}
