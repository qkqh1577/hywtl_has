import React, { useContext } from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import {
  businessManagerStatusList,
  businessManagerStatusName,
} from 'business/domain';
import TextField from 'components/TextField';
import { FormikContext } from 'formik';
import useDialog from 'components/Dialog';
import TextBox from 'layouts/Text';
import Button from 'layouts/Button';
import { initialBusinessManagerParameter } from 'business/parameter';
import DataFieldWithLabel from 'components/DataFieldLabel';
import Input from 'layouts/Input';
import Divider from 'layouts/Divider';

const spaceCount = 4;
export default function BusinessManagerListSection() {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const managerList = formik.values.managerList;
  const edit = formik.values.edit;

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'nowrap',
      width:    '100%',
      margin:   '10px 0px',
      padding:  '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '13%',
        justifyContent: 'flex-start',
        alignContent:   'flex-start',
      }}>
        <Box sx={{
          width:        '100%',
          marginBottom: '15px',
        }}>
          <TextBox variant="body7">담당자 정보</TextBox>
        </Box>
        {edit && (
          <Box sx={{
            width:          '100%',
            display:        'flex',
            justifyContent: 'flex-start',
          }}>
            <Button
              onClick={() => {
                formik.setFieldValue('managerList', [...(managerList ?? []), initialBusinessManagerParameter]);
              }}>
              +추가
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{
        display:        'flex',
        flexWrap:       'wrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'flex-start'
      }}>
        {!edit && managerList.length === 0 && (
          <Box sx={{
            display:     'flex',
            width:       '100%',
            marginTop:   '15px',
            paddingLeft: '50px',
          }}>
            <TextBox variant="body9">
              담당자 정보가 없습니다
            </TextBox>
          </Box>
        )}
        {managerList && managerList.map((manager,
                                         i
        ) => (
          <Box
            key={i}
            sx={{
              display:     'flex',
              width:       '100%',
              paddingLeft: '50px',
              marginTop:   '15px',
              flexWrap:    'wrap',
            }}>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                required
                name={`managerList.${i}.name`}
                label="담당자명"
              />
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                name={`managerList.${i}.department`}
                label="소속"
              />
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                name={`managerList.${i}.jobTitle`}
                label="직위"
              />
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                name={`managerList.${i}.mobilePhone`}
                label="핸드폰"
              />
            </Box>

            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                name={`managerList.${i}.officePhone`}
                label="전화번호"
              />
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                name={`managerList.${i}.meta`}
                label="메타"
              />
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <TextField
                name={`managerList.${i}.email`}
                label="이메일"
              />
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel
                label="상태"
                labelPosition="left"
              >
                {edit && (
                  <RadioGroup row>
                    {businessManagerStatusList.map(item => (
                      <FormControlLabel
                        key={item}
                        label={businessManagerStatusName(item)}
                        control={
                          <Radio
                            value={item as string}
                            checked={manager.status === item}
                            onChange={() => {
                              formik.setFieldValue(`managerList.i.status`, item);
                            }}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                )}
                {!edit && (
                  <FormControlLabel
                    label={businessManagerStatusName(manager.status)}
                    control={
                      <Radio
                        disabled
                        checked
                      />
                    }
                  />
                )}
              </DataFieldWithLabel>
            </Box>

            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              {edit && (
                <Box sx={{
                  display:        'flex',
                  paddingLeft:    'calc(100% - 80px)',
                  width:          '100%',
                  justifyContent: 'flex-end',
                }}>
                  <Button
                    shape="small3"
                    children="삭제"
                    onClick={() => {
                      if (managerList.length === 1) {
                        error('최소 하나 이상의 담당자 정보가 필요합니다.');
                        return;
                      }
                      formik.setFieldValue('managerList', managerList.filter((manager,
                                                                              j
                      ) => i !== j));
                    }}
                  />
                </Box>
              )}
              {!edit && (
                <DataFieldWithLabel label="담당 프로젝트">
                  <Input
                    disabled
                    defaultValue={manager.projectCount ?? '-'}
                  />
                </DataFieldWithLabel>
              )}
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
