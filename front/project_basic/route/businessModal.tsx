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
import { BusinessShortVO } from 'business/domain';
import { projectBasicAction } from 'project_basic/action';
import { RootState } from 'services/reducer';
import { ProjectBasicBusinessId } from 'project_basic/domain';

interface SearchProps {
  keywordType?: string;
  keyword?: string;
}

export default function ProjectBasicBusinessModalRoute() {
  const dispatch = useDispatch();
  const { business } = useSelector((root: RootState) => root.projectBasic);
  const [businessList, setBusinessList] = useState<BusinessShortVO[]>();
  const onSearch = (query: SearchProps) => {
    businessApi.getListAll(query)
               .then(setBusinessList)
               .catch(() => {
                 setBusinessList(undefined);
               });
  };
  const onClose = useCallback(() => dispatch(projectBasicAction.setBusiness(undefined)), [dispatch]);
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
    if (business) {
      formik.setValues({
        keywordType: 'by_name',
        ...business,
        businessId:        business.business?.id,
        businessManagerId: business.businessManager?.id,
        edit:              !business.id,
      } as ProjectBasicBusinessParameter);
      onSearch({});
    }
  }, [business]);

  return (
    <FormikProvider value={formik}>
      <ProjectBasicBusinessModal
        open={typeof business !== 'undefined'}
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