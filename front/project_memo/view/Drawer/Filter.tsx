import {
  Grid
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
    <Grid container spacing={2}>
      <Grid item sm={6}>
        <SelectField
          disableLabel
          name="category"
          label="카테고리"
          options={projectMemoCategoryList.map(item => ({
            key:  item as string,
            text: projectMemoCategoryName(item),
          }))}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          disableLabel
          name="keyword"
          label="검색어"
          placeholder="검색어 입력 후 엔터"
          onKeyDown={props.onKeyDown}
        />
      </Grid>
    </Grid>
  );
}