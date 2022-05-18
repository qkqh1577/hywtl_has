import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Typography
} from '@mui/material';
import { DateFormat, Table } from 'components';
import { toReadableSize } from 'services/common/file-item';
import { useProjectTarget } from 'services/project_target';

const ProjectTargetDocumentList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      documentList: list,
      documentId,
    },
    getDocumentList: getList,
    clearDocumentList: clearList,
    setDocumentId: setId,
  } = useProjectTarget();

  const handler = {
    addModal: () => {
      setId(null);
    }
  };

  useEffect(() => {
    if (!documentId && projectId) {
      getList(projectId);
    }
    return () => {
      if (typeof projectId === 'undefined') {
        clearList();
      }
    };
  }, [documentId, projectId]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={2} sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Grid item sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                marginRight: '4px'
              }}
            >
              형상비 검토 자료
            </Typography>
          </Grid>
          <Grid item sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handler.addModal}
              sx={{
                maxHeight: '30px'
              }}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxHeight: 740,
        mb: '20px',
      }}>
        <Table
          columns={[
            {
              label: '등록일시',
              align: 'center',
              width: 150,
              renderCell: (item) =>
                <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
            },
            {
              label: '파일명',
              width: 200,
              renderCell: (item) => {
                const size: string = toReadableSize(item.fileItem.size);
                return <Link
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setId(item.id);
                  }}
                >
                  {`${item.fileItem.filename} (${size})`}
                </Link>;
              }
            },
            {
              label: '다운로드',
              align: 'center',
              renderCell: (item) =>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {

                    window.open(`/file-items/${item.fileItem.id}`, '_blank');
                  }}
                >
                  다운로드
                </Button>
            },
            {
              label: '비고',
              renderCell: item => item.memo
            },
            {
              label: '등록자',
              renderCell: item => item.writer.name
            },
          ]}
          list={list}
          hover
        />
      </Box>
    </Paper>
  );
};

export default ProjectTargetDocumentList;