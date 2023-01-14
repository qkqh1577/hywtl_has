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
import { BusinessManagerQuery, } from 'business/query';

interface SearchProps {
  keywordType?: string;
  keyword?: string;
}

export default function ProjectBasicBusinessModalRoute() {
  const dispatch = useDispatch();
  const { business } = useSelector((root: RootState) => root.projectBasic);
  const [businessList, setBusinessList] = useState<BusinessShortVO[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = (query: SearchProps) => {
    // TODO: 정보 업데이트가 빈번하지 않음 ( projectBasic store로 옮길필요 있음)
    // if(businessList) {
    //   console.debug(formik.values.keywordType, formik.values.keyword);
    //   // by_name 한국
    //   // by_ceo_name 한국
    //   // by_registration_number 한국
    //
    //
    //
    // } else {
      setBusinessList(undefined);
      setLoading(true);
      businessApi.getListAll(query)
                 .then((value)=>{
                   setBusinessList(value);
                   setLoading(false);
                 })
                 .catch(() => {
                   setBusinessList(undefined);
                   setLoading(false);
                 });
    // }

  };

  const formik = useFormik<ProjectBasicBusinessParameter & SearchProps & BusinessManagerQuery>({
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

  const onClose = useCallback(() => {
    dispatch(projectBasicAction.setBusiness(undefined));
    setBusinessList(undefined);
    formik.setValues({} as ProjectBasicBusinessParameter);
  }, [dispatch, formik]);

  const onAdd = useCallback((params: ProjectBasicBusinessParameter) => dispatch(projectBasicAction.addBusiness(params)), [dispatch]);
  const onChange = useCallback((params: ProjectBasicBusinessParameter) => dispatch(projectBasicAction.changeBusiness(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectBasicBusinessId) => dispatch(projectBasicAction.deleteBusiness(id)), [dispatch]);

  useEffect(() => {
    if (business) {
      formik.setValues({
        keywordType: 'by_name',
        ...business,
        businessId:        business.business?.id,
        businessManagerId: business.businessManager?.id,
        edit:              !business.id,
      } as ProjectBasicBusinessParameter);

      if(business.id){
        console.debug(business);
        // 수정 시에는 전체 목록을 가져올 필요가 없음
        formik.setFieldValue('keyword', business.business?.name);
        formik.setFieldValue('keywordType', 'by_name');
        onSearch({
          keyword:business.business?.name,
          keywordType:'by_name',
        });
      } else {
        onSearch({});
      }
    }
  }, [business]);

  const handleSearch = useCallback(() => {
    onSearch({
      keyword: formik.values.keyword,
      keywordType: formik.values.keywordType,
    });
  },[formik]);

  return (
    <FormikProvider value={formik}>
      <ProjectBasicBusinessModal
        open={typeof business !== 'undefined'}
        loading={loading}
        onClose={onClose}
        onDelete={onDelete}
        onSearch={handleSearch}
        businessList={businessList}
      />
    </FormikProvider>
  );
}
