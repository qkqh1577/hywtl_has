import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import {
  DeleteForever as DeleteIcon
} from '@mui/icons-material';
import {
  ErrorMessage,
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import {
  DataField,
  DatePicker,
  DepartmentSelector,
  FileInput,
} from 'components';
import { usePersonnel, Personnel } from 'services/personnel';
import {
  PersonnelAcademicParameter,
  PersonnelBasicParameter,
  PersonnelCareerParameter,
  PersonnelCompanyParameter,
  PersonnelJobParameter,
  PersonnelLanguageParameter,
  PersonnelLicenseParameter,
  PersonnelParameter
} from 'services/personnel/parameter';
import {
  PersonnelCareerView,
  PersonnelView,
  initAcademicView,
  initCareerView,
  initJobView,
  initView,
  initLicenseView,
  initLanguageView,
} from 'services/personnel/view';
import FileItemParameter from 'services/common/file-item/parameter';
import { ListDepartment } from 'services/department/entity';

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
  const [view, setView] = useState<PersonnelView>(initView);

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
        licenseList: {},
        languageList: {},
      };
      const engName: string = values.basic.engName;
      if (!engName) {
        errors.basic.engName = '영문명 입력은 필수입니다.';
      }
      const birthDate: Date = values.basic.birthDate;
      if (!birthDate) {
        errors.basic.birthDate = '생년월일 입력은 필수입니다.';
      }
      const sex: string = values.basic.sex;
      if (!sex) {
        errors.basic.sex = '성별 입력은 필수입니다.';
      }
      const image: FileItemParameter = {
        id: values.basic.image?.id,
        requestDelete: values.basic['image-temp']?.requestDelete,
        multipartFile: values.basic['image-temp']?.multipartFile,
      };
      const address: string | undefined = values.basic.address || undefined;
      const phone: string | undefined = values.basic.phone || undefined;
      const emergencyPhone: string | undefined = values.basic.emergencyPhone || undefined;
      const relationship: string | undefined = values.basic.relationship || undefined;
      const personalEmail: string | undefined = values.basic.personalEmail || undefined;

      const basic: PersonnelBasicParameter = {
        engName,
        birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
        sex,
        image,
        address,
        phone,
        emergencyPhone,
        relationship,
        personalEmail
      };

      const hiredDate: Date = values.company.hiredDate;
      if (!hiredDate) {
        errors.company.hiredDate = '입사일 입력은 필수입니다.';
      }

      const hiredType: '신입' | '경력' = values.company.hiredType;
      if (!hiredType) {
        errors.company.hiredType = '입사 구분 선택은 필수입니다.';
      }

      const recommender: string | undefined = values.company.recommender || undefined;

      const company: PersonnelCompanyParameter = {
        hiredDate: dayjs(hiredDate).format('YYYY-MM-DD'),
        hiredType,
        recommender,
      };

      const jobList: PersonnelJobParameter[] = (values.jobList as any[])
      .map((item, index) => {
        const jobErrors: any = {};

        const department: ListDepartment = item.department;
        if (!department) {
          jobErrors.department = '부서 선택은 필수입니다.';
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
        const job: PersonnelJobParameter = {
          departmentId: department.id,
          jobTitle,
          jobType,
          jobPosition,
          jobClass,
          jobDuty
        };
        return job;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelJobParameter);

      if (jobList.length === 0) {
        errors.jobList.size = '직함 정보는 하나 이상 필수입니다.';
      }

      const academicList: PersonnelAcademicParameter[] = (values.academicList as any[])
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
        const academic: PersonnelAcademicParameter = {
          academyName,
          major,
          degree,
          state,
          grade,
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          endDate: dayjs(endDate).format('YYYY-MM-DD')
        };
        return academic;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelAcademicParameter);

      const careerList: PersonnelCareerParameter[] = (values.careerList as any[])
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

        const career: PersonnelCareerParameter = {
          companyName,
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          endDate: dayjs(endDate).format('YYYY-MM-DD'),
          majorJob
        };
        return career;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelCareerParameter);

      const licenseList: PersonnelLicenseParameter[] = (values.licenseList as any[])
      .map((item, i) => {
        const licenseErrors: any = {};

        const name: string = item.name;
        if (!name) {
          licenseErrors.name = '면허명 입력은 필수입니다.';
        }

        const type: string | undefined = item.type || undefined;

        const organizationName: string = item.organizationName;
        if (!organizationName) {
          licenseErrors.organizationName = '발급기관명 입력은 필수입니다.';
        }

        const qualifiedNumber: string = item.qualifiedNumber;
        if (!qualifiedNumber) {
          licenseErrors.qualifiedNumber = '인가 번호 입력은 필수입니다.';
        }

        const qualifiedDate: Date = item.qualifiedDate;
        if (!qualifiedDate) {
          licenseErrors.qualifiedDate = '인가일 입력은 필수입니다.';
        }

        const memo: string | undefined = item.memo || undefined;

        if (Object.keys(licenseErrors).length > 0) {
          errors.licenseList[i] = licenseErrors;
          return null;
        }

        const licenseParams: PersonnelLicenseParameter = {
          name,
          type,
          organizationName,
          qualifiedNumber,
          qualifiedDate: dayjs(qualifiedDate).format('YYYY-MM-DD'),
          memo
        };
        return licenseParams;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelLicenseParameter);

      const languageList: PersonnelLanguageParameter[] = (values.languageList as any[])
      .map((item, i) => {
        const languageErrors: any = {};

        const name: string = item.name;
        if (!name) {
          languageErrors.name = '자격증명 입력은 필수입니다.';
        }

        const type: string = item.type;
        if (!type) {
          languageErrors.type = '대상 언어 입력은 필수입니다.';
        }

        const grade: string | undefined = item.grade || undefined;

        const organizationName: string = item.organizationName;
        if (!organizationName) {
          languageErrors.organizationName = '발급기관명 입력은 필수입니다.';
        }

        const certifiedDate: Date = item.certifiedDate;
        if (!certifiedDate) {
          languageErrors.certifiedDate = '취득일 입력은 필수입니다.';
        }

        const expiryPeriod: string | undefined = item.expiryPeriod || undefined;
        const trainingPeriod: string | undefined = item.trainingPeriod || undefined;

        if (Object.keys(languageErrors).length > 0) {
          errors.languageList[i] = languageErrors;
          return null;
        }

        const languageParams: PersonnelLanguageParameter = {
          name,
          type,
          grade,
          organizationName,
          certifiedDate: dayjs(certifiedDate).format('YYYY-MM-DD'),
          expiryPeriod,
          trainingPeriod,
        };
        return languageParams;
      })
      .filter(item => item !== null)
      .map(item => item as PersonnelLanguageParameter);

      if (Object.keys(errors.basic).length > 0
        || Object.keys(errors.company).length > 0
        || Object.keys(errors.jobList).length > 0
        || Object.keys(errors.academicList).length > 0
        || Object.keys(errors.licenseList).length > 0
        || Object.keys(errors.languageList).length > 0
      ) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: PersonnelParameter = {
        id,
        basic,
        company,
        jobList,
        academicList,
        careerList,
        licenseList,
        languageList
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
            department: job.department,
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
          careerList: detail.careerList?.map((item) => item as PersonnelCareerView) ?? view.careerList,
          licenseList: detail.licenseList?.map((item) => ({
            name: item.name,
            type: item.type ?? '',
            organizationName: item.organizationName,
            qualifiedNumber: item.qualifiedNumber,
            qualifiedDate: item.qualifiedDate,
            memo: item.memo ?? '',
          })) ?? view.licenseList,
          languageList: detail.languageList?.map((item) => ({
            name: item.name,
            type: item.type,
            grade: item.grade ?? '',
            organizationName: item.organizationName,
            certifiedDate: item.certifiedDate,
            expiryPeriod: item.expiryPeriod ?? '',
            trainingPeriod: item.trainingPeriod ?? '',
          })) ?? view.languageList,
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
                handleSubmit,
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>기본 정보</h2>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.engName"
                        label="영문명"
                        value={values.basic.engName}
                        setFieldValue={setFieldValue}
                        required
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DatePicker
                        name="basic.birthDate"
                        label="생년월일"
                        value={values.basic.birthDate}
                        setFieldValue={setFieldValue}
                        openTo="year"
                        required
                        disableFuture
                      />
                      <ErrorMessage name="basic.birthDate" />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        type="select"
                        name="basic.sex"
                        label="성별"
                        value={values.basic.sex}
                        setFieldValue={setFieldValue}
                        options={['남', '여']}
                        required
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FileInput
                        id="basic.image"
                        fileItem={values.basic.image}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.phone"
                        label="연락처"
                        value={values.basic.phone}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.emergencyPhone"
                        label="비상연락망"
                        value={values.basic.emergencyPhone}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.relationship"
                        label="비상연락망 - 사원과의관계"
                        value={values.basic.relationship}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="basic.personalEmail"
                        label="개인 이메일"
                        value={values.basic.personalEmail}
                        setFieldValue={setFieldValue}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>입사 정보</h2>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DatePicker
                        name="company.hiredDate"
                        label="입사일"
                        value={values.company.hiredDate}
                        setFieldValue={setFieldValue}
                        openTo="year"
                        required
                        disableFuture
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        type="select"
                        name="company.hiredType"
                        label="입사 구분"
                        value={values.company.hiredType}
                        setFieldValue={setFieldValue}
                        options={['신입', '경력']}
                        required
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <DataField
                        name="company.recommender"
                        label="추천자"
                        value={values.company.recommender}
                        setFieldValue={setFieldValue}
                      />
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
                      <Grid key={i} item sm={12}>
                        <Box sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between'
                        }}>
                          <Grid container spacing={2} wrap="nowrap">
                            <Grid item sm={4}>
                              <DepartmentSelector
                                name={`jobList[${i}].department`}
                                label="소속 부서"
                                value={item.department}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="직함"
                                name={`jobList[${i}].jobTitle`}
                                value={item.jobTitle}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="직종"
                                name={`jobList[${i}].jobType`}
                                value={item.jobType}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="직위"
                                name={`jobList[${i}].jobPosition`}
                                value={item.jobPosition}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="직급"
                                name={`jobList[${i}].jobClass`}
                                value={item.jobClass}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="직책"
                                name={`jobList[${i}].jobDuty`}
                                value={item.jobDuty}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            edge="end"
                            color="secondary"
                            aria-label="삭제"
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
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
                      <Grid key={i} item sm={12}>
                        <Box sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between'
                        }}>
                          <Grid container spacing={2} wrap="nowrap">
                            <Grid item>
                              <DataField
                                label="교육기관명"
                                name={`academicList[${i}].academyName`}
                                value={item.academyName}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="전공"
                                name={`academicList[${i}].major`}
                                value={item.major}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="학위"
                                name={`academicList[${i}].degree`}
                                value={item.degree}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="재적 상태"
                                name={`academicList[${i}].state`}
                                value={item.state}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="학점"
                                name={`academicList[${i}].grade`}
                                value={item.grade}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item>
                              <DatePicker
                                name={`academicList[${i}].startDate`}
                                label="시작일"
                                value={item.startDate}
                                setFieldValue={setFieldValue}
                                openTo="year"
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DatePicker
                                name={`academicList[${i}].endDate`}
                                label="종료일"
                                value={item.endDate}
                                setFieldValue={setFieldValue}
                                openTo="year"
                                required
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            edge="end"
                            color="secondary"
                            aria-label="삭제"
                            onClick={() => {
                              const { academicList, ...rest } = values;
                              setView({
                                ...rest,
                                academicList: academicList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
                            careerList: [...careerList, initCareerView]
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.careerList && values.careerList.map((item, i) => (
                      <Grid key={i} item sm={12}>
                        <Box sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between'
                        }}>
                          <Grid container spacing={2} wrap="nowrap">
                            <Grid item>
                              <DataField
                                label="근무처명"
                                name={`careerList[${i}].companyName`}
                                value={item.companyName}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DatePicker
                                name={`careerList[${i}].startDate`}
                                label="시작일"
                                value={item.startDate}
                                setFieldValue={setFieldValue}
                                openTo="year"
                                required
                                disableFuture
                              />
                            </Grid>
                            <Grid item>
                              <DatePicker
                                name={`careerList[${i}].endDate`}
                                label="종료일"
                                value={item.endDate}
                                setFieldValue={setFieldValue}
                                openTo="year"
                                required
                                disableFuture
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="주 업무"
                                name={`careerList[${i}].majorJob`}
                                value={item.majorJob}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            edge="end"
                            color="secondary"
                            aria-label="삭제"
                            onClick={() => {
                              const { careerList, ...rest } = values;
                              setView({
                                ...rest,
                                careerList: careerList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Grid container spacing={2}>
                    <Grid item sm={12} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <h2>면허 정보</h2>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: '36px' }}
                        onClick={() => {
                          const { licenseList, ...rest } = values;
                          setView({
                            ...rest,
                            licenseList: [...licenseList, initLicenseView]
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.licenseList && values.licenseList.map((item, i) => (
                      <Grid key={i} item sm={12}>
                        <Box sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between'
                        }}>
                          <Grid container spacing={2} wrap="nowrap">
                            <Grid item>
                              <DataField
                                label="면허명"
                                name={`licenseList[${i}].name`}
                                value={item.name}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="종별"
                                name={`licenseList[${i}].type`}
                                value={item.type}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="발급기관명"
                                name={`licenseList[${i}].organizationName`}
                                value={item.organizationName}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="인가 번호"
                                name={`licenseList[${i}].qualifiedNumber`}
                                value={item.qualifiedNumber}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DatePicker
                                name={`licenseList[${i}].qualifiedDate`}
                                label="인가일"
                                value={item.qualifiedDate}
                                setFieldValue={setFieldValue}
                                openTo="year"
                                required
                                disableFuture
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="비고"
                                name={`licenseList[${i}].memo`}
                                value={item.memo}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            edge="end"
                            color="secondary"
                            aria-label="삭제"
                            onClick={() => {
                              const { licenseList, ...rest } = values;
                              setView({
                                ...rest,
                                licenseList: licenseList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Grid container spacing={2}>
                    <Grid item sm={12} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <h2>어학 정보</h2>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ height: '36px' }}
                        onClick={() => {
                          const { languageList, ...rest } = values;
                          setView({
                            ...rest,
                            languageList: [...languageList, initLanguageView]
                          });
                        }}
                      >
                        추가
                      </Button>
                    </Grid>
                    {values.languageList && values.languageList.map((item, i) => (
                      <Grid key={i} item sm={12}>
                        <Box sx={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between'
                        }}>
                          <Grid container spacing={2} wrap="nowrap">
                            <Grid item>
                              <DataField
                                label="자격증명"
                                name={`languageList[${i}].name`}
                                value={item.name}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="대상 언어"
                                name={`languageList[${i}].type`}
                                value={item.type}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="급수, 종류"
                                name={`languageList[${i}].grade`}
                                value={item.grade}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="발급기관명"
                                name={`languageList[${i}].organizationName`}
                                value={item.organizationName}
                                setFieldValue={setFieldValue}
                                required
                              />
                            </Grid>
                            <Grid item>
                              <DatePicker
                                name={`languageList[${i}].certifiedDate`}
                                label="취득일"
                                value={item.certifiedDate}
                                setFieldValue={setFieldValue}
                                openTo="year"
                                required
                                disableFuture
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="유효 기간"
                                name={`languageList[${i}].expiryPeriod`}
                                value={item.expiryPeriod}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item>
                              <DataField
                                label="연수 기간"
                                name={`languageList[${i}].trainingPeriod`}
                                value={item.trainingPeriod}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            edge="end"
                            color="secondary"
                            aria-label="삭제"
                            onClick={() => {
                              const { languageList, ...rest } = values;
                              setView({
                                ...rest,
                                languageList: languageList.filter((item, j) => i !== j)
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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
