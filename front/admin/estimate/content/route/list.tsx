import React, { useState } from 'react';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  useCallback,
  useEffect
} from 'react';
import { FormikSubmit } from 'type/Form';
import {
  EstimateContentQuery,
  initialEstimateContentQuery
} from 'admin/estimate/content/query';
import { estimateContentAction } from 'admin/estimate/content/action';
import { useFormik } from 'formik';
import EstimateContentList from 'admin/estimate/content/view/List';
import { EstimateContentShort } from 'admin/estimate/content/domain';
import { estimateContentApi } from 'admin/estimate/content/api';

function Element() {
  const dispatch = useDispatch();
  const { list, filter } = useSelector((root: RootState) => root.estimateContent);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<EstimateContentQuery>>) => {
    const result: EstimateContentQuery = {
      ...(filter ?? initialEstimateContentQuery),
      ...formikProps.values,
    };
    dispatch(estimateContentAction.setFilter({
      ...formikProps,
      values: result,

    }));
  }, [dispatch]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [itemList, setItemList] = useState<EstimateContentShort[]>([]);
  const changeSeq = useCallback((list) => dispatch(estimateContentAction.changeSeq(list.map(item => item.id))), [dispatch]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      filter ?? initialEstimateContentQuery,
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
    <EstimateContentList
      formik={formik}
      list={list}
      onSeqModalOpen={() => {
        setModalOpen(true);
        estimateContentApi.getList({
          ...initialEstimateContentQuery
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

const estimateContentListRoute: AppRoute = {
  path:    '/admin/estimate/content-management',
  element: <Element />
};

export default estimateContentListRoute;
