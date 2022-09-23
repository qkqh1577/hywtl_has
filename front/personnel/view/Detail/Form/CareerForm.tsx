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
import IconButton from 'components/IconButton';
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
      {careerList && careerList.map((career,
                                     index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={11.6}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    name={`careerList.${index}.academyName`}
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
            <Grid container item sm={0.4} justifyContent="center" alignItems="center">
              <IconButton
                shape="square"
                onClick={() => {
                  formikContext!.setFieldValue('careerList', careerList.filter((manager,
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
