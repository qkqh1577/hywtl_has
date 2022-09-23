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
  initialPersonnelLanguageVO,
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

export default function LanguageForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const languageList = formikContext.values.languageList;
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
              어학 정보
            </Typography>
          </Grid>
          {languageList.length === 0 && (
            <Grid container item sm={2} justifyContent="flex-end">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('languageList', [...(languageList ?? []), initialPersonnelLanguageVO]);
                }}
              />
            </Grid>
          )}
          {languageList.length > 0 && (
            <Grid container item sm={1} justifyContent="center">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('languageList', [...(languageList ?? []), initialPersonnelLanguageVO]);
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
              어학 정보
            </Typography>
          </Grid>
        </Grid>
      )}
      {languageList.map((language,
                         index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={edit ? 11.6 : 12}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    name={`languageList.${index}.name`}
                    label="자격증명"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`languageList.${index}.type`}
                    label="대상 언어"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`languageList.${index}.grade`}
                    label="급수, 종류"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`languageList.${index}.organizationName`}
                    label="발급기관명"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    name={`languageList.${index}.certifiedDate`}
                    label="취득일(시작일)"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    name={`languageList.${index}.expiryPeriod`}
                    label="유효기간(종료일)"
                    labelPosition="top"
                  />
                </Grid>
              </Grid>
            </Grid>
            {edit && (
              <Grid container item sm={0.4} justifyContent="center" alignItems="center">
                <IconButton
                  shape="square"
                  onClick={() => {
                    formikContext!.setFieldValue('languageList', languageList.filter((manager,
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
      {languageList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          어학 정보가 없습니다.
        </Box>
      )}
    </Box>
  );
}
