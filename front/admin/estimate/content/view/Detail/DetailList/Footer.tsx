import {
  Box,
  Button,
  TableFooter,
  TableRow
} from '@mui/material';
import React from 'react';
import TextField from 'components/TextField';
import { Td } from 'layouts/Table';

export interface AddDescriptionProps {
  onClick: () => void;
}

export default function AddDescription(props: AddDescriptionProps) {

  return (
    <TableFooter>
      <TableRow>
        <Td colSpan={1}>
          신규
        </Td>
        <Td colSpan={2}>
          <TextField
            disableLabel
            type="text"
            name="newDescription"
            label="문구"
          />
        </Td>
        <Td colSpan={1}>
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
        </Td>
      </TableRow>
    </TableFooter>
  );
}