import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import { RivalBidVO } from 'project_basic/domain';

interface Props {
  rivalBidList: RivalBidVO[];
}

export default function ProjectBasicBidSection({ rivalBidList }: Props) {

  return (
    <SectionLayout title="최종 입찰 정보">
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <TextField
            status={FieldStatus.Disabled}
            name="bid.bidDate"
            label="입찰일자"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="bid.testAmount"
            label="풍동금액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="bid.reviewAmount"
            label="구검"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="bid.totalAmount"
            label="총액"
            labelWidth={7 * 6}
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            status={FieldStatus.Disabled}
            name="bid.expectedDuration"
            label="일정"
            labelWidth={7 * 6}
          />
        </Grid>
        {rivalBidList.map((e,
                           i
        ) => <React.Fragment key={e.id}>
          <Grid item sm={4}>
            <TextField
              status={FieldStatus.Disabled}
              name={`rivalBidList.${i}.business`}
              label="타업체"
              labelWidth={7 * 6}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              status={FieldStatus.Disabled}
              name={`rivalBidList.${i}.testAmount`}
              label="풍동금액"
              labelWidth={7 * 6}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              status={FieldStatus.Disabled}
              name={`rivalBidList.${i}.reviewAmount`}
              label="구검"
              labelWidth={7 * 6}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              status={FieldStatus.Disabled}
              name={`rivalBidList.${i}.totalAmount`}
              label="총액"
              labelWidth={7 * 6}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              status={FieldStatus.Disabled}
              name={`rivalBidList.${i}.expectedDuration`}
              label="일정"
              labelWidth={7 * 6}
            />
          </Grid>
        </React.Fragment>)}
      </Grid>
    </SectionLayout>
  );
}
