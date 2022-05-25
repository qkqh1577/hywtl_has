import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Typography
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  CheckboxField,
  DataField,
  Modal,
  Table,
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
import FileUploadButton from 'components/FileUploadButton';

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
      .filter(item => item !== null)
      .map(item => item as ProjectReviewDetailParameter);

      if (detailList.length === 0) {
        errors['detailList.size'] = '건축물 항목은 하나 이상 필수입니다.';
      }
      const fileViewList: FileItemView[] = values.fileList ?? [];
      const fileList: FileItemParameter[] = fileViewList.map((item) => ({
        id: item.id,
        requestDelete: !!(item.multipartFile && item.id),
        multipartFile: item.multipartFile,
      }));

      console.log(values.fileList, fileList);

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
        dialog.rollback(handler.init);
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
      title={`형상비 검토 ${id === null ? '등록' : '상세'}`}
      open={typeof id !== 'undefined'}
      onClose={handler.close}
    >
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
          <Form style={{
            width: '100%',
          }}>
            <Box sx={{
              display: 'flex',
              width: '100%',
              position: 'sticky',
              height: '75px',
              top: 0,
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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
                  <DataField required
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
                    readOnly={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField required
                    name="code"
                    label="형상비 번호"
                    value={values.code}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    readOnly={!edit}
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
                    readOnly={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <CheckboxField disableAll
                    name="testList"
                    label="실험 종류(단지)"
                    value={values.testList}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    options={['E', 'B']}
                    readOnly={!edit}
                  />
                </Grid>
                <Grid item sm={4}>
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
                          onClick={() => {
                            if (dirty) {
                              dialog.rollback(() => {
                                setEdit(false);
                                resetForm();
                              });
                            } else {
                              setEdit(false);
                              resetForm();
                            }
                          }}>
                          취소
                        </Button>
                      )}
                      <Button
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}>
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
                <Typography
                  variant="h5"
                  sx={{
                    width: '100%',
                    mb: '15px'
                  }}>
                  KDS 41 10 10 15 건축구조기준 설계하중 (5.1.3 특별풍하중 조건)
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
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
              flexWrap: 'wrap',
              mb: '40px',
            }}>
              {edit && (
                <Typography
                  variant="h6"
                  sx={{
                    width: '100%',
                    color: '#0bd',
                  }}>
                  ※(1)조건은 높이와 면적 입력 후 계산 버튼을 클릭 시 자동으로 계산됩니다.
                </Typography>
              )}
              <Table
                list={values.detailList}
                title="형상비 검토 목록"
                columns={[
                  {
                    label: 'No.',
                    renderCell: (item, i) => i + 1,
                  }, {
                    label: '건물(동)',
                    required: edit,
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        name={`detailList[${i}].buildingName`}
                        label="건물(동)"
                        value={item.buildingName}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        required={edit}
                        readOnly={!edit}
                      />
                  }, {
                    label: '층수',
                    required: edit,
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        type="number"
                        name={`detailList[${i}].floorCount`}
                        label="층수"
                        value={item.floorCount}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        required={edit}
                        readOnly={!edit}
                      />
                  }, {
                    label: '지하층수',
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        type="number"
                        name={`detailList[${i}].baseCount`}
                        label="지하층 수"
                        value={item.baseCount}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        readOnly={!edit}
                      />
                  }, {
                    label: '높이(m)',
                    required: edit,
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        type="number"
                        name={`detailList[${i}].height`}
                        label="높이(m)"
                        value={item.height}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        required={edit}
                        readOnly={!edit}
                      />
                  }, {
                    label: '면적(㎡)',
                    required: edit,
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        type="number"
                        name={`detailList[${i}].area`}
                        label="면적(㎡)"
                        value={item.area}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        required={edit}
                        readOnly={!edit}
                      />
                  }, {
                    label: '형상비',
                    renderCell: (item, i) => {
                      const ratio: string = typeof item.ratio === 'number'
                        ? item.ratio.toFixed(2)
                        : '';

                      return (
                        <>
                          <Typography children={ratio} />
                          {edit && (
                            <Button onClick={() => {
                              const height = values.detailList[i].height;
                              const area = values.detailList[i].area;
                              if (!height || !area) {
                                setFieldValue(`detailList[${i}].ratio`, '');
                                return;
                              }
                              const ratio: number = height / Math.sqrt(area);
                              setFieldValue(`detailList[${i}].ratio`, ratio);
                            }}>
                              계산
                            </Button>
                          )}
                        </>
                      );
                    }
                  }, {
                    label: '특별풍하중 조건',
                    renderCell: (item, i) =>
                      <CheckboxField disableAll disableLabel
                        name={`detailList[${i}].specialWindLoadConditionList`}
                        label="특별풍하중 조건"
                        value={item.specialWindLoadConditionList}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        readOnly={!edit}
                        options={
                          ['1', '2', '3', '4', '5']
                          .map((key) => ({
                            key,
                            text: `(${key})`,
                            tooltip: projectSpecialWindLoadConditionName(key),
                          }))
                        }
                      />
                  }, {
                    label: '최소 실험대상 여부',
                    renderCell: (item) => item.ratio >= 3.0 ? 'Y' : '',
                    disableShow: edit
                  }, {
                    label: '실험 종류(동)',
                    required: edit,
                    renderCell: (item, i) =>
                      <CheckboxField disableAll disableLabel
                        name={`detailList[${i}].testList`}
                        label="실험 종류(동)"
                        value={item.testList}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        options={['F', 'P', 'A', '구검']}
                        required={edit}
                        readOnly={!edit}
                      />
                  }, {
                    label: '비고1',
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        name={`detailList[${i}].memo1`}
                        label="비고1"
                        value={item.memo1}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        readOnly={!edit}
                      />
                  }, {
                    label: '비고2',
                    renderCell: (item, i) =>
                      <DataField disableLabel
                        name={`detailList[${i}].memo2`}
                        label="비고2"
                        value={item.memo2}
                        setFieldValue={setFieldValue}
                        errors={errors}
                        readOnly={!edit}
                      />
                  }, {
                    label: '삭제',
                    disableShow: !edit,
                    renderCell: (item, i) =>
                      <Button fullWidth
                        color="warning"
                        onClick={() => {
                          if (values.detailList.length === 1) {
                            dialog.alert('최소 1개의 건축물 항목이 필요합니다.');
                            return;
                          }
                          dialog.remove(`${item.buildingName || '해당'} 건축물 항목을 삭제하시겠습니까?`, () => {
                            setFieldValue('detailList', values.detailList.filter((item, j) => i !== j));
                          });
                        }}>
                        삭제
                      </Button>
                  }
                ]}
              />
            </Box>
            {edit && (
              <Box sx={{
                display: 'flex',
                width: '100%',
                mb: '40px',
                flexDirection: 'row-reverse'
              }}>
                <Button onClick={() => {
                  setFieldValue('detailList', [...values.detailList, initDetailView]);
                }}>
                  추가
                </Button>
              </Box>
            )}
            <Box sx={{
              display: 'flex',
              width: '100%',
              mb: '40px',
              flexWrap: 'wrap',
            }}>
              <Table
                list={values.fileList}
                title="관련 파일"
                columns={[
                  {
                    label: 'No.',
                    renderCell: (item, i) => i + 1,
                  }, {
                    label: '파일명',
                    renderCell: (item) => `${item.filename} (${item.readableSize})`
                  }, {
                    label: '삭제',
                    disableShow: !edit,
                    renderCell: (item, i) =>
                      <Button fullWidth
                        color="warning"
                        onClick={() => {
                          dialog.remove(`${item.filename || '해당'} 파일을 삭제하시겠습니까?`, () => {
                            setFieldValue('fileList', values.fileList.filter((item, j) => i !== j));
                          });
                        }}>
                        삭제
                      </Button>
                  }, {
                    label: '다운로드',
                    disableShow: edit,
                    renderCell: (item) =>
                      <Button onClick={() => {
                        window.open(`/file-items/${item.id}`, '_blank');
                      }}>
                        다운로드
                      </Button>
                  }
                ]}
              />
              {edit && (
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                  justifyContent: 'right',
                }}>
                  <FileUploadButton onClick={(fileItem) => {
                    const fileList = values.fileList ?? [];
                    setFieldValue('fileList', [
                      ...fileList,
                      fileItem
                    ]);
                  }}>
                    추가
                  </FileUploadButton>
                </Box>
              )}
            </Box>
            {!edit && (
              <Box sx={{
                display: 'flex',
                width: '100%',
                mb: '40px',
                justifyContent: 'space-around'
              }}>
                <Button color="error" onClick={handler.remove}>
                  삭제
                </Button>
                <Button onClick={handler.edit}>
                  수정
                </Button>
                <Button color="secondary" onClick={handler.close}>
                  닫기
                </Button>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProjectReviewModal;
