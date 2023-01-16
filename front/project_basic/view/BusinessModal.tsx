import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import {DefaultFunction} from 'type/Function';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  MenuItem,
  Radio,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import {FormikContext} from 'formik';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Select from 'layouts/Select';
import {
  businessInvolvedTypeList,
  businessInvolvedTypeName,
  BusinessManagerVO,
  BusinessShortVO,
} from 'business/domain';
import {
  Table,
  Td
} from 'layouts/Table';
import Button from 'layouts/Button';
import {
  keywordTypeList,
  managerKeywordTypeList
} from 'business/query';
import Input from 'layouts/Input';
import {ProjectBasicBusinessId} from 'project_basic/domain';
import TextBox from 'layouts/Text';
import {makeStyles} from "@mui/styles";
import BusinessList from "./BusinessList";

interface Props {
  open: boolean;
  loading: boolean,
  onClose: DefaultFunction;
  onDelete: DefaultFunction<ProjectBasicBusinessId>;
  onSearch: DefaultFunction;
  businessList: BusinessShortVO[] | undefined;
}

const useStyles = makeStyles((theme) => ({
  businessInfo: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    marginBottom: '15px',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > div':{
      width: '50%',
      padding: '5px 0',
      borderBottom: '1px solid rgb(228, 233, 242)'
    }
  }
}));

