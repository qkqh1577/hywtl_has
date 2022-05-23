import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  DataField,
  DataSelector,
  DatePicker,
  Modal,
  TableCellProperty,
  UserSelector
} from 'components';
import {
  ProjectEstimateSheetView as View,
  initProjectEstimateSheetView as initView,
  projectEstimateSheetStatusList,
  projectEstimateSheetStatusName,
  useProjectEstimate,
} from 'services/project_estimate';
import {
  ProjectReviewDetail,
  projectReviewStatusName,
  useProjectReview
} from 'services/project_review';

const reviewDetailColumnList: TableCellProperty<ProjectReviewDetail>[] = [
  {
    label: '건물(동)',
    renderCell: item => item.buildingName,
  },
  {
    label: '층수',
    renderCell: item => item.floorCount
  },
  {
    label: '지하층수',
    renderCell: item => item.baseCount ?? ''
  },
  {
    label: '높이',
    renderCell: item => `${item.height}m`,
  },
  {
    label: '면적',
    renderCell: item => `${item.area}㎡`
  },
  {
    label: '형상비',
    renderCell: item => item.ratio.toFixed(2)
  },
  {
    label: '특별풍하중조건',
    renderCell: item => item.specialWindLoadConditionList?.map(c => `(${c})`).join(', ')
  },
  {
    label: '최소실험 대상여부',
    renderCell: item => item.ratio >= 3 ? 'Y' : ''
  },
  {
    label: '실험 종류',
    renderCell: item => item.testList.join(', ')
  },
  {
    label: '비고1',
    renderCell: item => item.memo1
  },
  {
    label: '비고2',
    renderCell: item => item.memo2
  },
];

