import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectAddModal from 'project/view/Drawer/AddModal';
import { projectAction } from 'project/action';
import {
  initialProjectQuery,
  ProjectAddParameter
} from 'project/parameter';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { RootState } from 'services/reducer';
import useDialog from 'dialog/hook';

export const memoLabelList: string[] = [
  '견적 의뢰처',
  '소개자',
  '총 동 수',
  '단지 수',
  '예상 시작 시점',
  '현재 인허가 단계',
  '관계사 정보',
  '견적 발송처',
  '기타 메모사항'
];

export default function ProjectAddModalRoute() {
  const dispatch = useDispatch();
  const { alert, error } = useDialog();
  const { requestAdd, addModal } = useSelector((root: RootState) => root.project);
  const addProject = useCallback((formikProps: ProjectAddParameter) => dispatch(projectAction.add(formikProps)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectAction.setAddModal(false)), [dispatch]);
  const formik = useFormik<ProjectAddParameter>({
    initialValues: {} as ProjectAddParameter,
    onSubmit:      (values) => {
      const memo = memoLabelList.map((label,
                                      i
      ) => {
        const value = values[`memo_${i}`];
        if (!value) {
          return null;
        }
        return `${label}: ${value}`;
      })
                                .filter(value => value !== null)
                                .join('\n');
      addProject({
        name:               values.name,
        alias:              values.alias,
        receptionManagerId: values.receptionManagerId,
        progressStatus:     values.progressStatus,
        bidType:            values.bidType,
        memo,
      });
    }
  });

  useEffect(() => {
    if (requestAdd === 'done') {
      alert('등록하였습니다.');
      dispatch(projectAction.setAddModal(false));
      dispatch(projectAction.requestAdd('idle'));
      dispatch(projectAction.setFilter(initialProjectQuery));
    }
    else if (requestAdd === message) {
      error('등록에 실패하였습니다.');
      dispatch(projectAction.requestAdd('idle'));
    }
  }, [requestAdd]);

  return (
    <FormikProvider value={formik}>
      <ProjectAddModal
        open={addModal}
        onClose={onClose}
      />
    </FormikProvider>
  );
}
