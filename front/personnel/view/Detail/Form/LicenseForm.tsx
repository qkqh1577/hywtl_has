import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ColorPalette } from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { initialPersonnelLicenseParameter } from 'personnel/parameter';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const spaceCount = 6;
export default function LicenseForm() {
  const formik = useContext(FormikContext);
  const licenseList = formik.values.licenseList ?? [];
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
        <TextBox variant="body7">면허 정보</TextBox>
        {edit && (
          <Button
            onClick={() => {
              formik.setFieldValue('licenseList', [...licenseList, initialPersonnelLicenseParameter]);
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
        {!edit && licenseList.length === 0 && (
          <Box sx={{
            display:     'flex',
            width:       '100%',
            marginTop:   '15px',
            paddingLeft: '50px',
          }}>
            <TextBox variant="body9">
              면허 정보가 없습니다
            </TextBox>
          </Box>
        )}
        {licenseList.map((values,
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
                label="면허정보"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.name}
                  defaultValue={values.name ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.name !== value) {
                      formik.setFieldValue(`licenseList.${i}.name`, value);
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
                label="종별"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.type}
                  defaultValue={values.type ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.type !== value) {
                      formik.setFieldValue(`licenseList.${i}.type`, value);
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
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.organizationName !== value) {
                      formik.setFieldValue(`licenseList.${i}.organizationName`, value);
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
                label="인가번호"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.qualifiedNumber}
                  defaultValue={values.qualifiedNumber ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.qualifiedNumber !== value) {
                      formik.setFieldValue(`licenseList.${i}.qualifiedNumber`, value);
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
                label="비고"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.note}
                  defaultValue={values.note ?? ''}
                  onBlur={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (values.note !== value) {
                      formik.setFieldValue(`licenseList.${i}.note`, value);
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
                label="만료일"
                labelPosition="top"
              >
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  readOnly={!edit}
                  value={values.qualifiedDate ? dayjs(values.qualifiedDate)
                  .format('YYYY-MM-DD') : null}
                  onChange={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = values.qualifiedDate ? dayjs(values.qualifiedDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`licenseList.${i}.qualifiedDate`, value);
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
                    formik.setFieldValue('licenseList', licenseList.filter((license,
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
