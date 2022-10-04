import React, { useContext } from 'react';
import { Box } from '@mui/material';
import {
  businessManagerStatusList,
  businessManagerStatusName,
  initialBusinessManagerVO,
} from 'business/domain';
import TextField from 'components/TextField';
import { FormikContext } from 'formik';
import useDialog from 'components/Dialog';
import RadioField from 'components/RadioField';
import TextBox from 'layouts/Text';
import Button from 'layouts/Button';

const spaceCount = 4;
export default function () {
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
        flexWrap:       'nowrap',
        width:          '13%',
        justifyContent: 'flex-start',
        alignItems:     'flex-start'
      }}>
        <TextBox variant="body7">담당자 정보</TextBox>
        {edit && (
          <Button
            shape="basic1"
            onClick={() => {
              formik!.setFieldValue('managerList', [...(managerList ?? []), initialBusinessManagerVO]);
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
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'flex-start',
              width:          `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight:    '30px',
            }}>
              <TextField
                required
                name={`managerList.${i}.name`}
                label="담당자명"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`managerList.${i}.department`}
                label="소속"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`managerList.${i}.jobTitle`}
                label="직위"
              />
            </Box>
            <Box sx={{
              width: `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
            }}>
              <TextField
                name={`managerList.${i}.mobilePhone`}
                label="핸드폰"
              />
            </Box>

            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`managerList.${i}.officePhone`}
                label="전화번호"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`managerList.${i}.meta`}
                label="메타"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`managerList.${i}.email`}
                label="이메일"
              />
            </Box>
            <Box sx={{
              width: `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
            }}>
              <RadioField
                name={`managerList.${i}.status`}
                label="상태"
                options={businessManagerStatusList.map((item) => ({
                  key:  item,
                  text: businessManagerStatusName(item)
                }))}
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`managerList.${i}.projectCount`}
                label="담당 프로젝트"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              {edit && (
                <Button
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
              )}
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}
            />
            <Box sx={{
              width: `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
            }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
