import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import { FormikContext } from 'formik';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { BusinessInvolvedType } from 'business/domain';
import { businessAction } from 'business/action';
import { RootState } from 'services/reducer';
import BusinessInvolvedProjectSection from 'business/view/Detail/Form/InvolvedProjectInformationList';

export default function BusinessInvolvedProjectRoute() {

  const dispatch = useDispatch();
  const { id, involvedProjectList } = useSelector((root: RootState) => root.business);
  const [involvedType, setInvolvedType] = useState<BusinessInvolvedType>();

  const formik = useContext(FormikContext);

  useEffect(() => {
    dispatch(businessAction.requestInvolvedProjectList(involvedType));
  }, [involvedType]);

  useEffect(() => {
    setInvolvedType(undefined);
  }, [id]);

  if (formik.values.edit) {
    return null;
  }

  return (
    <BusinessInvolvedProjectSection
      involvedType={involvedType}
      setInvolvedType={setInvolvedType}
      list={involvedProjectList}
    />
  );
}