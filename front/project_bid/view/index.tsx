import { ProjectBidVO } from 'project_bid/domain';
import SectionLayout from 'layouts/SectionLayout';
import { Box } from '@mui/material';
import BusinessSelector from 'components/BusinessSelector';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { ProjectBidParameter } from 'project_bid/parameter';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

interface Props {
  detail: ProjectBidVO | undefined;
  onUpdate: DefaultFunction<ProjectBidParameter>;
}

export default function ProjectBidSection(props: Props) {
  const { detail } = props;

  return (
    <SectionLayout title="입찰 정보" modifiedAt={props.detail?.modifiedAt}>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        <Box
          sx={{
            width:          '100%',
            display:        'flex',
            flexWrap:       'unwrap',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   '15px',
          }}>
          <Box sx={{
            width:          '500px',
            display:        'flex',
            flexWrap:       'unwrap',
            alignItems:     'center',
            justifyContent: 'space-between'
          }}>
            <DataFieldWithLabel label="입찰 공고 기간">
              <DatePicker
                value={detail?.beginDate ? dayjs(detail?.beginDate)
                .format('YYYY-MM-DD') : null}
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                openTo="year"
                onChange={(e) => {
                  if (e === null) {
                    props.onUpdate({ beginDate: undefined });
                  }
                  else {
                    props.onUpdate({
                      beginDate: dayjs(e)
                                 .format('YYYY-MM-DD')
                    });
                  }
                }}
                renderInput={(parameter) => (
                  <Input
                    {...parameter.InputProps}
                    inputRef={parameter.inputRef}
                    value={parameter.value}
                    inputProps={parameter.inputProps}
                  />
                )}
              />
              <TextBox variant="body4" sx={{ margin: '10px 10px 0 15px' }}>~</TextBox>
              <DatePicker
                value={detail?.closeDate ? dayjs(detail?.closeDate)
                .format('YYYY-MM-DD') : null}
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                openTo="year"
                onChange={(e) => {
                  if (e === null) {
                    props.onUpdate({ closeDate: undefined });
                  }
                  else {
                    props.onUpdate({
                      closeDate: dayjs(e)
                                 .format('YYYY-MM-DD')
                    });
                  }
                }}
                renderInput={(parameter) => (
                  <Input
                    {...parameter.InputProps}
                    inputRef={parameter.inputRef}
                    value={parameter.value}
                    inputProps={parameter.inputProps}
                  />
                )}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:    '220px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel label="낙찰 업체">
              <BusinessSelector
                allowMyBusiness
                value={detail?.win?.id ?? ''}
                onChange={(value) => {
                  if (detail?.win?.id !== value) {
                    props.onUpdate({ winId: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:    '220px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel label="입찰 기관">
              <Input
                key={detail?.bidOrganization}
                defaultValue={detail?.bidOrganization ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (detail?.bidOrganization !== value) {
                    props.onUpdate({ bidOrganization: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        <Box sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'unwrap',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   '15px',
        }}>
          <Box sx={{
            width:    '290px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel label="입찰 일자">
              <DatePicker
                value={detail?.bidDate ? dayjs(detail?.bidDate)
                .format('YYYY-MM-DD') : null}
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                openTo="year"
                onChange={(e) => {
                  if (e === null) {
                    props.onUpdate({ bidDate: undefined });
                  }
                  else {
                    props.onUpdate({
                      bidDate: dayjs(e)
                               .format('YYYY-MM-DD')
                    });
                  }
                }}
                renderInput={(parameter) => (
                  <Input
                    {...parameter.InputProps}
                    inputRef={parameter.inputRef}
                    value={parameter.value}
                    inputProps={parameter.inputProps}
                  />
                )}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:    '200px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel label="풍동 금액">
              <Input
                isAmount
                key={detail?.testAmount}
                defaultValue={detail?.testAmount ?? ''}
                onBlur={(e) => {
                  const value = +(e.target.value) || undefined;
                  if (detail?.testAmount !== value) {
                    props.onUpdate({ testAmount: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel label="구검">
              <Input
                isAmount
                key={detail?.reviewAmount}
                defaultValue={detail?.reviewAmount ?? ''}
                onBlur={(e) => {
                  const value = +(e.target.value) || undefined;
                  if (detail?.reviewAmount !== value) {
                    props.onUpdate({ reviewAmount: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel labelWidth={25} label="총액">
              <Input
                isAmount
                key={detail?.totalAmount}
                defaultValue={detail?.totalAmount ?? ''}
                onBlur={(e) => {
                  const value = +(e.target.value) || undefined;
                  if (detail?.totalAmount !== value) {
                    props.onUpdate({ totalAmount: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            width:    '140px',
            display:  'flex',
            flexWrap: 'unwrap',
          }}>
            <DataFieldWithLabel labelWidth={25} label="일정">
              <Input
                key={detail?.expectedDuration}
                defaultValue={detail?.expectedDuration ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (detail?.expectedDuration !== value) {
                    props.onUpdate({ expectedDuration: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </SectionLayout>
  );
}