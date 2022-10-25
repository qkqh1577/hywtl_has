import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ColorPalette } from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { initialPersonnelAcademicParameter } from 'personnel/parameter';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const spaceCount = 7;
export default function AcademicForm() {
  const formik = useContext(FormikContext);
  const academicList = formik.values.academicList ?? [];
  const edit = formik.values.edit;
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
      }}>
        <TextBox variant="body7">학력 정보</TextBox>
        {edit && (
          <Button
            onClick={() => {
              formik.setFieldValue('academicList', [...academicList, initialPersonnelAcademicParameter]);
            }}>
            + 추가
          </Button>
        )}
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'flex-start'
      }}>
        {!edit && academicList.length === 0 && (
          <Box sx={{
            display:     'flex',
            width:       '100%',
            marginTop:   '15px',
            paddingLeft: '50px',
          }}>
            <TextBox variant="body9">
              학력 정보가 없습니다
            </TextBox>
          </Box>
        )}
        {academicList.map((values,
                           i
        ) => (
          <Box
            key={i}
            sx={{
              display:     'flex',
              width:       '100%',
              paddingLeft: '50px',
              marginTop:   '15px',
            }}>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel required={edit} label="직책" labelPosition="top">
                <Input
                  readOnly={!edit}
                  key={values.academyName}
                  defaultValue={values.academyName ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.academyName !== value) {
                      formik.setFieldValue(`academicList.${i}.academyName`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel required={edit} label="전공(과)" labelPosition="top">
                <Input
                  readOnly={!edit}
                  key={values.major}
                  defaultValue={values.major ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.major !== value) {
                      formik.setFieldValue(`academicList.${i}.major`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel label="학위" labelPosition="top">
                <Input
                  readOnly={!edit}
                  key={values.degree}
                  defaultValue={values.degree ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.degree !== value) {
                      formik.setFieldValue(`academicList.${i}.degree`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel label="재적상태" labelPosition="top">
                <Input
                  readOnly={!edit}
                  key={values.state}
                  defaultValue={values.state ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.state !== value) {
                      formik.setFieldValue(`academicList.${i}.state`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel label="학점" labelPosition="top">
                <Input
                  readOnly={!edit}
                  key={values.grade}
                  defaultValue={values.grade ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.grade !== value) {
                      formik.setFieldValue(`academicList.${i}.grade`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel required={edit} label="입학일" labelPosition="top">
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  readOnly={!edit}
                  value={values.startDate ? dayjs(values.startDate)
                  .format('YYYY-MM-DD') : null}
                  onChange={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = values.startDate ? dayjs(values.startDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`academicList.${i}.startDate`, value);
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
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="졸업일"
                labelPosition="top"
              >
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  readOnly={!edit}
                  value={values.endDate ? dayjs(values.endDate)
                  .format('YYYY-MM-DD') : null}
                  onChange={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = values.endDate ? dayjs(values.endDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`academicList.${i}.endDate`, value);
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
              display:        'flex',
              justifyContent: 'center',
              alignItems:     'flex-end',
              width:          '50px',
              height:         '60.69px',
              fontSize:       '18px',
              paddingBottom:  '12px',
            }}>
              {edit && (
                <FontAwesomeIcon
                  style={{
                    color:  ColorPalette._9bb6ea,
                    cursor: 'pointer'
                  }}
                  icon="trash"
                  onClick={() => {
                    formik.setFieldValue('academicList', academicList.filter((academic,
                                                                              j
                    ) => i !== j));
                  }}
                />
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
