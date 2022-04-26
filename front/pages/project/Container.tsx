import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import { Box, Container, Divider, IconButton, Toolbar } from '@mui/material';
import ProjectList from 'pages/project/List';
import ProjectDrawer from 'pages/project/ProjectDrawer';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

const ProjectContainer = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handler = {
    toggle: () => {
      setOpen(!open);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ProjectDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handler.toggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <ProjectList />
      </ProjectDrawer>
      <Container >
        <Routes>
          <Route path="/:id" element={<div> id selected</div>} />
          <Route path="/" element={<div>empty</div>} />
        </Routes>
      </Container>
    </Box>
  );
};

export default ProjectContainer;
