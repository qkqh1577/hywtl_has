import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import ProjectAddModal from 'app/view/App/ProjectDrawer/AddModal';
import { projectAction } from 'project/action';
import { ProjectAddParameter } from 'project/parameter';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useFormik } from 'formik';
import Button from 'layouts/Button';
import { RootState } from 'services/reducer';
import { initialProjectQuery } from 'project/query';

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
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { requestAdd } = useSelector((root: RootState) => root.project);
  const addProject = useCallback((formikProps: ProjectAddParameter) =>
      dispatch(projectAction.add(formikProps))
    , [dispatch]);

  const addModalFormik = useFormik<ProjectAddParameter>({
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
  const onClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (requestAdd === 'response') {
      dispatch(projectAction.requestAdd('idle'));
      setOpen(false);
      dispatch(projectAction.setFilter(initialProjectQuery));
    }
  }, [requestAdd]);

  return (
    <>
      <Button shape="small" onClick={onClick}>신규 프로젝트 등록</Button>
      <ProjectAddModal
        open={open}
        setOpen={setOpen}
        formik={addModalFormik}
      />
    </>
  );
}
