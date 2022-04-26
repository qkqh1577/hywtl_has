import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useParams,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider, Grid,
  IconButton,
  Paper,
  Toolbar
} from '@mui/material';
import {
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  StarOutline as StarOutlineIcon,
  Star as StarFillIcon
} from '@mui/icons-material';
import ProjectList from 'pages/project/List';
import ProjectDrawer from 'pages/project/ProjectDrawer';
import useProject from 'services/project/hook';
import ProjectAddModal from 'pages/project/AddModal';

const ProjectContainer = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id: number | undefined = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const location = useLocation();
  const navigate = useNavigate();
  const path: string = location.pathname;

  const {
    projectState: { detail },
    getOne,
    clearOne
  } = useProject();

  const [open, setOpen] = useState<boolean>(true);
  const handler = {
    toggle: () => {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <Box sx={{
      display: 'flex',
      height: '100%'
    }}>
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
            {open ? <LeftIcon /> : <RightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        {open && <ProjectList />}
      </ProjectDrawer>
      <Container>
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            height: '20px',
            mb: '10px',
          }}>
            {detail && (
              <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                flexWrap: 'noWrap'
              }}>
                <Grid item>
                  <h2>{detail?.basic.name}</h2>
                </Grid>
                <Grid item>
                  <IconButton color="primary">
                    <StarOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
              )}
          </Box>
          <Divider />
          <Box sx={{
            display: 'flex',
            width: '100%',
            height: '30px',
            mb: '10px',
          }}>
            <div>
              프로젝트 상태 TBD
            </div>
          </Box>
          <Divider />
          <Box sx={{
            display: 'flex',
            width: '100%',
            height: '20px',
            mb: '10px',
          }}>
            <Button
              color="primary"
              variant="outlined"
              disabled={!id || path.endsWith('/basic')}
              onClick={() => {
                if (id) {
                  navigate(`/project/${id}/basic`);
                }
              }}
            >
              기본 정보
            </Button>
            <Button
              color="primary"
              variant="outlined"
              disabled={!id || path.endsWith('/building')}
              onClick={() => {
                if (id) {
                  navigate(`/project/${id}/building`);
                }
              }}
            >
              실험 대상
            </Button>
            <Button
              color="primary"
              variant="outlined"
              disabled={!id || path.endsWith('/bid')}
              onClick={() => {
                if (id) {
                  navigate(`/project/${id}/bid`);
                }
              }}
            >
              견적/입찰
            </Button>
            <Button
              color="primary"
              variant="outlined"
              disabled={!id || path.endsWith('/contract')}
              onClick={() => {
                if (id) {
                  navigate(`/project/${id}/contract`);
                }
              }}
            >
              계약
            </Button>
            <Button
              color="primary"
              variant="outlined"
              disabled={!id || path.endsWith('/schedule')}
              onClick={() => {
                if (id) {
                  navigate(`/project/${id}/schedule`);
                }
              }}
            >
              일정
            </Button>
            <Button
              color="primary"
              variant="outlined"
              disabled={!id || path.endsWith('/record')}
              onClick={() => {
                if (id) {
                  navigate(`/project/${id}/record`);
                }
              }}
            >
              이력
            </Button>
          </Box>
        </Paper>
        <Routes>
          <Route path="/add" element={<ProjectAddModal />} />
          <Route path="/:id/basic" element={<h2>basic</h2>} />
          <Route path="/:id/building" element={<h2>building</h2>} />
          <Route path="/:id/bid" element={<h2>bid</h2>} />
          <Route path="/:id/contract" element={<h2>contract</h2>} />
          <Route path="/:id/schedule" element={<h2>schedule</h2>} />
          <Route path="/:id/record" element={<h2>record</h2>} />
        </Routes>
      </Container>
    </Box>
  );
};

export default ProjectContainer;
