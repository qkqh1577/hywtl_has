import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ColorPalette } from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { initialPersonnelCareerParameter } from 'personnel/parameter';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const spaceCount = 6;
export default function CareerForm() {
  const formik = useContext(FormikContext);
  const careerList = formik.values.careerList ?? [];
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
        <TextBox variant="body7">경력 정보</TextBox>
        {edit && (
          <Button onClick={() => {
            formik.setFieldValue('careerList', [...careerList, initialPersonnelCareerParameter]);
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
        {!edit && careerList.length === 0 && (
          <Box sx={{
            display:     'flex',
            width:       '100%',
            paddingLeft: '50px',
            marginTop:   '15px',
          }}>
            <TextBox variant="body9">
              경력 정보가 없습니다
            </TextBox>
          </Box>
        )}
        {careerList.map((values,
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
                required={!edit}
                label="근무처명"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.companyName}
                  defaultValue={values.companyName ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.companyName !== value) {
                      formik.setFieldValue(`careerList.${i}.companyName`, value);
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
                required={!edit}
                label="직급 및 담당업무"
                labelPosition="top"
              >
                <Input
                  readOnly={!edit}
                  key={values.majorJob}
                  defaultValue={values.majorJob ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.majorJob !== value) {
                      formik.setFieldValue(`careerList.${i}.majorJob`, value);
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
                label="입사일"
                labelPosition="top"
              >
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  readOnly={!edit}
                  value={values.startDate ? dayjs(values.startDate)
                  .format('YYYY-MM-DD') : null}
                  onChange={(e) => {
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = values.startDate ? dayjs(values.startDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`careerList.${i}.startDate`, value);
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
                label="퇴사일"
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
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const formikValue = values.endDate ? dayjs(values.endDate)
                    .format('YYYY-MM-DD') : undefined;
                    if (formikValue !== value) {
                      formik.setFieldValue(`careerList.${i}.endDate`, value);
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
                    cursor: 'pointer',
                  }}
                  icon="trash"
                  onClick={() => {
                    formik.setFieldValue('careerList', careerList.filter((career,
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
