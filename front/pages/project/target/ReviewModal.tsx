import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  CheckboxField,
  DataField,
  Tooltip,
  useDialog
} from 'components';
import {
  ProjectReviewDetailParameter,
  ProjectReviewParameter,
  ProjectReviewStatus,
  ProjectReviewView as View,
  initProjectDetailReview as initDetailView,
  initProjectReview as initView,
  projectReviewStatusList,
  projectReviewStatusName,
  useProjectReview,
} from 'services/project_review';
import {
  projectSpecialWindLoadConditionName
} from 'services/project';
import { FileItemParameter, fileItemToView, FileItemView } from 'services/common/file-item';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}
const columns: TableCellProperty[] = [
  { key: 'buildingName', label: '건물(동)', align: 'center', style: { minWidth: 25 } },
  { key: 'floorCount', label: '층 수', align: 'center', style: { minWidth: 25 } },
  { key: 'baseCount', label: '지하층 수', align: 'center', style: { minWidth: 25 } },
  { key: 'height', label: '높이(m)', style: { minWidth: 25 } },
  { key: 'area', label: '면적(㎡)', align: 'center', style: { minWidth: 25 } },
  { key: 'ratio', label: '형상비', style: { minWidth: 50 } },
  { key: 'specialWindLoadCondition', label: '특별풍하중 조건', style: { minWidth: 60 } },
  { key: 'isMinimumTest', label: '최소 실험대상 여부', style: { minWidth: 60 } },
  { key: 'test', label: '실험 종류', align: 'center', style: { minWidth: 80 } },
  { key: 'memo1', label: '비고1', align: 'center', style: { minWidth: 30 } },
  { key: 'memo2', label: '비고2', align: 'center', style: { minWidth: 30 } },
  { key: 'remove', label: '삭제', align: 'center', style: { minWidth: 15 } },
];

