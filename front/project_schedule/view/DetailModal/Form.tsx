import React from 'react';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import CheckboxField from 'components/CheckboxField';
import UserSelector from 'components/UserSelector';
import { FieldStatus } from 'components/DataFieldProps';

interface Props {
  edit: boolean;
}


export default function ({ edit }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <TextField
          name="title"
          label="일정명"
          labelPosition="top"
          status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
        />
      </Grid>
      <Grid container item sm={8} spacing={2}>
        <Grid item sm={4}>
          <DateField
            name="startTime"
            label="시작일"
            labelPosition="top"
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            type="time"
            name="start"
            label="시작시간"
            labelPosition="top"
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
            // inputProps={{
            //   step: 3600,
            // }}
          />
        </Grid>
        <Grid item sm={4}>
          <CheckboxField
            disableAll
            name="allday"
            label="종일사용"
            options={['종일사용']}
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
          />
        </Grid>
      </Grid>
      <Grid container item sm={8} spacing={2}>
        <Grid item sm={4}>
          <DateField
            name="endTime"
            label="종료일"
            labelPosition="top"
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            type="time"
            name="end"
            label="종료시간"
            labelPosition="top"
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
            // inputProps={{
            //   step: 3600,
            // }}
          />
        </Grid>
      </Grid>
      <Grid container item sm={12} spacing={2}>
        <Grid item sm={3}>
          <TextField
            name="alertBefore"
            label="미리 알림 사용"
            labelPosition="top"
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            name="manager.id"
            label="담당자"
            labelPosition="top"
            status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
          />
        </Grid>
      </Grid>
      <Grid item sm={12}>
        <UserSelector
          name="attendanceList.Id"
          label="일정 공유 대상"
          labelPosition="top"
          status={edit ? FieldStatus.View : FieldStatus.ReadOnly}
        />
      </Grid>
    </Grid>
  );
};