const ProjectEstimateSheetModal = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      sheetId,
      sheetDetail: detail,
    },
    getSheetOne: getOne,
    clearSheetOne: clearOne,
    clearSheetId,
  } = useProjectEstimate();
  const {
    state: {
      list: reviewList,
      detail: reviewDetail,
    },
    getList: getReviewList,
    getOne: getReview,
    clearList: clearReviewList,
    clearOne: clearReview,
  } = useProjectReview();
  const [view, setView] = useState<View>(initView);
  const [reviewId, setReviewId] = useState<number | undefined>();

  const handler = {
    close: () => {
      clearOne();
      clearSheetId();
    },
    submit: (values: any, { setErrors, setSubmitting }: FormikHelpers<any>) => {

    },
  };

  useEffect(() => {
    if (typeof sheetId !== 'undefined' && projectId) {
      getReviewList(projectId);
    }
    return () => {
      clearReviewList();
    };
  }, [projectId, sheetId]);

  useEffect(() => {
    if (sheetId) {
      getOne(sheetId);
    } else if (projectId && sheetId === null) {
      // TODO: 용역 항목 리스트 불러오기
    }
  }, [sheetId]);

  useEffect(() => {
    if (reviewId) {
      getReview(reviewId);
    }
    return () => {
      clearReview();
    };
  }, [reviewId]);

  return (
    <Modal
      title={`시스템 견적서 ${sheetId === null ? '등록' : '수정'}`}
      width="80%"
      open={typeof sheetId !== 'undefined'}
      onClose={handler.close}
      sx={{
        maxHeight: '70%',
      }}>
      <Formik
        initialValues={view}
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
            <Box sx={{
              display: 'flex',
              width: '100%',
              mb: '40px',
            }}>
              <Grid container spacing={2}>
                <Grid item sm={1}>
                  <DataField
                    type="select"
                    name="confirmed"
                    label="확정 여부"
                    value={values.confirmed}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    options={['Y', 'N']}
                    required
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    type="select"
                    name="status"
                    label="상태"
                    value={values.status}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    options={projectEstimateSheetStatusList.map(item => ({
                      key: item as string,
                      text: projectEstimateSheetStatusName(item),
                    }))}
                    required
                  />
                </Grid>
                <Grid item sm={4}>
                  <DataField
                    name="title"
                    label="제목"
                    value={values.title}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    required
                  />
                </Grid>
                <Grid item sm={3}>
                  <DataField
                    name="memo"
                    label="비고"
                    value={values.memo}
                    setFieldValue={setFieldValue}
                    errors={errors}
                  />
                </Grid>
                <Grid item sm={2}>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={() => {
                      // TODO: 금액 재계산
                    }}>
                    금액 재계산
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={() => {
                      handleSubmit();
                    }}>
                    {isSubmitting ? '저장 중' : '저장'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{
              display: 'flex',
              width: '100%',
              mb: '40px',
            }}>
              <Grid container spacing={2}>
                <Grid item sm={3} sx={{
                  display: 'flex',
                  width: '100%',
                  flexWrap: 'wrap',
                }}>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    mb: '20px',
                  }}>
                    <DataSelector
                      name="reviewId"
                      label="형상비 검토"
                      setFieldValue={setFieldValue}
                      errors={errors}
                      options={reviewList?.map(item => ({
                        key: item.id,
                        text: `${item.code}(${projectReviewStatusName(item.status)})`,
                      })) ?? null}
                      value={values.reviewId}
                      onChange={(data) => {
                        const value: number | undefined = data !== '' ? +data : undefined;
                        setReviewId(value);
                      }} />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mb: '40px',
                  }}>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell variant="head" children="형상비 번호" />
                            <TableCell colSpan={3} children={reviewDetail?.code} />
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head" children=" 대지 모형 개수" />
                            <TableCell children={reviewDetail?.landFigureCount} />
                            <TableCell variant="head" children="실험종류 (단지)" />
                            <TableCell children={reviewDetail?.testList?.join(', ')} />
                          </TableRow>
                          <TableRow>
                            <TableCell variant="head" children="견적 여부" />
                            <TableCell children={reviewDetail?.confirmed ? 'Y' : 'N' ?? ''} />
                            <TableCell variant="head" children="상태" />
                            <TableCell children={reviewDetail ? projectReviewStatusName(reviewDetail.status) : undefined} />
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    justifyContent: 'center',
                    minHeight: '500px',
                  }}>
                    {reviewDetail && (
                      <TableContainer sx={{
                        maxHeight: '430px',
                        minWidth: '100%'
                      }}>
                        <Table>
                          <TableBody>
                            {reviewDetailColumnList.map((column, i) => (
                              <TableRow key={i}>
                                <TableCell variant="head">
                                  {column.label}
                                </TableCell>
                                {reviewDetail.detailList.map((item, j) => (
                                  <TableCell key={j}>
                                    {column.renderCell(item, j)}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                    {!reviewDetail && (
                      <Typography sx={{
                        color: 'lightgray',
                        textAlign: 'center'
                      }}>
                        형상비 검토 또는 실험대상을
                        <br />
                        선택해 주세요.
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item sm={9}>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                  }}>
                    <Grid container spacing={2}>
                      <Grid item sm={3}>
                        <DatePicker
                          name="estimateDate"
                          label="견적일자"
                          value={values.estimateDate}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          required
                        />
                      </Grid>
                      <Grid item sm={3}>
                        <DatePicker
                          name="expectedStartMonth"
                          label="착수 가능"
                          value={values.expectedStartMonth}
                          setFieldValue={setFieldValue}
                          errors={errors}
                        />
                      </Grid>
                      <Grid item sm={3}>
                        <UserSelector
                          name="salesTeamLeaderId"
                          label="영업팀장"
                          value={values.salesTeamLeaderId}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          required
                        />
                      </Grid>
                      <Grid item sm={3}>
                        <UserSelector
                          name="salesManagementLeaderId"
                          label="영업실장"
                          value={values.salesManagementLeaderId}
                          setFieldValue={setFieldValue}
                          errors={errors}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    justifyContent: 'center'
                  }}>
                    합계(부가세 별도): 일금 원정 ()
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                  }}>
                    용역항목 Table TBD
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                  }}>
                    사용 문구 Table TBD
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProjectEstimateSheetModal;
