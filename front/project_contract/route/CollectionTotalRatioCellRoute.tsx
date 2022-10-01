import {
  FormikContext,
  FormikContextType
} from 'formik';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import TotalRatioCell from 'admin/contract/collection/view/Form/TotalRatioCell';
import { ProjectContractParameter } from 'project_contract/parameter';

export default function CollectionTotalRatioCellRoute() {

  const formik: FormikContextType<ProjectContractParameter> = useContext(FormikContext);
  const list = formik.values.collection?.stageList;

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (!list) {
      return;
    }

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
