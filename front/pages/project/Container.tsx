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
import useProject from 'services/project/hook';
import { ProjectList, ProjectDrawer, ProjectAddModal } from 'pages/project';
import { ProjectCommentList, ProjectCommentDrawer } from 'pages/project/comment';
import ProjectInfoDetail from 'pages/project/info';

const ProjectContainer = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id: number | undefined = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const location = useLocation();
  const navigate = useNavigate();
  const path: string = location.pathname;

  const {
    projectState: { detail },
    getOne,
    clearOne,
    setAddModal
  } = useProject();

  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [openCommentDrawer, setOpenCommentDrawer] = useState<boolean>(false);
  const handler = {
    toggle: () => {
      setOpenDrawer(!openDrawer);
    },
    toggleComment: () => {
      setOpenCommentDrawer(!openCommentDrawer);
    }
  };

  useEffect(() => {
    setAddModal(false);
  }, []);

  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <>
      <Box sx={{
        display: 'flex',
        height: '100%'
      }}>
        <ProjectDrawer variant="permanent" open={openDrawer}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={handler.toggle}>
              {openDrawer ? <LeftIcon /> : <RightIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          {openDrawer && <ProjectList />}
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
                disabled={!id || path === `/project/${id}/basic`}
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
                disabled={!id || path === `/project/${id}/building`}
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
                disabled={!id || path === `/project/${id}/bid`}
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
                disabled={!id || path === `/project/${id}/contract`}
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
                disabled={!id || path === `/project/${id}/schedule`}
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
                disabled={!id || path === `/project/${id}/record`}
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
            <Route path="basic" element={<ProjectInfoDetail />} />
            <Route path="building" element={<h2>building</h2>} />
            <Route path="bid" element={<h2>bid</h2>} />
            <Route path="contract" element={<h2>contract</h2>} />
            <Route path="schedule" element={<h2>schedule</h2>} />
            <Route path="record" element={<h2>record</h2>} />
          </Routes>
        </Container>
        {id && (
          <ProjectCommentDrawer variant="permanent" open={openCommentDrawer}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={handler.toggleComment}>
                {openCommentDrawer ? <RightIcon /> : <LeftIcon />}
              </IconButton>
            </Toolbar>
            <Divider />
            {openCommentDrawer && <ProjectCommentList />}
          </ProjectCommentDrawer>
        )}
      </Box>
      <ProjectAddModal />
    </>
  );
};

export default ProjectContainer;
