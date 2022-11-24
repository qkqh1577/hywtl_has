import React, { ChangeEvent } from 'react';
import {
  Pagination,
  Stack
} from '@mui/material';

interface Props {
  totalPage?: number;
  setQuery: (query) => void;
}

function PaginationSection({ totalPage, setQuery }: Props) {
  return (
    <Stack spacing={2} direction="row" sx={{
      display:        'flex',
      justifyContent: 'center',
      width:          '100%',
      marginTop:      '3px'
    }
    }>
      <Pagination
        count={totalPage}
        color={'secondary'}
        shape="rounded"
        size="small"
        showFirstButton
        showLastButton
        onChange={(e: ChangeEvent<unknown>,
                   page: number
        ) => {
          setQuery((prevState) => ({ ...prevState, page: page }));
        }}
      />
    </Stack>
  );
}

export default PaginationSection;
