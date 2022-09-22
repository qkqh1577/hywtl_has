import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { AppRoute } from 'services/routes';
import EstimateTemplateList from 'estimate_template/view/List';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import {
  EstimateTemplateQuery,
  initialEstimateTemplateQuery
} from 'estimate_template/query';
import { estimateTemplateAction } from 'estimate_template/action';
import { FormikSubmit } from 'type/Form';
import { EstimateTemplateShort } from 'estimate_template/domain';
import { estimateTemplateApi } from 'estimate_template/api';

function Element() {

  const dispatch = useDispatch();
  const { list, filter } = useSelector((root: RootState) => root.estimateTemplate);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<EstimateTemplateQuery>>) => {
      const result: EstimateTemplateQuery = {
        ...(filter ?? initialEstimateTemplateQuery),
        ...formikProps.values,
      };
      dispatch(estimateTemplateAction.setFilter({
        ...formikProps,
        values: result
      }));
    },
    [dispatch]
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [itemList, setItemList] = useState<EstimateTemplateShort[]>([]);
  const changeSeq = useCallback((list) =>
      dispatch(estimateTemplateAction.changeSeq(list.map(item => item.id)))
    , [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      filter ?? initialEstimateTemplateQuery,
    onSubmit:           (values,
                         helper
                        ) => {
      setFilter({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    setFilter(formik);
  }, []);

  return (
    <EstimateTemplateList
      formik={formik}
      list={list}
      onSeqModalOpen={() => {
        setModalOpen(true);
        estimateTemplateApi.getList({
          sort:        'seq,asc',
          keyword:     '',
          keywordType: '',
          testType:    undefined,
        })
                           .then((list) => {
                             setItemList(list);
                           });
      }}
      modalProps={{
        open:     modalOpen,
        list:     itemList,
        setList:  setItemList,
        onClose:  () => {
          setModalOpen(false);
          setItemList([]);
        },
        onSubmit: () => {
          changeSeq(list);
        },
      }}
    />
  );
}

const estimateTemplateListRoute: AppRoute = {
  path:    '/admin/estimate-template-management',
  element: <Element />
};

export default estimateTemplateListRoute;