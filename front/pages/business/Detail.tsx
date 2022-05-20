import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Divider, Grid, InputAdornment, Paper, TextField} from "@mui/material";
import { useBusiness } from "services/business";


const Page = () => {
  const navigate = useNavigate();

  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  if (typeof id === 'undefined' || Number.isNaN(id)) {
    window.alert('잘못된 접근입니다.');
    navigate('/business');
    return null;
  }

  const { state: { detail }, getOne, remove } = useBusiness();

  useEffect(() => {
    getOne(id);
  }, [id])

  const handler = {
    toPage: () => {
      navigate('/business');
    },
    toModForm: () => {
      navigate(`/business/modify/${id}`);
    },

    delete: () => {
      if(detail?.managerList?.length) {
        window.alert('담당자 정보가 존재하는 업체 정보는 삭제할 수 없습니다.');
      } else {
        remove(id, () => {
          window.alert('삭제하였습니다.');
          navigate('/business');
        });
      }
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={2}>
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
                  name="officePhone"
                  label="대표 전화번호"
                  value={detail?.officePhone || ''}
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
                  value={detail?.registrationNumber || ''}
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
                <Grid 
                  container 
                  spacing={2} 
                  bgcolor={manager.status === '퇴사' || manager.status === '휴직' ? '#e5e5e5' : ''}
                >
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
                      name="manager.jobTitle"
                      label="호칭"
                      value={manager.jobTitle || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.mobilePhone"
                      label="핸드폰"
                      value={manager.mobilePhone || ''}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="manager.officePhone"
                      label="전화번호"
                      value={manager.officePhone || ''}
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
                      name="manager.status"
                      label="상태"
                      value={manager.status || ''}
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
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{marginBottom: '15px'}}
                            >
                              상세
                            </Button>
                          </InputAdornment>
                        )
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{marginLeft: '5px'}}
                  onClick={handler.delete}
                >
                  삭제
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