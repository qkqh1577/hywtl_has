import React, { useEffect, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import dayjs from 'dayjs';
import {
  useDialog
} from 'components';
import {
  PersonnelAcademicParameter,
  PersonnelBasicParameter,
  PersonnelCareerParameter,
  PersonnelCompanyParameter,
  PersonnelJobParameter,
  PersonnelLanguageParameter,
  PersonnelLicenseParameter,
  PersonnelParameter,
  initView,
  usePersonnel,
} from 'services/personnel';
import { FileItemParameter } from 'services/common/file-item';

const PersonnelDetailBasic = React.lazy(() => import('./Basic'));
const PersonnelDetailCompany = React.lazy(() => import('./Company'));
const PersonnelDetailJobList = React.lazy(() => import('./JobList'));
const PersonnelDetailAcademicList = React.lazy(() => import('./AcademicList'));
const PersonnelDetailCareerList = React.lazy(() => import('./CareerList'));
const PersonnelDetailLicenseList = React.lazy(() => import('./LicenseList'));
const PersonnelDetailLanguageList = React.lazy(() => import('./LanguageList'));

const PersonnelDetail = () => {
  const navigate = useNavigate();
  const dialog = useDialog();
  const { id: idString } = useParams<{ id: string }>();
  const id = idString ? +idString : undefined;
  if (typeof id === 'undefined' || Number.isNaN(id)) {
    dialog.error('잘못된 접근입니다.', '/hr/card');
    return null;
  }

  const {
    clearOne,
    update
  } = usePersonnel();

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

        const departmentId: number = item.departmentId;
        if (!departmentId) {
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
        const job: PersonnelJobParameter = {
          departmentId,
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
        setSubmitting(false);
        if (data) {
          dialog.alert('저장하였습니다.');
        }
      });
    },
  };

  useEffect(() => {
    return () => {
      clearOne();
    };
  }, [id]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
              initialValues={initView}
              onSubmit={handler.submit}
              enableReinitialize
            >
              {({
                values,
                errors,
                isSubmitting,
                setFieldValue,
                handleSubmit,
              }) => (
                <Form>
                  <Suspense fallback={
                    <Typography>
                      기본 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailBasic
                      id={id}
                      values={values.basic}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Suspense fallback={
                    <Typography>
                      입사 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailCompany
                      id={id}
                      values={values.company}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Suspense fallback={
                    <Typography>
                      소속 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailJobList
                      id={id}
                      values={values.jobList}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Suspense fallback={
                    <Typography>
                      학력 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailAcademicList
                      id={id}
                      values={values.academicList}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Suspense fallback={
                    <Typography>
                      경력 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailCareerList
                      id={id}
                      values={values.careerList}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Suspense fallback={
                    <Typography>
                      면허 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailLicenseList
                      id={id}
                      values={values.licenseList}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Suspense fallback={
                    <Typography>
                      어학 정보를 불러오고 있습니다.
                    </Typography>
                  }>
                    <PersonnelDetailLanguageList
                      id={id}
                      values={values.languageList}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </Suspense>

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
