import React, { useContext } from 'react';
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  initialPersonnelJobVO,
  PersonnelVO,
} from 'personnel/domain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import SelectField from 'components/SelectField';
import { FormikEditable } from 'type/Form';

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
              <FormControl fullWidth variant="standard">
                <FormLabel component="legend">
                  <Typography sx={{
                    color:      ColorPalette._9b9ea4,
                    fontSize:   '13px',
                    fontFamily: 'Noto Sans KR'
                  }}>
                    대표 정보
                  </Typography>
                </FormLabel>
              </FormControl>
              <FormGroup row>
                <Radio
                  required
                  name={`representativeJob`}
                  value={job.department?.id}
                  checked={(formikContext.values as any).representativeJob === job.department?.id}
                  onChange={() => {
                    formikContext.setFieldValue('representativeJob', job.department?.id);
                  }}
                />
              </FormGroup>
            </Grid>
            <Grid item sm={edit ? 8.6 : 9}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  {edit && (
                    <SelectField
                      required
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
                    required
                    label="직함"
                    labelPosition="top"
                    name={`jobList.${index}.jobTitle`}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    required
                    label="직종"
                    labelPosition="top"
                    name={`jobList.${index}.jobType`}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    required
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
                <FontAwesomeIcon
                  style={{
                    color:  ColorPalette._9bb6ea,
                    cursor: 'pointer'
                  }}
                  icon="trash"
                  onClick={() => {
                    formikContext!.setFieldValue('jobList', jobList.filter((manager,
                                                                            j
                    ) => index !== j));
                  }}
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
