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
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import {
  initialPersonnelAcademicVO,
  PersonnelVO
} from 'personnel/domain';
import IconButton from 'components/IconButton';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AcademicForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const academicList = formikContext.values.academicList;
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
              학력 정보
            </Typography>
          </Grid>
          {academicList.length === 0 && (
            <Grid container item sm={2} justifyContent="flex-end">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('academicList', [...(academicList ?? []), initialPersonnelAcademicVO]);
                }}
              />
            </Grid>
          )}
          {academicList.length > 0 && (
            <Grid container item sm={1} justifyContent="center">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('academicList', [...(academicList ?? []), initialPersonnelAcademicVO]);
                }}
              />
            </Grid>
          )}
        </Grid>
      )}
      {academicList.map((academy,
                         index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={11.6}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    name={`academicList.${index}.academyName`}
                    label="교육기관명"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`academicList.${index}.major`}
                    label="전공(과)"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`academicList.${index}.degree`}
                    label="학위"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={1}>
                  <TextField
                    name={`academicList.${index}.state`}
                    label="재적상태"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={1}>
                  <TextField
                    name={`academicList.${index}.grade`}
                    label="학점"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    name={`academicList.${index}.startDate`}
                    label="입학일"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    name={`academicList.${index}.endDate`}
                    label="졸업일"
                    labelPosition="top"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item sm={0.4} justifyContent="center" alignItems="center">
              <IconButton
                shape="square"
                onClick={() => {
                  formikContext!.setFieldValue('academicList', academicList.filter((manager,
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
        )
          ;
      })}
      {academicList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          학력 정보가 없습니다.
        </Box>
      )}
    </Box>
  );
}
