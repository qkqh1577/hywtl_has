import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select, TextField
} from '@mui/material';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import produce from 'immer';
import FileInput from 'components/FileInput';
import DepartmentSelector from 'components/DepartmentSelector';
import FileItem from 'services/common/file-item/entity';
import {
  PersonnelBasicParameter,
  PersonnelCompanyParameter,
  PersonnelJobParameter,
  PersonnelParameter
} from 'services/personnel/parameter';
import usePersonnel from 'services/personnel/hook';
import Personnel from 'services/personnel/entity';
import { DatePicker } from '@mui/x-date-pickers';

type JobView = {
  departmentId: number | '';
  jobTitle: string;
  jobType: string;
  jobPosition: string;
  jobClass: string;
  jobDuty: string;
}
type View = {
  basic: {
    engName: string;
    birthDate: Date | '';
    sex: string;
    image?: FileItem;
    address: string;
    phone: string;
    emergencyPhone: string;
    relationship: string;
    personalEmail: string;
  },
  company: {
    hiredDate: Date | '';
    hiredType: string;
    recommender: string;
    jobList: JobView[];
  }
};
const initJobView: JobView = {
  departmentId: '',
  jobTitle: '',
  jobType: '',
  jobPosition: '',
  jobClass: '',
  jobDuty: ''
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
    personalEmail: '',
  },
  company: {
    hiredDate: '',
    hiredType: '',
    recommender: '',
    jobList: [initJobView],
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
      const errors: any = {
        basic: {},
        company: {},
        jobList: {},
      };
      if (Object.keys(errors.basic).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const companyHiredDate: Date = values.company.hiredDate;
      if (!companyHiredDate) {
        errors.company.hiredDate = '입사일 입력은 필수입니다.';
      }

      const companyHiredType: '신입' | '경력' = values.company.hiredType;
      if (!companyHiredType) {
        errors.company.hiredType = '입사 구분 선택은 필수입니다.';
      }

      const companyRecommender: string | undefined = values.company.recommender || undefined;

      if (!Array.isArray(values.company.jobList) || values.company.jobList.length === 0) {
        errors.company.jobList = '직함 정보는 하나 이상 필수입니다.';
      }

      if (Object.keys(errors.company).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const jobListParams: (PersonnelJobParameter | null)[] = (values.company.jobList as JobView[]).map((item: JobView, index: number) => {
        const jobErrors: any = {};

        const departmentId = item.departmentId;
        if (item.departmentId === '') {
          jobErrors.departmentId = '부서 선택은 필수입니다.';
        }

        const jobTitle: string = item.jobTitle;
        if (!jobTitle) {
          jobErrors.jobTitle = '직함 입력은 필수입니다.';
        }

        const jobType: string = item.jobTitle;
        if (!jobType) {
          jobErrors.jobType = '직종 입력은 필수입니다.';
        }

        const jobPosition: string = item.jobPosition;
        if (!jobPosition) {
          jobErrors.jobPosition = '직위 입력은 필수입니다.';
        }

        const jobClass: string | undefined = item.jobClass || undefined;
        const jobDuty: string | undefined = item.jobDuty || undefined;


        if (Object.keys(jobErrors).length > 0) {
          errors.jobList[index] = jobErrors;
          return null;
        }
        const jobParams: PersonnelJobParameter = {
          departmentId: departmentId as number,
          jobTitle,
          jobType,
          jobPosition,
          jobClass,
          jobDuty
        };
        return jobParams;
      });

      if (Object.keys(errors.jobList).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }


      const basicParams: PersonnelBasicParameter = {
        ...values.basic,
        birthDate: values.basic.birthDate ?? undefined,
        image: values.basic['image-temp'] ?? {
          id: values.basic.image?.id,
        }
      };

      const companyParams: PersonnelCompanyParameter = {
        hiredDate: companyHiredDate,
        hiredType: companyHiredType,
        recommender: companyRecommender,
        jobList: jobListParams
        .filter(item => item !== null)
        .map(item => item as PersonnelJobParameter)
      };

      const params: PersonnelParameter = {
        id,
        basic: basicParams,
        company: companyParams,
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
          },
          company: {
            hiredDate: detail.company.hiredDate ?? view.company.hiredDate,
            hiredType: detail.company.hiredType ?? view.company.hiredType,
            recommender: detail.company.recommender ?? view.company.recommender,
            jobList: detail.company.jobList.map((job) => ({
              departmentId: job.department.id,
              jobTitle: job.jobTitle,
              jobType: job.jobType,
              jobPosition: job.jobPosition,
              jobClass: job.jobClass ?? '',
              jobDuty: job.jobDuty ?? '',
            }))
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

  useEffect(() => {
    console.log(view);
  }, [view]);

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
                handleSubmit,
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>기본 정보</h2>
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
                      <DatePicker
                        mask="____-__-__"
                        inputFormat="YYYY-MM-DD"
                        toolbarFormat="YYYY-MM-DD"
                        okText="적용"
                        openTo="year"
                        label="생년월일"
                        value={values.basic.birthDate}
                        onChange={(date) => {
                          setFieldValue('basic.birthDate', date ?? '');
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            placeholder="생년월일(YYYY-MM-DD)을 입력하세요"
                            fullWidth
                          />
                        )}
                        disableFuture
                      />
                      <ErrorMessage name="basic.birthDate" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-basic.sex-label">성별</InputLabel>
                        <Select
                          labelId="params-basic.sex-label"
                          id="params-basic.sex"
                          name="basic.sex"
                          value={values.basic.sex}
                          onChange={(e) => {
                            setView(produce((draft) => {
                              draft.basic.sex = e.target.value;
                              return draft;
                            }));
                          }}
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
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-basic.phone">연락처</InputLabel>
                        <Input
                          type="text"
                          id="params-basic.phone"
                          name="basic.phone"
                          value={values.basic.phone}
                          onChange={handleChange}
                          placeholder="연락처를 입력하세요"
                        />
                        <ErrorMessage name="basic.phone" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-basic.emergencyPhone">비상연락망</InputLabel>
                        <Input
                          type="text"
                          id="params-basic.emergencyPhone"
                          name="basic.emergencyPhone"
                          value={values.basic.emergencyPhone}
                          onChange={handleChange}
                          placeholder="비상연락망을 입력하세요"
                        />
                        <ErrorMessage name="basic.emergencyPhone" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-basic.relationship">비상연락망 - 사원과의관계</InputLabel>
                        <Input
                          type="text"
                          id="params-basic.relationship"
                          name="basic.relationship"
                          value={values.basic.relationship}
                          onChange={handleChange}
                          placeholder="비상연락망 - 사원과의관계를 입력하세요"
                        />
                        <ErrorMessage name="basic.relationship" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-basic.personalEmail">개인 이메일</InputLabel>
                        <Input
                          type="text"
                          id="params-basic.personalEmail"
                          name="basic.personalEmail"
                          value={values.basic.personalEmail}
                          onChange={handleChange}
                          placeholder="개인 이메일"
                        />
                        <ErrorMessage name="basic.personalEmail" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>입사 정보</h2>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DatePicker
                        mask="____-__-__"
                        inputFormat="YYYY-MM-DD"
                        toolbarFormat="YYYY-MM-DD"
                        okText="적용"
                        openTo="year"
                        label="입사일"
                        value={values.company.hiredDate}
                        onChange={(date) => {
                          setFieldValue('company.hiredDate', date ?? '');
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            placeholder="입사일(YYYY-MM-DD)을 입력하세요"
                            fullWidth
                            required
                          />
                        )}
                        disableFuture
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="params-company.hiredType-label">입사 구분</InputLabel>
                        <Select
                          labelId="params-company.hiredType-label"
                          id="params-company.hiredType"
                          name="company.hiredType"
                          value={values.company.hiredType}
                          onChange={(e) => {
                            setView(produce((draft) => {
                              draft.company.hiredType = e.target.value;
                              return draft;
                            }));
                          }}
                          required
                        >
                          <MenuItem value="신입">신입</MenuItem>
                          <MenuItem value="경력">경력</MenuItem>
                        </Select>
                        <ErrorMessage name="company.hiredType" />
                      </FormControl>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="params-company.recommender">추천자</InputLabel>
                        <Input
                          type="text"
                          id="params-company.recommender"
                          name="company.recommender"
                          value={values.company.recommender}
                          onChange={handleChange}
                          placeholder="추천자를 입력하세요"
                        />
                        <ErrorMessage name="company.recommender" />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <h2>소속 정보</h2>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: '36px' }}
                        onClick={() => {
                          const { company: { jobList, ...companyRest }, ...rest } = view;
                          setView({
                            ...rest,
                            company: {
                              ...companyRest,
                              jobList: [...jobList, initJobView]
                            }
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.company.jobList.map((item, i) => (
                      <Grid key={i} container spacing={2} item sm={12}>
                        <Grid item sm={3}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id={`params-jobList.${i}.departmentId-label`}>
                              소속 부서
                            </InputLabel>
                            <DepartmentSelector
                              id={`params-jobList.${i}.departmentId`}
                              labelId={`params-jobList.${i}.departmentId-label`}
                              name={`jobList.${i}.departmentId`}
                              value={item.departmentId}
                              onChange={(departmentId) => {
                                setView(produce((draft) => {
                                  draft.company.jobList[i].departmentId = departmentId;
                                  return draft;
                                }));
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item sm={3}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-jobList.${i}.jobTitle`}>직함</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList.${i}.jobTitle`}
                              name={`jobList.${i}.jobTitle`}
                              value={item.jobTitle}
                              placeholder="직함을 입력해 주세요"
                              onChange={(e) => {
                                setView(produce((draft) => {
                                  draft.company.jobList[i].jobTitle = e.target.value;
                                  return draft;
                                }));
                              }}
                            />
                            <ErrorMessage name={`jobList.${i}.jobTitle`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-jobList.${i}.jobType`}>직종</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList.${i}.jobType`}
                              name={`jobList.${i}.jobType`}
                              value={item.jobType}
                              placeholder="직종을 입력해 주세요"
                              onChange={(e) => {
                                setView(produce((draft) => {
                                  draft.company.jobList[i].jobType = e.target.value;
                                  return draft;
                                }));
                              }}
                            />
                            <ErrorMessage name={`jobList.${i}.jobType`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-jobList.${i}.jobPosition`}>직위</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList.${i}.jobPosition`}
                              name={`jobList.${i}.jobPosition`}
                              value={item.jobPosition}
                              placeholder="직위를 입력해 주세요"
                              onChange={(e) => {
                                setView(produce((draft) => {
                                  draft.company.jobList[i].jobPosition = e.target.value;
                                  return draft;
                                }));
                              }}
                            />
                            <ErrorMessage name={`jobList.${i}.jobPosition`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-jobList.${i}.jobClass`}>직급</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList.${i}.jobClass`}
                              name={`jobList.${i}.jobClass`}
                              value={item.jobClass}
                              placeholder="직급을 입력해 주세요"
                              onChange={(e) => {
                                setView(produce((draft) => {
                                  draft.company.jobList[i].jobClass = e.target.value;
                                  return draft;
                                }));
                              }}
                            />
                            <ErrorMessage name={`jobList.${i}.jobClass`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-jobList.${i}.jobDuty`}>직책</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList.${i}.jobDuty`}
                              name={`jobList.${i}.jobDuty`}
                              value={item.jobDuty}
                              placeholder="직책을 입력해 주세요"
                              onChange={(e) => {
                                setView(produce((draft) => {
                                  draft.company.jobList[i].jobDuty = e.target.value;
                                  return draft;
                                }));
                              }}
                            />
                            <ErrorMessage name={`jobList.${i}.jobDuty`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() => {
                              setView(produce((draft) => {
                                draft.company.jobList.filter((item, j) => i !== j);
                                return draft;
                              }));
                            }}
                          >
                            삭제
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid container spacing={2}>
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
