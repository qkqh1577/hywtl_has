import React, { useContext } from 'react';
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  Radio,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import SelectField from 'components/SelectField';
import TextBox from 'layouts/Text';
import { DepartmentShort } from 'department/domain';
import { Option } from 'components/DataFieldProps';
import { initialPersonnelJobParameter } from 'personnel/parameter';

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
        <TextBox variant="body7">소속 정보</TextBox>
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
        {jobList.map((item,
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
                    required
                    disabled={!edit}
                    name="representativeJob"
                    value={item.department?.id}
                    checked={item.isRepresentative}
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
              {edit && (
                <SelectField
                  required
                  label="소속부서"
                  labelPosition="top"
                  name={`jobList.${i}.department.id`}
                  options={props.departmentList?.map(department => ({
                    key:  department.id,
                    text: department.name,
                  } as Option)) ?? undefined}
                />
              )}
              {!edit && (
                <TextField
                  label="소속부서"
                  labelPosition="top"
                  name={`jobList.${i}.department.name`}
                />
              )}
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                required
                label="직함"
                labelPosition="top"
                name={`jobList.${i}.jobTitle`}
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                required
                label="직종"
                labelPosition="top"
                name={`jobList.${i}.jobType`}
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                required
                label="직위"
                labelPosition="top"
                name={`jobList.${i}.jobPosition`}
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                label="직급"
                labelPosition="top"
                name={`jobList.${i}.jobClass`}
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                label="직책"
                labelPosition="top"
                name={`jobList.${i}.jobDuty`}
              />
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
