import React from 'react';
import {
  Box,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import Button from 'layouts/Button';

function RowData() {
  return(
    <Grid container>
      <Grid item sm={2}>
        <Grid container item sm={12}>소속 정보</Grid>
        <Grid container item sm={12}>대표 소속 정보</Grid>
      </Grid>
      <Grid item sm={10}>
        <Grid container item sm={12} spacing={2}>
          <Grid item sm={2}>
            <TextField
              name={`jobList.department`}
              label="소속부서"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name={`jobList.jobTitle`}
              label="직함"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name={`jobList.jobType`}
              label="직종"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name={`jobList.jobPosition`}
              label="직위"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name={`jobList.jobClass`}
              label="직급"
              labelPosition="top"
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name={`jobList.jobDuty`}
              label="직책"
              labelPosition="top"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

function AddRowButton() {
  const onClick = () => {

  }

  return(
    <Button
      shape="basic1"
      children="+추가"
    />
  )
}

export default function JobForm({ jobList, edit }) {
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
            소속 정보
          </Typography>
          <AddRowButton />
        </Box>
      )}
      {jobList.length === 0 && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
        }}>
          소속 정보가 없습니다.
        </Box>
      )}
      {jobList.map((job,
                    index
      ) => {
        return (
          <Grid container key={index}>
            <Grid item sm={2}>
              <Grid container item sm={12}>소속 정보</Grid>
              <Grid container item sm={12}>대표 소속 정보</Grid>
            </Grid>
            <Grid item sm={10}>
              <Grid container item sm={12} spacing={2}>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.department`}
                    label="소속부서"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobTitle`}
                    label="직함"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobType`}
                    label="직종"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobPosition`}
                    label="직위"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobClass`}
                    label="직급"
                    labelPosition="top"
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name={`jobList.${index}.jobDuty`}
                    label="직책"
                    labelPosition="top"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
