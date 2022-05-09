import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
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
import { fileItemToView } from 'services/common/file-item/view';
import useProject from 'services/project/hook';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'createdTime', label: '등록일시', align: 'center', style: { minWidth: 150 } },
  { key: 'filename', label: '파일명', style: { minWidth: 150 } },
  { key: 'download', label: '다운로드', align: 'center', style: { minWidth: 50 } },
  { key: 'memo', label: '비고', style: { minWidth: 100 } },
  { key: 'userName', label: '등록자', style: { minWidth: 70 } },
];

const ProjectTargetDocumentList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    projectState: {
      documentList: list,
    },
    getTargetDocumentList: getList,
    clearTargetDocumentList: clearList,
    setTargetDocumentModal: setModal,
  } = useProject();

  const handler = {
    addModal: () => {
      setModal(null);
    }
  };

  useEffect(() => {
    if (projectId) {
      getList(projectId);
    }
    return () => {
      clearList();
    };
  }, [projectId]);

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
              {list?.map(item => ({
                ...item,
                fileItem: fileItemToView(item.fileItem)
              })).map((item, i) => (
                <TableRow
                  key={i}
                  role="list"
                  tabIndex={-1}
                  hover
                >
                  <TableCell align={columns[i].align}>
                    <DateFormat date={item.createdTime} format="YYYY-MM-DD HH:mm" />
                  </TableCell>
                  <TableCell align={columns[i].align}>
                    {`${item.fileItem.filename} (${item.fileItem.readableSize})`}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ProjectTargetDocumentList;
