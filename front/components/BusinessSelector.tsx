import {
  BusinessId,
  BusinessIdWithManagerId,
  BusinessManagerId,
  BusinessManagerVO,
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
  BusinessManagerQuery,
  BusinessQuery,
  initialBusinessQuery,
  keywordTypeList,
  managerKeywordTypeList
} from 'business/query';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLayout from 'layouts/ModalLayout';
import { ColorPalette } from 'assets/theme';
import {
  Box,
  FormControl,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Button from 'layouts/Button';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Input, { InputProps } from 'layouts/Input';
import Select from 'layouts/Select';
import useDialog from 'dialog/hook';

enum BusinessSelectorActionType {
  setModal       = 'system/business-selector/modal/set',
  setList        = 'system/business-selector/list/set',
  setFilter      = 'system/business-selector/filter/set',
  setId          = 'system/business-selector/id/set',
  setDetail      = 'system/business-selector/detail/set',
  setManagerList = 'system/business-selector/manager-list/set',
}

interface ModalProps {
  id?: BusinessId;
  allowMyBusiness?: boolean;
  withEmployee?: BusinessManagerId;
  hasEmployee?: boolean;
  afterConfirm: (business?: BusinessIdWithManagerId) => void;
}

const businessSelectorAction = {
  setModal:       createAction(BusinessSelectorActionType.setModal)<ModalProps | undefined>(),
  setFilter:      createAction(BusinessSelectorActionType.setFilter)<BusinessQuery>(),
  setId:          createAction(BusinessSelectorActionType.setId)<BusinessId | undefined>(),
  setList:        createAction(BusinessSelectorActionType.setList)<BusinessVO[]>(),
  setDetail:      createAction(BusinessSelectorActionType.setDetail)<BusinessVO | undefined>(),
  setManagerList: createAction(BusinessSelectorActionType.setManagerList)<BusinessManagerVO[]>(),
};

export interface BusinessSelectorState {
  modal?: ModalProps;
  id?: BusinessId;
  detail?: BusinessVO;
  list: BusinessVO[];
  filter: BusinessQuery;
  managerList: BusinessManagerVO[];
}

const initialState: BusinessSelectorState = {
  list:        [],
  filter:      {},
  managerList: [],
};

export const businessSelectorReducer = createReducer(initialState, {
  [BusinessSelectorActionType.setModal]:       (state,
                                                action
                                               ) => ({
    ...state,
    modal: action.payload,
  }),
  [BusinessSelectorActionType.setFilter]:      (state,
                                                action
                                               ) => ({
    ...state,
    filter: action.payload,
  }),
  [BusinessSelectorActionType.setList]:        (state,
                                                action
                                               ) => ({
    ...state,
    list: action.payload,
  }),
  [BusinessSelectorActionType.setId]:          (state,
                                                action
                                               ) => ({
    ...state,
    id: action.payload
  }),
  [BusinessSelectorActionType.setDetail]:      (state,
                                                action
                                               ) => ({
    ...state,
    detail: action.payload,
  }),
  [BusinessSelectorActionType.setManagerList]: (state,
                                                action
                                               ) => ({
    ...state,
    managerList: action.payload,
  }),
});

function* watchFilter() {
  while (true) {
    const { payload: filter } = yield take(businessSelectorAction.setFilter);
    const list: BusinessVO[] = yield call(businessApi.getListAll, filter);
    yield put(businessSelectorAction.setList(list));
    yield put(businessSelectorAction.setManagerList([]));
  }
}

function* watchId() {
  while (true) {
    const { payload: id } = yield take(businessSelectorAction.setId);
    if (id) {
      const detail: BusinessVO = yield call(businessApi.getOne, id);
      yield put(businessSelectorAction.setDetail(detail));
    }
    else {
      yield put(businessSelectorAction.setDetail(undefined));
    }
  }
}

function* watchManagerList() {
  while (true) {
    const { payload: id } = yield take(businessSelectorAction.setId);
    if (id) {
      const list: BusinessManagerVO[] = yield call(businessApi.getManagerList, id);
      yield put(businessSelectorAction.setManagerList(list));
    }
    else {
      yield put(businessSelectorAction.setManagerList([]));
    }
  }
}

export function* businessSelectorSaga() {
  yield fork(watchFilter);
  yield fork(watchId);
  yield fork(watchManagerList);
}

export function BusinessSelectorModalRoute() {

  const dispatch = useDispatch();
  const { modal, list, managerList } = useSelector((root: RootState) => root.businessSelector);
  const [managers, setManagers] = useState<BusinessManagerVO[]>(managerList ?? []);
  const [isSearched, setIsSearched] = useState(false);

  const onClose = useCallback(() => {
    dispatch(businessSelectorAction.setModal(undefined));
  }, [dispatch]);
  const { error } = useDialog();
  const open = !!modal;
  const [business, setBusiness] = useState<BusinessIdWithManagerId>({ id: undefined, managerId: undefined });

  const setFilter = useCallback((query: BusinessQuery) => dispatch(businessSelectorAction.setFilter(query)), [dispatch]);
  const setId = useCallback((businessId: BusinessId | undefined) => dispatch(businessSelectorAction.setId(businessId)), [dispatch]);
  const formik = useFormik<BusinessQuery & BusinessManagerQuery>({
    initialValues: {
      ...initialBusinessQuery,
      keywordTypeOfManager: managerKeywordTypeList[0].key as string,
      keywordOfManager:     '',
    },
    onSubmit:      (values) => {
      if (!modal) {
        return;
      }
      setFilter(values);
    }
  });

  useEffect(() => {
    if (open) {
      setFilter(initialBusinessQuery);
      if (modal?.withEmployee && modal.id) {
        setId(BusinessId(modal.id));
      }
      formik.setValues(initialBusinessQuery);
      setBusiness(prevState => ({ ...prevState, id: modal.id, managerId: modal.withEmployee }));
    }
  }, [open]);

  useEffect(() => {
    formik.setSubmitting(false);
  }, [list]);

  useEffect(() => {
    if (modal?.hasEmployee) {
      if (business.id) {
        setId(business.id);
        formik.setFieldValue('keywordTypeOfManager', managerKeywordTypeList[0].key as string);
        formik.setFieldValue('keywordOfManager', '');
      }
    }
  }, [business.id]);

  useEffect( () => {
    if (managerList) {
      setManagers(managerList.filter(manager => {
        if (formik.values.keywordTypeOfManager === 'by_name') {
          if (formik.values.keywordOfManager) {
            return manager.name.includes(formik.values.keywordOfManager);
          }
          else {
            return manager;
          }
        }
        else if (formik.values.keywordTypeOfManager === 'by_department') {
          if (formik.values.keywordOfManager) {
            if (manager.department) {
              return manager.department.includes(formik.values.keywordOfManager);
            }
          }
          else {
            return manager;
          }
        }
      }));
    }
  }, [business.id, managerList, isSearched]);

  return (
    <ModalLayout
      width={`${modal?.hasEmployee ? '80vw' : '40vw'}`}
      open={open}
      title="업체 선택"
      onClose={onClose}
      children={
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
              <FormControl
                fullWidth
                variant="standard"
                required
              >
                <RadioGroup row name="businessType">
                  <FormControlLabel
                    label="한양풍동실험연구소"
                    control={
                      <Radio
                        value="mine"
                        checked={business.id === 1}
                        onChange={() => {
                          if (modal?.allowMyBusiness && business.id !== 1) {
                            setBusiness(prevState => ({ ...prevState, id: BusinessId(1) }));
                          }
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    label="타 업체"
                    control={
                      <Radio
                        value="other"
                        checked={business.id !== 1}
                        onChange={() => {
                          setBusiness(prevState => ({ ...prevState, id: undefined }));
                        }}
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
          <Box sx={{
            display: 'flex',
            width:   '100%',
          }}>
            <Box sx={{
              width: `${modal?.hasEmployee ? '49%' : '100%'}`
            }}>
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
                  <Select
                    value={formik.values.keywordType ?? ''}
                    variant="outlined"
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.keywordType !== value) {
                        formik.setFieldValue('keywordType', value);
                      }
                    }}>
                    <MenuItem value="">전체</MenuItem>
                    {keywordTypeList.map(item => (
                      <MenuItem key={item.key} value={item.key}>{item.text}</MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ width: '60%', display: 'flex' }}>
                  <Input
                    variant="outlined"
                    value={formik.values.keyword ?? ''}
                    placeholder="검색어를 입력하세요"
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.keyword !== value) {
                        formik.setFieldValue('keyword', value);
                      }
                    }
                    }
                  />
                </Box>
                <Box sx={{ width: '10%', display: 'flex' }}>
                  <Button
                    disabled={modal?.allowMyBusiness && business.id === 1 || formik.isSubmitting}
                    onClick={() => {
                      formik.handleSubmit();
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
                              disabled={modal?.allowMyBusiness && business.id === 1}
                              value={item.id}
                              checked={item.id === business.id}
                              onClick={() => {
                                setBusiness(prevState => ({ ...prevState, id: item.id }));
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
            {modal?.hasEmployee && (
              <Box sx={{
                width: '49%',
              }}>
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
                    <Select
                      value={formik.values.keywordTypeOfManager ?? ''}
                      variant="outlined"
                      onChange={(e) => {
                        const value = e.target.value || undefined;
                        if (formik.values.keywordTypeOfManager !== value) {
                          formik.setFieldValue('keywordTypeOfManager', value);
                        }
                      }}>
                      {managerKeywordTypeList.map(item => (
                        <MenuItem key={item.key} value={item.key}>{item.text}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{ width: '60%', display: 'flex' }}>
                    <Input
                      variant="outlined"
                      value={formik.values.keywordOfManager ?? ''}
                      placeholder="검색어를 입력하세요"
                      onChange={(e) => {
                        const value = e.target.value || undefined;
                        if (formik.values.keywordOfManager !== value) {
                          formik.setFieldValue('keywordOfManager', value);
                        }
                      }
                      }
                    />
                  </Box>
                  <Box sx={{ width: '10%', display: 'flex' }}>
                    <Button
                      disabled={modal?.allowMyBusiness && business.id === 1 || formik.isSubmitting}
                      onClick={() => {
                        setIsSearched(!isSearched);
                      }}>
                      검색
                    </Button>
                  </Box>
                </Box>
                <Box sx={{
                  width:        '100%',
                  display:      'flex',
                  flexWrap:     'wrap',
                  alignContent: 'flex-start'
                }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <Td>선택</Td>
                        <Td>소속</Td>
                        <Td>이름</Td>
                        <Td>직위</Td>
                        <Td>핸드폰 번호</Td>
                        <Td>이메일 주소</Td>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!business.id && managers && (
                        <TableRow>
                          <Td colSpan={6}>
                            업체가 선택되지 않았습니다.
                          </Td>
                        </TableRow>
                      )}
                      {business.id && managers.length === 0 && (
                        <TableRow>
                          <Td colSpan={6}>
                            조회 결과가 없습니다.
                          </Td>
                        </TableRow>
                      )}
                      {managers.map(manager => (
                        <TableRow key={manager.id}>
                          <Td>
                            <Radio
                              value={manager.id}
                              checked={manager.id === business.managerId}
                              onChange={() => {
                                setBusiness(prevState => ({ ...prevState, managerId: manager.id }));
                              }}
                            />
                          </Td>
                          <Td>{manager.department}</Td>
                          <Td>{manager.name}</Td>
                          <Td>{manager.jobTitle}</Td>
                          <Td>{manager.mobilePhone}</Td>
                          <Td>{manager.email}</Td>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      }
      footer={
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
          <Button
            disabled={!modal}
            onClick={() => {
              if (!business.id) {
                error('업체를 선택해주세요.');
                return;
              }

              if (!business.managerId && modal?.hasEmployee) {
                error('담당자를 선택해주세요.');
                return;
              }

              onClose();
              modal?.afterConfirm(business);
            }}
            sx={{
              marginRight: '10px'
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={onClose}>취소</Button>
        </Box>
      }
    />
  );
}

interface FieldProps
  extends Omit<InputProps,
    | 'endAdornment'
    | 'startAdornment'
    | 'onChange'
    | 'onClick'> {
  allowMyBusiness?: boolean;
  onChange?: (business: BusinessIdWithManagerId) => void;
  withEmployee?: BusinessManagerId;
  hasEmployee?: boolean;
}

export default function BusinessSelector(props: FieldProps) {
  const {
          allowMyBusiness,
          onChange,
          value,
          withEmployee,
          hasEmployee,
          ...restProps
        } = props;
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<BusinessVO>();


  const onClick = useCallback((modalProps: ModalProps) => dispatch(businessSelectorAction.setModal(modalProps)), [dispatch]);

  useEffect(() => {
    if (value) {
      businessApi
      .getOne(value as BusinessId)
      .then(setDetail)
      .catch(() => {
        setDetail(undefined);
      });
    }
  }, [value]);

  return (
    <Input
      {...restProps}
      value={detail?.name ?? ''}
      onClick={() => {
        if (restProps.disabled || restProps.readOnly) {
          return;
        }
        onClick({
          id:           detail?.id,
          allowMyBusiness,
          withEmployee,
          hasEmployee,
          afterConfirm: (business) => {
            if (onChange) {
              onChange(business!);
            }
          }
        });
      }}
      endAdornment={
        <InputAdornment position="end" sx={{ marginRight: '10px' }}>
          <FontAwesomeIcon
            icon="building"
            style={{
              fontSize: '16px',
              color:    ColorPalette._386dd6,
              cursor:   'pointer'
            }}
          />
        </InputAdornment>
      }
    />
  );
}
