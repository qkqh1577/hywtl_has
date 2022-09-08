import TotalRatioCell from 'admin/contract/collection/view/Form/TotalRatioCell';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { ContractCollectionVO } from 'admin/contract/collection/domain';

export default function () {

  const formik: FormikContextType<ContractCollectionVO> = useContext(FormikContext);
  const list = formik.values.stageList;

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(
      list.map((item) => item.ratio)
          .map(ratio => !ratio || Number.isNaN(+ratio) ? 0 : +ratio)
          .reduce((a,
                   b
            ) => a + b
            , 0)
    );
  }, [list]);

  return (
    <TotalRatioCell value={value} />
  );
}