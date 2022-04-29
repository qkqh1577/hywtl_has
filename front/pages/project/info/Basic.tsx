import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  SaveAs as SaveIcon,
  EditOff as ResetIcon,
} from '@mui/icons-material';
import { DateFormat, DataField, UserSelector } from 'components';
import useProject from 'services/project/hook';
import { Form, Formik, FormikHelpers } from 'formik';
import { initProjectBasic, ProjectBasicView } from 'services/project/view';
import { ProjectBasicParameter } from 'services/project/parameter';

const ProjectBasicDetail = () => {

  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    projectState: {
      basic: detail
    },
    getBasic: getOne,
    setBasic: setOne,
    clearBasic: clearOne,
    updateBasic: update,
  } = useProject();
  const [open, setOpen] = useState<boolean>(true);
  const [view, setView] = useState<ProjectBasicView>(initProjectBasic);
  const [edit, setEdit] = useState<boolean>(false);

  const handler = {
    toggle: () => {
      setOpen(!open);
    },
    edit: () => {
      setEdit(true);
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      if (!projectId || !detail) {
        return;
      }
      const errors: any = {};

      const name: string = values.name;
      if (!name) {
        errors.name = '프로젝트명 입력은 필수입니다.';
      }

      const code: string = values.code;
      if (!code) {
        errors.code = '프로젝트 코드 입력은 필수입니다.';
      }

      const alias: string | undefined = values.alias || undefined;

      const salesManagerId: number = values.salesManagerId;
      if (!salesManagerId) {
        errors.salesManagerId = '영업 담당자 선택은 필수입니다.';
      }

      const projectManagerId: number = values.projectManagerId;
      if (!projectManagerId) {
        errors.projectManagerId = '담당 PM 선택은 필수입니다.';
      }

      const address: string | undefined = values.address || undefined;
      const purpose1: string | undefined = values.purpose1 || undefined;
      const purpose2: string | undefined = values.purpose2 || undefined;
      const lotArea: number | undefined = values.lotArea || undefined;
      const totalArea: number | undefined = values.totalArea || undefined;
      const buildingCount: number | undefined = values.buildingCount || undefined;
      const householdCount: number | undefined = values.householdCount || undefined;
      const floorCount: number | undefined = values.floorCount || undefined;
      const baseCount: number | undefined = values.baseCount || undefined;
      const clientName: string | undefined = values.clientName || undefined;
      const isClientLH: boolean | undefined = values.isClientLH === '' ? undefined : values.isClientLH === '예';
      const clientManager: string | undefined = values.clientManager || undefined;
      const clientPhone: string | undefined = values.clientPhone || undefined;
      const clientEmail: string | undefined = values.clientEmail || undefined;

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: ProjectBasicParameter = {
        name,
        code,
        alias,
        salesManagerId,
        projectManagerId,
        address,
        purpose1,
        purpose2,
        lotArea,
        totalArea,
        buildingCount,
        householdCount,
        floorCount,
        baseCount,
        clientName,
        isClientLH,
        clientManager,
        clientPhone,
        clientEmail
      };

      update(projectId, params, (data) => {
        if (data) {
          window.alert('수정하였습니다.');
          setOne(data);
          setEdit(false);
        }
        setSubmitting(false);
      });
    },
    updateView: () => {
      setView({
        name: detail?.name ?? view.name,
        code: detail?.code ?? view.code,
        alias: detail?.alias ?? view.alias,
        salesManagerId: detail?.salesManager.id ?? view.salesManagerId,
        projectManagerId: detail?.projectManager.id ?? view.projectManagerId,
        address: detail?.address ?? view.address,
        purpose1: detail?.purpose1 ?? view.purpose1,
        purpose2: detail?.purpose2 ?? view.purpose2,
        lotArea: detail?.lotArea ?? view.lotArea,
        totalArea: detail?.totalArea ?? view.totalArea,
        buildingCount: detail?.buildingCount ?? view.buildingCount,
        householdCount: detail?.householdCount ?? view.householdCount,
        floorCount: detail?.floorCount ?? view.floorCount,
        baseCount: detail?.baseCount ?? view.baseCount,
        clientName: detail?.clientName ?? view.clientName,
        isClientLH: (detail && typeof detail.isClientLH === 'boolean') ? (detail.isClientLH ? '예' : '아니요') : view.isClientLH,
        clientManager: detail?.clientManager ?? view.clientManager,
        clientPhone: detail?.clientPhone ?? view.clientPhone,
        clientEmail: detail?.clientEmail ?? view.clientEmail,
      });
    }
  };

  useEffect(() => {
    if (projectId) {
      getOne(projectId);
    }
    return () => {
      clearOne();
    };
  }, [projectId]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Formik
        initialValues={view}
        onSubmit={handler.submit}
        enableReinitialize
      >
        {({ values, errors, isSubmitting, dirty, setFieldValue, handleSubmit, resetForm }) => (
          <Form>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mb: '40px',
            }}>
              <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                <Grid item sx={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignItems: 'center',
                }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      marginRight: '4px'
                    }}
                  >
                    기본 정보
                  </Typography>
                  {open && edit && (
                    <>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '25px',
                        height: '25px',
                        backgroundColor: (theme) => theme.palette.primary.main,
                        borderRadius: '4px'
                      }}>
                        <IconButton
                          disabled={isSubmitting || !dirty}
                          onClick={() => {
                            handleSubmit();
                          }}
                          sx={{
                            color: '#ffffff',
                            maxHeight: '21px'
                          }}>
                          <SaveIcon />
                        </IconButton>
                      </Box>
                      <Box color="primary" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '25px',
                        height: '25px',
                        backgroundColor: (theme) => theme.palette.primary.main,
                        borderRadius: '4px'
                      }}>
                        <IconButton
                          onClick={() => {
                            if (edit && dirty) {
                              if (window.confirm('수정을 취소하겠습니까? 작성 중인 내용은 사라집니다.')) {
                                resetForm();
                                handler.updateView();
                                setEdit(false);
                              }
                            } else {
                              setEdit(false);
                            }
                          }}
                          sx={{
                            color: '#ffffff',
                            maxHeight: '21px'
                          }}>
                          <ResetIcon />
                        </IconButton>
                      </Box>
                    </>
                  )}
                  {open && !edit && (
                    <Box color="primary" sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      width: '25px',
                      height: '25px',
                      backgroundColor: (theme) => theme.palette.primary.main,
                      borderRadius: '4px'
                    }}>
                      <IconButton
                        onClick={handler.edit}
                        sx={{
                          color: '#ffffff',
                          maxHeight: '21px'
                        }}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
                {!edit && (
                  <Grid item sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                  }}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        marginRight: '4px'
                      }}
                    >
                      최종수정일시
                    </Typography>
                    <Typography
                      sx={{
                        marginRight: '8px'
                      }}
                    >
                      <DateFormat date={detail?.updatedTime} format="YYYY-MM-DD HH:mm" />
                    </Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.toggle}
                      sx={{
                        maxHeight: '30px'
                      }}
                    >
                      {open ? '접기' : '펴기'}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Box sx={{
              display: 'flex',
              width: '100%',
              mb: '40px',
            }}>
              <Grid container spacing={2}>
                <Grid item sm={2}>
                  <DataField
                    name="code"
                    label="프로젝트 코드"
                    value={values.code}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    name="name"
                    label="프로젝트명"
                    value={values.name}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    name="alias"
                    label="프로젝트 닉네임"
                    value={values.alias}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    helperText="※최대 5글자"
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <UserSelector
                    name="salesManagerId"
                    label="영업 담당자"
                    value={values.salesManagerId}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    name="address"
                    label="주소"
                    value={values.address}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    name="purpose1"
                    label="건물 용도1"
                    value={values.purpose1}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    name="purpose2"
                    label="건물 용도1"
                    value={values.purpose2}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <UserSelector
                    name="projectManagerId"
                    label="담당 PM"
                    value={values.projectManagerId}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="buildingCount"
                    label="총 동 수"
                    value={values.buildingCount}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="householdCount"
                    label="건물 당 세대 수"
                    value={values.householdCount}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="floorCount"
                    label="층 수"
                    value={values.floorCount}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="baseCount"
                    label="지하층 수"
                    value={values.baseCount}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="lotArea"
                    label="대지면적"
                    value={values.lotArea}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="totalArea"
                    label="연면적"
                    value={values.totalArea}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={3}>
                  <DataField
                    type="number"
                    name="clientName"
                    label="업체"
                    value={values.clientName}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="select"
                    name="isClientLH"
                    label="업체 LH 여부"
                    value={values.isClientLH}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                    options={['예', '아니요']}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="totalArea"
                    label="연면적"
                    value={values.totalArea}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="totalArea"
                    label="연면적"
                    value={values.totalArea}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="number"
                    name="totalArea"
                    label="연면적"
                    value={values.totalArea}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    disabled={!edit}
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
      <Divider />
    </Paper>
  );
};

export default ProjectBasicDetail;
