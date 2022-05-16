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
  Divider,
  IconButton,
  Paper,
  Toolbar, Typography
} from '@mui/material';
import {
  StarOutline as StarOutlineIcon,
  Star as StarFillIcon
} from '@mui/icons-material';
import useProject from 'services/project/hook';
import { ProjectAddModal } from 'pages/project';
import ProjectInfoContainer from 'pages/project/info';
import ProjectTargetContainer from 'pages/project/target';
import ProjectEstimateContainer from 'pages/project/estimate';

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
  } = useProject();

  const [favorite, setFavorite] = useState<boolean>(false);
  const handler = {
    toggleFavorite: () => {
      setFavorite(!favorite);
    },
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
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Toolbar sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Box sx={{
            display: 'flex',
            flexWrap: 'nowrap'
          }}>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              {detail?.basic.code}
            </Typography>
            <Typography
              sx={{
                marginLeft: '4px',
                marginRight: '4px',
                fontSize: '20px',
              }}>
              /
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
              }}
            >
              {detail?.basic.name}
            </Typography>
          </Box>
          <IconButton
            color="primary"
            sx={{
              display: 'flex',
              width: '36px',
              height: '36px',
              backgroundColor: '#e5e5e5',
              border: '2px solid #301a9a',
            }}
            onClick={handler.toggleFavorite}
          >
            {favorite ? <StarFillIcon /> : <StarOutlineIcon />}
          </IconButton>
        </Toolbar>
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
        <Route path="basic" element={<ProjectInfoContainer />} />
        <Route path="building" element={<ProjectTargetContainer />} />
        <Route path="bid" element={<ProjectEstimateContainer />} />
        <Route path="contract" element={<h2>contract</h2>} />
        <Route path="schedule" element={<h2>schedule</h2>} />
        <Route path="record" element={<h2>record</h2>} />
      </Routes>
      <ProjectAddModal />
    </>
  );
};

export default ProjectContainer;
