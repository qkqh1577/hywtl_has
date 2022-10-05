import React, { useContext } from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { initialPersonnelCareerParameter } from 'personnel/parameter';

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
          <Button
            shape="basic1"
            onClick={() => {
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
        {careerList.map((item,
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
                labelPosition="top"
                name={`careerList.${i}.companyName`}
                label="근무처명"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <TextField
                required
                name={`careerList.${i}.majorJob`}
                label="직급 및 담당업무"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DateField
                required
                name={`careerList.${i}.startDate`}
                label="입사일"
                labelPosition="top"
              />
            </Box>
            <Box sx={{
              width:       `calc((100% - ${100 + (30 * spaceCount)}px) / ${spaceCount})`,
              marginRight: '30px',
            }}>
              <DateField
                required
                name={`careerList.${i}.endDate`}
                label="퇴사일"
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
