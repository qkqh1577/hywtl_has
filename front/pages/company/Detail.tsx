import React, {useEffect} from "react";
import {Box, Button, Divider, Grid, Paper, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import useCompany from "services/company/hook";


const Page = () => {
  const navigate = useNavigate();

  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  if (typeof id === 'undefined' || Number.isNaN(id)) {
    window.alert('잘못된 접근입니다.');
    navigate('/companies');
    return null;
  }

  const { companyState: { detail }, getOne } = useCompany();

  useEffect(() => {
    getOne(id);
  }, [id])

  const handler = {
    toPage: () => {
      navigate('/company');
    },
    toModForm: () => {
      navigate(`/company/modify/${id}`);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <h2>업체 정보</h2>
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  name="name"
                  label="업체명"
                  value={detail?.name || ''}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="representativeName"
                  label="대표명"
                  value={detail?.representativeName || ''}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="phone"
                  label="대표 전화번호"
                  value={detail?.phone || ''}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  name="companyNumber"
                  label="사업자번호"
                  value={detail?.companyNumber || ''}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  name="address"
                  label="주소"
                  value={detail?.address || ''}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  name="zipCode"
                  label="우편번호"
                  value={detail?.zipCode || ''}
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
                  label="비고"
                  value={detail?.memo || ''}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: '40px', mb: '40px' }} />
            {detail?.managerList?.map((manager, i) => {
              return (
                <>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <h2>담당자 정보</h2>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.name"
                      label="담당자명"
                      value={manager.name || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.position"
                      label="호칭"
                      value={manager.position || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.mobile"
                      label="핸드폰"
                      value={manager.mobile || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.phone"
                      label="전화번호"
                      value={manager.phone || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.email"
                      label="이메일"
                      value={manager.email || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.meta"
                      label="메타"
                      value={''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.state"
                      label="상태"
                      value={manager.state || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name=""
                      label="담당 프로젝트"
                      value={''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              <Divider sx={{ mt: '40px', mb: '40px' }} />
              </>
              )
            })}
            <Box sx={{
              display: 'flex',
              width: '100%',
            }}>
              <Box sx={{
                display: 'flex',
                width: '50%',
                justifyContent: 'flex-start',
              }}>
                <Button variant="contained" color="primary" onClick={handler.toPage}>
                  목록
                </Button>
              </Box>
              <Box sx={{
                display: 'flex',
                width: '50%',
                justifyContent: 'flex-end',
              }}>
                <Button variant="contained" color="secondary" onClick={handler.toModForm}>
                  수정
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Page;