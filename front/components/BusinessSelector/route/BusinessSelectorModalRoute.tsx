import {BusinessId, BusinessIdWithManagerId, BusinessManagerId, BusinessManagerVO} from "../../../business/domain";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import React, {useCallback, useEffect, useState} from "react";
import {businessSelectorAction} from "../action";
import useDialog from "../../../dialog/hook";
import {
  BusinessManagerQuery,
  BusinessQuery,
  initialBusinessQuery, keywordTypeList,
  managerKeywordTypeList
} from "../../../business/query";
import {FormikProvider, useFormik} from "formik";
import ModalLayout from "../../../layouts/ModalLayout";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup, TableBody,
  TableContainer,
  TableHead, TableRow
} from "@mui/material";
import {ColorPalette} from "../../../assets/theme";
import Select from "../../../layouts/Select";
import Input from "../../../layouts/Input";
import Button from "../../../layouts/Button";
import {Table, Td, Th} from "../../../layouts/Table";
import BusinessList from "../../../project_basic/view/BusinessList";
import BusinessSelectorList from "./BusinessSelectorList";

export interface ModalProps {
  id?: BusinessId;
  allowMyBusiness?: boolean;
  withEmployee?: BusinessManagerId;
  hasEmployee?: boolean;
  afterConfirm: (business?: BusinessIdWithManagerId) => void;
}

