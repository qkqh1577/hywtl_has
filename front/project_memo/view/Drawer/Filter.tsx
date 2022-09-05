import {
  Box,
} from '@mui/material';
import SelectField from 'components/SelectField';
import {
  projectMemoCategoryList,
  projectMemoCategoryName
} from 'project_memo/domain';
import TextField, { TextFieldProps } from 'components/TextField';
import React from 'react';

interface Props {
  onKeyDown: TextFieldProps['onKeyDown'];
}

export default function ProjectMemoDrawerFilter(props: Props) {

  return (
    <Box sx={{
      width:          '100%',
      padding:        '0 10px',
      display:        'flex',
      justifyContent: 'space-between',
      flexWrap:       'unwrap',
      flex:           1,
      alignItems:     'center',
    }}>
      <Box sx={{
        display:     'flex',
        width:       '120px',
        marginRight: '10px',
      }}>
        <SelectField
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
      <TextField
        disableLabel
        variant="outlined"
        name="keyword"
        label="검색어"
        placeholder="검색어 입력 후 엔터"
        onKeyDown={props.onKeyDown}
      />
    </Box>

  );
}