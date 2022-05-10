import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { DateFormat } from 'components';
import useProject from 'services/project/hook';
import { projectTargetReviewStatusName } from 'services/project/data';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}
const columns: TableCellProperty[] = [
  { key: 'createdAt', label: '등록일시', align: 'center', style: { minWidth: 150 } },
  { key: 'confirmed', label: '확정여부', align: 'center', style: { minWidth: 50 } },
  { key: 'status', label: '상태', align: 'center', style: { minWidth: 50 } },
  { key: 'title', label: '제목', style: { minWidth: 150 } },
  { key: 'download', label: 'PDF 다운로드', align: 'center', style: { minWidth: 50 } },
  { key: 'memo', label: '비고', style: { minWidth: 100 } },
  { key: 'userName', label: '등록자', style: { minWidth: 70 } },
  { key: 'copy', label: '복사', align: 'center', style: { minWidth: 50 } },
];

const ProjectTargetReviewList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    projectState: {
      reviewList: list,
      reviewModal: modal,
    },
    getTargetReviewList: getList,
    clearTargetReviewList: clearList,
    setTargetReviewModal: setModal
  } = useProject();

  const handler = {
    addModal: () => {
      setModal(null);
    },
    detailModal: (id: number) => {
      setModal(id);
    }
  };

  useEffect(() => {
    if (!modal && projectId) {
      getList(projectId);
    }
    return () => {
      if (typeof projectId === 'undefined') {
        clearList();
      }
    };
  }, [modal, projectId]);

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
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(({ label, align, ...props }) => (
                  <TableCell {...props} align="center">
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((item, i) => (
                <TableRow
                  key={i}
                  role="list"
                  tabIndex={-1}
                  hover
                >
                  <TableCell align={columns[i].align}>
                    <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                    {item.modifiedAt && (
                      <>
                        (
                        <DateFormat date={item.modifiedAt} format="YYYY-MM-DD HH:mm" />
                        수정됨)
                      </>
                    )}
                  </TableCell>
                  <TableCell align={columns[i].align} sx={{
                    backgroundColor: item.confirmed ? '#c4baf5' : 'inherit'
                  }}>
                    {item.confirmed ? 'Y' : 'N'}
                  </TableCell>
                  <TableCell align={columns[i].align}>
                    {projectTargetReviewStatusName(item.status)}
                  </TableCell>
                  <TableCell align={columns[i].align}>
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
                  </TableCell>
                  <TableCell align={columns[i].align}>
                    <Button
                      color="primary"
                      variant="contained"
                    >
                      TBD
                    </Button>
                  </TableCell>
                  <TableCell align={columns[i].align}>
                    {item.memo}
                  </TableCell>
                  <TableCell align={columns[i].align}>
                    {item.writer.name}
                  </TableCell>
                  <TableCell align={columns[i].align}>
                    <Button
                      color="secondary"
                      variant="contained"
                    >
                      TBD
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ProjectTargetReviewList;