export function BusinessSelectorModalRoute() {

  const dispatch = useDispatch();
  const {modal, list, managerList, loading} = useSelector((root: RootState) => root.businessSelector);
  const [managers, setManagers] = useState<BusinessManagerVO[]>(managerList ?? []);
  const [isSearched, setIsSearched] = useState(false);

  const onClose = useCallback(() => {
    dispatch(businessSelectorAction.setModal(undefined));
  }, [dispatch]);
  const {error} = useDialog();
  const open = !!modal;
  const [business, setBusiness] = useState<BusinessIdWithManagerId>({id: undefined, managerId: undefined});

  const setFilter = useCallback((query: BusinessQuery) => dispatch(businessSelectorAction.setFilter(query)), [dispatch]);
  const setId = useCallback((businessId: BusinessId | undefined) => dispatch(businessSelectorAction.setId(businessId)), [dispatch]);
  const formik = useFormik<BusinessQuery & BusinessManagerQuery>({
    initialValues: {
      ...initialBusinessQuery,
      keywordTypeOfManager: managerKeywordTypeList[0].key as string,
      keywordOfManager: '',
    },
    onSubmit: (values) => {
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
      setBusiness(prevState => ({...prevState, id: modal.id, managerId: modal.withEmployee}));
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

  useEffect(() => {
    if (managerList) {
      setManagers(managerList.filter(manager => {
        if (formik.values.keywordTypeOfManager === 'by_name') {
          if (formik.values.keywordOfManager) {
            return manager.name.includes(formik.values.keywordOfManager);
          } else {
            return manager;
          }
        } else if (formik.values.keywordTypeOfManager === 'by_department') {
          if (formik.values.keywordOfManager) {
            if (manager.department) {
              return manager.department.includes(formik.values.keywordOfManager);
            }
          } else {
            return manager;
          }
        }
      }));
    }
  }, [business.id, managerList, isSearched]);

  const handleBusinessSearchTypeChange = useCallback((e) => {
    const value = e.target.value || undefined;
    if (formik.values.keywordType !== value) {
      formik.setFieldValue('keywordType', value);
    }
  }, [formik]);

  const handleBusinessSearchKeywordChange = useCallback((e) => {
    const value = e.target.value || undefined;
    if (formik.values.keyword !== value) {
      formik.setFieldValue('keyword', value);
    }
  }, [formik]);

  const handleManagerSearchTypeChange = useCallback((e) => {
    const value = e.target.value || undefined;
    if (formik.values.keywordTypeOfManager !== value) {
      formik.setFieldValue('keywordTypeOfManager', value);
    };
  }, [formik]);

  const handleManagerSearchKeywordChange = useCallback((e) => {
    const value = e.target.value || undefined;
    if (formik.values.keywordOfManager !== value) {
      formik.setFieldValue('keywordOfManager', value);
    };
  }, [formik]);

  return (
    <ModalLayout
      width={`${modal?.hasEmployee ? '80vw' : '50vw'}`}
      height='80vh'
      open={open}
      title="업체 선택"
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Box sx={{
            width: '100%',
            height: 'calc(80vh - 140px)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            {modal?.allowMyBusiness && (
              <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
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
                              setBusiness(prevState => ({...prevState, id: BusinessId(1)}));
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
                            setBusiness(prevState => ({...prevState, id: undefined}));
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
              width: '100%',
              height: '100%',
            }}>
              <Box sx={{
                width: `${modal?.hasEmployee ? '50%' : '100%'}`,
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                padding: '10px'
              }}>
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'nowrap',
                  padding: '10px 0',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginBottom: '10px',
                }}>
                  <Box sx={{width: '15%', display: 'flex'}}>
                    <Select
                      variant="outlined"
                      value={formik.values.keywordType ?? ''}
                      onChange={handleBusinessSearchTypeChange}>
                      {keywordTypeList.map(item => (
                        <MenuItem key={item.key} value={item.key}>
                          {item.text}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{width: '60%', display: 'flex'}}>
                    <Input
                      key={formik.values.keyword}
                      variant="outlined"
                      defaultValue={formik.values.keyword ?? ''}
                      placeholder="검색어를 입력하세요"
                      onBlur={handleBusinessSearchKeywordChange}
                    />
                  </Box>
                  <Box sx={{width: '10%', display: 'flex'}}>
                    <Button
                      disabled={modal?.allowMyBusiness && business.id === 1 || formik.isSubmitting}
                      onClick={() => {
                        formik.handleSubmit();
                      }}>
                      검색
                    </Button>
                  </Box>
                </Box>
                <Box
                  className="scroll-bar-holder"
                  sx={{width: '100%', height:'calc(100% - 40px)', overflowY:'auto'}}>
                  <BusinessSelectorList list={list} loading={loading} setBusiness={setBusiness}/>
                </Box>
              </Box>
              {modal?.hasEmployee && (
                <Box sx={{
                  width: '50%',
                  height: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignContent: 'flex-start',
                  padding: '10px'
                }}>
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'nowrap',

                    padding: '10px 0',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: '10px',

                  }}>
                    <Box sx={{width: '15%', display: 'flex'}}>
                      <Select
                        variant="outlined"
                        value={formik.values.keywordTypeOfManager ?? managerKeywordTypeList[0].key}
                        onChange={handleManagerSearchTypeChange}>
                        {managerKeywordTypeList.map(item => (
                          <MenuItem key={item.key} value={item.key}>
                            {item.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box sx={{width: '60%', display: 'flex'}}>
                      <Input
                        key={formik.values.keywordOfManager}
                        variant="outlined"
                        defaultValue={formik.values.keywordOfManager ?? ''}
                        placeholder="검색어를 입력하세요"
                        onBlur={handleManagerSearchKeywordChange}
                      />
                    </Box>
                    <Box sx={{width: '10%', display: 'flex'}}>
                      <Button
                        disabled={modal?.allowMyBusiness && business.id === 1 || formik.isSubmitting}
                        onClick={() => {
                          setIsSearched(!isSearched);
                        }}>
                        검색
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    className="scroll-bar-holder"
                    sx={{width: '100%', height:'calc(100% - 40px)', overflowY:'auto'}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <Td width="10%">선택</Td>
                          <Td width="20%">소속</Td>
                          <Td width="10%">이름</Td>
                          <Td width="10%">직위</Td>
                          <Td width="20%">핸드폰 번호</Td>
                          <Td width="30%">이메일 주소</Td>
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
                                  setBusiness(prevState => ({...prevState, managerId: manager.id}));
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
        </FormikProvider>
      }
      footer={
        <Box sx={{width: '100%', display: 'flex', flexWrap: 'nowrap', justifyContent: 'center'}}>
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