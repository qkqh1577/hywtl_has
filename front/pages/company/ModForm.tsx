import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {DataField, DataFieldWithButton} from "components";
import {
  CompanyChangeParameter,
  useCompany,
} from "services/company";

const Page = () => {
  const navigate = useNavigate();

  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;

  if (typeof id === 'undefined' || Number.isNaN(id)) {
    window.alert('잘못된 접근입니다.');
    navigate('/companies');
    return null;
  }

  const { state: { detail }, change, getOne } = useCompany();

  const initManagerListValue = [{
    id: undefined,
    name: '',
    position: '',
    mobile: '',
    phone: '',
    email: '',
    meta: [''],
    state: ''
  }]

  const initCompanyValue = {
    name: detail?.name || '',
    representativeName: detail?.representativeName || '',
    phone: detail?.phone || '',
    companyNumber: detail?.companyNumber || '',
    address: detail?.address || '',
    zipCode: detail?.zipCode || '',
    memo: detail?.memo || '',
    managerList: detail?.managerList?.length ? detail?.managerList : initManagerListValue
  }

  useEffect(() => {
    getOne(id);
  }, [id]);


  const handler = {
    toPage: () => {
      navigate('/company');
    },


    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      //validation

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
              initialValues={ initCompanyValue }
              enableReinitialize
              onSubmit={handler.submit}
            >
              {({ values, errors, isSubmitting, setFieldValue, handleChange, handleSubmit, setValues }) => (
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
                      <DataField
                        name="name"
                        label="업체명"
                        value={values.name}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="입력"
                        required
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="representativeName"
                        label="대표명"
                        value={values.representativeName}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="입력"
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="phone"
                        label="대표 전화번호"
                        value={values.phone}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="-를 제외하고 입력"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataFieldWithButton
                        type="check"
                        buttonName="중복 조회"
                        name="companyNumber"
                        label="사업자번호"
                        value={values.companyNumber}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="입력"
                        required
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataFieldWithButton
                        type="check"
                        buttonName="주소 검색"
                        name="address"
                        label="주소"
                        value={values.address}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="주소 검색 후 상세 주소 입력"
                        required
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="zipCode"
                        label="우편번호"
                        value={values.zipCode}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="입력"
                      />
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
                          {i+1 === values.managerList.length && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                const {managerList, ...rest} = values;
                                setValues({...rest, managerList: [...managerList, ...initManagerListValue]});
                              }}
                            >
                              추가
                            </Button>
                          )}
                          {values.managerList?.length !== 1 && (
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{marginLeft: '5px'}}
                              onClick={() => {
                                const {managerList, ...rest} = values;
                                const removedManagerList = [...managerList].filter((manager, index) => index !== i);
                                setValues({...rest, managerList: removedManagerList});
                              }}
                            >
                              삭제
                            </Button>
                            )}
                        </Box>

                      </Box>
                      <Grid container spacing={3}>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.name`}
                            label="담당자명"
                            value={manager.name || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.position`}
                            label="호칭"
                            value={manager.position || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.mobile`}
                            label="핸드폰"
                            value={manager.mobile || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="-를 제외하고 입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.phone`}
                            label="전화번호"
                            value={manager.phone || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="-를 제외하고 입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.email`}
                            label="이메일"
                            value={manager.email || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.meta`}
                            label="메타"
                            value={''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
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
                          </FormControl>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                  {!values.managerList.length && (
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
                            onClick={() => {
                              const {managerList, ...rest} = values;
                              setValues({...rest, managerList: [...initManagerListValue]});
                            }}
                          >
                            추가
                          </Button>
                        </Box>
                      </Box>
                      <Grid container spacing={3}>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${0}.name`}
                            label="담당자명"
                            value={values?.managerList?.[0]?.name || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${0}.position`}
                            label="호칭"
                            value={values?.managerList?.[0]?.position || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${0}.mobile`}
                            label="핸드폰"
                            value={values?.managerList?.[0]?.mobile || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="-를 제외하고 입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${0}.phone`}
                            label="전화번호"
                            value={values?.managerList?.[0]?.phone || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="-를 제외하고 입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${0}.email`}
                            label="이메일"
                            value={values?.managerList?.[0]?.email || ''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${0}.meta`}
                            label="메타"
                            value={''}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl variant="standard" fullWidth>
                            <FormLabel>상태</FormLabel>
                            <RadioGroup
                              row
                              aria-label="params-manager-state"
                              name={`managerList.${0}.state`}
                              value={values?.managerList?.[0]?.state}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="재직" control={<Radio />} label="재직" />
                              <FormControlLabel value="퇴사" control={<Radio />} label="퇴사" />
                            </RadioGroup>
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