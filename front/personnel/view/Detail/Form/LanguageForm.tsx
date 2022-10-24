import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ColorPalette } from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { initialPersonnelLanguageParameter } from 'personnel/parameter';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const spaceCount = 6;

export default function LanguageForm() {
  const formik = useContext(FormikContext);
  const languageList = formik.values.languageList ?? [];
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
        <TextBox variant="body7">어학 정보</TextBox>
        {edit && (
          <Button
            onClick={() => {
              formik.setFieldValue('languageList', [...languageList, initialPersonnelLanguageParameter]);
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
        {!edit && languageList.length === 0 && (
          <Box sx={{
            display:     'flex',
            width:       '100%',
            marginTop:   '15px',
            paddingLeft: '50px',
          }}>
            <TextBox variant="body9">
              어학 정보가 없습니다
            </TextBox>
          </Box>
        )}
        {languageList.map((values,
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
              <DataFieldWithLabel
                required={edit}
                label="자격증명"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.name}
                  defaultValue={values.name ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.name !== value) {
                      formik.setFieldValue(`languageList.${i}.name`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="대상 언어"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.type}
                  defaultValue={values.type ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.type !== value) {
                      formik.setFieldValue(`languageList.${i}.type`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="급수, 종류"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.grade}
                  value={values.grade ?? ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (values.grade !== value) {
                      formik.setFieldValue(`languageList.${i}.grade`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="발급기관명"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.organizationName}
                  defaultValue={values.organizationName ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.organizationName !== value) {
                      formik.setFieldValue(`languageList.${i}.organizationName`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="취득일(시작일)"
                labelPosition="top"
              >
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  readOnly={!edit}
                  value={values.certifiedDate ? dayjs(values.certifiedDate)
                  .format('YYYY-MM-DD') : null}
                  onChange={(e) => {
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = values.certifiedDate ? dayjs(values.certifiedDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`languageList.${i}.certifiedDate`, value);
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
                label="유효기간(종료일)"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.expiryPeriod}
                  defaultValue={values.expiryPeriod ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.expiryPeriod !== value) {
                      formik.setFieldValue(`languageList.${i}.expiryPeriod`, value);
                    }
                  }}
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
                    cursor: 'pointer',
                  }}
                  icon="trash"
                  onClick={() => {
                    formik.setFieldValue('languageList', languageList.filter((language,
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
