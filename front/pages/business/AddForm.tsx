import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from '@mui/material';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { DataField, DataFieldWithButton } from "components";
import {
  BusinessAddParameter,
  useBusiness
} from 'services/business';

const initBusinessManagerListValue = [
  {
    name: '',
    jobTitle: '',
    mobile: '',
    phone: '',
    email: '',
    meta: [],
    state: ''
  }
];

const initBusinessValue = {
  name: '',
  representativeName: '',
  officePhone: '',
  registrationNumber: '',
  address: '',
  zipCode: '',
  memo: '',
  managerList: initBusinessManagerListValue
};

const Page = () => {
  const navigate = useNavigate();

  const { state: { list }, add } = useBusiness();

  const handler = {

    toPage: () => {
      navigate('/business');
    },

    checkRegistrationNumber: (registrationNumber: string): void => {
      if (!registrationNumber.length) {
         alert('사업자번호를 입력해 주세요.');
        return;
      }

      const duplicatedBusiness = list?.find(business => business.registrationNumber === registrationNumber);
      if(duplicatedBusiness) {
        alert('이미 등록되어 있는 사업자번호 입니다.');
        return;
      }

      alert('등록 가능한 사업자번호 입니다.');
    },

    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const errors: any = {
        name: {},
        representativeName: {},
        officePhone: {},
        registrationNumber: {},
        address: {},
        zipCode: {},
        memo: {},
      };

      if (values.name === '') {
        errors.name = '업체명은 필수 입력 항목입니다.';
      }

      const managerList = values.managerList.filter(
        (manager: any) => manager.name
          || manager.jobTitle
          || manager.mobile
          || manager.phone
          || manager.email
          || manager.meta.length > 0
          || manager.state
      );

      const params: BusinessAddParameter = {
        name: values.name,
        representativeName: values.representativeName,
        officePhone: values.officePhone,
        registrationNumber: values.registrationNumber,
        address: values.address,
        zipCode: values.zipCode,
        memo: values.memo,
        managerList: managerList.length === 0 ? undefined : managerList,
      };

      add(params, (data) => {
        if (data) {
          window.alert('저장하였습니다.');
          navigate('/business');
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
              initialValues={initBusinessValue}
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
                        name="officePhone"
                        label="대표 전화번호"
                        value={values.officePhone}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="-를 제외하고 입력"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataFieldWithButton
                        type="check"
                        buttonName="중복 조회"
                        name="registrationNumber"
                        label="사업자번호"
                        value={values.registrationNumber}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="입력"
                        onClick={() => {handler.checkRegistrationNumber(values.registrationNumber)}}
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
                      <DataField
                        name="memo"
                        label="비고"
                        value={values.memo}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        placeholder="입력"
                      />
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
                          {i + 1 === values.managerList.length && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                const { managerList, ...rest } = values;
                                setValues({
                                  ...rest,
                                  managerList: [...managerList, ...initBusinessManagerListValue]
                                });
                              }}
                            >
                              추가
                            </Button>
                          )}
                          {values.managerList?.length !== 1 && (
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ marginLeft: '5px' }}
                              onClick={() => {
                                const { managerList, ...rest } = values;
                                const removedManagerList = managerList.filter((manager, index) => index !== i);
                                setValues({ ...rest, managerList: removedManagerList });
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
                            value={manager.name}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.jobTitle`}
                            label="호칭"
                            value={manager.jobTitle}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.mobile`}
                            label="핸드폰"
                            value={manager.mobile}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="-를 제외하고 입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.phone`}
                            label="전화번호"
                            value={manager.phone}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            placeholder="-를 제외하고 입력"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <DataField
                            name={`managerList.${i}.email`}
                            label="이메일"
                            value={manager.email}
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
                      style={{ marginRight: '5px' }}
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
  );
};

export default Page;