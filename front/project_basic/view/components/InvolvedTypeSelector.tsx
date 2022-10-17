import {
  Box,
  MenuItem
} from '@mui/material';
import React from 'react';
import {
  BusinessInvolvedType,
  businessInvolvedTypeList,
  businessInvolvedTypeName
} from 'business/domain';
import Select from 'layouts/Select';
import DataFieldWithLabel from 'layouts/DataFieldLabel';

interface Props {
  initInvolvedType?: BusinessInvolvedType;
  handleChangeInvolvedType?: (e) => void;
  hidden?: boolean;
}

export default function ProjectBasicInvolvedTypeSelectorComponent({ initInvolvedType, handleChangeInvolvedType, hidden }: Props) {
  return (
    <Box sx={{ width: '33%', visibility: hidden ? 'hidden' : '' }}>
      <DataFieldWithLabel label="관계사 구분">
        <Select
          variant="outlined"
          value={initInvolvedType ?? ''}
          onChange={handleChangeInvolvedType}>
          {businessInvolvedTypeList.map(item => (
            <MenuItem key={item} value={item}>
              {businessInvolvedTypeName(item)}
            </MenuItem>
          ))}
        </Select>
      </DataFieldWithLabel>
    </Box>
  );
}
