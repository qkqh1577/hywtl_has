import {
  Box,
  MenuItem,
} from '@mui/material';
import {
  projectMemoCategoryList,
  projectMemoCategoryName
} from 'project_memo/domain';
import React, {
  useContext,
  useEffect
} from 'react';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import Divider from "../../../layouts/Divider";

export default function ProjectMemoDrawerFilter() {
  const formik = useContext(FormikContext);

  useEffect(() => {
    formik.handleSubmit();
  }, [formik.values.keyword]);

  return (
    <Box sx={{
      width:          '100%',
      padding:        '0 10px',
      margin:         '10px 0',
      display:        'flex',
      flexWrap:'wrap',
      justifyContent: 'space-between',
      flex:           1,
      // alignItems:     'center',
    }}>
      <Box sx={{
        display:     'flex',
        width:       '99px',
        marginRight: '10px',
      }}>
        <Select
          displayEmpty
          variant="outlined"
          key={formik.values.category}
          defaultValue={formik.values.category ?? ''}
          onChange={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.category !== value) {
              formik.setFieldValue('category', value);
            }
          }}>
          <MenuItem value="">선택</MenuItem>
          {projectMemoCategoryList.map(item => (
            <MenuItem key={item} value={item}>
              {projectMemoCategoryName(item)}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{width:'calc(100% - 109px)'}}>
        <Input
          key={formik.values.keyword}
          defaultValue={formik.values.keyword ?? ''}
          variant="outlined"
          placeholder="검색어 입력 후 엔터"
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter') {
              const value = (e.target as HTMLInputElement).value || undefined;
              if (formik.values.keyword !== value) {
                formik.setFieldValue('keyword', value);
              }
            }
          }}
        />
      </Box>
      <Divider sx={{margin:'10px 0 0 0', padding:'0', width: '100%'}}/>
    </Box>
  );
}