import React, {
  Dispatch,
  SetStateAction,
  useContext
} from 'react';
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import UserSelector from 'components/UserSelector';
import { FormikContext } from 'formik';

interface Props {
  useAlertBeforeChecked: boolean;
  setUseAlertBeforeChecked: Dispatch<SetStateAction<boolean>>;
}

export default function (props: Props) {
  const {
          useAlertBeforeChecked,
          setUseAlertBeforeChecked
        } = props;
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
            name="start"
            label="시작시간"
            labelPosition="top"
            type="time"
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
          />
        </Grid>
      </Grid>
      <Grid container item sm={12} spacing={2}>
        <Grid item sm={3}>
          <TextField
            name="alertBefore"
            label="미리 알림 사용"
            labelPosition="top"
            placeholder="입력"
            endAdornment={<>일 전</>}
            startAdornment={
              <Checkbox
                name="alertBefore_checked"
                value="Y"
                checked={useAlertBeforeChecked}
                onChange={(e) => {
                  setUseAlertBeforeChecked(!useAlertBeforeChecked)
                }}
              />
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
