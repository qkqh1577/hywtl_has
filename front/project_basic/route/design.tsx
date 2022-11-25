import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBasicDesignSection from 'project_basic/view/DesignSection';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { ProjectBasicDesignParameter } from 'project_basic/parameter';
import { projectBasicAction } from 'project_basic/action';
import { closeStatus } from 'components/DataFieldProps';
import { addressModalAction } from 'components/AddressModal/action';
import { AddressModal } from 'components/AddressModal/AddressModal';

export default function ProjectBasicDesignRoute() {
  const dispatch = useDispatch();
  const { id, design, requestUpdateDesign, city1List, city2List, city1Code } = useSelector((root: RootState) => root.projectBasic);
  const onUpdate = useCallback((params: ProjectBasicDesignParameter) => dispatch(projectBasicAction.updateDesign(params)), [dispatch]);
  const openAddressModal = useCallback(() => dispatch(addressModalAction.addressModal(true)), [dispatch]);
  const getCity2List = useCallback((regCode: string) => dispatch(projectBasicAction.getCity2List(regCode)), [dispatch]);
  const [regCode, setRegCode] = React.useState<string>('');

  useEffect(() => {
    closeStatus(requestUpdateDesign, () => {
      dispatch(projectBasicAction.getDesign(id));
    }, () => {
      dispatch(projectBasicAction.requestUpdateDesign('idle'));
    });
  }, [requestUpdateDesign]);

  useEffect(() => {
    if (regCode) {
      getCity2List(regCode);
    }
  }, [regCode]);


  return (
    <>
      <ProjectBasicDesignSection
        detail={design ?? {}}
        onUpdate={onUpdate}
        onAddressModal={openAddressModal}
        city1List={city1List}
        city2List={city2List}
        setRegCode={setRegCode}
        regCode={regCode}
      />
      <AddressModal updateByDispatch={{ onUpdate: onUpdate }} />
    </>
  );
}
