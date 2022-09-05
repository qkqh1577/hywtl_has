import {
  Box,
  Typography
} from '@mui/material';
import React from 'react';
import TextField from 'components/TextField';

interface Props {
  index: number;
  edit: boolean;
  titleList: string[];
}

export default function ({ index, edit, titleList }: Props) {

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
 // TODO: up-down buttons
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