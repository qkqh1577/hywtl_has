import {
  Box,
  Typography
} from '@mui/material';
import { ArrowRight as RightIcon, } from '@mui/icons-material';
import React, { useContext } from 'react';
import IconButton from 'layouts/IconButton';
import SelectField from 'components/SelectField';
import {
  projectMemoCategoryList,
  projectMemoCategoryName
} from 'project_memo/domain';
import { ColorPalette } from 'app/view/App/theme';
import Button from 'layouts/Button';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import AttendanceListField from 'components/AttendanceListField';

export interface ProjectMemoFormProps {
  setOpen: (open: boolean) => void;
}

export default function ProjectMemoForm({ setOpen }: ProjectMemoFormProps) {
  const formik = useContext(FormikContext);
  const onSubmit = () => {
    formik.handleSubmit();
  };
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
        padding:  '15px 10px',
      }}>
        <IconButton
          children={<RightIcon />}
          onClick={() => {
            setOpen(false);
          }}
        />
        <Typography sx={{
          fontSize:   '14px',
          fontWeight: 'bold',
          color:      ColorPalette._252627,
          marginLeft: '10px',
        }}>
          메모
        </Typography>
      </Box>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'wrap',
        alignContent: 'flex-start',
      }}>
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'unwrap',
          padding:  '0 10px',
        }}>
          <Input
            required
            multiline
            value={formik.values.description ?? ''}
            variant="outlined"
            placeholder="메모 입력"
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (value !== formik.values.description) {
                formik.setFieldValue('description', value);
              }
            }}
          />
        </Box>
        <Box sx={{
          display:        'flex',
          width:          '100%',
          flexWrap:       'wrap',
          justifyContent: 'flex-start',
          padding:        '10px',
        }}>
          <AttendanceListField
            list={formik.values.attendanceList}
            afterSubmit={(list) => {
              formik.setFieldValue('attendanceList', list);
            }}
          />
        </Box>
        <Box sx={{
          display:        'flex',
          width:          '100%',
          flexWrap:       'unwrap',
          justifyContent: 'space-between',
          padding:        '0 10px',
          flex:           1,
          alignItems:     'center',
        }}>
          <Box sx={{
            display:     'flex',
            width:       '120px',
            marginRight: '10px',
          }}>
            <SelectField
              required
              disableLabel
              variant="outlined"
              name="category"
              label="카테고리"
              options={projectMemoCategoryList.map(item => ({
                key:  item as string,
                text: projectMemoCategoryName(item),
              }))}
            />
          </Box>
          <Button fullWidth onClick={onSubmit}>
            작성 완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
}