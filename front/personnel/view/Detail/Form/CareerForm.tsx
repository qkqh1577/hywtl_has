import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';

export default function CareerForm({ careerList, edit }) {
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
            경력 정보
          </Typography>
          <Button
            shape="basic1"
            children="+추가"
          />
        </Box>)}
      {careerList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          경력 정보가 없습니다.
        </Box>
      )}
      {careerList && careerList.map((career,
                                     index
      ) => {
        return (
          <Grid container>
            <Grid item sm={12}>
              <Grid container item sm={12}>경력 정보</Grid>
            </Grid>
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
        );
      })}
    </Box>
  );
}
