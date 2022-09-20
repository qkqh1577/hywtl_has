import React, { useContext } from 'react';
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import UserSelector from 'components/UserSelector';
import { FormikContext } from 'formik';
import {
  FieldStatus,
  FILED_CLEAR
} from 'components/DataFieldProps';

export default function () {
  const formik = useContext(FormikContext);
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <TextField
          name="title"
          label="일정명"
          labelPosition="top"
          placeholder="입력"
        />
      </Grid>
      <Grid container item sm={8} spacing={2}>
        <Grid item sm={4}>
          <DateField
            name="startTime"
            label="시작일"
            labelPosition="top"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            type="time"
            name="start"
            label="시작시간"
            labelPosition="top"
            status={formik.values.allDay ? FieldStatus.ReadOnly : FieldStatus.View}

          />
        </Grid>
        <Grid item sm={4}>
          <FormControl fullWidth variant="standard">
            <FormLabel component="legend">
              종일 여부
            </FormLabel>
          </FormControl>
          <FormGroup row>
            <Checkbox
              name="allDay_checked"
              value="Y"
              checked={formik.values.allDay === true}
              onChange={() => {
                formik.setFieldValue('allDay', !formik.values.allDay);
                formik.setFieldValue('start', FILED_CLEAR);
                formik.setFieldValue('end', FILED_CLEAR);
              }}
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container item sm={8} spacing={2}>
        <Grid item sm={4}>
          <DateField
            name="endTime"
            label="종료일"
            labelPosition="top"
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            type="time"
            name="end"
            label="종료시간"
            labelPosition="top"
            status={formik.values.allDay ? FieldStatus.ReadOnly : FieldStatus.View}
            inputProps={{
              min:  '00:00',
              max:  '23:30',
              step: 60 * 30
            }}
          />
        </Grid>
      </Grid>
      <Grid container item sm={12} spacing={2}>
        <Grid item sm={3}>
          <TextField
            type="number"
            name="alertBefore"
            label="미리 알림 사용"
            labelPosition="top"
            placeholder="입력"
            endAdornment={<>일 전</>}
            startAdornment={
              <InputAdornment position="start">
                <Checkbox
                  name="alertBefore_checked"
                  value="Y"
                  checked={typeof +formik.values.alertBefore === 'number' && +formik.values.alertBefore > 0}
                  onChange={() => {
                    const alertBefore = +formik.values.alertBefore;
                    if (!Number.isNaN(alertBefore) && alertBefore > 0) {
                      formik.setFieldValue('alertBefore', FILED_CLEAR);
                    }
                  }}
                />
              </InputAdornment>

            }
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            name="managerId"
            label="담당자"
            labelPosition="top"
          />
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <UserSelector
          name="attendanceIdList"
          label="일정 공유 대상"
          labelPosition="top"
        />
      </Grid>
    </Grid>
  );
};
