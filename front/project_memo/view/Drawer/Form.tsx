import {
  Box,
  Typography
} from '@mui/material';
import {
  ArrowRight as RightIcon,
} from '@mui/icons-material';
import React from 'react';
import IconButton from 'components/IconButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  projectMemoCategoryList,
  projectMemoCategoryName
} from 'project_memo/domain';
import { ColorPalette } from 'app/view/App/theme';
import Button from 'layouts/Button';

export interface ProjectMemoFormProps {
  setOpen: (open: boolean) => void;
  onSubmit: () => void;
}

export default function ProjectMemoForm({
                                          setOpen,
                                          onSubmit,
                                        }: ProjectMemoFormProps) {
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
        padding:  '15px 0',
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
          <TextField
            required
            disableLabel
            variant="outlined"
            name="description"
            label="본문"
            placeholder="메모 입력"
            multiline
          />
        </Box>
        <Box sx={{
          display:        'flex',
          width:          '100%',
          flexWrap:       'unwrap',
          justifyContent: 'space-between',
          padding:        '10px',
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
          <Button
            shape="basic1"
            fullWidth
            onClick={onSubmit}>
            작성 완료
          </Button>
        </Box>
      </Box>
    </Box>
  );
}