import React, { useContext } from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { initialPersonnelAcademicParameter } from 'personnel/parameter';

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
            shape="basic1"
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
        {academicList.map((item,
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
              <TextField
                required
                name={`academicList.${i}.academyName`}
                label="교육기관명"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                required
                name={`academicList.${i}.major`}
                label="전공(과)"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`academicList.${i}.degree`}
                label="학위"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                required
                name={`academicList.${i}.state`}
                label="재적상태"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                name={`academicList.${i}.grade`}
                label="학점"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DateField
                required
                name={`academicList.${i}.startDate`}
                label="입학일"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DateField
                required
                name={`academicList.${i}.endDate`}
                label="졸업일"
                labelPosition="top"
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
