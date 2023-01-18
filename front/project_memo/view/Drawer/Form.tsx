import {
  Box,
  MenuItem,
  Typography
} from '@mui/material';
import { ArrowRight as RightIcon, } from '@mui/icons-material';
import React, { useContext } from 'react';
import IconButton from 'layouts/IconButton';
import {
  projectMemoCategoryList,
  projectMemoCategoryName
} from 'project_memo/domain';
import { ColorPalette } from 'assets/theme';
import Button from 'layouts/Button';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import Select from 'layouts/Select';
import UserSelector from "../../../components/UserSelector";

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
            key={formik.values.description}
            defaultValue={formik.values.description ?? ''}
            variant="outlined"
            placeholder="메모 입력"
            onBlur={(e) => {
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
          <UserSelector
            multi
            value={formik.values.attendanceList}
            onChange={(value) => {
              formik.setFieldValue('attendanceList', value);
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
            <Select
              required
              variant="outlined"
              value={formik.values.category ?? ''}
              onChange={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.category !== value) {
                  formik.setFieldValue('category', value);
                }
              }}>
              {projectMemoCategoryList.map(item => (
                <MenuItem key={item} value={item}>
                  {projectMemoCategoryName(item)}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button fullWidth onClick={onSubmit}>
            작성 완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
}