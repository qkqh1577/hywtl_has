import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography
} from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField, FileInput, useDialog } from 'components';
import {
  FileItemParameter,
  fileItemToView,
  toReadableSize,
} from 'services/common/file-item';
import {
  ProjectTargetDocumentAddParameter,
  ProjectTargetDocumentChangeParameter,
  ProjectTargetDocumentView,
  initProjectTargetDocument,
  useProjectTarget,
} from 'services/project_target';

const ProjectTargetDocumentModal = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const dialog = useDialog();
  const {
    state: {
      documentDetail: detail,
      documentId,
    },
    clearDocumentId: clearModal,
    getDocument: getOne,
    clearDocument: clearOne,
    addDocument: add,
    updateDocument: update,
    removeDocument: remove,
  } = useProjectTarget();

  const [view, setView] = useState<ProjectTargetDocumentView>(initProjectTargetDocument);

  const handler = {
    remove: () => {
      if (!documentId) {
        dialog.alert('자료가 선택되지 않았습니다.');
        return;
      }
      dialog.remove('해당 자료를 삭제하시겠습니까?', () => {
        remove(documentId, () => {
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
      const fileItem: FileItemParameter = {
        multipartFile: values['fileItem-temp']?.multipartFile,
      };
      if (!fileItem.multipartFile && !documentId) {
        errors.fileItem = '파일 선택은 필수입니다.';
      }
      const memo: string | undefined = values.memo;

      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        setErrors(errors);
        return;
      }
      if (documentId) {
        // update
        const params: ProjectTargetDocumentChangeParameter = {
          memo,
        };
        update(documentId, params, () => {
          dialog.alert('변경하였습니다.');
          handler.close();
        });
      } else {
        // add
        const params: ProjectTargetDocumentAddParameter = {
          fileItem,
          memo,
        };
        add(projectId, params, () => {
          dialog.alert('저장하였습니다.');
          handler.close();
        });
      }
      setSubmitting(false);
    },
    close: (event?: object, reason?: string) => {
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        return;
      }
      clearModal();
      clearOne();
    },
    updateView: () => {
      setView({
        fileItem: detail?.fileItem ? fileItemToView(detail.fileItem) : view.fileItem,
        memo: detail?.memo ?? view.memo,
      });
    }
  };

  useEffect(() => {
    if (typeof documentId === 'number') {
      getOne(documentId);
    }
    return () => {
      clearOne();
    };
  }, [documentId]);

  useEffect(() => {
    handler.updateView();
  }, [detail]);

  return (
    <Modal
      open={typeof documentId !== 'undefined'}
      onClose={handler.close}
    >
      <Paper sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        maxHeight: '70%',
        overflow: 'hidden',
        bgColor: '#777',
        p: 4,
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50px',
          mb: '40px',
        }}>
          <h2>형상비 검토 자료 {documentId === null ? '등록' : '수정'}</h2>
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
              setFieldValue,
              handleSubmit,
            }) => (
              <Form>
                {!documentId && (
                  <Box sx={{
                    display: 'flex',
                    width: '100%',
                    mb: '40px',
                    p: '10px',
                    backgroundColor: '#aaa',
                    flexWrap: 'wrap',
                  }}>
                    <Typography variant="body1" sx={{
                      width: '100%',
                    }}>
                      * 파일 크기는 각 10MB를 초과할 수 없습니다.<br />
                      * 등록 가능한 파일 양식: jpg, webp, png, pdf, ppt(x) doc(x), xls(x), hwp<br />
                    </Typography>
                  </Box>
                )}
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                }}>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      {!documentId && (
                        <FileInput
                          name="fileItem"
                          label="파일"
                          value={values.fileItem}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          required
                        />
                      )}
                      {documentId && values.fileItem && (
                        <>
                          {`${values.fileItem.filename} (${toReadableSize(values.fileItem.size)})`}
                        </>
                      )}
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
                  </Grid>
                </Box>
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                }}>
                  {documentId && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.remove}
                    >
                      삭제
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
                    {`${documentId ? '수정' : '등록'}${isSubmitting ? ' 중' : ''}`}
                  </Button>
                  {documentId && (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handler.close}
                    >
                      취소
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ProjectTargetDocumentModal;
