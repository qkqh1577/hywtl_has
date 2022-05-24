import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  DataField,
  DataSelector,
  DatePicker,
  Modal,
  Table,
  TableCellProperty,
  UserSelector,
  useDialog,
} from 'components';
import {
  ProjectEstimateSheetAddParameter,
  ProjectEstimateSheetCommentParameter,
  ProjectEstimateSheetStatus,
  ProjectEstimateSheetTestServiceDetailParameter,
  ProjectEstimateSheetTestServiceParameter,
  ProjectEstimateSheetTestServiceView,
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
import {
  TestServiceTemplate,
  testServiceTemplateApi,
} from 'services/standard_data/test_service_template';
import { toAmountKor } from 'util/NumberUtil';
import dayjs from 'dayjs';

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
  const dialog = useDialog();
  const {
    state: {
      sheetId,
      sheetDetail: detail,
    },
    getSheetOne: getOne,
    clearSheetOne: clearOne,
    getSheetList,
    clearSheetId,
    addSheet,
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
  const [testServiceViewList, setTestServiceViewList] = useState<ProjectEstimateSheetTestServiceView[]>([]);
  const [reviewId, setReviewId] = useState<number | undefined>();
  const [templateList, setTemplateList] = useState<TestServiceTemplate[] | undefined>();
  const [amount, setAmount] = useState<number>(0);

  const handler = {
    close: () => {
      setView(initView);
      setReviewId(undefined);
      setTemplateList(undefined);
      clearOne();
      clearSheetId();
      clearReview();
      clearReviewList();
    },
    submit: (values: any, { setErrors, setSubmitting }: FormikHelpers<any>) => {
      if (!projectId) {
        dialog.alert('프로젝트가 선택되지 않았습니다.');
        return;
      }
      if (!reviewId) {
        dialog.alert('형상비 검토가 선택되지 않았습니다.');
        return;
      }
      const errors: any = {};

      const testServiceList: ProjectEstimateSheetTestServiceParameter[] =
        (testServiceViewList as any[])
        .map((testService, i) => {
          const testServiceErrors: any = {};

          const detailList: ProjectEstimateSheetTestServiceDetailParameter[] =
            (testService.detailList as any[])
            .map((testServiceDetail, j) => {
              const testServiceDetailErrors: any = {};
              const id: number | undefined = testServiceDetail.id;
              const titleList: string[] = testServiceDetail.titleList;
              const unit: string = testServiceDetail.unit;
              if (!unit) {
                testServiceDetailErrors.unit = '단위는 필수 항목입니다.';
              }
              const count: number = testServiceDetail.count;
              if (!count && count !== 0) {
                testServiceDetailErrors.count = '수량은 필수 항목입니다.';
              }
              const unitPrice: number = testServiceDetail.unitPrice;
              if (!unitPrice && unitPrice !== 0) {
                testServiceDetailErrors.unitPrice = '단가는 필수 항목입니다.';
              }
              const isIncluded: boolean = testServiceDetail.isIncluded === 'Y';
              if (!testServiceDetail.isIncluded) {
                testServiceDetailErrors.isIncluded = '사용 여부는 필수 항목입니다.';
              }
              const totalPrice: number = count * unitPrice;
              const memo: string | undefined = testServiceDetail.memo || undefined;

              const keys = Object.keys(testServiceDetailErrors);
              if (keys.length > 0) {
                for (let errorIndex = 0; errorIndex < keys.length; errorIndex++) {
                  testServiceErrors[`detailList[${j}].${keys[errorIndex]}`]
                    = testServiceDetailErrors[keys[errorIndex]];
                }
                return null;
              }
              const params: ProjectEstimateSheetTestServiceDetailParameter = {
                id,
                titleList,
                seq: j + 1,
                unit,
                count,
                unitPrice,
                isIncluded,
                totalPrice,
                memo,
              };
              return params;
            })
            .filter(item => item !== null)
            .map(item => item as ProjectEstimateSheetTestServiceDetailParameter);
          if (detailList.length === 0) {
            testServiceErrors['detailList.size'] = '상세는 하나 이상 필수 항목입니다.';
          }

          const id: number | undefined = testService.id;
          const title: string = testService.title;
          if (!title) {
            testServiceErrors.title = '용역 항목은 필수 항목입니다.';
          }

          const keys = Object.keys(testServiceErrors);
          if (keys.length > 0) {
            for (let errorIndex = 0; errorIndex < keys.length; errorIndex++) {
              errors[`detailList[${i}].${keys[errorIndex]}`]
                = testServiceErrors[keys[errorIndex]];
            }
            return null;
          }

          const params: ProjectEstimateSheetTestServiceParameter = {
            id,
            title,
            seq: i + 1,
            detailList,
          };
          return params;
        })
        .filter(item => item !== null)
        .map(item => item as ProjectEstimateSheetTestServiceParameter);
      if (testServiceList.length === 0) {
        errors['testServiceList.size'] = '용역 항목은 하나 이상 필수 항목입니다.';
      }

      const confirmed: boolean = values.confirmed === 'Y';
      if (values.confirmed === '') {
        errors.confirmed = '확정 여부는 필수 항목입니다.';
      }

      const status: ProjectEstimateSheetStatus = values.status;
      if (!status) {
        errors.status = '상태는 필수 항목입니다.';
      }

      const title: string = values.title;
      if (!title) {
        errors.title = '견적번호는 필수 항목입니다.';
      }

      const memo: string | undefined = values.memo || undefined;

      const estimateDate: string = dayjs(values.estimateDate).format('YYYY-MM-DD');
      if (values.estimateDate === null) {
        errors.estimateDate = '견적일자는 필수 항목입니다.';
      }

      const expectedStartMonth: string | undefined = values.expectedStartMonth === null ? undefined :
        dayjs(values.expectedStartMonth).format('YYYY-MM-01');

      const salesTeamLeaderId: number = values.salesTeamLeaderId;
      if (!salesTeamLeaderId) {
        errors.salesTeamLeaderId = '영업팀장은 필수 항목입니다.';
      }

      const salesManagementLeaderId: number | undefined = values.salesManagementLeaderId || undefined;

      const engineeringPeriod: number | undefined = values.engineeringPeriod || undefined;

      const finalReportPeriod: number | undefined = values.finalReportPeriod || undefined;

      const specialDiscount: number | undefined = values.specialDiscount || undefined;

      const commentList: ProjectEstimateSheetCommentParameter[] = [
        {
          seq: 1,
          description: 'test comment',
          inUse: true,
        }
      ];

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      const params: ProjectEstimateSheetAddParameter = {
        projectId,
        confirmed,
        status,
        title,
        memo,
        estimateDate,
        expectedStartMonth,
        salesTeamLeaderId,
        salesManagementLeaderId,
        engineeringPeriod,
        finalReportPeriod,
        reviewId,
        testServiceList,
        specialDiscount,
        commentList,
      };

      addSheet(params, () => {
        dialog.alert('등록되었습니다.');
        handler.close();
      });
      setSubmitting(false);
    },
    calculatePrice: () => {
      setAmount(
        testServiceViewList
        .map(item => item.detailList)
        .map(list => list.map(item => {
            const count = item.count;
            const unitPrice = item.unitPrice;
            if (count === '' || unitPrice === '' || item.isIncluded !== 'Y') {
              return 0;
            }
            return count * unitPrice;
          })
          .reduce((a, b) => a + b, 0)
        )
        .reduce((a, b) => a + b, 0)
      );
    }
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

  useEffect(() => {
    if (reviewDetail) {
      const testType: string[] = [];
      if (Array.isArray(reviewDetail.testList)) {
        for (let i = 0; i < reviewDetail.testList.length; i++) {
          testType.push(reviewDetail.testList[i]);
        }
      }
      reviewDetail.detailList.forEach((detail) => {
        if (Array.isArray(detail.testList)) {
          for (let i = 0; i < detail.testList.length; i++) {
            if (!testType.includes(detail.testList[i])) {
              testType.push(detail.testList[i]);
            }
          }
        }
      });
      testServiceTemplateApi.getFullList({
        testType,
      })
      .then(setTemplateList);
    }
  }, [reviewDetail]);

  useEffect(() => {
    if (templateList) {
      const testServiceList: ProjectEstimateSheetTestServiceView[] = [];
      const counter: any = {};

      if (reviewDetail && templateList) {
        if (Array.isArray(reviewDetail.testList)) {
          for (let i = 0; i < reviewDetail.testList.length; i++) {
            const testType: string = reviewDetail.testList[i];
            if (typeof counter[testType] === 'undefined') {
              counter[testType] = 0;
            }
            counter[testType]++;
          }
        }
        for (let d = 0; d < reviewDetail.detailList.length; d++) {
          const detail = reviewDetail.detailList[d];
          for (let i = 0; i < detail.testList.length; i++) {
            const testType: string = detail.testList[i];
            if (typeof counter[testType] === 'undefined') {
              counter[testType] = 0;
            }
            counter[testType]++;
          }
        }

        for (let i = 0; i < templateList.length; i++) {
          const template = templateList[i];
          if (Array.isArray(reviewDetail.testList)) {
            for (let j = 0; j < reviewDetail.testList.length; j++) {
              const testType = reviewDetail.testList[j];
              const count: number | '' = counter[testType] as number ?? '';
              if (testType === template.testType) {
                testServiceList.push({
                  title: template.title,
                  detailList: template.detailList.map((templateDetail) => ({
                    titleList: templateDetail.titleList,
                    unit: templateDetail.unit,
                    count,
                    unitPrice: templateDetail.unitPrice,
                    totalPrice: templateDetail.unitPrice * count,
                    isIncluded: 'Y',
                    memo: templateDetail.memo ?? '',
                  })),
                });
              }
            }
          }

          for (let d = 0; d < reviewDetail.detailList.length; d++) {
            const detail = reviewDetail.detailList[d];
            for (let j = 0; j < detail.testList.length; j++) {
              const testType = detail.testList[j];
              const count: number | '' = counter[testType] as number ?? '';
              if (testType === template.testType) {
                testServiceList.push({
                  title: template.title,
                  detailList: template.detailList.map((templateDetail) => ({
                    titleList: templateDetail.titleList,
                    unit: templateDetail.unit,
                    count,
                    unitPrice: templateDetail.unitPrice,
                    totalPrice: templateDetail.unitPrice * count,
                    isIncluded: 'Y',
                    memo: templateDetail.memo ?? '',
                  })),
                });
              }
            }
          }
        }
      }
      setTestServiceViewList(testServiceList);
    }
  }, [templateList]);

  useEffect(() => {
    if (testServiceViewList) {
      handler.calculatePrice();
    }
  }, [testServiceViewList]);

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
                    onClick={handler.calculatePrice}
                  >
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
                      }}
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mb: '40px',
                  }}>
                    <Table
                      body={
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
                      }
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    justifyContent: 'center',
                    minHeight: '500px',
                  }}>
                    {reviewDetail && (
                      <Table
                        body={
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
                        }
                        sx={{
                          maxHeight: '430px',
                          minWidth: '100%'
                        }}
                      />
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
                      <Grid item sm={3}>
                        <DataField
                          name="engineeringPeriod"
                          label="주골조설계소요 기간"
                          value={values.engineeringPeriod}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          endAdornment="주"
                        />
                      </Grid>
                      <Grid item sm={3}>
                        <DataField
                          type="number"
                          name="finalReportPeriod"
                          label="최종보고서(전자본) 기간"
                          value={values.finalReportPeriod}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          endAdornment="주"
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
                    합계(부가세 별도): {toAmountKor(amount)} (₩{amount.toLocaleString()})
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                  }}>
                    <Table
                      head={
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              variant="head"
                              colSpan={3}
                              children="용역 항목"
                            />
                            <TableCell align="center" variant="head">
                              단위
                              <Typography
                                variant="caption"
                                children="*"
                                sx={{
                                  marginLeft: '4px',
                                  fontSize: '0.7rem'
                                }}
                              />
                            </TableCell>
                            <TableCell align="center" variant="head">
                              수량
                              <Typography
                                variant="caption"
                                children="*"
                                sx={{
                                  marginLeft: '4px',
                                  fontSize: '0.7rem'
                                }}
                              />
                            </TableCell>
                            <TableCell align="center" variant="head">
                              단가
                              <Typography
                                variant="caption"
                                children="*"
                                sx={{
                                  marginLeft: '4px',
                                  fontSize: '0.7rem'
                                }}
                              />
                            </TableCell>
                            <TableCell align="center" variant="head">
                              금액
                              <Typography
                                variant="caption"
                                children="*"
                                sx={{
                                  marginLeft: '4px',
                                  fontSize: '0.7rem'
                                }}
                              />
                            </TableCell>
                            <TableCell
                              align="center"
                              variant="head"
                              children="비고"
                            />
                          </TableRow>
                        </TableHead>
                      }
                      body={
                        <TableBody>
                          {testServiceViewList && testServiceViewList.length > 0 &&
                          testServiceViewList
                          .map((testService, i) => {
                            const rowSpan: number | undefined = testService.detailList
                            .map(d => d.titleList)
                            .map(l => l.length)
                            .reduce((a, b) => a + b);
                            return testService.detailList.map((testServiceDetail, j) => {
                              const detailRowSpan: number | undefined = testServiceDetail.titleList.length;
                              const totalPrice: number | '' =
                                testServiceDetail.count === '' || testServiceDetail.unitPrice === '' ?
                                  '' : testServiceDetail.count * testServiceDetail.unitPrice;
                              return testServiceDetail.titleList.map((title, k) => (
                                <TableRow key={`${i}-${j}-${k}`}>
                                  {j === 0 && k === 0 && ([
                                    <TableCell
                                      key={`${i}-no`}
                                      rowSpan={rowSpan}
                                      children={`(${i + 1})`}
                                    />,
                                    <TableCell
                                      key={`${i}-title`}
                                      rowSpan={rowSpan}
                                      children={testService.title}
                                    />
                                  ])}
                                  <TableCell children={title} />
                                  {k === 0 && ([
                                    <TableCell
                                      key={`${i}-${j}-unit`}
                                      rowSpan={detailRowSpan}
                                    >
                                      <DataField
                                        type="select"
                                        name={`testServiceList[${i}].detailList[${j}].unit`}
                                        label="단위"
                                        value={testServiceDetail.unit}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        options={['단지', '동']}
                                        disableLabel
                                        required
                                      />
                                    </TableCell>,
                                    <TableCell
                                      key={`${i}-${j}-count`}
                                      rowSpan={detailRowSpan}
                                    >
                                      <DataField
                                        type="number"
                                        name={`testServiceList[${i}].detailList[${j}].count`}
                                        label="수량"
                                        value={testServiceDetail.count}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        disableLabel
                                        required
                                      />
                                    </TableCell>,
                                    <TableCell
                                      key={`${i}-${j}-unitPrice`}
                                      rowSpan={detailRowSpan}
                                    >
                                      <DataField
                                        type="amount"
                                        name={`testServiceList[${i}].detailList[${j}].unitPrice`}
                                        label="단가"
                                        value={testServiceDetail.unitPrice}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        disableLabel
                                        required
                                      />
                                    </TableCell>,
                                    <TableCell
                                      key={`${i}-${j}-isIncluded`}
                                      rowSpan={detailRowSpan}
                                    >
                                      <DataField
                                        type="select"
                                        name={`testServiceList[${i}].detailList[${j}].isIncluded`}
                                        label="사용"
                                        value={testServiceDetail.isIncluded}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        options={['Y', 'N']}
                                        disableLabel
                                        required
                                      />
                                      <DataField
                                        type="amount"
                                        name={`testServiceList[${i}].detailList[${j}].totalPrice`}
                                        label="금액"
                                        value={totalPrice}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        disableLabel
                                        required
                                      />
                                    </TableCell>,
                                    <TableCell
                                      key={`${i}-${j}-memo`}
                                      rowSpan={detailRowSpan}>
                                      <DataField
                                        name={`testServiceList[${i}].detailList[${j}].memo`}
                                        label="비고"
                                        value={testServiceDetail.memo}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        disableLabel
                                      />
                                    </TableCell>
                                  ])}
                                </TableRow>
                              ));
                            });
                          })}
                          {testServiceViewList.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={8} children="형상비 검토 또는 실험대상 선택 시 노출됩니다." />
                            </TableRow>
                          )}
                        </TableBody>
                      }
                    />
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
