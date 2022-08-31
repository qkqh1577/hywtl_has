import {
  Box,
  Button,
  TableFooter,
  TableRow
} from '@mui/material';
import React from 'react';
import TableCell from 'components/TableCell';
import TextField from 'components/TextField';

export interface AddDescriptionProps {
  onClick: () => void;
}

export default function AddDescription(props: AddDescriptionProps) {

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={1}>
          신규
        </TableCell>
        <TableCell colSpan={2}>
          <TextField
            disableLabel
            type="text"
            name="newDescription"
            label="문구"
          />
        </TableCell>
        <TableCell colSpan={1}>
          <Box sx={{
            display:        'flex',
            flexWrap:       'nowrap',
            width:          '100%',
            justifyContent: 'right',
          }}>
            <Button onClick={props.onClick}>
              추가
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}