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
  Radio, RadioGroup, TextField,
} from "@mui/material";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import {initCompanyView, initManagerView, ManagerView} from "services/company/view";
import {CompanyChangeParameter} from "services/company/parameters";
import useCompany from "services/company/hook";
import CompanyDetail, {ManagerDetail} from "../../services/company/entity";

const Page = () => {
  const navigate = useNavigate();

  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  if (typeof id === 'undefined' || Number.isNaN(id)) {
    window.alert('잘못된 접근입니다.');
    navigate('/companies');
    return null;
  }

  const { companyState: {detail}, change, getOne } = useCompany();

  const [company, setCompany] = useState<CompanyDetail>(initCompanyView as CompanyDetail);

  useEffect(() => {
    getOne(id);
  }, [id]);

  useEffect(() => {
    setCompany(detail as CompanyDetail);
  }, [detail]);

  const handler = {
    toPage: () => {
      navigate('/company');
    },

    removeManager: (i: number) => {
      let {managerList, ...rest} = company;
      console.log(managerList)
      const removedManagerList: ManagerView[] | undefined = managerList?.filter((manager, index) => index !== i);
      managerList = removedManagerList as ManagerDetail[];
      setCompany({...rest, managerList});
    },


    addManager: (i: number) => {
      let {managerList, ...rest} = company;
      const addedManager: ManagerView = initManagerView[0];
      managerList = [...managerList as ManagerDetail[], addedManager as ManagerDetail];
      setCompany({...rest, managerList});
    },

    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const params: CompanyChangeParameter = {
        id,
        name: values.name,
        representativeName: values.representativeName,
        phone: values.phone,
        companyNumber: values.companyNumber,
        address: values.address,
        zipCode: values.zipCode,
        memo: values.memo,
        managerList: values.managerList,
      };

      change(params, (data) => {
        if (data) {
          window.alert('수정하였습니다.');
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
              initialValues={company || initCompanyView}
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
                  {values.managerList?.map((manager, i) => (
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
                          {i+1 === values.managerList?.length && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {handler.addManager(i)}}
                            >
                              추가
                            </Button>
                          )}
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{marginLeft: '5px'}}
                            onClick={() => {
                              const { managerList: managerValuesList } = values;
                              const removedManagerList = managerValuesList?.filter((manager, index) => index !== i);
                              values.managerList = removedManagerList;

                              const { managerList, ...rest } = company;
                              const copiedManagerList: ManagerDetail[] = managerList ? [...managerList] : [];
                              copiedManagerList.pop();
                              setCompany({...rest, managerList: [...copiedManagerList]});
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
                              value={manager?.name}
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
                              value={manager?.position}
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
                              value={manager.mobile}
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
                              value={manager.phone}
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
                              value={manager.email}
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
                              value={manager.meta}
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
                              value={manager.state}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="재직" control={<Radio />} label="재직" />
                              <FormControlLabel value="퇴사" control={<Radio />} label="퇴사" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                  {values.managerList?.length === 0 && (
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
                          <Button
                            variant="contained"
                            color="primary"
                            style={{marginRight: '5px'}}
                          >
                            추가
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
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
                              name={`managerList.${0}.name`}
                              value={''}
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
                              name={`managerList.${0}.position`}
                              value={''}
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
                              name={`managerList.${0}.mobile`}
                              value={''}
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
                              name={`managerList.${0}.phone`}
                              value={''}
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
                              name={`managerList.${0}.email`}
                              value={''}
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
                              name={`managerList.${0}.meta`}
                              value={''}
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
                              name={`managerList.${0}.state`}
                              value={''}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="재직" control={<Radio />} label="재직" />
                              <FormControlLabel value="퇴사" control={<Radio />} label="퇴사" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="params-manager-project">담당 프로젝트</InputLabel>
                            <Input
                              type="text"
                              id="params-manager-project"
                              name=''
                              value=''
                              readOnly
                            />
                            <ErrorMessage name="manager-meta" />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </>
                  )}
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
                      수정
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