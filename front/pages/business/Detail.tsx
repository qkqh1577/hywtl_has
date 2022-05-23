import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {DataField, useDialog} from 'components';
import {
  BusinessAddParameter,
  BusinessManagerParameter,
  BusinessManagerStatus,
  BusinessManagerView,
  BusinessRegistrationNumberCheckParameter,
  businessManagerStatusList,
  businessManagerStatusName,
  initBusinessManagerView,
  initBusinessView,
  useBusiness,
  BusinessView,
  BusinessChangeParameter,
} from 'services/business';

const Page = () => {
  const navigate = useNavigate();

  const { id: idString } = useParams<{ id: string }>();
  const id = typeof idString === 'undefined' || idString === 'add' ?
    null : (Number.isNaN(+idString) ? null : +idString);

  const dialog = useDialog();
  const {
    state: {
      detail
    },
    getOne,
    clearOne,
    add,
    change,
    remove,
    checkRegistrationNumber,
  } = useBusiness();

  const [view, setView] = useState<BusinessView>(initBusinessView);
  const [edit, setEdit] = useState<boolean>(id === null);
  const [registrationNumberHelperText, setRegistrationNumberHelperText] = useState<string | undefined>();

  const handler = {

    toPage: () => {
      navigate('/business-management');
    },

    toModForm: () => {
      setEdit(true);
      navigate(`/business-management/${id}/form`);
    },

    checkRegistrationNumber: (registrationNumber: string): void => {
      if (!registrationNumber) {
        setRegistrationNumberHelperText('사업자번호를 입력해 주세요.');
        return;
      }

      if(id && edit && detail) {
        if(registrationNumber === detail.registrationNumber) {
          setRegistrationNumberHelperText('기존 사업자번호와 동일합니다.');
          return;
        }
      }

      const params: BusinessRegistrationNumberCheckParameter = {
        registrationNumber,
      };
      checkRegistrationNumber(params, (e) => {
        if (e) {
          setRegistrationNumberHelperText('이미 등록되어 있는 사업자번호 입니다.');
        } else {
          setRegistrationNumberHelperText('등록 가능한 사업자번호 입니다.');
        }
      });
    },

    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const errors: any = {};

      const managerList: BusinessManagerParameter[] = (values.managerList as any[])
      .map((item, index) => {
        const managerErrors: any = {};

        const name: string = item.name;
        if (!name) {
          managerErrors.name = '담당자명은 필수 입력 항목입니다.';
        }
        const id: number | undefined = item.id || undefined;

        const jobTitle: string | undefined = item.jobTitle || undefined;

        const mobilePhone: string | undefined = item.mobilePhone || undefined;

        const officePhone: string | undefined = item.officePhone || undefined;

        const email: string | undefined = item.email || undefined;

        const meta: string[] = item.meta.split(',').map((text: string) => text.trim());

        const status: BusinessManagerStatus = item.status;
        if (!status) {
          managerErrors.status = '담당자 상태는 필수 입력 항목입니다.';
        }

        const keys = Object.keys(managerErrors);

        if (keys.length > 0) {
          for (let errorIndex = 0; errorIndex < keys.length; errorIndex++) {
            errors[`managerList[${index}].${keys[errorIndex]}`]
              = managerErrors[keys[errorIndex]];
          }
          return null;
        }

        const managerParam: BusinessManagerParameter = {
          id,
          name,
          jobTitle,
          mobilePhone,
          officePhone,
          email,
          meta: meta.length === 0 ? undefined : meta,
          status,
        };

        return managerParam;
      })
      .filter(item => item !== null)
      .map(item => item as BusinessManagerParameter);

      // if(managerList.length === 0) {
      //   errors['managerList.size'] = '담당자는 한 명 이상 필수입니다.';
      // }

      const name: string = values.name;
      if (!name) {
        errors.name = '업체명은 필수 입력 항목입니다.';
      }

      const representativeName: string | undefined = values.representativeName || undefined;

      const officePhone: string | undefined = values.officePhone || undefined;

      const registrationNumber: string = values.registrationNumber;
      if (!registrationNumber) {
        errors.registrationNumber = '사업자번호는 필수 입력 항목입니다.';
      }

      const address: string | undefined = values.address || undefined;

      const zipCode: string | undefined = values.zipCode || undefined;

      const memo: string | undefined = values.memo || undefined;

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      if(!id) {
        const params: BusinessAddParameter = {
          name,
          representativeName,
          officePhone,
          registrationNumber,
          address,
          zipCode,
          memo,
          managerList,
        };

        add(params, () => {
          dialog.alert('저장되었습니다.');
          navigate('/business-management');
        });
      } else {
        if(edit) {
          const params: BusinessChangeParameter = {
            id,
            name,
            representativeName,
            officePhone,
            registrationNumber,
            address,
            zipCode,
            memo,
            managerList,
          };

          change(params, () => {
            dialog.alert('수정되었습니다.');
            navigate('/business-management');
          });
        }
      }


      setSubmitting(false);
    },

    delete: () => {
      if(id) {
        remove(id, () => {
          dialog.alert('삭제되었습니다.');
          navigate('/business-management');
        });
      }
    },

    updateView: () => {
      setView({
        name: detail?.name ?? initBusinessView.name,
        representativeName: detail?.representativeName ?? initBusinessView.representativeName,
        registrationNumber: detail?.registrationNumber ?? initBusinessView.registrationNumber,
        address: detail?.address ?? initBusinessView.address,
        zipCode: detail?.zipCode ?? initBusinessView.zipCode,
        officePhone: detail?.officePhone ?? initBusinessView.officePhone,
        memo: detail?.memo ?? initBusinessView.memo,
        managerList: detail?.managerList.map((item) => ({
          name: item.name,
          jobTitle: item.jobTitle ?? '',
          mobilePhone: item.mobilePhone ?? '',
          officePhone: item.officePhone ?? '',
          email: item.email ?? '',
          meta: item.meta?.join() ?? '',
          status: item.status,
        })) ?? initBusinessView.managerList,
      });
    },
  };

  useEffect(() => {
    if(id) {
      getOne(id);
    }
    return () => {
      clearOne();
    }
  }, [id]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Formik
              initialValues={view}
              enableReinitialize
              onSubmit={handler.submit}
            >
              {({
                values,
                errors,
                isSubmitting,
                setFieldValue,
                handleSubmit,
              }) => (
                <Form>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '50px',
                    mb: '40px',
                  }}>
                    <h2>업체 정보</h2>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <DataField
                        name="name"
                        label="업체명"
                        value={values.name}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                        required={edit}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="representativeName"
                        label="대표명"
                        value={values.representativeName}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="officePhone"
                        label="대표 전화번호"
                        value={values.officePhone}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                        placeholder="-를 제외하고 입력"
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataField
                        name="registrationNumber"
                        label="사업자번호"
                        value={values.registrationNumber}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                        helperText={registrationNumberHelperText}
                        endAdornment={
                          edit && (
                            <Button
                              variant="outlined"
                              sx={{ mb: '10px' }}
                              onClick={() => {
                                handler.checkRegistrationNumber(values.registrationNumber);
                              }}
                            >
                              중복 조회
                            </Button>)
                        }
                        onKeyDown={() => {
                          setRegistrationNumberHelperText(undefined);
                        }}
                        required
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataField
                        name="address"
                        label="주소"
                        value={values.address}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="zipCode"
                        label="우편번호"
                        value={values.zipCode}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                      />
                    </Grid>
                    <Grid item sm={12}>
                      <DataField
                        name="memo"
                        label="비고"
                        value={values.memo}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: '40px', mb: '40px' }} />
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '50px',
                    mb: '40px',
                  }}>
                    <h2>담당자 정보</h2>
                    { edit && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ height: '35px' }}
                        onClick={() => {
                          const managerList = values.managerList;
                          if (Array.isArray(managerList)) {
                            setFieldValue('managerList', [...values.managerList, initBusinessManagerView]);
                          } else {
                            setFieldValue('managerList', [initBusinessManagerView]);
                          }
                        }}
                      >
                        추가
                    </Button>)}
                  </Box>
                  {values.managerList?.map((manager, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        mb: '40px',
                      }}>
                      { edit && (
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          width: '100%',
                          height: '50px',
                        }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ height: '35px' }}
                            onClick={() => {
                              const managerList: BusinessManagerView[] = values.managerList;
                              if (managerList.length === 1) {
                                setFieldValue('managerList', [initBusinessManagerView]);
                              } else {
                                setFieldValue('managerList', managerList.filter((m, index) => index !== i));
                              }
                            }}
                          >
                            삭제
                          </Button>
                        </Box>
                      )}
                      <Box
                        sx={{
                        display: 'flex',
                        width: '100%',
                        backgroundColor: (manager.status === 'RESIGNATION' || manager.status === 'LEAVE') ? '#e5e5e5' : undefined
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item sm={6}>
                            <DataField
                              name={`managerList[${i}].name`}
                              label="담당자명"
                              value={manager.name}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                              required
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <DataField
                              name={`managerList[${i}].jobTitle`}
                              label="호칭"
                              value={manager.jobTitle}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <DataField
                              name={`managerList[${i}].mobilePhone`}
                              label="핸드폰"
                              value={manager.mobilePhone}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                              placeholder="-를 제외하고 입력"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <DataField
                              name={`managerList[${i}].officePhone`}
                              label="전화번호"
                              value={manager.officePhone}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                              placeholder="-를 제외하고 입력"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <DataField
                              name={`managerList[${i}].email`}
                              label="이메일"
                              value={manager.email}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                              placeholder="입력"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <DataField
                              name={`managerList[${i}].meta`}
                              label="메타"
                              value={manager.meta}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                              placeholder="입력"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <DataField
                              type="select"
                              name={`managerList[${i}].status`}
                              label="상태"
                              value={manager.status}
                              setFieldValue={setFieldValue}
                              errors={errors}
                              disabled={!edit}
                              options={businessManagerStatusList.map((item) => ({
                                key: item as string,
                                text: businessManagerStatusName(item)
                              }))}
                              required
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  ))}

                  {/* 등록 || 수정 */}
                  { edit && (
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
                        { id ? '수정' : '등록'}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handler.toPage}
                      >
                        취소
                      </Button>
                    </Box>
                    )}

                    {/* 상세 */}
                    { (!edit && id) && (
                      <Box sx={{
                        display: 'flex',
                        width: '100%',
                      }}>
                      <Box sx={{
                        display: 'flex',
                        width: '50%',
                        justifyContent: 'flex-start',
                      }}>
                        <Button variant="contained" color="primary" onClick={handler.toPage}>
                          목록
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{marginLeft: '5px'}}
                          onClick={handler.delete}
                        >
                          삭제
                        </Button>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        width: '50%',
                        justifyContent: 'flex-end',
                      }}>
                        <Button variant="contained" color="secondary" onClick={handler.toModForm}>
                          수정
                        </Button>
                      </Box>
                    </Box>
                    )}
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