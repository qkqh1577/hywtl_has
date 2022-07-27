import React, {
  useEffect,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import {
  DataField,
  Modal,
  Table,
  useDialog
} from 'components';
import {
  ProjectTargetParameter,
  ProjectTargetView as View,
  initProjectTargetView as initView,
  initProjectTargetDetailView as initDetailView,
  useProjectTarget,
  ProjectTargetDetailParameter,
} from 'services/project_target';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';

const ProjectTargetModal = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
          state: {
                   detail,
                   id,
                 },
          clearId,
          getOne,
          clearOne,
          add,
          update,
          remove,
        } = useProjectTarget();

  const [edit, setEdit] = useState<boolean>(false);
  const [view, setView] = useState<View>(initView);

  const handler = {
    edit:       () => {
      setEdit(true);
    },
    remove:     () => {
      if (!id) {
        dialog.alert('실험대상이 선택되지 않았습니다.');
        return;
      }
      dialog.remove('해당 실험대상을 삭제하시겠습니까?', () => {
        remove(id, () => {
          dialog.alert('삭제하였습니다.');
          handler.close();
        });
      });
    },
    submit:     (values: any,
                 { setSubmitting, setErrors }: FormikHelpers<any>
                ) => {
      if (!projectId) {
        dialog.alert('프로젝트가 선택되지 않았습니다.');
        setSubmitting(false);
        return;
      }
      const errors: any = {};

      const code: string = values.code;
      if (!code) {
        errors.code = '실험대상 번호 입력은 필수입니다.';
      }

      const testList: string[] | undefined = Array.isArray(values.testList) && values.testList.length > 0 ? values.testList : undefined;

      const memo: string | undefined = values.memo;

      const detailList: ProjectTargetDetailParameter[] = (values.detailList as any[])
      .map((item,
            index
      ) => {
        const detailErrors: any = {};

        const buildingName: string = item.buildingName;
        if (!buildingName) {
          detailErrors.buildingName = '건물(동) 입력은 필수입니다.';
        }

        const testList: string[] = item.testList;
        if (testList.length === 0) {
          detailErrors.testList = '실험 종류는 하나 이상 선택해야 합니다.';
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
        const detail: ProjectTargetDetailParameter = {
          buildingName,
          testList,
          memo,
        };
        return detail;
      })
      .filter(item => item !== null)
      .map(item => item as ProjectTargetDetailParameter);

      if (detailList.length === 0) {
        errors['detailList.size'] = '건축물 항목은 하나 이상 필수입니다.';
      }

      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        setErrors(errors);
        return;
      }
      const params: ProjectTargetParameter = {
        code,
        testList,
        memo,
        detailList,
      };

      (id ? update : add)((id ?? projectId), params, () => {
        dialog.alert('저장되었습니다.');
        handler.init();
      });
      setSubmitting(false);
    },
    init:       () => {
      setEdit(false);
      clearId();
      clearOne();
      handler.updateView();
    },
    close:      (event?: object,
                 reason?: string
                ) => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        return;
      }
      if (edit) {
        dialog.rollback(handler.init);
      }
      else {
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
        confirmed:  getConfirmed(detail?.confirmed),
        code:       detail?.code ?? initView.code,
        testList:   detail?.testList ?? initView.testList,
        memo:       detail?.memo ?? initView.memo,
        detailList: detail?.detailList.map((item) => ({
          id:           item.id,
          buildingName: item.buildingName ?? initDetailView.buildingName,
          testList:     item.testList ?? initDetailView.testList,
          memo:         item.memo ?? initDetailView.memo,
        })) ?? initView.detailList,
      });
    },
  };

  useEffect(() => {
    if (typeof id === 'number') {
      getOne(id);
    }
    else if (id === null) {
      setEdit(true);
    }
  }, [id]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Modal
      title={`실험대상 ${id === null ? '등록' : '수정'}`}
      width="70%"
      open={typeof id !== 'undefined'}
      onClose={handler.close}
      sx={{
        maxHeight: '70%',
      }}>
      <Formik enableReinitialize initialValues={view} onSubmit={handler.submit}>
        {({
            values,
            isSubmitting,
            dirty,
            setFieldValue,
            handleSubmit,
            resetForm
          }) => (
          <Form>
            <Box sx={{
              display: 'flex',
              width:   '100%',
              mb:      '40px',
            }}>
              <Grid container spacing={2}>
                <Grid item sm={1}>
                  <SelectField
                    readOnly
                    name="confirmed"
                    label="견적 여부"
                    options={['Y', 'N']}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name="code"
                    label="실험대상 번호"
                    readOnly={!edit}
                    required={edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <DataField
                    disableAll
                    type="checkbox"
                    name="testList"
                    label="실험 종류(단지)"
                    options={['E', 'B']}
                    readOnly={!edit}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    name="memo"
                    label="비고"
                    readOnly={!edit}
                  />
                </Grid>
                <Grid item sm={4}>
                  {edit && (
                    <Box sx={{
                      display:        'flex',
                      width:          '100%',
                      flexWrap:       'wrap',
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
                            }
                            else {
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
            <Box sx={{
              display:  'flex',
              width:    '100%',
              mb:       '40px',
              flexWrap: 'wrap',
            }}>
              <Table
                list={values.detailList}
                columns={[
                  {
                    label:      'No.',
                    renderCell: (item,
                                 i
                                ) => i + 1
                  }, {
                    label:      '건물(동)',
                    required:   edit,
                    renderCell: (item,
                                 i
                                ) => (
                      <TextField
                        disableLabel
                        name={`detailList[${i}].buildingName`}
                        label="건물(동)"
                        readOnly={!edit}
                        required={edit}
                      />
                    ),
                  }, {
                    label:      '실험 종류',
                    required:   edit,
                    renderCell: (item,
                                 i
                                ) =>
                                  <DataField
                                    disableAll
                                    disableLabel
                                    type="checkbox"
                                    name={`detailList[${i}].testList`}
                                    label="실험 종류(동)"
                                    options={['F', 'P', 'A', '구검']}
                                    required={edit}
                                    readOnly={!edit}
                                  />
                  }, {
                    label:       '삭제',
                    disableShow: !edit,
                    renderCell:  (item,
                                  i
                                 ) => (
                      <Button
                        fullWidth
                        color="warning"
                        onClick={() => {
                          if (values.detailList.length === 1) {
                            dialog.alert('최소 1개의 건축물 항목이 필요합니다.');
                            return;
                          }
                          dialog.remove(`${item.buildingName || '해당'} 건축물 항목을 삭제하시겠습니까?`, () => {
                            setFieldValue('detailList', values.detailList
                                                              .filter((item,
                                                                       j
                                                              ) => i !== j)
                            );
                          });
                        }}>
                        삭제
                      </Button>
                    ),
                  }
                ]}
              />
            </Box>
            {edit && (
              <Box sx={{
                display:       'flex',
                width:         '100%',
                mb:            '40px',
                flexDirection: 'row-reverse'
              }}>
                <Button onClick={() => {
                  // TODO: setFieldValue
                  setFieldValue('detailList', [...values.detailList, initDetailView]);
                }}>
                  추가
                </Button>
              </Box>
            )}
            {!edit && (
              <Box sx={{
                display:        'flex',
                width:          '100%',
                mb:             '40px',
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

export default ProjectTargetModal;
