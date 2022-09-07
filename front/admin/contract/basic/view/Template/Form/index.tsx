import React from 'react';

import ContractorForm from 'admin/contract/basic/view/Template/Form/ContractorForm';
import BasicContractForm from 'admin/contract/basic/view/Template/Form/BasicContractForm';

export interface Props {
}

export default function (props: Props) {

  return (
    <>
      <BasicContractForm {...props} />
      <ContractorForm {...props} />
    </>
  );
};
