import {
  FormikContext,
  FormikContextType
} from 'formik';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import { ProjectContractParameter } from 'project_contract/parameter';
import { ColorPalette } from 'app/view/App/theme';
import { Typography } from '@mui/material';

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
    <Typography
      sx={{
        fontSize:   'inherit',
        fontWeight: 'inherit',
        color:      value !== 100 ? ColorPalette._eb4c4c : 'inherit',
      }}
    >
      {value}
    </Typography>
  );
}
