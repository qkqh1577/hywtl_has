import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, Grid, IconButton, Paper } from '@mui/material';
import {
  Edit as EditIcon,
  SaveAs as SaveIcon,
  EditOff as ResetIcon,
} from '@mui/icons-material';
import { DateFormat, DataField } from 'components';
import useProject from 'services/project/hook';
import { Form, Formik, FormikHelpers } from 'formik';
import { initProjectBuilding, ProjectBuildingView } from 'services/project/view';
import { ProjectBuildingParameter } from 'services/project/parameter';

const ProjectBuildingDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    projectState: {
      building: detail
    },
    getBuilding: getOne,
    setBuilding: setOne,
    clearBuilding: clearOne,
    updateBuilding: update,
  } = useProject();
  const [open, setOpen] = useState<boolean>(true);
  const [view, setView] = useState<ProjectBuildingView>(initProjectBuilding);
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

      // TODO: 주소 컴포넌트 개발 이후 변경
      // const address: AddressParameter = values.address;
      const address: string = values.address;
      if (!address) {
        errors.address = '주소 입력은 필수입니다.';
      }

      const purpose1: string | undefined = values.purpose1 || undefined;
      const purpose2: string | undefined = values.purpose2 || undefined;
      const lotArea: number | undefined = values.lotArea || undefined;
      const totalArea: number | undefined = values.totalArea || undefined;
      const buildingCount: number | undefined = values.buildingCount || undefined;
      const householdCount: number | undefined = values.householdCount || undefined;
      const floorCount: number | undefined = values.floorCount || undefined;
      const baseCount: number | undefined = values.baseCount || undefined;


      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }


      const params: ProjectBuildingParameter = {
        address,
        purpose1,
        purpose2,
        lotArea,
        totalArea,
        buildingCount,
        householdCount,
        floorCount,
        baseCount
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
    setView({
      address: detail?.address ?? view.address,
      purpose1: detail?.purpose1 ?? view.purpose1,
      purpose2: detail?.purpose2 ?? view.purpose2,
      lotArea: detail?.lotArea ?? view.lotArea,
      totalArea: detail?.totalArea ?? view.totalArea,
      buildingCount: detail?.buildingCount ?? view.buildingCount,
      householdCount: detail?.householdCount ?? view.householdCount,
      floorCount: detail?.floorCount ?? view.floorCount,
      baseCount: detail?.baseCount ?? view.baseCount,
    });
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Formik
        initialValues={view}
        onSubmit={handler.submit}
        enableReinitialize
      >
        {({ values, isSubmitting, dirty, setFieldValue, handleSubmit, resetForm }) => (
          <Form>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: '50px',
              mb: '40px',
            }}>
              <Grid container spacing={2} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}>
                <Grid item>
                  <strong>건물 정보</strong>
                  {open && edit && (
                    <>
                      <IconButton
                        color="primary"
                        disabled={isSubmitting || !dirty}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          if (edit && dirty) {
                            if (window.confirm('수정을 취소하겠습니까? 작성 중인 내용은 사라집니다.')) {
                              resetForm();
                              setView({
                                address: detail?.address ?? view.address,
                                purpose1: detail?.purpose1 ?? view.purpose1,
                                purpose2: detail?.purpose2 ?? view.purpose2,
                                lotArea: detail?.lotArea ?? view.lotArea,
                                totalArea: detail?.totalArea ?? view.totalArea,
                                buildingCount: detail?.buildingCount ?? view.buildingCount,
                                householdCount: detail?.householdCount ?? view.householdCount,
                                floorCount: detail?.floorCount ?? view.floorCount,
                                baseCount: detail?.baseCount ?? view.baseCount,
                              });
                              setEdit(false);
                            }
                          } else {
                            setEdit(false);
                          }
                        }}
                      >
                        <ResetIcon />
                      </IconButton>
                    </>
                  )}
                  {open && !edit && (
                    <IconButton onClick={handler.edit}>
                      <EditIcon />
                    </IconButton>
                  )}
                </Grid>
                {!edit && (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.toggle}
                    >
                      {open ? '접기' : '펴기'}
                    </Button>
                    <span>최종수정일시</span>
                    <strong>
                      <DateFormat date={detail?.updatedTime} format="YYYY-MM-DD HH:mm" />
                    </strong>
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
                <Grid item sm={12}>
                  <DataField
                    name="address"
                    label="주소"
                    value={values.address}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                    required
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    name="purpose1"
                    label="건물 용도1"
                    value={values.purpose1}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    name="purpose2"
                    label="건물 용도1"
                    value={values.purpose2}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    type="number"
                    name="lotArea"
                    label="대지면적"
                    value={values.lotArea}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    type="number"
                    name="totalArea"
                    label="연면적"
                    value={values.totalArea}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    type="number"
                    name="buildingCount"
                    label="총 동 수"
                    value={values.buildingCount}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    type="number"
                    name="householdCount"
                    label="건물 당 세대 수"
                    value={values.householdCount}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    type="number"
                    name="floorCount"
                    label="층 수"
                    value={values.floorCount}
                    setFieldValue={setFieldValue}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item sm={6}>
                  <DataField
                    type="number"
                    name="baseCount"
                    label="지하층 수"
                    value={values.baseCount}
                    setFieldValue={setFieldValue}
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

export default ProjectBuildingDetail;
