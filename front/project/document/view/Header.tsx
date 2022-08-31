import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import {
  ProjectDocumentType,
  projectDocumentTypeName
} from 'project/document/domain';

export interface HeaderProps {
  modifiedAt?: Date;
  onAddModalOpen: (type: ProjectDocumentType) => void;
  type: ProjectDocumentType;
}

function AddModalButton({
                          type,
                          onAddModalOpen: onClick
                        }: HeaderProps) {
  return (
    <Button onClick={() => {
      onClick(type);
    }}>
      +등록
    </Button>
  );
}

export default function Header({ type, modifiedAt, onAddModalOpen }: HeaderProps) {
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
    }}>
      <Box>
        <Typography>{projectDocumentTypeName(type)}</Typography>
      </Box>
      <Box sx={{
        display:    'flex',
        alignItems: 'center',
      }}>
        <AddModalButton type={type} onAddModalOpen={onAddModalOpen} />
        <Typography>{modifiedAt}</Typography>
      </Box>
    </Box>
  );
};
