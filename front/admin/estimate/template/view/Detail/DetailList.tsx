import {
  Box,
  MenuItem,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useContext } from 'react';
import TitleListField from 'admin/estimate/template/view/Detail/TitleListField';
import { FormikContext, } from 'formik';
import { EstimateTemplateDetailVO, } from 'admin/estimate/template/domain';
import {
  TestUnit,
  testUnitList,
  testUnitName
} from 'type/TestType';
import useDialog from 'components/Dialog';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import RequiredMark from 'components/RequiredMark';
import Button from 'layouts/Button';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import { initialEstimateTemplateDetailParameter } from 'admin/estimate/template/parameter';
import TextBox from 'layouts/Text';
import Toggle from 'layouts/Toggle';

export default function () {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const list = formik.values.detailList ?? [];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <Th sx={{ width: '330px' }}>
            <RequiredMark required={edit} text="세부 항목명" />
          </Th>
          <Th sx={{ width: '130px' }}>
            <RequiredMark required={edit} text="단위" />
          </Th>
          <Th sx={{ width: '230px' }}>
            <RequiredMark required={edit} text="단가" />
          </Th>
          <Th sx={{ width: '130px' }}>
            <RequiredMark text="금액" />
          </Th>
          <Th>비고</Th>
          {edit && (<Th sx={{ width: '70px' }}>순서</Th>)}
          {edit && (<Th sx={{ width: '48px' }}>삭제</Th>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((detail,
                   i
        ) => {
          return (
            <TableRow key={detail.id || `added-${i}`}>
              <Td>
                <TitleListField
                  index={i}
                  list={detail.titleList}
                />
              </Td>
              <Td>
                {!edit && (
                  <TextBox variant="body9">
                    {testUnitName(detail.unit)}
                  </TextBox>
                )}
                {edit && (
                  <Select
                    required
                    displayEmpty
                    variant="outlined"
                    renderValue={(value) => value ? testUnitName(value as TestUnit) : '선택'}
                    value={detail.unit ?? ''}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (detail.unit !== value) {
                        formik.setFieldValue(`detailList.${i}.unit`, value);
                      }
                    }}>
                    {testUnitList.map(item => (
                      <MenuItem key={item} value={item}>{testUnitName(item)}</MenuItem>
                    ))}
                  </Select>
                )}
              </Td>
              <Td>
                <Input
                  required
                  readOnly={!edit}
                  variant="outlined"
                  type="number"
                  value={detail.unitAmount ?? ''}
                  onChange={(e) => {
                    const value = +e.target.value ?? undefined;
                    if (detail.unitAmount !== value) {
                      formik.setFieldValue(`detailList.${i}.unitAmount`, value);
                    }
                  }}
                />
              </Td>
              <Td>
                {!edit && (
                  <TextBox variant="body9">{detail.inUse ? '사용' : '미사용'}</TextBox>
                )}
                {edit && (
                  <Toggle
                    checked={detail.inUse}
                    onText="사용"
                    offText="미사용"
                    onChange={() => {
                      formik.setFieldValue(`detailList.${i}.inUse`, !detail.inUse);
                    }}
                  />
                )}
              </Td>
              <Td>
                <Input
                  multiline
                  readOnly={!edit}
                  variant="outlined"
                  value={detail.note ?? ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (detail.note !== value) {
                      formik.setFieldValue(`detailList.${i}.note`, value);
                    }
                  }}
                />
              </Td>
              {edit && (
                <Td>
                  <Box sx={{
                    display:        'flex',
                    width:          '100%',
                    justifyContent: 'space-around',
                  }}>
                    <IconButton
                      tooltip="순서 올리기"
                      shape="square"
                      disabled={i === 0}
                      children={<FontAwesomeIcon icon="angle-up" />}
                      sx={{
                        marginRight: '10px',
                      }}
                      onClick={() => {
                        const prevList = list.filter((t,
                                                      k
                        ) => k !== i);
                        const detailList: EstimateTemplateDetailVO[] = [];
                        for (let k = 0; k < prevList.length; k++) {
                          if (detailList.length === i - 1) {
                            detailList.push(detail);
                          }
                          detailList.push(prevList[k]);
                        }
                        formik.setFieldValue('detailList', detailList);
                      }}
                    />
                    <IconButton
                      tooltip="순서 내리기"
                      shape="square"
                      disabled={i === list.length - 1}
                      children={<FontAwesomeIcon icon="angle-down" />}
                      onClick={() => {
                        const prevList = list.filter((t,
                                                      k
                        ) => k !== i);
                        const detailList: EstimateTemplateDetailVO[] = [];
                        for (let k = 0; k < prevList.length; k++) {
                          detailList.push(prevList[k]);
                          if (detailList.length === i + 1) {
                            detailList.push(detail);
                          }
                        }
                        formik.setFieldValue('detailList', detailList);
                      }}
                    />
                  </Box>
                </Td>
              )}
              {edit && (
                <Td>
                  <Button
                    shape="small"
                    disabled={list.length <= 1}
                    onClick={() => {
                      if (list.length === 1) {
                        error('최소 하나 이상의 세부 항목이 필요합니다.');
                        return;
                      }
                      formik.setFieldValue('detailList', list.filter((detail,
                                                                      k
                      ) => k !== i));
                    }}>
                    삭제
                  </Button>
                </Td>
              )}
            </TableRow>
          );
        })}
      </TableBody>
      {edit && (
        <TableFooter>
          <TableRow>
            <Td colSpan={5} />
            <Td colSpan={1}>
              <Box sx={{
                display:        'flex',
                flexWrap:       'nowrap',
                justifyContent: 'right',
              }}>
                <Button shape="small" onClick={() => {
                  formik.setFieldValue('detailList', [...list, initialEstimateTemplateDetailParameter]);
                }}>
                  추가
                </Button>
              </Box>
            </Td>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}