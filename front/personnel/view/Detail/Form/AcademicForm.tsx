import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';

export default function AcademicForm({ academicList, edit }) {

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
            학력 정보
          </Typography>
          <Button
            shape="basic1"
            children="+추가"
          />
        </Box>
      )}
      {academicList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          학력 정보가 없습니다.
        </Box>
      )}
      {academicList && academicList.map((academy,
                                         index
      ) => {
        return (
          <Grid container>
            <Grid item sm={12}>
              <Grid
                container
                item
                sm={12}>
                학력 정보
              </Grid>
            </Grid>
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
        );
      })}
    </Box>
  );
}
