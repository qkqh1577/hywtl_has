import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Box,
  Button, Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import FileInput from 'components/FileInput';
import DepartmentSelector from 'components/DepartmentSelector';
import FileItem from 'services/common/file-item/entity';
import {
  PersonnelAcademicParameter,
  PersonnelBasicParameter, PersonnelCareerParameter,
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
type AcademicView = {
  academyName: string;
  major: string;
  degree: string;
  state: string;
  grade: string;
  startDate: Date | '';
  endDate: Date | '';
}
type CareerView = {
  companyName: String;
  startDate: Date | '';
  endDate: Date | '';
  majorJob: string;
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
  },
  jobList: JobView[];
  academicList: AcademicView[];
  careerList: CareerView[];
};
const initJobView: JobView = {
  departmentId: '',
  jobTitle: '',
  jobType: '',
  jobPosition: '',
  jobClass: '',
  jobDuty: ''
};
const initAcademicView: AcademicView = {
  academyName: '',
  major: '',
  degree: '',
  grade: '',
  startDate: '',
  endDate: '',
  state: '',
};
const initCareer: CareerView = {
  companyName: '',
  startDate: '',
  endDate: '',
  majorJob: '',
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
  },
  jobList: [initJobView],
  academicList: [initAcademicView],
  careerList: [initCareer],
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
        academicList: {},
        careerList: {},
      };
      const basicEngName: string = values.basic.engName;
      if (!basicEngName) {
        errors.basic.engName = '영문명 입력은 필수입니다.';
      }
      const basicBirthDate: Date = values.basic.birthDate;
      if (!basicBirthDate) {
        errors.basic.birthDate = '생년월일 입력은 필수입니다.';
      }
      const basicSex: string = values.basic.sex;
      if (!basicSex) {
        errors.basic.sex = '성별 입력은 필수입니다.';
      }
      const basicAddress: string | undefined = values.basic.address || undefined;
      const basicPhone: string | undefined = values.basic.phone || undefined;
      const basicEmergencyPhone: string | undefined = values.basic.emergencyPhone || undefined;
      const basicRelationship: string | undefined = values.basic.relationship || undefined;
      const basicPersonalEmail: string | undefined = values.basic.personalEmail || undefined;

      const companyHiredDate: Date = values.company.hiredDate;
      if (!companyHiredDate) {
        errors.company.hiredDate = '입사일 입력은 필수입니다.';
      }

      const companyHiredType: '신입' | '경력' = values.company.hiredType;
      if (!companyHiredType) {
        errors.company.hiredType = '입사 구분 선택은 필수입니다.';
      }

      const companyRecommender: string | undefined = values.company.recommender || undefined;

      const jobListParams: PersonnelJobParameter[] = (values.jobList as any[])
      .map((item, index) => {
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
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelJobParameter);

      if (jobListParams.length === 0) {
        errors.jobList.size = '직함 정보는 하나 이상 필수입니다.';
      }

      const academicListParams: PersonnelAcademicParameter[] = (values.academicList as any[])
      .map((item, i) => {
        const academicErrors: any = {};

        const academyName: string = item.academyName;
        if (!academyName) {
          academicErrors.academyName = '교육기관명 입력은 필수입니다.';
        }

        const major: string = item.major;
        if (!major) {
          academicErrors.major = '전공 입력은 필수입니다.';
        }

        const degree: string | undefined = item.degree || undefined;

        const state: string = item.state;
        if (!state) {
          academicErrors.state = '재적 상태 입력은 필수입니다.';
        }

        const grade: string | undefined = item.grade || undefined;

        const startDate: Date = item.startDate;
        if (!startDate) {
          academicErrors.startDate = '교육 시작일 입력은 필수입니다.';
        }

        const endDate: Date = item.endDate;
        if (!endDate) {
          academicErrors.endDate = '교육 종료일 입력은 필수입니다.';
        }
        if (Object.keys(academicErrors).length > 0) {
          errors.academicList[i] = academicErrors;
          return null;
        }
        const academicParams: PersonnelAcademicParameter = {
          academyName,
          major,
          degree,
          state,
          grade,
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          endDate: dayjs(endDate).format('YYYY-MM-DD')
        };
        return academicParams;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelAcademicParameter);

      const careerListParams: PersonnelCareerParameter[] = (values.careerList as any[])
      .map((item, i) => {
        const careerErrors: any = {};

        const companyName: string = item.companyName;
        if (!companyName) {
          careerErrors.companyName = '근무처명 입력은 필수입니다.';
        }

        const startDate: Date = item.startDate;
        if (!startDate) {
          careerErrors.startDate = '근무시작일 입력은 필수입니다.';
        }

        const endDate: Date = item.endDate;
        if (!endDate) {
          careerErrors.endDate = '근무종료일 입력은 필수입니다.';
        }

        const majorJob: string = item.majorJob;
        if (!majorJob) {
          careerErrors.majorJob = '주 업무 입력은 필수입니다.';
        }

        if (Object.keys(careerErrors).length > 0) {
          errors.careerList[i] = careerErrors;
          return null;
        }

        const careerParams: PersonnelCareerParameter = {
          companyName,
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          endDate: dayjs(endDate).format('YYYY-MM-DD'),
          majorJob
        };
        return careerParams;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelCareerParameter);

      if (Object.keys(errors.basic).length > 0
        || Object.keys(errors.company).length > 0
        || Object.keys(errors.jobList).length > 0
        || Object.keys(errors.academicList).length > 0
      ) {
        console.log(errors);
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const basicParams: PersonnelBasicParameter = {
        engName: basicEngName,
        sex: basicSex,
        birthDate: dayjs(basicBirthDate).format('YYYY-MM-DD'),
        image: values.basic['image-temp'] ?? {
          id: values.basic.image?.id,
        },
        address: basicAddress,
        phone: basicPhone,
        emergencyPhone: basicEmergencyPhone,
        relationship: basicRelationship,
        personalEmail: basicPersonalEmail,
      };

      const companyParams: PersonnelCompanyParameter = {
        hiredDate: dayjs(companyHiredDate).format('YYYY-MM-DD'),
        hiredType: companyHiredType,
        recommender: companyRecommender,
      };

      const params: PersonnelParameter = {
        id,
        basic: basicParams,
        company: companyParams,
        jobList: jobListParams,
        academicList: academicListParams,
        careerList: careerListParams,
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
          },
          jobList: detail.jobList.map((job) => ({
            departmentId: job.department.id,
            jobTitle: job.jobTitle,
            jobType: job.jobType,
            jobPosition: job.jobPosition,
            jobClass: job.jobClass ?? '',
            jobDuty: job.jobDuty ?? '',
          })),
          academicList: detail.academicList?.map((item) => ({
            academyName: item.academyName,
            major: item.major,
            degree: item.degree ?? '',
            state: item.state,
            grade: item.grade ?? '',
            startDate: item.startDate,
            endDate: item.endDate,
          })) ?? view.academicList,
          careerList: detail.careerList?.map((item) => item as CareerView) ?? view.careerList,
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
                      <FormControl variant="standard" fullWidth required>
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
                        value={values.basic.birthDate || null}
                        onChange={(date) => {
                          setFieldValue('basic.birthDate', date ?? '');
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            placeholder="생년월일(YYYY-MM-DD)을 입력하세요"
                            fullWidth
                            required
                          />
                        )}
                        disableFuture
                      />
                      <ErrorMessage name="basic.birthDate" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth required>
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
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
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
                        value={values.company.hiredDate || null}
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
                        allowSameDateSelection
                      />
                      <ErrorMessage name="company.hiredDate" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl variant="standard" fullWidth required>
                        <InputLabel id="params-company.hiredType-label">입사 구분</InputLabel>
                        <Select
                          labelId="params-company.hiredType-label"
                          id="params-company.hiredType"
                          name="company.hiredType"
                          value={values.company.hiredType}
                          onChange={handleChange}
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
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
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
                          const { jobList, ...rest } = values;
                          setView({
                            ...rest,
                            jobList: [...jobList, initJobView]
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.jobList.map((item, i) => (
                      <Grid key={i} container spacing={2} item sm={12}>
                        <Grid item sm={3}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel id={`params-jobList[${i}].departmentId-label`}>
                              소속 부서
                            </InputLabel>
                            <DepartmentSelector
                              id={`params-jobList[${i}].departmentId`}
                              labelId={`params-jobList[${i}].departmentId-label`}
                              name={`jobList[${i}].departmentId`}
                              value={item.departmentId}
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`jobList[${i}].departmentId`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={3}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-jobList[${i}].jobTitle`}>직함</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList[${i}].jobTitle`}
                              name={`jobList[${i}].jobTitle`}
                              value={item.jobTitle}
                              placeholder="직함을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`jobList[${i}].jobTitle`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-jobList[${i}].jobType`}>직종</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList[${i}].jobType`}
                              name={`jobList[${i}].jobType`}
                              value={item.jobType}
                              placeholder="직종을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`jobList[${i}].jobType`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-jobList[${i}].jobPosition`}>직위</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList[${i}].jobPosition`}
                              name={`jobList[${i}].jobPosition`}
                              value={item.jobPosition}
                              placeholder="직위를 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`jobList[${i}].jobPosition`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel
                              htmlFor={`params-jobList[${i}].jobClass`}
                            >직급</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList[${i}].jobClass`}
                              name={`jobList[${i}].jobClass`}
                              value={item.jobClass}
                              placeholder="직급을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`jobList[${i}].jobClass`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-jobList[${i}].jobDuty`}>직책</InputLabel>
                            <Input
                              type="text"
                              id={`params-jobList[${i}].jobDuty`}
                              name={`jobList[${i}].jobDuty`}
                              value={item.jobDuty}
                              placeholder="직책을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`jobList[${i}].jobDuty`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() => {
                              const { jobList, ...rest } = values;
                              if (jobList.length === 1) {
                                window.alert('하나 이상의 소속 정보가 필요합니다.');
                                return;
                              }
                              setView({
                                ...rest,
                                jobList: jobList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            삭제
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Grid container spacing={2}>
                    <Grid item sm={12} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <h2>학력 정보</h2>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: '36px' }}
                        onClick={() => {
                          const { academicList, ...rest } = values;
                          setView({
                            ...rest,
                            academicList: [...academicList, initAcademicView]
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.academicList && values.academicList.map((item, i) => (
                      <Grid key={i} container spacing={2} item sm={12}>
                        <Grid item sm={2}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-academicList[${i}].academyName`}>
                              교육기관명
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-academicList[${i}].academyName`}
                              name={`academicList[${i}].academyName`}
                              value={item.academyName}
                              placeholder="교육기관명을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`academicList[${i}].academyName`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-academicList[${i}].major`}>
                              전공
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-academicList[${i}].major`}
                              name={`academicList[${i}].major`}
                              value={item.major}
                              placeholder="전공을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`academicList[${i}].major`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-academicList[${i}].degree`}>
                              학위
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-academicList[${i}].degree`}
                              name={`academicList[${i}].degree`}
                              value={item.degree}
                              placeholder="학위를 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`academicList[${i}].degree`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-academicList[${i}].state`}>
                              재적 상태
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-academicList[${i}].state`}
                              name={`academicList[${i}].state`}
                              value={item.state}
                              placeholder="재적 상태를 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`academicList[${i}].state`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor={`params-academicList[${i}].grade`}>
                              학점
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-academicList[${i}].grade`}
                              name={`academicList[${i}].grade`}
                              value={item.grade}
                              placeholder="학점을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`academicList[${i}].grade`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={2}>
                          <DatePicker
                            mask="____-__-__"
                            inputFormat="YYYY-MM-DD"
                            toolbarFormat="YYYY-MM-DD"
                            okText="적용"
                            openTo="year"
                            label="시작일"
                            value={values.academicList[i].startDate || null}
                            onChange={(date) => {
                              setFieldValue(`academicList[${i}].startDate`, date ?? '');
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                placeholder="시작일(YYYY-MM-DD)을 입력하세요"
                                fullWidth
                                required
                              />
                            )}
                            allowSameDateSelection
                          />
                        </Grid>
                        <Grid item sm={2}>
                          <DatePicker
                            mask="____-__-__"
                            inputFormat="YYYY-MM-DD"
                            toolbarFormat="YYYY-MM-DD"
                            okText="적용"
                            openTo="year"
                            label="종료일"
                            value={values.academicList[i].endDate || null}
                            onChange={(date) => {
                              setFieldValue(`academicList[${i}].endDate`, date ?? '');
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                placeholder="종료일(YYYY-MM-DD)을 입력하세요"
                                fullWidth
                                required
                              />
                            )}
                            allowSameDateSelection
                          />
                        </Grid>
                        <Grid item sm={1}>
                          <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() => {
                              const { academicList, ...rest } = values;
                              setView({
                                ...rest,
                                academicList: academicList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            삭제
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Grid container spacing={2}>
                    <Grid item sm={12} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <h2>경력 정보</h2>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: '36px' }}
                        onClick={() => {
                          const { careerList, ...rest } = values;
                          setView({
                            ...rest,
                            careerList: [...careerList, initCareer]
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.careerList && values.careerList.map((item, i) => (
                      <Grid key={i} container spacing={2} item sm={12}>
                        <Grid item sm={2}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-careerList[${i}].companyName`}>
                              근무처명
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-careerList[${i}].companyName`}
                              name={`careerList[${i}].companyName`}
                              value={item.companyName}
                              placeholder="근무처명을 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`careerList[${i}].companyName`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={3}>
                          <DatePicker
                            mask="____-__-__"
                            inputFormat="YYYY-MM-DD"
                            toolbarFormat="YYYY-MM-DD"
                            okText="적용"
                            openTo="year"
                            label="시작일"
                            value={values.careerList[i].startDate || null}
                            onChange={(date) => {
                              setFieldValue(`careerList[${i}].startDate`, date ?? '');
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                placeholder="시작일(YYYY-MM-DD)을 입력하세요"
                                fullWidth
                                required
                              />
                            )}
                            allowSameDateSelection
                          />
                        </Grid>
                        <Grid item sm={3}>
                          <DatePicker
                            mask="____-__-__"
                            inputFormat="YYYY-MM-DD"
                            toolbarFormat="YYYY-MM-DD"
                            okText="적용"
                            openTo="year"
                            label="종료일"
                            value={values.careerList[i].endDate || null}
                            onChange={(date) => {
                              setFieldValue(`careerList[${i}].endDate`, date ?? '');
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                placeholder="종료일(YYYY-MM-DD)을 입력하세요"
                                fullWidth
                                required
                              />
                            )}
                            allowSameDateSelection
                          />
                        </Grid>
                        <Grid item sm={3}>
                          <FormControl variant="standard" fullWidth required>
                            <InputLabel htmlFor={`params-careerList[${i}].majorJob`}>
                              주 업무
                            </InputLabel>
                            <Input
                              type="text"
                              id={`params-careerList[${i}].majorJob`}
                              name={`careerList[${i}].majorJob`}
                              value={item.majorJob}
                              placeholder="주 업무를 입력해 주세요"
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`careerList[${i}].majorJob`} />
                          </FormControl>
                        </Grid>
                        <Grid item sm={1}>
                          <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={() => {
                              const { careerList, ...rest } = values;
                              setView({
                                ...rest,
                                careerList: careerList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            삭제
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>


                  <Divider sx={{ mt: '40px', mb: '40px' }} />
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
