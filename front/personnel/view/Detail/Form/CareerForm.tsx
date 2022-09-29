import React, { useContext } from 'react';
import { Box } from '@mui/material';
import TextField from 'components/TextField';
import DateField from 'components/DateField';
import Button from 'layouts/Button';
import {
  initialPersonnelCareerVO,
  PersonnelVO
} from 'personnel/domain';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';

const spaceCount = 6;

export default function CareerForm() {
  const formikContext: FormikContextType<FormikEditable<PersonnelVO>> = useContext(FormikContext);
  const careerList = formikContext.values.careerList;
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
        <TextBox variant="body7">경력 정보</TextBox>
        {edit && (
          <Button
            shape="basic1"
            onClick={() => {
              formikContext!.setFieldValue('careerList', [...careerList, initialPersonnelCareerVO]);
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
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
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
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount} * 3 + 60px)`,
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
              width:       `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
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
              width: `calc((100% - ${100 + (30 * spaceCount - 1)}px) / ${spaceCount})`,
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
                    formikContext!.setFieldValue('careerList', careerList.filter((career,
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
