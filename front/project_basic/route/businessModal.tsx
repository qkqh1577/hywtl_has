import ProjectBasicBusinessModal from 'project_basic/view/BusinessModal';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectBasicBusinessParameter } from 'project_basic/parameter';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { businessApi } from 'business/api';
import { BusinessShort } from 'business/domain';
import { projectBasicAction } from 'project_basic/action';
import { RootState } from 'services/reducer';
import { ProjectBasicBusinessId } from 'project_basic/domain';

interface SearchProps {
  keywordType?: string;
  keyword?: string;
}

export default function ProjectBasicBusinessModalRoute() {
  const dispatch = useDispatch();
  const { businessModal } = useSelector((root: RootState) => root.projectBasic);
  const [businessList, setBusinessList] = useState<BusinessShort[]>();
  const onSearch = (query: SearchProps) => {
    businessApi.getListAll(query)
               .then(setBusinessList)
               .catch((e) => {
                 console.error(e);
                 setBusinessList(undefined);
               });
  };
  const onClose = useCallback(() => dispatch(projectBasicAction.setBusinessModal(undefined)), [dispatch]);
  const onAdd = useCallback((params: ProjectBasicBusinessParameter) => dispatch(projectBasicAction.addBusiness(params)), [dispatch]);
  const onChange = useCallback((params: ProjectBasicBusinessParameter) => dispatch(projectBasicAction.changeBusiness(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectBasicBusinessId) => dispatch(projectBasicAction.deleteBusiness(id)), [dispatch]);
  const formik = useFormik<ProjectBasicBusinessParameter & SearchProps>({
    initialValues: {} as ProjectBasicBusinessParameter,
    onSubmit:      (values) => {
      if (values.id) {
        onChange({
          id:                values.id,
          businessId:        values.businessId,
          businessManagerId: values.businessManagerId,
          involvedType:      values.involvedType
        });
      }
      else {
        onAdd({
          businessId:        values.businessId,
          businessManagerId: values.businessManagerId,
          involvedType:      values.involvedType
        });
      }
    }
  });

  useEffect(() => {
    if (businessModal) {
      formik.setValues({
        keywordType: 'by_name',
        ...businessModal,
        businessId:        businessModal.business?.id,
        businessManagerId: businessModal.businessManager?.id,
        edit:              !businessModal.id,
      } as ProjectBasicBusinessParameter);
      onSearch({});
    }
  }, [businessModal]);

  return (
    <FormikProvider value={formik}>
      <ProjectBasicBusinessModal
        open={typeof businessModal !== 'undefined'}
        onClose={onClose}
        onDelete={onDelete}
        onSearch={() => {
          onSearch({
            keyword:     formik.values.keyword,
            keywordType: formik.values.keywordType,
          });
        }}
        businessList={businessList}
      />
    </FormikProvider>
  );
}