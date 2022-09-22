import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';

export default function LicenseForm({ licenseList, edit }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px'
    }}>
      {edit && (
        <Box sx={{
          display:        'flex',
          flexWrap:       'wrap',
          justifyContent: 'space-between'
        }}>
          <Typography>
            면허 정보
          </Typography>
          <Button
            shape="basic1"
            children="+추가"
          />
        </Box>
      )}
      {licenseList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          면허 정보가 없습니다.
        </Box>
      )}
      {licenseList && licenseList.map((license,
                                       index
      ) => {
        return (
          <Grid container>
            <Grid item sm={12}>
              <Grid container item sm={12}>면허 정보</Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={2}>
                <TextField
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
                  name={`licenseList.${index}.organizationName`}
                  label="발급기관명"
                  labelPosition="top"
                />
              </Grid>
              <Grid item sm={2}>
                <TextField
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
                  name={`licenseList.${index}.qualifiedDate`}
                  label="만료일"
                  labelPosition="top"
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
