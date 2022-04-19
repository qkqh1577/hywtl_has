import React, { useEffect, useState } from 'react';
import {
  Box, Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import usePersonnel from 'services/personnel/hook';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import FileInput from 'components/FileInput';
import { useNavigate } from 'react-router-dom';
import { PersonnelBasicParameter, PersonnelParameter } from 'services/personnel/parameter';
import FileItem from 'services/common/file-item/entity';
import Personnel from 'services/personnel/entity';

type View = {
  basic: {
    engName: string;
    birthDate: string;
    sex: '남' | '여' | '';
    image?: FileItem;
    address: string;
    phone: string;
    emergencyPhone: string;
    relationship: string;
    personalEmail: string;
  }
};
const initView: View = {
  basic: {
    engName: '',
    birthDate: '',
    sex: '',
    address: '',
    phone: '',
    emergencyPhone: '',
    relationship: '',
    personalEmail: ''
  }
};

const PersonnelDetail = (props: { id: number }) => {
  const { id } = props;

  const navigate = useNavigate();
  const {
    personnelState: {
      detail
    },
    getOne,
    clearOne,
    update
  } = usePersonnel();
  const [view, setView] = useState<View>(initView);

  const handler = {
    submit: (values: any, {
      setSubmitting,
      setErrors,
    }: FormikHelpers<any>) => {
      const errors: any = {};

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }
      const basicParams: PersonnelBasicParameter = {
        ...values.basic,
        image: values.basic['image-temp'] ?? {
          id: values.basic.image?.id,
        }
      };

      const params: PersonnelParameter = {
        id,
        basic: basicParams,
      };

      update(params, (data?) => {
        if (data) {
          window.alert('저장하였습니다.');
        }
        setSubmitting(false);
      });
    },
    detail: (detail?: Personnel) => {
      if (detail) {
        setView({
          basic: {
            engName: detail.basic.engName ?? view.basic.engName,
            birthDate: detail.basic.birthDate ?? view.basic.birthDate,
            sex: detail.basic.sex ?? view.basic.sex,
            image: detail.basic.image ?? view.basic.image,
            address: detail.basic.address ?? view.basic.address,
            phone: detail.basic.phone ?? view.basic.phone,
            emergencyPhone: detail.basic.emergencyPhone ?? view.basic.emergencyPhone,
            relationship: detail.basic.relationship ?? view.basic.relationship,
            personalEmail: detail.basic.personalEmail ?? view.basic.personalEmail,
          }
        });
      } else {
        setView(initView);
      }
    }
  };

  useEffect(() => {
    getOne(id);
    return () => {
      clearOne();
    };
  }, [id]);


  useEffect(() => {
    handler.detail(detail);
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>인사 카드</h2>
      </Box>
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
                handleChange,
                handleSubmit
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>기본 정보</h2>
                    </Grid>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-basic.engName">영문명</InputLabel>
                      <Input
                        type="text"
                        id="params-basic.engName"
                        name="basic.engName"
                        value={values.basic.engName}
                        onChange={handleChange}
                        placeholder="영문명을 입력하세요"
                      />
                      <ErrorMessage name="basic.engName" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="params-basic.birthDate">생년월일</InputLabel>
                      <Input
                        type="text"
                        id="params-basic.birthDate"
                        name="basic.birthDate"
                        value={values.basic.birthDate}
                        onChange={handleChange}
                        placeholder="생년월일(YYYY-MM-DD)을 입력하세요"
                      />
                      <ErrorMessage name="basic.birthDate" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="params-basic.sex-label">성별</InputLabel>
                      <Select
                        labelId="params-basic.sex-label"
                        id="params-basic.sex"
                        name="basic.sex"
                        value={values.basic.sex}
                        onChange={handleChange}
                      >
                        <MenuItem value="남">남</MenuItem>
                        <MenuItem value="여">여</MenuItem>
                      </Select>
                      <ErrorMessage name="basic.sex" />
                    </FormControl>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FileInput
                      id="basic.image"
                      fileItem={values.basic.image}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                      mt: '40px',
                    }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        취소
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        저장
                      </Button>
                    </Box>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
export default PersonnelDetail;
