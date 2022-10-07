import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import SelectField from 'components/SelectField';
import UserSelector from 'components/UserSelector';
import {
  projectBasicBidTypeList,
  projectBasicBidTypeName
} from 'project_status/domain';

interface Props {
  handleChangeBidType: (e) => void;
}

export default function ProjectBasicBasicSection({ handleChangeBidType }: Props) {

  return (
    <SectionLayout title="기본 정보">
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <TextField
            status={FieldStatus.Disabled}
            name="code"
            label="프로젝트 번호"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            required
            name="alias"
            label="프로젝트 닉네임"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            name="name"
            label="프로젝트 풀네임"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <SelectField
            required
            name="bidType"
            label="견적 구분"
            options={projectBasicBidTypeList.map((item) => ({
              key:  item as string,
              text: projectBasicBidTypeName(item),
            }))}
            onChange={handleChangeBidType}
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            required
            name="receptionManagerId"
            label="문의 접수자"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            name="salesManagerId"
            label="영업 담당자"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            name="projectManagerId"
            label="담당 PM"
            labelWidth={7 * 13}
          />
        </Grid>
        <Grid item sm={3}>
          예상 착수 시기 TBD
        </Grid>
        <Grid item sm={3}>
          요청 일정 TBD
        </Grid>
        <Grid item sm={3}>
          <SelectField
            name="isLh"
            label="LH 여부"
            options={[{
              key:  'true',
              text: '예'
            }, {
              key:  'false',
              text: '아니오'
            }]}
            labelWidth={7 * 13}
          />
        </Grid>
      </Grid>
    </SectionLayout>
  );
}