export default function ProjectBasicBusinessModal(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const id = formik.values.id;
  const [business, setBusiness] = useState<BusinessShortVO>();
  const selectedBusinessId = formik.values.businessId;
  const [managerList, setManagerList] = useState<BusinessManagerVO[]>(business?.managerList ?? []);
  const classes = useStyles();

  useEffect(() => {
    if (selectedBusinessId && props.businessList) {
      setBusiness(props.businessList.find(b => b.id === selectedBusinessId));
      formik.setFieldValue('keywordTypeOfManager', managerKeywordTypeList[0].key as string);
    } else {
      setBusiness(undefined);
    }
  }, [selectedBusinessId, props.businessList]);

  useEffect(() => {
    if (selectedBusinessId && business) {
      const filtered = business.managerList?.filter(manager => {
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
      });
      setManagerList(filtered);
    }
  }, [formik.values.keywordOfManager, formik.values.keywordTypeOfManager, business]);

  const handleBusinessInvolvedTypeChange = useCallback((e) => {
    if (!edit) {
      return;
    }
    const value = e.target.value || undefined;
    if (formik.values.involvedType !== value) {
      formik.setFieldValue('involvedType', value);
    }
  }, [edit, formik]);

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

  if (edit === undefined) return null;

  return (
    <ModalLayout
      width={`${edit ? '80vw' : '50vw'}`}
      open={props.open}
      title={edit ? (id ? '관계사 수정' : '관계사 등록') : '관계사 상세'}
      onClose={props.onClose}
      children={
        <Box sx={{
          width: '100%',
          height: 'calc(80vh - 120px)',
          display: `${edit ? 'flex' : 'block'}`,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            width: `${edit ? '49%' : '100%'}`,
            height: `${edit ? '100%' : 'auto'}`,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}>
            <Box sx={{
              width: `${edit ? '50%' : '100%'}`,
              display: 'flex',
              flexWrap: 'nowrap',
              marginBottom: '10px',
            }}>
              <DataFieldWithLabel required={edit} label="관계사 구분">
                <Select
                  readOnly={!edit}
                  value={formik.values.involvedType ?? ''}
                  onChange={handleBusinessInvolvedTypeChange}>
                  {businessInvolvedTypeList.map(item => (
                    <MenuItem key={item} value={item}>
                      {businessInvolvedTypeName(item)}
                    </MenuItem>
                  ))}
                </Select>
              </DataFieldWithLabel>
            </Box>
            {edit && (
              <Box sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'nowrap',
                marginBottom: '15px',
              }}>
                <DataFieldWithLabel label="업체" labelPosition="top">
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <Box sx={{
                      width: 'calc(100% - 75px)',
                      display: 'flex',
                      flexWrap: 'nowrap',
                      alignItems: 'center',
                    }}>
                      <Box sx={{
                        width: '20%',
                        display: 'flex',
                        flexWrap: 'nowrap',
                      }}>
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
                      <Box sx={{
                        width: '80%',
                        display: 'flex',
                        flexWrap: 'nowrap',
                      }}>
                        <Input
                          key={formik.values.keyword}
                          variant="outlined"
                          defaultValue={formik.values.keyword ?? ''}
                          onBlur={handleBusinessSearchKeywordChange}
                        />
                      </Box>
                    </Box>
                    <Button onClick={props.onSearch}>
                      검색
                    </Button>
                  </Box>
                </DataFieldWithLabel>
              </Box>
            )}
            {!edit && (
              <>
                <Box className={classes.businessInfo} sx={{marginTop:'20px'}}>
                  <Box sx={{width:'50% !important'}}>
                    <DataFieldWithLabel label="업체명">
                      <TextBox variant="body2">
                        {formik.values.business?.name}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                  <Box sx={{width:'30% !important'}}>
                    <DataFieldWithLabel label="사업자번호">
                      <TextBox variant="body2">
                        {formik.values.business?.registrationNumber}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                  <Box sx={{width:'20% !important'}}>
                    <DataFieldWithLabel label="대표명">
                      <TextBox variant="body2">
                        {formik.values.business?.ceoName}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                </Box>
                <Box className={classes.businessInfo}>
                  <Box sx={{width:'80% !important'}}>
                    <DataFieldWithLabel label="주소">
                      <TextBox variant="body2">
                        {formik.values.business?.address}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                  <Box sx={{width:'20% !important'}}>
                    <DataFieldWithLabel label="우편번호">
                      <TextBox variant="body2">
                        {formik.values.business?.zipCode}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                </Box>
                <Box className={classes.businessInfo}>
                  <Box>
                    <DataFieldWithLabel label="대표 전화번호">
                      <TextBox variant="body2">
                        {formik.values.business?.officePhone}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                  <Box>
                    <DataFieldWithLabel label="팩스 번호">
                      <TextBox variant="body2">
                        {formik.values.business?.fax}
                      </TextBox>
                    </DataFieldWithLabel>
                  </Box>
                </Box>
              </>
            )}
            {edit && (
              <Box
                className="scroll-bar-holder"
                sx={{width: '100%', height:'calc(100% - 110px)', overflowY:'auto'}}>
                <BusinessList list={props.businessList} loading={props.loading}/>
              </Box>
            )}
          </Box>
          <Box sx={{
            width: `${edit ? '49%' : '100%'}`,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start'
          }}>
            {!edit && (
              <>
                <DataFieldWithLabel label="담당자" labelPosition="top">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      marginBottom: '20px'
                  }}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <Td>소속</Td>
                          <Td>{formik.values.businessManager?.department}</Td>
                        </TableRow>
                        <TableRow>
                          <Td>이름</Td>
                          <Td>{formik.values.businessManager?.name}</Td>
                        </TableRow>
                        <TableRow>
                          <Td>직위</Td>
                          <Td>{formik.values.businessManager?.jobTitle}</Td>
                        </TableRow>
                        <TableRow>
                          <Td>핸드폰 번호</Td>
                          <Td>{formik.values.businessManager?.mobilePhone}</Td>
                        </TableRow>
                        <TableRow>
                          <Td>회사 번호</Td>
                          <Td>{formik.values.businessManager?.officePhone}</Td>
                        </TableRow>
                        <TableRow>
                          <Td>이메일 주소</Td>
                          <Td>{formik.values.businessManager?.email}</Td>
                        </TableRow>
                        <TableRow>
                          <Td>자택 주소</Td>
                          <Td>{formik.values.businessManager?.address}</Td>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </DataFieldWithLabel>
                <DataFieldWithLabel label="임직원 목록" labelPosition="top">
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <Td width="15%">이름</Td>
                          <Td width="10%">직위</Td>
                          <Td width="15%">소속</Td>
                          <Td width="26%">이메일</Td>
                          <Td width="17%">핸드폰 번호</Td>
                          <Td width="17%">전화 번호</Td>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {formik.values?.business?.managerList?.map((manager)=>(
                            <TableRow key={manager.id}>
                              <Td>{manager.name}</Td>
                              <Td>{manager.jobTitle}</Td>
                              <Td>{manager.department}</Td>
                              <Td>{manager.email}</Td>
                              <Td>{manager.mobilePhone}</Td>
                              <Td>{manager.officePhone}</Td>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Box>
                </DataFieldWithLabel>
              </>
            )}
            {edit && (
              <Box sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'nowrap',
                marginTop: '50px',
                marginBottom: '15px',
              }}>
                <DataFieldWithLabel label="담당자" labelPosition="top">
                  <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <Box sx={{
                      width: 'calc(100% - 75px)',
                      display: 'flex',
                      flexWrap: 'nowrap',
                      alignItems: 'center',
                    }}>
                      <Box sx={{
                        width: '20%',
                        display: 'flex',
                        flexWrap: 'nowrap',
                      }}>
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
                      <Box sx={{
                        width: '80%',
                        display: 'flex',
                        flexWrap: 'nowrap',
                      }}>
                        <Input
                          key={formik.values.keywordOfManager}
                          variant="outlined"
                          defaultValue={formik.values.keywordOfManager ?? ''}
                          onBlur={handleManagerSearchKeywordChange}
                        />
                      </Box>
                    </Box>
                    <Button onClick={props.onSearch}>
                      검색
                    </Button>
                  </Box>
                </DataFieldWithLabel>
              </Box>
            )}
            {edit && (
              <Box
                className="scroll-bar-holder"
                sx={{width: '100%', height:'calc(100% - 110px)', overflowY:'auto'}}>
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
                    {!business && (
                      <TableRow>
                        <Td colSpan={6}>
                          업체가 선택되지 않았습니다.
                        </Td>
                      </TableRow>
                    )}
                    {business && (!managerList || managerList.length === 0) && (
                      <TableRow>
                        <Td colSpan={6}>
                          조회 결과가 없습니다.
                        </Td>
                      </TableRow>
                    )}
                    {business && managerList?.map(manager => (
                      <TableRow key={manager.id}>
                        <Td>
                          <Radio
                            disableRipple={true}
                            value={manager.id}
                            checked={formik.values.businessManagerId === manager.id}
                            onChange={() => {
                              formik.setFieldValue('businessManagerId', manager.id);
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
            )}
          </Box>
        </Box>
      }
      footer={
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          {!edit && id && (
            <Button
              shape="basic3"
              children="삭제"
              onClick={() => {
                props.onDelete(id);
              }}
              sx={{
                marginRight: '10px',
              }}
            />
          )}
          {!edit && id && (
            <Button
              children="수정"
              onClick={() => {
                formik.setFieldValue('edit', true);
              }}
              sx={{
                marginRight: '10px',
              }}
            />
          )}
          {edit && (
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}
              sx={{
                marginRight: '10px',
              }}
            >
              {id ? '변경' : '등록'}
            </Button>
          )}
          <Button shape="basic2" onClick={props.onClose}>
            {edit ? '취소' : '닫기'}
          </Button>
        </Box>
      }
    />
  );
}
