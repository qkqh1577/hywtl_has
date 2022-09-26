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
  initialPersonnelLicenseVO,
  PersonnelVO
} from 'personnel/domain';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LicenseForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const licenseList = formikContext.values.licenseList;
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
              면허 정보
            </Typography>
          </Grid>
          {licenseList.length === 0 && (
            <Grid container item sm={2} justifyContent="flex-end">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('licenseList', [...(licenseList ?? []), initialPersonnelLicenseVO]);
                }}
              />
            </Grid>
          )}
          {licenseList.length > 0 && (
            <Grid container item sm={1} justifyContent="center">
              <Button
                shape="basic1"
                children="+추가"
                onClick={() => {
                  formikContext!.setFieldValue('licenseList', [...(licenseList ?? []), initialPersonnelLicenseVO]);
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
              면허 정보
            </Typography>
          </Grid>
        </Grid>
      )}
      {licenseList.map((license,
                        index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={edit ? 11.6 : 12}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    required
                    name={`licenseList.${index}.name`}
                    label="면허정보"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`licenseList.${index}.type`}
                    label="종별"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    required
                    name={`licenseList.${index}.organizationName`}
                    label="발급기관명"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    required
                    name={`licenseList.${index}.qualifiedNumber`}
                    label="인가번호"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`licenseList.${index}.note`}
                    label="비고"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <DateField
                    required
                    name={`licenseList.${index}.qualifiedDate`}
                    label="만료일"
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
                    formikContext!.setFieldValue('licenseList', licenseList.filter((manager,
                                                                                      j
                    ) => index !== j));
                  }}
                />
              </Grid>
            )}
          </Grid>
        );
      })}
      {licenseList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          면허 정보가 없습니다.
        </Box>
      )}
    </Box>
  );
}
