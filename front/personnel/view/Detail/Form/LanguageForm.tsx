import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';

export default function LanguageForm({ languageList, edit }) {
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
            어학 정보
          </Typography>
          <Button
            shape="basic1"
            children="+추가"
          />
        </Box>
      )}
      {languageList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          어학 정보가 없습니다.
        </Box>
      )}
      {languageList && languageList.map((language,
                                         index
      ) => {
        return (
          <Grid container>
            <Grid item sm={12}>
              <Grid container item sm={12}>어학 정보</Grid>
            </Grid>
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
        );
      })}
    </Box>
  );
}
