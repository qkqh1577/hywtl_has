import { DefaultFunction } from 'type/Function';
import { ProjectContractCollectionVO } from 'project_contract/domain';
import ModalLayout from 'layouts/ModalLayout';
import CollectionTable from 'project_contract/view/ProjectCollectionModal/Table';
import React from 'react';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  collection?: ProjectContractCollectionVO;
}
export default function CollectionModal(props: Props) {
  return (
    <ModalLayout
      width="50vw"
      title={'기성 정보'}
      open={props.open}
      onClose={props.onClose}
      children={<CollectionTable collection={props.collection}/>} />
  );
}
