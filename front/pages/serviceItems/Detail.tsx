import { useNavigate, useParams } from "react-router-dom";
import { useServiceItem } from "services/serviceItem";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'item', label: '세부 항목명', style: { minWidth: 50 }, align: 'center' },
  { key: 'unit', label: '단위', style: { minWidth: 100 }, align: 'center' },
  { key: 'price', label: '단가', style: { minWidth: 100 }, align: 'center' },
  { key: 'memo', label: '비고', style: { minWidth: 100 }, align: 'center' },
];

const ServiceItemDetail = () => {
  const navigate = useNavigate();

  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  if (typeof id === 'undefined' || Number.isNaN(id)) {
    window.alert('잘못된 접근입니다.');
    navigate('/companies');
    return null;
  }

  const { state: { detail }, getOne } = useServiceItem();

  useEffect(() => {
    getOne(id);
  }, [id]);

  const handler = {
    toList: () => {
      navigate('/serviceItem');
    },

    toModForm: () => {
      navigate(`/serviceItem/modify/${id}`);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Grid container spacing={1}>
        <Grid item sm={12}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <h2>항목 정보</h2>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="item"
                label="용역 항목"
                value={detail?.item || ''}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="unit"
                label="단위(기본값)"
                value={detail?.unit || ''}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="price"
                label="단가(기본값)"
                value={detail?.price.toLocaleString() || ''}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="memo"
                label="비고(기본값)"
                value={detail?.memo || ''}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                name="type"
                label="실험 타입"
                value={detail?.type || ''}
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mt: '40px', mb: '40px' }} />
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <h2>세부 항목</h2>
            </Grid>
            <Grid item sm={12}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map(({label, ...props}) => (
                        <TableCell {...props}>
                          {label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail?.serviceDetailItemViewList?.map((serviceDetailItem, i) => {
                      return (
                        <TableRow>
                          <TableCell align="center">{serviceDetailItem.item}</TableCell>
                          <TableCell align="center">{serviceDetailItem.unit}</TableCell>
                          <TableCell align="center">{serviceDetailItem.price.toLocaleString()}</TableCell>
                          <TableCell align="center">{serviceDetailItem.memo}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Box sx={{
            mt: '40px',
          }} />
          <Grid container spacing={2}>
            <Grid item sm={12} sx={{
              width: '100%',
              display: 'flex',
            }}>
              <Box sx={{
                width: '50%',
                display: 'flex',
                mb: '20px',
              }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handler.toList}
                >
                  목록
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: '5px' }}
                >
                  삭제
                </Button>
              </Box>
              <Box sx={{
                width: '50%',
                display: 'flex',
                justifyContent: 'flex-end',
                mb: '20px',
              }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handler.toModForm}
                >
                  수정
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}


export default ServiceItemDetail;