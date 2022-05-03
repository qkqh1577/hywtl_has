import React, {useEffect, useState} from "react";
import {Box, Divider, Grid, IconButton, Paper} from "@mui/material";
import {Form, Formik, FormikHelpers} from "formik";
import {DataField} from "components";
import {CompanyView, initView} from "services/company/view";
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

  const [view, setView] = useState<CompanyView>(initView);

  console.log(detail)

  useEffect(() => {
    getOne(id);
  }, [id])

  const handler = {
    submit: (values: any, {
      setSubmitting,
      setErrors
    }: FormikHelpers<any>) => {

    }
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Formik
              initialValues={view}
              onSubmit={handler.submit}
              enableReinitialize
            >
              {({
                  values,
                  isSubmitting,
                  setFieldValue,
                  handleSubmit,
                }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>업체 정보</h2>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <DataField
                        name="basic.name"
                        label="업체명"
                        value={detail?.name}
                        setFieldValue={setFieldValue}
                        required
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.representativeName"
                        label="대표명"
                        value={detail?.representativeName}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.companyNumber"
                        label="사업자번호"
                        value={detail?.companyNumber}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <DataField
                        name="basic.address"
                        label="주소"
                        value={detail?.address}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.zipCode"
                        label="우편번호"
                        value={detail?.zipCode}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.phone"
                        label="대표 전화번호"
                        value={detail?.phone}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <DataField
                        name="basic.memo"
                        label="비고"
                        value={detail?.memo}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  {detail?.managerList.map((manager, i) => {
                    return (
                      <>
                      <Grid container spacing={2}>
                        <Grid item sm={12}>
                          <h2>담당자 정보</h2>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.name"
                            label="담당자명"
                            value={manager.name}
                            setFieldValue={setFieldValue}
                            required
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.representativeName"
                            label="호칭"
                            value={manager.position}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.companyNumber"
                            label="핸드폰"
                            value={manager.mobile}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.address"
                            label="전화번호"
                            value={manager.phone}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.zipCode"
                            label="이메일"
                            value={manager.email}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.phone"
                            label="메타"
                            value={''}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <DataField
                            name="basic.memo"
                            label="상태"
                            value={manager.state ? '재직' : '퇴사'}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                      </Grid>
                    <Divider sx={{ mt: '40px', mb: '40px' }} />
                    </>
                    )
                  })}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Page;