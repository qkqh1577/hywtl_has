import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Divider,
  FormControl, FormControlLabel, FormLabel,
  Grid,
  Input,
  InputLabel,
  Paper,
  Radio, RadioGroup,
} from "@mui/material";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {useNavigate} from "react-router-dom";
import {initCompanyView, initManagerView, ManagerView} from "services/company/view";
import {CompanyAddParameter} from "services/company/parameters";
import useCompany from "services/company/hook";

const Page = () => {
  const navigate = useNavigate();

  const [managerView, setManagerView] = useState<ManagerView[]>(initManagerView);

  const { add } = useCompany();

  const handler = {

    toPage: () => {
      navigate('/company');
    },

    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const params: CompanyAddParameter = {
        name: values.name,
        representativeName: values.representativeName,
        phone: values.phone,
        companyNumber: values.companyNumber,
        address: values.address,
        zipCode: values.zipCode,
        memo: values.memo,
        managerList: values.managerList,
      };

      add(params, (data) => {
        if (data) {
          window.alert('저장하였습니다.');
          navigate('/company');
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Formik
              initialValues={initCompanyView}
              enableReinitialize
              onSubmit={handler.submit}
            >
              {({ values, isSubmitting, handleChange, handleSubmit }) => (
                <Form>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '50px',
                    mb: '40px',
                  }}>
                    <h2>업체 정보</h2>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-name">업체명</InputLabel>
                        <Input
                          type="text"
                          id="params-name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          required
                          placeholder="입력"
                        />
                        <ErrorMessage name="name" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-representativeName">대표명</InputLabel>
                        <Input
                          type="text"
                          id="params-representativeName"
                          name="representativeName"
                          value={values.representativeName}
                          onChange={handleChange}
                          placeholder="입력"
                        />
                        <ErrorMessage name="representativeName" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-phone">대표 전화번호</InputLabel>
                        <Input
                          type="text"
                          id="params-phone"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          placeholder="-를 제외하고 입력"
                        />
                        <ErrorMessage name="phone" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-companyNumber">사업자번호</InputLabel>
                        <Input
                          type="text"
                          id="params-companyNumber"
                          name="companyNumber"
                          value={values.companyNumber}
                          onChange={handleChange}
                          placeholder="입력"
                        />
                        <ErrorMessage name="companyNumber" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-address">주소</InputLabel>
                        <Input
                          type="text"
                          id="params-address"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          placeholder="주소 검색 후 상세 주소 입력"
                        />
                        <ErrorMessage name="address" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-zipCode">우편번호</InputLabel>
                        <Input
                          type="text"
                          id="params-zipCode"
                          name="zipCode"
                          value={values.zipCode}
                          onChange={handleChange}
                          placeholder="입력"
                        />
                        <ErrorMessage name="zipCode" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-memo">비고</InputLabel>
                        <Input
                          type="text"
                          id="params-memo"
                          name="memo"
                          value={values.memo}
                          onChange={handleChange}
                          placeholder="입력"
                        />
                        <ErrorMessage name="memo" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  {managerView?.map((manager, i) => (
                    <>
                      <Divider sx={{ mt: '40px', mb: '40px' }} />
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '50px',
                        mb: '40px',
                      }}>
                        <h2>담당자 정보</h2>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            height: '50px',
                            mb: '40px',
                          }}>
                            {i+1 === managerView.length && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  setManagerView([...managerView, ...initManagerView]);
                                }}
                              >
                                추가
                              </Button>
                            )}
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{marginLeft: '5px'}}
                              onClick={() => {
                                const { managerList } = values;
                                const removedManagerList = managerList?.filter((manager, index) => index !== i);
                                values.managerList = removedManagerList;

                                const copiedManagerView = [...managerView]
                                copiedManagerView.pop();
                                setManagerView(copiedManagerView);
                              }}
                            >
                              삭제
                            </Button>
                          </Box>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="params-manager-name">담당자명</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-name"
                              name={`managerList.${i}.name`}
                              value={values?.managerList?.[i]?.name}
                              onChange={handleChange}
                              required
                              placeholder="입력"
                            />
                            <ErrorMessage name="manager-name" />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id="params-manager-position">호칭</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-position"
                              name={`managerList.${i}.position`}
                              value={values?.managerList?.[i]?.position}
                              onChange={handleChange}
                              placeholder="입력"
                            />
                            <ErrorMessage name="manager-position" />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id="params-manager-mobile">핸드폰</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-mobile"
                              name={`managerList.${i}.mobile`}
                              value={values?.managerList?.[i]?.mobile}
                              onChange={handleChange}
                              placeholder="-를 제외하고 입력"
                            />
                            <ErrorMessage name="manager-mobile" />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="params-companyNumber">전화번호</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-phone"
                              name={`managerList.${i}.phone`}
                              value={values?.managerList?.[i]?.phone}
                              onChange={handleChange}
                              placeholder="-를 제외하고 입력"
                            />
                            <ErrorMessage name="manager-phone" />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="params-manager-email">이메일</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-email"
                              name={`managerList.${i}.email`}
                              value={values?.managerList?.[i]?.email}
                              onChange={handleChange}
                              placeholder="입력"
                            />
                            <ErrorMessage name="manager-manager-email" />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="params-manager-meta">메타</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-meta"
                              name={`managerList.${i}.meta`}
                              value={values?.managerList?.[i]?.meta}
                              onChange={handleChange}
                              placeholder="입력"
                            />
                            <ErrorMessage name="manager-meta" />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <FormLabel>상태</FormLabel>
                            <RadioGroup
                              row
                              aria-label="params-manager-state"
                              name={`managerList.${i}.state`}
                              value={values?.managerList?.[i]?.state}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="재직" control={<Radio />} label="재직" />
                              <FormControlLabel value="퇴사" control={<Radio />} label="퇴사" />
                            </RadioGroup>
                            <ErrorMessage name="manager-state" />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '50px',

                  }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{marginRight: '5px'}}
                      disabled={isSubmitting}
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      등록
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handler.toPage}
                    >
                      취소
                    </Button>
                  </Box>
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