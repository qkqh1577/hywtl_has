import React, { useContext } from 'react';
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  Typography
} from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import { DepartmentShort } from 'department/domain';
import { initialPersonnelJobParameter } from 'personnel/parameter';
import RequiredMark from 'components/RequiredMark';
import DataFieldWithLabel from 'components/DataFieldLabel';
import Select from 'layouts/Select';
import Input from 'layouts/Input';

interface Props {
  departmentList: DepartmentShort[] | undefined;
}

const spaceCount = 7;
export default function JobForm(props: Props) {
  const formik = useContext(FormikContext);
  const jobList = formik.values.jobList ?? [];
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
        <TextBox variant="body7">
          <RequiredMark required={edit} text="소속 정보" />
        </TextBox>
        {edit && (
          <Button
            onClick={() => {
              formik.setFieldValue('jobList', [...jobList, initialPersonnelJobParameter]);
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
        {!edit && jobList.length === 0 && (
          <Box sx={{
            display:     'flex',
            width:       '100%',
            marginTop:   '15px',
            paddingLeft: '50px',
          }}>
            <TextBox variant="body9">
              소속 정보가 없습니다
            </TextBox>
          </Box>
        )}
        {jobList.map((values,
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
              <FormControl fullWidth variant="standard">
                {i === 0 && (
                  <FormLabel component="legend">
                    <Typography sx={{
                      color:      ColorPalette._9b9ea4,
                      fontSize:   '13px',
                      fontFamily: 'Noto Sans KR'
                    }}>
                      대표 정보
                    </Typography>
                  </FormLabel>
                )}
                <FormGroup row>
                  <Radio
                    disabled={!edit}
                    name="representativeJob"
                    value={values.department?.id}
                    checked={values.isRepresentative}
                    onChange={() => {
                      formik.setFieldValue('jobList', jobList.map(((job,
                                                                    j
                      ) => ({
                        ...job,
                        isRepresentative: i === j,
                      }))));
                    }}
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="소속부서"
                labelPosition="top"
              >
                <Select
                  disabled={!edit}
                  value={values.departmentId ?? ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (values.departmentId !== value) {
                      formik.setFieldValue(`jobList.${i}.departmentId`, value);
                    }
                  }}>
                  {props.departmentList?.map(item => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DataFieldWithLabel
                required={edit}
                label="직함"
                labelPosition="top"
              >
                <Input
                  disabled={!edit}
                  defaultValue={values.jobTitle ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.jobTitle !== value) {
                      formik.setFieldValue(`jobList.${i}.jobTitle`, value);
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
                label="직종"
                labelPosition="top"
              >
                <Input
                  disabled={!edit}
                  defaultValue={values.jobType ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.jobType !== value) {
                      formik.setFieldValue(`jobList.${i}.jobType`, value);
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
                label="직위"
                labelPosition="top"
              >
                <Input
                  disabled={!edit}
                  defaultValue={values.jobPosition ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.jobPosition !== value) {
                      formik.setFieldValue(`jobList.${i}.jobPosition`, value);
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
                label="직급"
                labelPosition="top"
              >
                <Input
                  disabled={!edit}
                  defaultValue={values.jobClass ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.jobClass !== value) {
                      formik.setFieldValue(`jobList.${i}.jobClass`, value);
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
                label="직책"
                labelPosition="top"
              >
                <Input
                  disabled={!edit}
                  defaultValue={values.jobDuty ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (values.jobDuty !== value) {
                      formik.setFieldValue(`jobList.${i}.jobDuty`, value);
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
                    formik.setFieldValue('jobList', jobList.filter((job,
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