const ProjectReviewModal = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
    state: {
      id,
      detail,
    },
    clearId,
    getOne,
    clearOne,
    add,
    update,
    remove,
  } = useProjectReview();

  const [edit, setEdit] = useState<boolean>(false);
  const [view, setView] = useState<View>(initView);

  const handler = {
    edit: () => {
      setEdit(true);
    },
    remove: () => {
      if (!id) {
        dialog.alert('검토가 선택되지 않았습니다.');
        return;
      }
      if (detail && detail.confirmed) {
        dialog.alert('확정된 검토는 삭제할 수 없습니다.');
        return;
      }
      dialog.remove('해당 검토를 삭제하시겠습니까?', () => {
        remove(id, () => {
          dialog.alert('삭제하였습니다.');
          handler.close();
        });
      });
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      if (!projectId) {
        dialog.alert('프로젝트가 선택되지 않았습니다.');
        setSubmitting(false);
        return;
      }
      const errors: any = {};

      const status: ProjectReviewStatus = values.status;
      if (!status) {
        errors.status = '형상비 검토 상태 선택은 필수입니다.';
      }

      const code: string = values.code;
      if (!code) {
        errors.code = '형상비 번호 입력은 필수입니다.';
      }

      const landFigureCount: number | undefined = values.landFigureCount || undefined;
      const testList: string[] | undefined = Array.isArray(values.testList) && values.testList.length > 0 ? values.testList : undefined;

      const detailList: ProjectReviewDetailParameter[] = (values.detailList as any[])
      .map((item, index) => {
        const detailErrors: any = {};

        const buildingName: string = item.buildingName;
        if (!buildingName) {
          detailErrors.buildingName = '건물(동) 입력은 필수입니다.';
        }

        const floorCount: number = item.floorCount;
        if (!floorCount) {
          detailErrors.floorCount = '층 수 입력은 필수입니다.';
        } else if (floorCount < 0) {
          detailErrors.floorCount = '층 수는 음수가 될 수 없습니다.';
        }

        const baseCount: number | undefined = item.baseCount || undefined;
        if (baseCount && baseCount < 0) {
          detailErrors.baseCount = '지하 층 수는 음수가 될 수 없습니다.';
        }

        const height: number = item.height;
        if (!height) {
          detailErrors.height = '높이 입력은 필수입니다.';
        } else if (height < 0) {
          detailErrors.height = '높이는 음수가 될 수 없습니다.';
        }

        const area: number = item.area;
        if (!area) {
          detailErrors.area = '면적 입력은 필수입니다.';
        } else if (area < 0) {
          detailErrors.area = '면적은 음수가 될 수 없습니다.';
        }

        const ratio: number = height / Math.sqrt(area);

        const specialWindLoadConditionList: string[] = item.specialWindLoadConditionList;

        const testList: string[] = item.testList;
        if (testList.length === 0) {
          detailErrors.testList = '실험 종류는 하나 이상 선택해야 합니다.';
        }

        const memo1: string | undefined = item.memo1 || undefined;
        const memo2: string | undefined = item.memo2 || undefined;

        const keys = Object.keys(detailErrors);
        if (keys.length > 0) {
          for (let errorIndex = 0; errorIndex < keys.length; errorIndex++) {
            errors[`detailList[${index}].${keys[errorIndex]}`]
              = detailErrors[keys[errorIndex]];
          }
          return null;
        }
        const detail: ProjectReviewDetailParameter = {
          buildingName,
          floorCount,
          baseCount,
          height,
          area,
          ratio,
          specialWindLoadConditionList,
          testList,
          memo1,
          memo2
        };
        return detail;
      })
      .filter(item => item != null)
      .map(item => item as ProjectReviewDetailParameter);

      if (detailList.length === 0) {
        errors['detailList.size'] = '건축물 항목은 하나 이상 필수입니다.';
      }

      const fileList: FileItemParameter[] | undefined = Array.isArray(values.fileList) && values.fileList.length > 0 ?
        values.fileList.map((item: FileItemView) => ({
          id: item.id,
          multipartFile: item.multipartFile,
          requestDelete: typeof item.id === 'undefined' ? undefined : (item.id && item.multipartFile),
        })) : undefined;

      if (Object.keys(errors).length > 0
      ) {
        setSubmitting(false);
        setErrors(errors);
        return;
      }

      const params: ProjectReviewParameter = {
        status,
        code,
        landFigureCount,
        testList,
        detailList,
        fileList,
      };
      (id ? update : add)((id ?? projectId), params, () => {
        dialog.alert('저장되었습니다.');
        handler.init();
      });
      setSubmitting(false);
    },
    init: () => {
      setEdit(false);
      clearId();
      clearOne();
      handler.updateView();
    },
    close: (event?: object, reason?: string) => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        return;
      }
      if (edit) {
        dialog.rollback('작성 중인 내용이 전부 사라집니다. 취소하시겠습니까?', handler.init);
      } else {
        handler.init();
      }
    },
    updateView: () => {
      const getConfirmed = (confirmed: boolean | undefined) => {
        if (typeof confirmed === 'undefined') {
          return initView.confirmed;
        }
        return confirmed ? 'Y' : 'N';
      };
      setView({
        confirmed: getConfirmed(detail?.confirmed),
        status: detail?.status ?? initView.status,
        code: detail?.code ?? initView.code,
        landFigureCount: detail?.landFigureCount ?? initView.landFigureCount,
        detailList: detail?.detailList.map((item) => ({
          id: item.id,
          buildingName: item.buildingName ?? initDetailView.buildingName,
          floorCount: item.floorCount ?? initDetailView.floorCount,
          baseCount: item.baseCount ?? initDetailView.baseCount,
          height: item.height ?? initDetailView.height,
          area: item.area ?? initDetailView.area,
          ratio: item.ratio ?? initDetailView.ratio,
          specialWindLoadConditionList: item.specialWindLoadConditionList ?? initDetailView.specialWindLoadConditionList,
          testList: item.testList ?? initDetailView.testList,
          memo1: item.memo1 ?? initDetailView.memo1,
          memo2: item.memo2 ?? initDetailView.memo2,
        })) ?? initView.detailList,
        testList: detail?.testList ?? initView.testList,
        fileList: detail?.fileList?.map(fileItemToView) ?? initView.fileList,
      });
    }
  };

  useEffect(() => {
    if (typeof id === 'number') {
      getOne(id);
    } else if (id === null) {
      setEdit(true);
    }
  }, [id]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Modal
      open={typeof id !== 'undefined'}
      onClose={handler.close}
    >
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        overflow: 'hidden',
        bgColor: '#777',
        p: 4,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          height: '50px',
          mb: '40px',
        }}>
          <h2>형상비 검토 {id === null ? '등록' : '상세'}</h2>
          <IconButton
            color="primary"
            onClick={handler.close}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ mb: '20px' }}>
          <Formik
            initialValues={view}
            onSubmit={handler.submit}
            enableReinitialize
          >
            {({
              values,
              errors,
              isSubmitting,
              dirty,
              setFieldValue,
              handleSubmit,
              resetForm
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
                        label="견적 여부"
                        value={values.confirmed}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={['Y', 'N']}
                        disabled
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
                        options={projectReviewStatusList.map(item => ({
                          key: item as string,
                          text: projectReviewStatusName(item),
                        }))}
                        disabled={!edit}
                        required
                      />
                    </Grid>
                    <Grid item sm={2}>
                      <DataField
                        name="code"
                        label="형상비 번호"
                        value={values.code}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                        required
                      />
                    </Grid>
                    <Grid item sm={1}>
                      <DataField
                        type="number"
                        name="langFigureCount"
                        label="대지모형 개수"
                        value={values.landFigureCount}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        disabled={!edit}
                      />
                    </Grid>
                    <Grid item sm={1}>
                      {edit && (
                        <CheckboxField
                          name="testList"
                          label="실험 종류(단지)"
                          value={values.testList}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          options={['E', 'B']}
                          disabledAll
                        />
                      )}
                      {!edit && (
                        <DataField
                          name="view-testList"
                          label="실험 종류(단지)"
                          value={values.testList?.join(', ') ?? ''}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          disabled
                        />
                      )}
                    </Grid>
                    <Grid item sm={5}>
                      {edit && (
                        <Box sx={{
                          display: 'flex',
                          width: '100%',
                          flexWrap: 'wrap',
                          justifyContent: 'right'
                        }}>
                          {id && (
                            <Button
                              color="secondary"
                              variant="contained"
                              onClick={() => {
                                if (dirty) {
                                  dialog.rollback('작성중인 내용을 취소하겠습니까?', () => {
                                    setEdit(false);
                                    resetForm();
                                  });
                                } else {
                                  setEdit(false);
                                  resetForm();
                                }
                              }}
                            >
                              취소
                            </Button>
                          )}
                          <Button
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                            onClick={() => {
                              handleSubmit();
                            }}
                          >
                            {isSubmitting ? '저장 중' : '저장'}
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                {edit && (
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    p: '10px',
                    backgroundColor: '#aaa',
                    flexWrap: 'wrap',
                  }}>
                    <Typography variant="h5" sx={{
                      width: '100%',
                      mb: '15px'
                    }}>
                      KDS 41 10 10 15 건축구조기준 설계하중 (5.1.3 특별풍하중 조건)
                    </Typography>
                    <Typography variant="body1" sx={{
                      width: '100%',
                    }}>
                      1) 풍진동의 영향을 고려해야 할 건축물 <br />
                      2) 특수한 지붕 골조 <br />
                      3) 골바람교화가 발생하는 건설지점 <br />
                      4) 인접효과가 우려되는 건축물 <br />
                      5) 비정형적 형상의 건축물 <br />
                    </Typography>
                  </Box>
                )}
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                  flexWrap: 'wrap',
                }}>
                  {edit && (
                    <Typography variant="h6" sx={{
                      width: '100%',
                      color: '#0bd',
                    }}>
                      ※(1)조건은 높이와 면적 입력 후 계산 버튼을 클릭 시 자동으로 계산됩니다.
                    </Typography>
                  )}
                  <TableContainer sx={{
                    maxHeight: '400px'
                  }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns
                          .filter(column => (!edit && column.key !== 'remove') || (edit && column.key !== 'isMinimumTest'))
                          .map(({ label, align, ...props }) => (
                            <TableCell {...props} align="center">
                              {label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.detailList.map((item, i) => (
                          <TableRow
                            key={i}
                            role="list"
                            tabIndex={-1}
                          >
                            <TableCell align={columns[i].align}>
                              <DataField
                                name={`detailList[${i}].buildingName`}
                                label="건물(동)"
                                value={values.detailList[i].buildingName}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                                required
                              />
                            </TableCell>
                            <TableCell align={columns[i].align}>
                              <DataField
                                type="number"
                                name={`detailList[${i}].floorCount`}
                                label="층 수"
                                value={values.detailList[i].floorCount}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                                required
                              />
                            </TableCell>
                            <TableCell align={columns[i].align}>
                              <DataField
                                type="number"
                                name={`detailList[${i}].baseCount`}
                                label="지하층 수"
                                value={values.detailList[i].baseCount}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                              />
                            </TableCell>
                            <TableCell align={columns[i].align}>
                              <DataField
                                type="number"
                                name={`detailList[${i}].height`}
                                label="높이(m)"
                                value={values.detailList[i].height}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                                required
                              />
                            </TableCell>
                            <TableCell align={columns[i].align}>
                              <DataField
                                type="number"
                                name={`detailList[${i}].area`}
                                label="면적(㎡)"
                                value={values.detailList[i].area}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                                required
                              />
                            </TableCell>
                            <TableCell align={columns[i].align}>
                              {!edit && (
                                <DataField
                                  type="number"
                                  name={`detailList[${i}].ratio`}
                                  label="형상비"
                                  value={values.detailList[i].ratio}
                                  setFieldValue={setFieldValue}
                                  errors={errors}
                                  labelDisabled
                                  disabled
                                />
                              )}
                              {edit && (
                                <>
                                  {(+values.detailList[i].ratio).toFixed(2)}
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      const height = values.detailList[i].height;
                                      const area = values.detailList[i].area;
                                      if (!height || !area) {
                                        setFieldValue(`detailList[${i}].ratio`, '');
                                        return;
                                      }
                                      const ratio: number = height / Math.sqrt(area);
                                      setFieldValue(`detailList[${i}].ratio`, ratio);
                                    }}
                                  >
                                    계산
                                  </Button>
                                </>
                              )}
                            </TableCell>
                            <TableCell align={columns[i].align}>
                              {!edit && values.detailList[i].specialWindLoadConditionList?.map(item => (
                                <Tooltip key={item} title={projectSpecialWindLoadConditionName(item)}>
                                  <>
                                    {item}
                                  </>
                                </Tooltip>
                              ))}
                              {edit && (
                                <CheckboxField
                                  name={`detailList[${i}].specialWindLoadConditionList`}
                                  label="특별풍하중 조건"
                                  value={values.detailList[i].specialWindLoadConditionList}
                                  setFieldValue={setFieldValue}
                                  errors={errors}
                                  options={
                                    ['1', '2', '3', '4', '5']
                                    .map(key => ({
                                      key,
                                      text: `(${key})`,
                                      tooltip: projectSpecialWindLoadConditionName(key),
                                    }))
                                  }
                                  labelDisabled
                                  disabledAll
                                />
                              )}
                            </TableCell>
                            {!edit && (
                              <TableCell>
                                {values.detailList[i].ratio >= 3.0 ? 'Y' : ''}
                              </TableCell>
                            )}
                            <TableCell>
                              {!edit && values.detailList[i].testList?.join(', ')}
                              {edit && (
                                <CheckboxField
                                  name={`detailList[${i}].testList`}
                                  label="실험 종류"
                                  value={values.detailList[i].testList}
                                  setFieldValue={setFieldValue}
                                  errors={errors}
                                  options={['F', 'P', 'A', '구검']}
                                  labelDisabled
                                  disabledAll
                                  required
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              <DataField
                                name={`detailList[${i}].memo1`}
                                label="비고1"
                                value={values.detailList[i].memo1}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                              />
                            </TableCell>
                            <TableCell>
                              <DataField
                                name={`detailList[${i}].memo2`}
                                label="비고2"
                                value={values.detailList[i].memo2}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                disabled={!edit}
                                labelDisabled
                              />
                            </TableCell>
                            {edit && (
                              <TableCell>
                                <Button
                                  color="warning"
                                  variant="contained"
                                  onClick={() => {
                                    if (values.detailList.length === 1) {
                                      dialog.alert('최소 1개의 건축물 항목이 필요합니다.');
                                      return;
                                    }
                                    dialog.remove(`${values.detailList[i].buildingName || '해당'} 건축물 항목을 삭제하시겠습니까?`, () => {
                                      setFieldValue('detailList', values.detailList
                                        .filter((item, j) => i !== j)
                                      );
                                    });
                                  }}
                                  fullWidth
                                >
                                  삭제
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                {edit && (
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    flexDirection: 'row-reverse'
                  }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setFieldValue('detailList', [...values.detailList, initDetailView]);
                      }}
                    >
                      추가
                    </Button>
                  </Box>
                )}
                {!edit && (
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    justifyContent: 'space-around'
                  }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.remove}
                    >
                      삭제
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.edit}
                    >
                      수정
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handler.close}
                    >
                      닫기
                    </Button>
                  </Box>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ProjectReviewModal;
