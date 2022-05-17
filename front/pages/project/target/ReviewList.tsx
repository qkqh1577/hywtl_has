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
import { Table, DateFormat, UserFormat } from 'components';
import { projectTargetReviewStatusName, useProjectTarget } from 'services/project_target';

const ProjectTargetReviewList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      reviewList: list,
      reviewId,
    },
    getReviewList: getList,
    setReviewId: setId,
  } = useProjectTarget();

  const handler = {
    addModal: () => {
      setId(null);
    },
    detailModal: (id: number) => {
      setId(id);
    }
  };

  useEffect(() => {
    if (!reviewId && projectId) {
      getList(projectId);
    }
  }, [reviewId, projectId]);

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
              형상비 검토 목록
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
              renderCell: (item) => (
                <>
                  <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                  {item.modifiedAt && (
                    <DateFormat
                      date={item.modifiedAt}
                      format="YYYY-MM-DD HH:mm"
                      prefix="("
                      postfix=" 수정됨)"
                    />
                  )}
                </>
              )
            },
            {
              label: '확정 여부',
              renderCell: (item) => item.confirmed ? 'Y' : 'N',
              cellStyle: (item) => ({
                backgroundColor: item.confirmed ? '#c4baf5' : 'inherit'
              })
            },
            {
              label: '상태',
              renderCell: (item) => projectTargetReviewStatusName(item.status),
            },
            {
              label: '제목',
              renderCell: (item) => (
                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handler.detailModal(item.id);
                  }}
                >
                  {item.title}
                </Link>
              )
            },
            {
              label: 'PDF 다운로드',
              renderCell: () => (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    // download pdf
                  }}>
                  다운로드
                </Button>
              )
            },
            {
              label: '비고',
              renderCell: (item) => item.memo
            },
            {
              label: '등록자',
              renderCell: (item) => (<UserFormat user={item.writer} />),
            },
            {
              label: '복사',
              renderCell: () => (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    // copy
                  }}
                >
                  복사
                </Button>
              )
            },
          ]}
          list={list}
        />
      </Box>
    </Paper>
  );
};

export default ProjectTargetReviewList;
