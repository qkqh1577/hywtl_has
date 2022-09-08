import {
  BusinessId,
  BusinessVO
} from 'business/domain';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  createAction,
  createReducer
} from 'typesafe-actions';
import { RootState } from 'services/reducer';
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects';
import { businessApi } from 'business/api';
import {
  BusinessQuery,
  keywordTypeList
} from 'business/query';
import TextField, { TextFieldProps } from 'components/TextField';
import React, {
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {
  FormikContext,
  FormikContextType,
  FormikProvider,
  useFormik
} from 'formik';
import { FieldStatus } from 'components/DataFieldProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLayout from 'layouts/ModalLayout';
import { ColorPalette } from 'app/view/App/theme';
import {
  Box,
  Radio,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import RadioField from 'components/RadioField';
import SelectField from 'components/SelectField';
import Button from 'layouts/Button';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

enum BusinessSelectorActionType {
  setModal      = 'system/business-selector/modal/set',
  requestUpdate = 'system/business-selector/update/request',
  setList       = 'system/business-selector/list/set',
  setFilter     = 'system/business-selector/filter/set',
}

interface ModalProps {
  id?: BusinessId;
  allowMyBusiness?: boolean;
}

const businessSelectorAction = {
  setModal:      createAction(BusinessSelectorActionType.setModal)<ModalProps | undefined>(),
  requestUpdate: createAction(BusinessSelectorActionType.requestUpdate)<BusinessId | undefined>(),
  setFilter:     createAction(BusinessSelectorActionType.setFilter)<BusinessQuery>(),
  setList:       createAction(BusinessSelectorActionType.setList)<BusinessVO[]>(),
};

export interface BusinessSelectorState {
  modal?: ModalProps;
  updateId?: BusinessId;
  list: BusinessVO[];
  filter: BusinessQuery;
}

const initialState: BusinessSelectorState = {
  list:   [],
  filter: {}
};

export const businessSelectorReducer = createReducer(initialState, {
  [BusinessSelectorActionType.setModal]:      (state,
                                               action
                                              ) => ({
    ...state,
    modal: action.payload,
  }),
  [BusinessSelectorActionType.requestUpdate]: (state,
                                               action
                                              ) => ({
    ...state,
    updateId: action.payload,
  }),
  [BusinessSelectorActionType.setFilter]:     (state,
                                               action
                                              ) => ({
    ...state,
    filter: action.payload,
  }),
  [BusinessSelectorActionType.setList]:       (state,
                                               action
                                              ) => ({
    ...state,
    list: action.payload,
  }),
});

function* watchFilter() {
  while (true) {
    const { payload: filter } = yield take(businessSelectorAction.setFilter);
    const list: BusinessVO[] = yield call(businessApi.getListAll, filter);
    yield put(businessSelectorAction.setList(list));
  }
}

export function* businessSelectorSaga() {
  yield fork(watchFilter);
}

interface ModalFormProps {
  businessType: 'mine' | 'other';
  selectedId?: BusinessId;
  keywordType: string;
  keyword?: string;
}

export function BusinessSelectorModalRoute() {

  const dispatch = useDispatch();
  const { modal, list } = useSelector((root: RootState) => root.businessSelector);

  const initialValues: ModalFormProps = {
    businessType: modal?.id === 1 ? 'mine' : 'other',
    selectedId:   modal?.id,
    keywordType:  'by_name'
  };

  const onClose = useCallback(() => {
    dispatch(businessSelectorAction.setModal(undefined));
  }, [dispatch]);

  const setFilter = useCallback((formik: FormikContextType<ModalFormProps>) => {
    const filter = {
      keywordType: formik.values.keywordType,
      keyword:     formik.values.keyword || undefined,
    };
    dispatch(businessSelectorAction.setFilter(filter));
  }, [dispatch]);

  const requestUpdate = useCallback((id: BusinessId | undefined) => dispatch(businessSelectorAction.requestUpdate(id)), [dispatch]);

  const formik = useFormik<ModalFormProps>({
    enableReinitialize: true,
    initialValues,
    onSubmit:           (values) => {
      console.log(values);
      if (!modal) {
        return;
      }
      if (modal.allowMyBusiness && values.businessType === 'mine') {
        requestUpdate(BusinessId(1));
        return;
      }
      if (values.selectedId === modal.id) {
        onClose();
        return;
      }
      requestUpdate(values.selectedId);
    }
  });

  useEffect(() => {
    if (modal) {
      setFilter(formik);
      formik.setValues(initialValues);
    }
  }, [modal]);

  return (
    <ModalLayout
      width="40vw"
      open={typeof modal !== 'undefined'}
      title="업체 선택"
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Box sx={{
            width:    '100%',
            display:  'flex',
            flexWrap: 'wrap',
          }}>
            {modal?.allowMyBusiness && (
              <Box sx={{
                width:    '100%',
                display:  'flex',
                flexWrap: 'nowrap',
              }}>
                <RadioField
                  disableLabel
                  required
                  name="businessType"
                  label="타업체 여부"
                  options={[{
                    key:  'mine',
                    text: '한양풍동연구소',
                  }, {
                    key:  'other',
                    text: '타업체'
                  }]}
                  onChange={(e) => {
                    const businessType = e.target.value;
                    if (businessType === 'mine') {
                      formik.setFieldValue('selectedId', 1);
                    }
                    else {
                      formik.setFieldValue('selectedId', undefined);
                    }
                  }}
                />
              </Box>
            )}
            <Box sx={{
              width:          '100%',
              display:        'flex',
              flexWrap:       'nowrap',
              border:         `1px solid ${ColorPalette._e4e9f2}`,
              padding:        '10px 0',
              alignItems:     'center',
              justifyContent: 'space-around',
            }}>
              <Box sx={{ width: '15%', display: 'flex' }}>
                <SelectField
                  disableLabel
                  status={formik.values.selectedId === 1 ? FieldStatus.Disabled : undefined}
                  variant="outlined"
                  name="keywordType"
                  label="검색어 구분"
                  options={keywordTypeList}
                />
              </Box>
              <Box sx={{ width: '70%', display: 'flex' }}>
                <TextField
                  disableLabel
                  status={formik.values.selectedId === 1 ? FieldStatus.Disabled : undefined}
                  variant="outlined"
                  name="keyword"
                  label="검색어"
                  placeholder="검색어를 입력하세요"
                />
              </Box>
              <Box sx={{ width: '10%', display: 'flex' }}>
                <Button
                  disabled={formik.values.selectedId === 1}
                  onClick={() => {
                    setFilter(formik);
                  }}>
                  검색
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <Th>선택</Th>
                      <Th>업체명</Th>
                      <Th>대표명</Th>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.length === 0 && (
                      <TableRow>
                        <Td colSpan={3}>조회 결과가 없습니다.</Td>
                      </TableRow>
                    )}
                    {list.map((item) => (
                      <TableRow key={item.id}>
                        <Td>
                          <Radio
                            disabled={formik.values.selectedId === 1}
                            value={item.id}
                            checked={item.id === formik.values.selectedId}
                            onClick={() => {
                              formik.setFieldValue('selectedId', item.id);
                            }}
                          />
                        </Td>
                        <Td>{item.name}</Td>
                        <Td>{item.ceoName}</Td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </FormikProvider>
      }
      footer={
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <Button onClick={() => {formik.handleSubmit();}} sx={{ marginRight: '10px' }}>저장</Button>
          <Button shape="basic2" onClick={onClose}>취소</Button>
        </Box>
      }
    />
  );
}


interface FieldProps
  extends Omit<TextFieldProps,
    | 'status'
    | 'endAdornment'
    | 'startAdornment'> {
  allowMyBusiness?: boolean;
}

export default function BusinessSelector({ allowMyBusiness, ...props }: FieldProps) {

  const dispatch = useDispatch();
  const { updateId } = useSelector((root: RootState) => root.businessSelector);
  const formik = useContext(FormikContext);
  const name = props.name.endsWith('.id') ? props.name.substring(0, props.name.length - 3) : props.name;
  const business: BusinessVO | '' | undefined = formik?.values[name];
  const id: BusinessId | '' | undefined = !business ? undefined : business.id;

  const onClick = useCallback((id: BusinessId | undefined) =>
    dispatch(businessSelectorAction.setModal({
      id,
      allowMyBusiness,
    })), [dispatch, allowMyBusiness]);

  useEffect(() => {
    if (id) {
      businessApi
      .getOne(id)
      .then((detail) => {
        formik.setFieldValue(name, detail);
      });
    }
  }, [id]);

  useEffect(() => {
    if (updateId) {
      formik.setFieldValue(name, { id: updateId });
      dispatch(businessSelectorAction.requestUpdate(undefined));
      dispatch(businessSelectorAction.setModal(undefined));
    }
  }, [updateId]);

  return (
    <TextField
      {...props}
      name={`${name}.name`}
      status={FieldStatus.ReadOnly}
      endAdornment={
        <FontAwesomeIcon
          icon="building"
          onClick={() => {
            onClick(id || undefined);
          }}
          style={{
            fontSize: '16px',
            color:    ColorPalette._386dd6,
            cursor:   'pointer'
          }}
        />
      }
    />
  );
}