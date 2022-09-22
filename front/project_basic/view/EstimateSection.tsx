import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import { RivalEstimateVO } from 'rival_estimate/domain';

interface Props {
  rivalEstimateList: RivalEstimateVO[];
}

export default function ProjectBasicEstimateSection({ rivalEstimateList }: Props) {
  return (
    <SectionLayout title="최종 견적 정보">
      <Grid container spacing={2}>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="estimate.estimateDate"
            label="견적일자"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="estimate.estimateCode"
            label="견적번호"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="estimate.testAmount"
            label="풍동금액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="estimate.reviewAmount"
            label="구검"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="estimate.totalAmount"
            label="총액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="estimate.expectedDuration"
            label="일정"
            labelWidth={7 * 6}
          />
        </Grid>
        {rivalEstimateList.map((e,
                                i
        ) =>
          <React.Fragment key={e.id}>
            <Grid item sm={4}>
              <TextField
                status={FieldStatus.Disabled}
                name={`rivalEstimateList.${i}.business`}
                label="타업체"
                labelWidth={7 * 6}
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                status={FieldStatus.Disabled}
                name={`rivalEstimateList.${i}.testAmount`}
                label="풍동금액"
                labelWidth={7 * 6}
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                status={FieldStatus.Disabled}
                name={`rivalEstimateList.${i}.reviewAmount`}
                label="구검"
                labelWidth={7 * 6}
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                status={FieldStatus.Disabled}
                name={`rivalEstimateList.${i}.totalAmount`}
                label="총액"
                labelWidth={7 * 6}
              />
            </Grid>
            <Grid item sm={2}>
              <TextField
                status={FieldStatus.Disabled}
                name={`rivalEstimateList.${i}.expectedDuration`}
                label="일정"
                labelWidth={7 * 6}
              />
            </Grid>
          </React.Fragment>)}
      </Grid>
    </SectionLayout>
  );
}
