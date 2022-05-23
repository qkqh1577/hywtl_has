import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import {
  Refresh as RefreshIcon,
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon,
  DeleteForever as RemoveIcon,
  AddCircleOutline as AddIcon,
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  TestServiceDetailTemplate,
  TestServiceDetailTemplateView as DetailView,
  TestServiceTemplateView as View,
  initTestServiceDetailTemplateView as initDetailView,
  initTestServiceTemplateView as initView,
  testTypeList,
  useTestServiceTemplate, TestServiceDetailTemplateParameter, TestServiceTemplateParameter,
} from 'services/standard_data/test_service_template';
import { DataField, Table, Tooltip, useDialog } from 'components';

const getTotalPrice = (detailList: (TestServiceDetailTemplate | DetailView)[]): number | '' => {
  if (!detailList || detailList.length === 0) {
    return '';
  }
  return detailList
  .map(item => item.unitPrice)
  .filter(n => n !== '')
  .map(n => n as number)
  .reduce((a, b) => a + b, 0);
};

const TestServiceTemplateDetail = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = typeof idString === 'undefined' || idString === 'add' ? null : (Number.isNaN(+idString) ? null : +idString);

  const location = useLocation();
  const navigate = useNavigate();
  const dialog = useDialog();
  const {
    state: {
      detail,
    },
    getOne,
    clearOne,
    add,
    change,
  } = useTestServiceTemplate();
  const [view, setView] = useState<View>(initView);

  const [edit, setEdit] = useState<boolean>(id === null);
  const handler = {
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      const errors: any = {};

      const title: string = values.title;
      if (!title) {
        errors.title = '용역 항목 입력은 필수입니다.';
      }

      const testType: string = values.testType;
      if (!testType) {
        errors.testType = '실험 타입 입력은 필수입니다.';
      }

      const detailList: TestServiceDetailTemplateParameter[] = (values.detailList as DetailView[])
      .map((item: any, index) => {
        const detailErrors: any = {};

        const id: number | undefined = item.id || undefined;
        const titleList: string[] = item.titleList.filter((t: string) => t !== '');
        if (titleList.length === 0) {
          detailErrors.titleList = '세부 항목은 하나 이상 필수입니다.';
        }

        const unit: string = item.unit;
        if (!unit) {
          detailErrors.unit = '단위 항목 입력은 필수입니다.';
        }

        const unitPrice: number = item.unitPrice;
        if (!unitPrice && unitPrice !== 0) {
          detailErrors.unitPrice = '단가 항목 입력은 필수입니다.';
        }

        const memo: string | undefined = item.memo || undefined;

        const keys = Object.keys(detailErrors);
        if (keys.length > 0) {
          for (let errorIndex = 0; errorIndex < keys.length; errorIndex++) {
            errors[`detailList[${index}].${keys[errorIndex]}`]
              = detailErrors[keys[errorIndex]];
          }
          return null;
        }

        const detailParams: TestServiceDetailTemplateParameter = {
          id,
          titleList,
          unit,
          unitPrice,
          memo,
        };
        return detailParams;
      })
      .filter(item => item !== null)
      .map(item => item as TestServiceDetailTemplateParameter);

      if (detailList.length === 0) {
        errors['detailList.size'] = '세부 항목은 하나 이상 필수입니다.';
      }

      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        setErrors(errors);
        return;
      }

      const params: TestServiceTemplateParameter = {
        title,
        testType,
        detailList,
      };
      if (id === null) {
        add(params, () => {
          dialog.alert('등록되었습니다.');
          handler.init();
        });
      } else {
        change(id, params, () => {

          dialog.alert('변경되었습니다.');
          handler.init();
        });
      }
      setSubmitting(false);
    },
    updateView: () => {
      setView({
        title: detail?.title ?? initView.title,
        testType: detail?.testType ?? initView.testType,
        totalPrice: getTotalPrice(detail?.detailList ?? initView.detailList),
        detailList: detail?.detailList.map((item) => ({
          id: item.id,
          titleList: item.titleList,
          unit: item.unit,
          unitPrice: item.unitPrice,
          memo: item.memo ?? '',
        })) ?? initView.detailList
      });
    },
    init: () => {
      setEdit(false);
      handler.updateView();
      if (id === null) {
        navigate('/test-service', { state: location.state });
      }
    },
    cancel: (dirty: boolean) => {
      if (dirty) {
        dialog.rollback(handler.init);
      } else {
        handler.init();
      }
    }
  };

  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>용역 항목 상세 정보</h2>
      </Box>
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
                dirty,
                errors,
                isSubmitting,
                setFieldValue,
                handleSubmit
              }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>항목 정보</h2>
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        name="title"
                        label="용역 항목"
                        value={values.title}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                        required={edit}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        type="select"
                        name="testType"
                        label="실험 타입"
                        value={values.testType}
                        options={testTypeList}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                        required={edit}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <DataField
                        type="amount"
                        name="totalPrice"
                        label="총액"
                        value={values.totalPrice}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        endAdornment={
                          <IconButton
                            onClick={() => {
                              setFieldValue('totalPrice', getTotalPrice(values.detailList));
                            }}>
                            <RefreshIcon />
                          </IconButton>
                        }
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <h2>세부 항목</h2>
                    </Grid>
                    <Grid item sm={12}>
                      <Table
                        columns={[
                          {
                            label: '세부 항목명',
                            renderCell: (item, i) => {
                              if (!edit) {
                                return item.titleList.map((title, j) => (
                                  <Typography key={j}>
                                    {title}
                                  </Typography>
                                ));
                              }
                              return (
                                <>  {item.titleList.map((title, j) => (
                                  <Box key={j} sx={{
                                    width: '100%',
                                  }}>
                                    <DataField
                                      name={`detailList[${i}].titleList[${j}]`}
                                      label="세부 항목명"
                                      value={title}
                                      setFieldValue={setFieldValue}
                                      errors={errors}
                                      endAdornment={
                                        <Box sx={{
                                          display: 'flex',
                                          justifyContent: 'space-around',
                                        }}>
                                          <Tooltip title="순서 올리기">
                                            <IconButton
                                              disabled={j === 0}
                                              onClick={() => {
                                                const prevList: string[] = item.titleList.filter((t, k) => k !== j);
                                                const title: string = item.titleList[j];
                                                const titleList: string[] = [];
                                                for (let k = 0; k < prevList.length; k++) {
                                                  if (titleList.length === j - 1) {
                                                    titleList.push(title);
                                                  }
                                                  titleList.push(prevList[k]);
                                                }
                                                setFieldValue(`detailList[${i}].titleList`, titleList);
                                              }}>
                                              <UpIcon />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="순서 내리기">
                                            <IconButton
                                              disabled={j === item.titleList.length - 1}
                                              onClick={() => {
                                                const prevList: string[] = item.titleList.filter((t, k) => k !== j);
                                                const title: string = item.titleList[j];
                                                const titleList: string[] = [];
                                                for (let k = 0; k < prevList.length; k++) {
                                                  titleList.push(prevList[k]);
                                                  if (titleList.length === j + 1) {
                                                    titleList.push(title);
                                                  }
                                                }
                                                setFieldValue(`detailList[${i}].titleList`, titleList);
                                              }}>
                                              <DownIcon />
                                            </IconButton>
                                          </Tooltip>
                                          {values.detailList[i].titleList.length - 1 === j && (
                                            <Tooltip title="항목 추가">
                                              <IconButton
                                                onClick={() => {
                                                  setFieldValue(`detailList[${i}].titleList`, [...item.titleList, '']);
                                                }}>
                                                <AddIcon />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                          {values.detailList[i].titleList.length - 1 !== j && (
                                            <Tooltip title="현재 항목 삭제">
                                              <IconButton
                                                onClick={() => {
                                                  setFieldValue(`detailList[${i}].titleList`, item.titleList.filter((t, k) => k !== j));
                                                }}>
                                                <RemoveIcon />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                        </Box>
                                      }
                                      disableLabel
                                      required
                                    />
                                  </Box>
                                ))}
                                </>
                              );
                            },
                            required: edit
                          }, {
                            label: '단위',
                            renderCell: (item, i) => {
                              if (!edit) {
                                return item.unit;
                              }
                              return (
                                <DataField
                                  name={`detailList[${i}].unit`}
                                  label="단위"
                                  value={item.unit}
                                  setFieldValue={setFieldValue}
                                  errors={errors}
                                  disableLabel
                                  required
                                />
                              );
                            },
                            required: edit
                          }, {
                            label: '단가',
                            renderCell: (item, i) => {
                              if (!edit) {
                                return item.unitPrice.toLocaleString();
                              }
                              return (
                                <DataField
                                  type="amount"
                                  name={`detailList[${i}].unitPrice`}
                                  label="단가"
                                  value={item.unitPrice}
                                  setFieldValue={setFieldValue}
                                  errors={errors}
                                  disableLabel
                                  required
                                />
                              );
                            },
                            required: edit
                          }, {
                            label: '비고',
                            renderCell: (item, i) => {
                              if (!edit) {
                                return item.memo;
                              }
                              return (
                                <DataField
                                  name={`detailList[${i}].memo`}
                                  label="비고"
                                  value={item.memo}
                                  setFieldValue={setFieldValue}
                                  errors={errors}
                                  disableLabel
                                />
                              );
                            }
                          }, {
                            label: '순서',
                            renderCell: (item, i) => (
                              <Box sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-around',
                              }}>
                                <Tooltip title="순서 올리기">
                                  <IconButton
                                    disabled={i === 0}
                                    onClick={() => {
                                      const prevList = values.detailList.filter((t, k) => k !== i);
                                      const detailList = [];
                                      for (let k = 0; k < prevList.length; k++) {
                                        if (detailList.length === i - 1) {
                                          detailList.push(item);
                                        }
                                        detailList.push(prevList[k]);
                                      }
                                      setFieldValue('detailList', detailList);
                                    }}>
                                    <UpIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="순서 내리기">
                                  <IconButton
                                    disabled={i === values.detailList.length - 1}
                                    onClick={() => {
                                      const prevList = values.detailList.filter((t, k) => k !== i);
                                      const detailList = [];
                                      for (let k = 0; k < prevList.length; k++) {
                                        detailList.push(prevList[k]);
                                        if (detailList.length === i + 1) {
                                          detailList.push(item);
                                        }
                                      }
                                      setFieldValue('detailList', detailList);
                                    }}>
                                    <DownIcon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            ),
                            disableShow: !edit
                          }, {
                            label: '삭제',
                            renderCell: (item, i) => (
                              <Button
                                color="warning"
                                variant="contained"
                                disabled={values.detailList.length <= 1}
                                onClick={() => {
                                  if (values.detailList.length === 1) {
                                    dialog.error('최소 하나 이상의 세부 항목이 필요합니다.');
                                    return;
                                  }
                                  setFieldValue('detailList', values.detailList.filter((detail, k) => k !== i));
                                }}>
                                삭제
                              </Button>
                            ),
                            disableShow: !edit
                          }
                        ]}
                        list={values.detailList}
                        footer={edit ?
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              setFieldValue('detailList', [...values.detailList, initDetailView]);
                            }}>
                            추가
                          </Button>
                          : undefined
                        }
                      />
                    </Grid>
                  </Grid>
                  {edit && (
                    <Box sx={{
                      display: 'flex',
                      width: '100%',
                      mt: '40px',
                    }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          handler.cancel(dirty);
                        }}>
                        취소
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}>
                        {id === null ? '등록' : '수정'}
                      </Button>
                    </Box>
                  )}
                  {!edit && id && (
                    <Box sx={{
                      display: 'flex',
                      width: '100%',
                      mt: '40px',
                    }}>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          navigate('/test-service', { state: location.state });
                        }}>
                        목록
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          // TODO: 삭제
                        }}>
                        삭제
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={() => {
                          setEdit(true);
                        }}>
                        수정
                      </Button>
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

export default TestServiceTemplateDetail;
