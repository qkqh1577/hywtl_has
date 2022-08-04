import React from 'react';
import { useFormikContext } from 'formik';
import { TestServiceTemplateView } from 'services/standard_data/test_service_template';
import {
  Box,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';

interface Props {
  index: number;
}

export default function (props: Props) {
  const { index } = props;
  const { values } = useFormikContext<TestServiceTemplateView>();
  const edit = values.edit;
  const detail = values.detailList[index];
  const titleList = detail.titleList;

  if (!edit) {
    return (
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'wrap',
      }}>
        {titleList.map((title) => (
          <Typography key={title} sx={{
            width:   '100%',
            display: 'block'
          }}>
            {title}
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      {titleList.map((title,
                      i
      ) => {
        const name = `detailList.${index}.titleList.${i}`;
        return (
          <TextField
            required
            disableLabel
            key={name}
            name={name}
            label="세부 항목명"
          />
        );
      })}
    </Box>
  );
}