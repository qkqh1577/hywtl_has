import {
  Box,
  Button,
  Grid,
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
      width:    '100%'
    }}>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
      }}>
        <IconButton
          children={<RightIcon />}
          onClick={() => {
            setOpen(false);
          }}
        />
        <Typography>메모</Typography>
      </Box>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap'
      }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              required
              labelProps={{
                disableLabel: true,
              }}
              multiline
              name="description"
              label="본문"
              placeholder="메모 입력"
            />
          </Grid>
          <Grid item sm={6}>
            <SelectField
              required
              labelProps={{
                disableLabel: true,
              }}
              name="category"
              label="카테고리"
              options={projectMemoCategoryList.map(item => ({
                key:  item as string,
                text: projectMemoCategoryName(item),
              }))}
            />
          </Grid>
          <Grid item sm={6}>
            <Button onClick={onSubmit}>
              작성 완료
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}