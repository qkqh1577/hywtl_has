import React, {
  useCallback,
  useContext,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import ContractCollectionTemplate from 'admin/contract/collection/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { FormikSubmit } from 'type/Form';
import {
  ContractCollectionParameter,
  initialContractCollectionParameter
} from 'admin/contract/collection/parameter';
import { contractCollectionAction } from 'admin/contract/collection/action';
import {
  FormikContext,
  FormikContextType,
  useFormik
} from 'formik';
import {
  ContractCollectionVO,
  ExpectedDateType,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import {
  Button,
  TableCell,
  TableFooter,
  TableRow,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import { ColorPalette } from 'app/view/App/theme';

interface WithNewStage
  extends ContractCollectionParameter {
  newName: string;
  newRatio: number | '';
  newNote: string;
  newExpectedDate: ExpectedDateType | string;
}

const typographyStyle = {
  fontWeight: 'bold',
  fontSize:   '14px',
  lineHeight: '22px',
  color:      `${ColorPalette._252627}`,
};
const contentsStyle = {
  width:       '100%',
  textAlign:   'right',
  paddingLeft: '10px',
  color:       '#b2b4b7'
};

function FormFooterRoute() {
  const formik: FormikContextType<WithNewStage> = useContext(FormikContext);
  const result = formik.values.stageList
                       .map((item) => {
                         if (!item.ratio) {
                           return 0;
                         }
                         return item.ratio;
                       })
                       .reduce((a,
                                b
                       ) => {
                         return Number(a) + Number(b);
                       }, 0);
  return (
    <TableFooter>
      <TableRow>
        <TableCell>
          <TextField
            name="newName"
            label="단계"
            disableLabel
            variant="outlined"
            placeholder="입력"
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            name="newRatio"
            label="비율"
            disableLabel
            variant="outlined"
            placeholder="입력"
          />
        </TableCell>
        <TableCell>
          <Typography sx={contentsStyle}>
            용역금액x비율
          </Typography>
        </TableCell>
        <TableCell>
          <TextField
            name="newNote"
            label="시기"
            disableLabel
            variant="outlined"
            placeholder="입력"
          />
        </TableCell>
        <TableCell>
          <SelectField
            disableLabel
            options={expectedDateTypeList.map(
              (item) => ({
                key:  item as string,
                text: expectedDateTypeName(item)
              })
            )}
            name="newExpectedDate"
            label="예정일 선택"
          />
        </TableCell>
        <TableCell
          colSpan={2}
        >
          <Button
            onClick={() => {
              const { values } = formik;
              const {
                      stageList,
                      newName,
                      newRatio,
                      newNote,
                      newExpectedDate
                    } = values;
              formik.setFieldValue('stageList', [
                  ...(stageList || []),
                  {
                    name:         newName,
                    ratio:        newRatio,
                    note:         newNote,
                    expectedDate: newExpectedDate
                  }
                ]
              );
              formik.setFieldValue('newName', '');
              formik.setFieldValue('newRatio', '');
              formik.setFieldValue('newNote', '');
              formik.setFieldValue('newExpectedDate', '');
            }}
          >
            기성단계추가
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Typography
            sx={typographyStyle}
          >
            합계
          </Typography>
        </TableCell>
        <TableCell>
          {typeof result === 'number' && (result > 100) ?
            <Typography sx={{
              color: 'red',
            }}>
              {result}
            </Typography>
            :
            <Typography
              sx={{
                color: 'black',
              }}>
              {result}
            </Typography>}
        </TableCell>
        <TableCell>
          <Typography
            sx={contentsStyle}
          >
            금액 합계
          </Typography>
        </TableCell>
        <TableCell colSpan={4}>
          <TextField
            name="totalAmountNote"
            label="금액합계에 대한 설명"
            disableLabel
            variant="outlined"
            placeholder="입력"
          />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

function Element() {
  const dispatch = useDispatch();
  const { template } = useSelector((root: RootState) => root.contractCollection);
  const upsert = useCallback((formikProps: FormikSubmit<ContractCollectionParameter>) =>
    dispatch(contractCollectionAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractCollectionVO>({
    enableReinitialize: true,
    initialValues:      template ? template : initialContractCollectionParameter,
    onSubmit:           (values,
                         helper
                        ) => {
      upsert({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    dispatch(contractCollectionAction.setOne(template));
  }, []);

  return (
    <ContractCollectionTemplate
      formik={formik}
      formFooter={<FormFooterRoute />}
    />
  );
}

const contractCollectionTemplateRoute: AppRoute = {
  path:    '/admin/contract/collection-management',
  element: <Element />
};

export default contractCollectionTemplateRoute;
