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

export default function JobForm() {
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
      {jobList.map((job,
                    index
      ) => {
        return (
          <Grid container key={index} justifyContent="flex-end">
            <Grid item sm={9}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.department`}
                    label="소속부서"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobTitle`}
                    label="직함"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobType`}
                    label="직종"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobPosition`}
                    label="직위"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobClass`}
                    label="직급"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobDuty`}
                    label="직책"
                    labelPosition="top"
                  />
                </Grid>
              </Grid>
            </Grid>
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
