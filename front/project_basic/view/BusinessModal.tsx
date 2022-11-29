import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import { DefaultFunction } from 'type/Function';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  MenuItem,
  Radio,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import { FormikContext } from 'formik';
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
  Td,
  Th
} from 'layouts/Table';
import Button from 'layouts/Button';
import {
  keywordTypeList,
  managerKeywordTypeList
} from 'business/query';
import Input from 'layouts/Input';
import { ProjectBasicBusinessId } from 'project_basic/domain';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onDelete: DefaultFunction<ProjectBasicBusinessId>;
  onSearch: DefaultFunction;
  businessList: BusinessShortVO[] | undefined;
  managerList: BusinessManagerVO[] | undefined;
  onManagerSearch: DefaultFunction;
}

export default function ProjectBasicBusinessModal(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const id = formik.values.id;
  const [business, setBusiness] = useState<BusinessShortVO>();
  const selectedBusinessId = formik.values.businessId;
  const [manager, setManager] = useState<BusinessManagerVO>();
  const selectedManagerId = formik.values.managerId;

  useEffect(() => {
    if (selectedBusinessId && props.businessList) {
      setBusiness(props.businessList.find(b => b.id === selectedBusinessId));
    }
    else {
      setBusiness(undefined);
    }
  }, [selectedBusinessId, props.businessList]);

  useEffect(() => {
    if (selectedManagerId && props.managerList) {
      setManager(props.managerList.find(m => m.id === selectedManagerId));
    }
    else {
      setManager(undefined);
    }
  }, [selectedManagerId, props.managerList]);

  return (
    <ModalLayout
      width="80vw"
      open={props.open}
      title={!edit ? '관계사 상세' : (id ? '관계사 수정' : '관계사 등록')}
      onClose={props.onClose}
      children={
        <Box sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'wrap',
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            width:        '49%',
            display:      'flex',
            flexWrap:     'wrap',
            alignContent: 'flex-start',
          }}>
            <Box sx={{
              width:        '50%',
              display:      'flex',
              flexWrap:     'nowrap',
              marginBottom: '10px',
            }}>
              <DataFieldWithLabel required={edit} label="관계사 구분">
                <Select
                  readOnly={!edit}
                  value={formik.values.involvedType ?? ''}
                  onChange={(e) => {
                    if (!edit) {
                      return;
                    }
                    const value = e.target.value || undefined;
                    if (formik.values.involvedType !== value) {
                      formik.setFieldValue('involvedType', value);
                    }
                  }}>
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
                width:        '100%',
                display:      'flex',
                flexWrap:     'nowrap',
                marginBottom: '15px',
              }}>
                <DataFieldWithLabel label="업체" labelPosition="top">
                  <Box sx={{
                    width:          '100%',
                    display:        'flex',
                    flexWrap:       'nowrap',
                    alignItems:     'center',
                    justifyContent: 'space-between',
                  }}>
                    <Box sx={{
                      width:      'calc(100% - 75px)',
                      display:    'flex',
                      flexWrap:   'nowrap',
                      alignItems: 'center',
                    }}>
                      <Box sx={{
                        width:    '20%',
                        display:  'flex',
                        flexWrap: 'nowrap',
                      }}>
                        <Select
                          variant="outlined"
                          value={formik.values.keywordType ?? ''}
                          onChange={(e) => {
                            const value = e.target.value || undefined;
                            if (formik.values.keywordType !== value) {
                              formik.setFieldValue('keywordType', value);
                            }
                          }}>
                          {keywordTypeList.map(item => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.text}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box sx={{
                        width:    '80%',
                        display:  'flex',
                        flexWrap: 'nowrap',
                      }}>
                        <Input
                          key={formik.values.keyword}
                          variant="outlined"
                          defaultValue={formik.values.keyword ?? ''}
                          onBlur={(e) => {
                            const value = e.target.value || undefined;
                            if (formik.values.keyword !== value) {
                              formik.setFieldValue('keyword', value);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    <Button onClick={() => {
                      props.onSearch();
                    }}>
                      검색
                    </Button>
                  </Box>
                </DataFieldWithLabel>
              </Box>
            )}
            {!edit && (
              <Box sx={{
                width:          '100%',
                display:        'flex',
                flexWrap:       'nowrap',
                marginBottom:   '15px',
                alignItems:     'center',
                justifyContent: 'space-between',
              }}>
                <Box sx={{ width: '45%' }}>
                  <DataFieldWithLabel label="업체">
                    {formik.values.business?.name}
                  </DataFieldWithLabel>
                </Box>
                <Box sx={{ width: '45%' }}>
                  <DataFieldWithLabel label="업체 주소">
                    {formik.values.business?.address}
                  </DataFieldWithLabel>
                </Box>
              </Box>
            )}
            {edit && (
              <Box sx={{ width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <Th>선택</Th>
                      <Th>업체명</Th>
                      <Th>대표명</Th>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(!props.businessList || props.businessList.length === 0) && (
                      <TableRow>
                        <Td colSpan={3}>
                          조회 결과가 없습니다.
                        </Td>
                      </TableRow>
                    )}
                    {props.businessList && props.businessList.map(item => (
                      <TableRow key={item.id}>
                        <Td>
                          <Radio
                            value={item.id}
                            checked={formik.values.businessId === item.id}
                            onChange={() => {
                              formik.setFieldValue('businessId', item.id);
                            }}
                          />
                        </Td>
                        <Td>
                          {item.name}
                        </Td>
                        <Td>
                          {item.ceoName}
                        </Td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
          <Box sx={{
            width:        '49%',
            display:      'flex',
            flexWrap:     'wrap',
            alignContent: 'flex-start'
          }}>
            {!edit && (
              <DataFieldWithLabel label="담당자" labelPosition="top">
                <Box sx={{
                  width:    '100%',
                  display:  'flex',
                  flexWrap: 'wrap',
                }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <Td>소속</Td>
                        <Td>이름</Td>
                        <Td>직위</Td>
                        <Td>핸드폰 번호</Td>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <Td>{formik.values.businessManager?.department}</Td>
                        <Td>{formik.values.businessManager?.name}</Td>
                        <Td>{formik.values.businessManager?.jobTitle}</Td>
                        <Td>{formik.values.businessManager?.mobilePhone}</Td>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <Td>이메일 주소</Td>
                        <Td>회사 번호</Td>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <Td>{formik.values.businessManager?.email}</Td>
                        <Td>{formik.values.businessManager?.officePhone}</Td>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </DataFieldWithLabel>
            )}
            {edit && (
              <Box sx={{
                width:        '100%',
                display:      'flex',
                flexWrap:     'nowrap',
                marginBottom: '15px',
              }}>
                <DataFieldWithLabel label="담당자" labelPosition="top">
                  <Box sx={{
                    width:          '100%',
                    display:        'flex',
                    flexWrap:       'nowrap',
                    alignItems:     'center',
                    justifyContent: 'space-between',
                  }}>
                    <Box sx={{
                      width:      'calc(100% - 75px)',
                      display:    'flex',
                      flexWrap:   'nowrap',
                      alignItems: 'center',
                    }}>
                      <Box sx={{
                        width:    '20%',
                        display:  'flex',
                        flexWrap: 'nowrap',
                      }}>
                        <Select
                          variant="outlined"
                          value={formik.values.keywordTypeOfManager ?? ''}
                          onChange={(e) => {
                            const value = e.target.value || undefined;
                            if (formik.values.keywordTypeOfManager !== value) {
                              formik.setFieldValue('keywordTypeOfManager', value);
                            }
                          }}>
                          {managerKeywordTypeList.map(item => (
                            <MenuItem key={item.key} value={item.key}>
                              {item.text}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box sx={{
                        width:    '80%',
                        display:  'flex',
                        flexWrap: 'nowrap',
                      }}>
                        <Input
                          key={formik.values.keywordOfManager}
                          variant="outlined"
                          defaultValue={formik.values.keywordOfManager ?? ''}
                          onBlur={(e) => {
                            const value = e.target.value || undefined;
                            if (formik.values.keywordOfManager !== value) {
                              console.log('keywordOfManager', value);
                              formik.setFieldValue('keywordOfManager', value);
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    <Button onClick={() => {
                      props.onManagerSearch();
                    }}>
                      검색
                    </Button>
                  </Box>
                </DataFieldWithLabel>
              </Box>
            )}
            {edit && (
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
                  {!business && (
                    <TableRow>
                      <Td colSpan={6}>
                        업체가 선택되지 않았습니다.
                      </Td>
                    </TableRow>
                  )}
                  {business && business.managerList.length === 0 && (
                    <TableRow>
                      <Td colSpan={6}>
                        조회 결과가 없습니다.
                      </Td>
                    </TableRow>
                  )}
                  {props.managerList && props.managerList.map(manager => (
                    <TableRow key={manager.id}>
                      <Td>
                        <Radio
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
            )}
          </Box>
        </Box>
      }
      footer={
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
