import {
  Box,
  InputAdornment,
  MenuItem
} from '@mui/material';
import React, {
  useContext,
  useEffect,
} from 'react';
import { ColorPalette } from 'assets/theme';
import TextBox from 'layouts/Text';
import ComplexSite from 'project_estimate/view/SystemModal/LeftForm/ComplexSite';
import ComplexBuilding from 'project_estimate/view/SystemModal/LeftForm/ComplexBuilding';
import { DefaultFunction } from 'type/Function';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import { toAmount } from 'util/NumberUtil';
import Select from 'layouts/Select';

interface Props {
  openDocumentModal: DefaultFunction<number>;
}

export default function ProjectCustomEstimateExtensionModalForm(props: Props) {

  const formik = useContext(FormikContext);
  const plan = formik.values.plan;
  const isLh = plan.isLh;

  useEffect(() => {
    const testAmount = plan.testAmount || 0;
    const reviewAmount = plan.reviewAmount || 0;
    const discountAmount = plan.discountAmount || 0;

    const temp = testAmount + reviewAmount - discountAmount;
    if (plan.totalAmount !== temp) {
      formik.setFieldValue('plan.totalAmount', temp);
    }
  }, [plan]);

  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
    }}>
      <Box sx={{
        width:             '100%',
        display:           'flex',
        flexWrap:          'wrap',
        justifyContent:    'space-around',
        marginBottom:      '15px',
        border:            `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:      '5px',
        padding:           '10px',
        '& > div':         {
          display:    'flex',
          alignItems: 'center',
          margin:     '10px'
        },
        '& > .firstLine':  {
          width: 'calc(100% / 5)',
        },
        '& > .secondLine': {
          width: 'calc(100% / 6)',
        }
      }}>
        <Box className="firstLine">
          <DataFieldWithLabel label="견적 일자" labelPosition="top">
            <DatePicker
              key={plan.estimateDate}
              value={plan.estimateDate ? dayjs(plan.estimateDate)
              .format('YYYY-MM-DD') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="year"
              onChange={(e,
                         r
              ) => {
                const date = dayjs(e);
                if (plan.estimateDate !== r) {

                  if (date.isValid() && date.format('YYYY-MM-DD') === r) {
                    formik.setFieldValue('plan.estimateDate', r);
                  }
                  else {
                    formik.setFieldValue('plan.estimateDate', undefined);
                  }
                }
              }}
              onAccept={(e) => {
                if (e === null) {
                  formik.setFieldValue('plan.estimateDate', undefined);
                }
                else {
                  formik.setFieldValue('plan.estimateDate', dayjs(e)
                  .format('YYYY-MM-DD'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  inputProps={parameter.inputProps}
                  defaultValue={parameter.value}
                  onChange={undefined}
                  onBlur={parameter.onChange}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="firstLine">
          <DataFieldWithLabel label="착수 가능일" labelPosition="top">
            <DatePicker
              value={plan.expectedServiceDate ? dayjs(plan.expectedServiceDate)
              .format('YYYY-MM-DD') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="year"
              onChange={(e,
                         r
              ) => {
                const date = dayjs(e);
                if (plan.expectedServiceDate !== r) {

                  if (date.isValid() && date.format('YYYY-MM-DD') === r) {
                    formik.setFieldValue('plan.expectedServiceDate', r);
                  }
                  else {
                    formik.setFieldValue('plan.expectedServiceDate', undefined);
                  }
                }
              }}
              onAccept={(e) => {
                if (e === null) {
                  formik.setFieldValue('plan.expectedServiceDate', undefined);
                }
                else {
                  formik.setFieldValue('plan.expectedServiceDate', dayjs(e)
                  .format('YYYY-MM-DD'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  inputProps={parameter.inputProps}
                  defaultValue={parameter.value}
                  onChange={undefined}
                  onBlur={parameter.onChange}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="firstLine">
          <DataFieldWithLabel label="설풍 납품 가능 주" labelPosition="top">
            <Input
              key={plan.expectedTestDeadline}
              type="number"
              defaultValue={plan.expectedTestDeadline ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (plan.expectedTestDeadline !== value) {
                  formik.setFieldValue('plan.expectedTestDeadline', value);
                }
              }}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  <TextBox variant="body12">주</TextBox>
                </InputAdornment>
              }
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="firstLine">
          <DataFieldWithLabel label="최종 보고서 납품 가능 주" labelPosition="top">
            <Input
              key={plan.expectedFinalReportDeadline}
              type="number"
              defaultValue={plan.expectedFinalReportDeadline ?? ''}
              onBlur={(e) => {
                const value = +(e.target.value) || undefined;
                if (plan.expectedFinalReportDeadline !== value) {
                  formik.setFieldValue('plan.expectedFinalReportDeadline', value);
                }
              }}
              endAdornment={
                <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                  <TextBox variant="body12">주</TextBox>
                </InputAdornment>
              }
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="secondLine">
          <DataFieldWithLabel label="풍동 금액" labelPosition="top">
            <Input
              isAmount
              key={plan.testAmount}
              defaultValue={plan.testAmount?.toLocaleString() ?? ''}
              onBlur={(e) => {
                const value = toAmount(e.target.value) || 0;
                if (plan.testAmount !== value) {
                  formik.setFieldValue('plan.testAmount', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="secondLine">
          <DataFieldWithLabel label="구검" labelPosition="top">
            <Input
              isAmount
              key={plan.reviewAmount}
              defaultValue={plan.reviewAmount?.toLocaleString() ?? ''}
              onBlur={(e) => {
                const value = toAmount(e.target.value) || 0;
                if (plan.reviewAmount !== value) {
                  formik.setFieldValue('plan.reviewAmount', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="secondLine">
          <DataFieldWithLabel label="특별할인" labelPosition="top">
            <Input
              isAmount
              key={plan.discountAmount}
              defaultValue={plan.discountAmount?.toLocaleString() ?? ''}
              onBlur={(e) => {
                const value = toAmount(e.target.value) || 0;
                if (plan.discountAmount !== value) {
                  formik.setFieldValue('plan.discountAmount', value);
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="secondLine">
          <DataFieldWithLabel label={`합계(부가세 ${isLh ? '면제' : '별도'})`} labelPosition="top">
            <Input
              isAmount
              readOnly
              key={plan.totalAmount}
              defaultValue={plan.totalAmount?.toLocaleString() ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="secondLine">
          <DataFieldWithLabel required label="LH 여부" labelPosition="top">
            <Select
              displayEmpty
              value={typeof formik.values.plan.isLh === 'boolean' ? (formik.values.plan.isLh ? 'Y' : 'N') : ''}
              onChange={(e) => {
                const value = e.target.value || undefined;
                if (value === 'Y') {
                  formik.setFieldValue('plan.isLh', true);
                }
                else {
                  formik.setFieldValue('plan.isLh', false);
                }
              }}>
              <MenuItem value="Y">Y</MenuItem>
              <MenuItem value="N">N</MenuItem>
            </Select>
          </DataFieldWithLabel>
        </Box>
      </Box>
      <Box sx={{
        width:                        '100%',
        overflowX:                    'scroll',
        display:                      'flex',
        flexWrap:                     'wrap',
        alignContent:                 'flex-start',
        border:                       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:                 '5px',
        padding:                      '10px',
        '&::-webkit-scrollbar':       {
          width:           '10px',
          height:          '10px',
          backgroundColor: ColorPalette._e4e9f2,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ColorPalette._697183,
        }
      }}>
        <Box sx={{
          display:      'flex',
          flexWrap:     'nowrap',
          marginBottom: '10px',
        }}>
          <TextBox variant="body19" sx={{ marginRight: '10px' }}>형상비</TextBox>
          <TextBox variant="body12">이곳에서 수정된 대지모형 정보와 동 정보는 실제 '단지 정보'에 반영되지 않습니다</TextBox>
        </Box>
        <ComplexSite />
        <ComplexBuilding openDocumentModal={props.openDocumentModal} />
      </Box>
    </Box>
  );
}

