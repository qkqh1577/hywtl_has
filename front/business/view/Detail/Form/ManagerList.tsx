import React, { useContext } from 'react';
import {
  Box,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup
} from '@mui/material';
import {
  BusinessManagerId,
  BusinessManagerStatus,
  businessManagerStatusList,
  businessManagerStatusName,
} from 'business/domain';
import { FormikContext } from 'formik';
import TextBox from 'layouts/Text';
import Button from 'layouts/Button';
import { initialBusinessManagerParameter } from 'business/parameter';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Divider from 'layouts/Divider';
import { ColorPalette } from 'assets/theme';
import { DefaultFunction } from 'type/Function';
import { UpdateByFormik } from 'components/AddressModal/AddressModal';

interface Props {
  onAddressModal: DefaultFunction;
  setAddress: DefaultFunction<UpdateByFormik>;
  openProjectListModal: (id: BusinessManagerId) => void;
}

const spaceCount = 4;
export default function BusinessManagerListSection(props: Props) {
  const formik = useContext(FormikContext);
  const managerList = formik.values.managerList;
  const edit = formik.values.edit === false ? !formik.values.id : (formik.values.id && formik.values.edit);
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
          width:        '80%',
          marginBottom: '15px',
        }}>
          <TextBox variant="body7">담당자 정보</TextBox>
        </Box>
        {edit && (
          <Box sx={{
            width:          '80%',
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
              display:         'flex',
              width:           '100%',
              marginTop:       '15px',
              flexWrap:        'wrap',
              backgroundColor: `${manager.status === BusinessManagerStatus.RESIGNATION ? ColorPalette._e4e9f2 : 'white'}`,
            }}>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
              marginTop:    '15px',
            }}>
              <DataFieldWithLabel required={edit} label="담당자명">
                <Input
                  readOnly={!edit}
                  key={manager.name}
                  defaultValue={manager.name ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (manager.name !== value) {
                      formik.setFieldValue(`managerList.${i}.name`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
              marginTop:    '15px',
            }}>
              <DataFieldWithLabel label="소속">
                <Input
                  readOnly={!edit}
                  key={manager.department}
                  defaultValue={manager.department ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (manager.department !== value) {
                      formik.setFieldValue(`managerList.${i}.department`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
              marginTop:    '15px',
            }}>
              <DataFieldWithLabel label="직위">
                <Input
                  readOnly={!edit}
                  key={manager.jobTitle}
                  defaultValue={manager.jobTitle ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (manager.jobTitle !== value) {
                      formik.setFieldValue(`managerList.${i}.jobTitle`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
              marginTop:    '15px',
            }}>
              <DataFieldWithLabel label="핸드폰 번호">
                <Input
                  readOnly={!edit}
                  key={manager.mobilePhone}
                  defaultValue={manager.mobilePhone ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (manager.mobilePhone !== value) {
                      formik.setFieldValue(`managerList.${i}.mobilePhone`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel label="전화번호">
                <Input
                  readOnly={!edit}
                  key={manager.officePhone}
                  defaultValue={manager.officePhone ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (manager.officePhone !== value) {
                      formik.setFieldValue(`managerList.${i}.officePhone`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel label="메타">
                <Input
                  readOnly={!edit}
                  key={manager.meta}
                  defaultValue={Array.isArray(manager.meta) ? manager.meta.join(', ') : ''}
                  onBlur={(e) => {
                    const formikValue = Array.isArray(manager.meta) ? manager.meta.join(', ') : undefined;
                    const value = e.target.value || undefined;

                    if (formikValue !== value) {
                      const result: string[] | undefined = value
                        ? value.split(',')
                               .map(v => v.trim())
                               .filter(v => v !== '')
                        : undefined;
                      formik.setFieldValue(`managerList.${i}.meta`, result);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel label="이메일">
                <Input
                  readOnly={!edit}
                  key={manager.email}
                  defaultValue={manager.email ?? ''}
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (manager.email !== value) {
                      formik.setFieldValue(`managerList.${i}.email`, value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{
              width:        `calc((100% - ${100 + (15 * spaceCount)}px) / ${spaceCount})`,
              marginRight:  '30px',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel label="주소">
                <Input
                  readOnly={!edit}
                  key={manager.address}
                  value={manager.address ?? ''}
                  endAdornment={
                    <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                      <Button disabled={!edit} onClick={() => {
                        props.onAddressModal()
                        props.setAddress({formik: formik, fieldName: `managerList.${i}.address`})
                      }
                      }>
                        주소 검색
                      </Button>
                    </InputAdornment>
                  }
                />
              </DataFieldWithLabel>
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
                  <RadioGroup
                    row
                    value={manager.status}
                    defaultValue={BusinessManagerStatus.IN_OFFICE}
                    onChange={(e) => {
                      if (!edit) {
                        return;
                      }
                      if (manager.status !== e.target.value) {
                        formik.setFieldValue(`managerList.${i}.status`, e.target.value);
                      }
                    }}
                  >
                    {businessManagerStatusList.map(item => (
                      <FormControlLabel
                        key={item}
                        label={businessManagerStatusName(item)}
                        value={item}
                        control={
                          <Radio />
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
              {!edit && (
                <Box sx={{
                  display:    'flex',
                  alignItems: 'center',
                }}>
                  <DataFieldWithLabel label="담당 프로젝트">
                    <Input
                      disabled
                      key={manager.projectCount}
                      defaultValue={manager.projectCount ?? '-'}
                    />
                  </DataFieldWithLabel>
                  <Button
                    sx={{
                      ml: 1
                    }}
                    onClick={() => {
                      props.openProjectListModal(manager.id);
                    }}
                  >
                    상세
                  </Button>
                </Box>
              )}
              {edit && (
                <Box sx={{
                  display:        'flex',
                  paddingLeft:    'calc(100% - 80px)',
                  width:          '100%',
                  justifyContent: 'flex-end',
                  mt:             2
                }}>
                  <Button
                    shape="small3"
                    children="삭제"
                    onClick={() => {
                      formik.setFieldValue('managerList', managerList.filter((manager,
                                                                              j
                      ) => i !== j));
                    }}
                  />
                </Box>
              )}
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
