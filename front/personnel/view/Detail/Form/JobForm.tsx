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
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  initialPersonnelJobVO,
  PersonnelVO,
} from 'personnel/domain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import SelectField from 'components/SelectField';
import { FormikEditable } from 'type/Form';
import TextBox from 'layouts/Text';

const spaceCount = 7;

export default function JobForm(props) {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const jobList = formikContext.values.jobList;
  const edit = formikContext?.values.edit ?? true;
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
              formikContext!.setFieldValue('jobList', [...jobList, initialPersonnelJobVO]);
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
                      formikContext.setFieldValue('jobList', jobList.map(((job,
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
                  options={props.departmentList}
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
                    formikContext!.setFieldValue('jobList', jobList.filter((job,
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
