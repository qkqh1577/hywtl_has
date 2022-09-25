import React, { useContext } from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';
import {
  initialPersonnelCareerVO,
  PersonnelVO
} from 'personnel/domain';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CareerForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const careerList = formikContext.values.careerList;
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
              경력 정보
            </Typography>
          </Grid>
          {careerList.length === 0 && (
            <Grid container item sm={2} justifyContent="flex-end">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('careerList', [...(careerList ?? []), initialPersonnelCareerVO]);
                }}
              />
            </Grid>
          )}
          {careerList.length > 0 && (
            <Grid container item sm={1} justifyContent="center">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('careerList', [...(careerList ?? []), initialPersonnelCareerVO]);
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
              경력 정보
            </Typography>
          </Grid>
        </Grid>
      )}
      {careerList.map((career,
                                     index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={edit ? 11.6 : 12}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    name={`careerList.${index}.companyName`}
                    label="근무처명"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    name={`careerList.${index}.majorJob`}
                    label="직급 및 담당업무"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    name={`careerList.${index}.startDate`}
                    label="입사일"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    name={`careerList.${index}.endDate`}
                    label="퇴사일"
                    labelPosition="top"
                  />
                </Grid>
              </Grid>
            </Grid>
            {edit && (
              <Grid container item sm={0.4} justifyContent="center" alignItems="center">
                <FontAwesomeIcon
                  style={{
                    color: ColorPalette._9bb6ea,
                    cursor: 'pointer'
                  }}
                  icon="trash"
                  onClick={() => {
                    formikContext!.setFieldValue('careerList', careerList.filter((manager,
                                                                                      j
                    ) => index !== j));
                  }}
                />
              </Grid>
            )}
          </Grid>
        );
      })}
      {careerList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          경력 정보가 없습니다.
        </Box>
      )}
    </Box>
  );
}
