import React, { useContext } from 'react';
import {
  Box,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import UserSelector from 'components/UserSelector';
import { FormikContext } from 'formik';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import {
  DatePicker,
  TimePicker
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import TextBox from 'layouts/Text';
import MultiUserSelector from 'components/MultipleUserSelector';

export default function () {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit === true;

  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel required={!edit} label="일정명" labelPosition="top">
          <Input
            readOnly={!edit}
            variant="standard"
            placeholder="입력"
            key={formik.values.title}
            defaultValue={formik.values.title ?? ''}
            onBlur={(e) => {
              const value = e.target.value || undefined;
              if (value !== formik.values.title) {
                formik.setFieldValue('title', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        alignItems:   'center',
        marginBottom: '10px',
      }}>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel
            required={edit}
            label="시작일"
            labelPosition="top"
          >
            <DatePicker
              readOnly={!edit}
              value={formik.values.startTime ? dayjs(formik.values.startTime)
              .format('YYYY-MM-DD HH:mm') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="year"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('startTime', undefined);
                }
                else {
                  const value = formik.values.startTime || undefined;
                  const time = formik.values.allDay ? '00:00' : value ? dayjs(value)
                  .format('HH:mm') : '00:00';
                  formik.setFieldValue('startTime', dayjs(e)
                  .format('YYYY-MM-DD') + ` ${time}`);
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="standard"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel
            required={edit && !formik.values.allDay}
            label="시작 시간"
            labelPosition="top"
          >
            <TimePicker
              readOnly={!edit}
              ampm={false}
              mask="__:__"
              inputFormat="HH:mm"
              disabled={formik.values.allDay}
              value={formik.values.startTime ? dayjs(formik.values.startTime)
              .format('YYYY-MM-DD HH:mm') : null}
              onChange={(e) => {
                if (!e) {
                  formik.setFieldValue('startTime', undefined);
                }
                else {
                  const value = formik.values.startTime || undefined;
                  const date = dayjs(value)
                  .format('YYYY-MM-DD');
                  formik.setFieldValue('startTime', `${date} ` + dayjs(e)
                  .format('HH:mm'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="standard"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel
            label="종일 여부"
            labelPosition="top"
          >
            <Checkbox
              readOnly={!edit}
              checked={formik.values.allDay}
              onChange={() => {
                formik.setFieldValue('allDay', !formik.values.allDay);
              }}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        alignItems:   'center',
        marginBottom: '10px',
      }}>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel
            required={!edit}
            label="종료일"
            labelPosition="top"
          >
            <DatePicker
              readOnly={!edit}
              value={formik.values.endTime ? dayjs(formik.values.endTime)
              .format('YYYY-MM-DD HH:mm') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="year"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('endTime', undefined);
                }
                else {
                  const value = formik.values.endTime || undefined;
                  const time = formik.values.allDay ? '00:00' : value ? dayjs(value)
                  .format('HH:mm') : '00:00';
                  formik.setFieldValue('endTime', dayjs(e)
                  .format('YYYY-MM-DD') + ` ${time}`);
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="standard"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel
            required={edit && !formik.values.allDay}
            label="종료 시간"
            labelPosition="top"
          >
            <TimePicker
              readOnly={!edit}
              ampm={false}
              mask="__:__"
              inputFormat="HH:mm"
              disabled={formik.values.allDay}
              value={formik.values.endTime ? dayjs(formik.values.endTime)
              .format('YYYY-MM-DD HH:mm') : null}
              onChange={(e) => {
                if (!e) {
                  formik.setFieldValue('endTime', undefined);
                }
                else {
                  const value = formik.values.endTime || undefined;
                  const date = dayjs(value)
                  .format('YYYY-MM-DD');
                  formik.setFieldValue('endTime', `${date} ` + dayjs(e)
                  .format('HH:mm'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  variant="standard"
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          alignItems:  'center',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel label="미리 알림 사용" labelPosition="top">
            <Box sx={{
              display:    'flex',
              width:      '100%',
              alignItems: 'center',
            }}>
              <Checkbox
                readOnly={!edit}
                checked={typeof formik.values.alertBefore === 'number' && formik.values.alertBefore >= 0}
                onChange={() => {
                  if (typeof formik.values.alertBefore === 'number') {
                    formik.setFieldValue('alertBefore', undefined);
                  }
                  else {
                    formik.setFieldValue('alertBefore', 0);
                  }
                }}
              />
              <Input
                readOnly={!edit}
                variant="standard"
                type="number"
                placeholder="입력"
                key={formik.values.alertBefore}
                defaultValue={formik.values.alertBefore ?? ''}
                endAdornment={
                  <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                    <TextBox variant="body12">
                      일 전
                    </TextBox>
                  </InputAdornment>
                }
                onBlur={(e) => {
                  const value = +(e.target.value) || undefined;
                  if (value !== formik.values.alertBefore) {
                    formik.setFieldValue('alertBefore', value);
                  }
                }}
              />
            </Box>
          </DataFieldWithLabel>
        </Box>
        <Box sx={{
          display:     'flex',
          width:       '30%',
          flexWrap:    'nowrap',
          marginRight: '10px',
        }}>
          <DataFieldWithLabel required={edit} label="담당자" labelPosition="top">
            {!edit && (
              <Input
                readOnly
                variant="standard"
                key={formik.values.manager}
                defaultValue={formik.values.manager.name}
              />
            )}
            {edit && (
              <UserSelector
                value={formik.values.managerId}
                onChange={(value) => {
                  if (formik.values.managerId !== value) {
                    formik.setFieldValue('managerId', value);
                  }
                }}
              />
            )}
          </DataFieldWithLabel>
        </Box>
      </Box>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        marginBottom: '10px',
      }}>
        <DataFieldWithLabel label="일정 공유 대상" labelPosition="top">
          <MultiUserSelector
            readOnly={!edit}
            value={formik.values.attendanceList}
            onChange={(list) => {
              formik.setFieldValue('attendanceList', list);
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
};
