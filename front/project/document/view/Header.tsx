import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import {
  DocumentType,
  documentTypeName
} from 'project/document/domain';

export interface HeaderProps {
  modifiedAt?: Date;
  onModalOpen: (type: DocumentType) => void;
  type: DocumentType;
}

function AddModalButton({
                          type,
                          onModalOpen: onClick
                        }: HeaderProps) {
  return (
    <Button onClick={() => {
      onClick(type);
    }}>
      +등록
    </Button>
  );
}

export default function Header({ type, modifiedAt, onModalOpen }: HeaderProps) {
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
    }}>
      <Box>
        <Typography>{documentTypeName(type)}</Typography>
      </Box>
      <Box sx={{
        display:    'flex',
        alignItems: 'center',
      }}>
        <AddModalButton type={type} onModalOpen={onModalOpen} />
        <Typography>{modifiedAt}</Typography>
      </Box>
    </Box>
  );
};
