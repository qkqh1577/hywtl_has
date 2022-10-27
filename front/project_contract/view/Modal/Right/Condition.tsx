import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import {
  Box,
  TableBody,
  TableRow
} from '@mui/material';
import Button from 'layouts/Button';
import TextBox from 'layouts/Text';
import { ColorPalette } from 'assets/theme';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Input from 'layouts/Input';
import Tooltip from 'components/Tooltip';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddRow from './ConditionAddRow';
import { ContractConditionVO } from 'admin/contract/condition/domain';
import useDialog from 'dialog/hook';

export default function () {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const conditionList = formik.values.conditionList ?? [];
  const { error } = useDialog();

  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
      padding:      '10px',
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   '10px',
      }}>
        <Box sx={{ width: 'calc(100% - 90px)', paddingLeft: '90px', textAlign: 'center' }}>
          <TextBox variant="heading3">용역 계약 조건</TextBox>
        </Box>
        {edit && (
          <Box sx={{ width: '80px' }}>
            <Button shape="small" onClick={() => {
              formik.setFieldValue('conditionList', [...conditionList, {
                descriptionList: []
              }]);
            }}>
              조건 추가
            </Button>
          </Box>
        )}
      </Box>
      {conditionList.map((condition,
                          i
      ) => (
        <Box key={i}
          sx={{
            display:      'flex',
            flexWrap:     'wrap',
            width:        '100%',
            padding:      '10px',
            border:       `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius: '5px',
            marginBottom: '15px',
          }}>
          <Table
            disableSticky
            variant="left"
            sx={{
              width: '100%'
            }}>
            <TableBody>
              <TableRow>
                <Th sx={{ width: '140px' }}>
                  제목
                </Th>
                <Td colSpan={!edit ? 1 : (!condition.descriptionList || condition.descriptionList.length === 0) ? 2 : 3}>
                  <Input
                    variant="outlined"
                    readOnly={!edit}
                    key={condition.title}
                    defaultValue={condition.title ?? ''}
                    onBlur={(e) => {
                      if (!edit) {
                        return;
                      }
                      const value = e.target.value || undefined;
                      if (condition.title !== value) {
                        formik.setFieldValue(`conditionList.${i}.title`, value);
                      }
                    }}
                  />
                </Td>
              </TableRow>
              {condition.descriptionList.map((description,
                                              j
                ) => (
                  <TableRow key={j}>
                    {j === 0 && (
                      <Th rowSpan={condition.descriptionList.length + 1}>
                        내용
                      </Th>
                    )}
                    <Td>
                      <Input
                        variant="outlined"
                        key={description}
                        defaultValue={description ?? ''}
                        readOnly={!edit}
                        onBlur={(e) => {
                          if (!edit) {
                            return;
                          }
                          const value = e.target.value as string;
                          if (description !== value) {
                            const result: string[] = [];
                            for (let k = 0; k < condition.descriptionList.length; k++) {
                              result.push(k === j ? value : condition.descriptionList[k]);
                            }
                            formik.setFieldValue(`conditionList.${i}.descriptionList`, result);
                          }
                        }}
                      />
                    </Td>
                    {edit && (
                      <Td sx={{ width: '90px' }}>
                        <Box sx={{
                          display:        'flex',
                          width:          '100%',
                          justifyContent: 'space-around',
                        }}>
                          <Tooltip title="순서 올리기">
                            <IconButton
                              shape="square"
                              disabled={j === 0}
                              children={<FontAwesomeIcon icon="angle-up" />}
                              onClick={() => {
                                const prevList = condition.descriptionList.filter((t,
                                                                                   k
                                ) => k !== j);
                                const result: string[] = [];
                                for (let k = 0; k < prevList.length; k++) {
                                  if (result.length === j - 1) {
                                    result.push(description);
                                  }
                                  result.push(prevList[k]);
                                }
                                console.log({ prevList, result });
                                formik.setFieldValue(`conditionList.${i}.descriptionList`, result);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="순서 내리기">
                            <IconButton
                              shape="square"
                              disabled={j === condition.descriptionList.length - 1}
                              children={<FontAwesomeIcon icon="angle-down" />}
                              onClick={() => {
                                const prevList = condition.descriptionList.filter((t,
                                                                                   k
                                ) => k !== j);
                                const result: string[] = [];
                                for (let k = 0; k < prevList.length; k++) {
                                  result.push(prevList[k]);
                                  if (result.length === j + 1) {
                                    result.push(description);
                                  }
                                }
                                formik.setFieldValue(`conditionList.${i}.descriptionList`, result);
                              }}
                            />
                          </Tooltip>
                        </Box>
                      </Td>
                    )}
                    {edit && (
                      <Td sx={{ width: '90px' }}>
                        <Button
                          shape="basic3"
                          disabled={condition.descriptionList.length <= 1}
                          onClick={() => {
                            if (condition.descriptionList.length === 1) {
                              error('최소 하나 이상의 세부 항목이 필요합니다.');
                              return;
                            }
                            formik.setFieldValue(`conditionList.${i}.descriptionList`, condition.descriptionList.filter((detail,
                                                                                                                         k
                            ) => k !== j));
                          }}>
                          삭제
                        </Button>
                      </Td>
                    )}
                  </TableRow>
                )
              )}
              {edit && (<AddRow index={i} />)}
            </TableBody>
          </Table>
          {edit && (

            <Box sx={{
              display:        'flex',
              width:          '100%',
              justifyContent: 'center',
              alignItems:     'center',
              margin:         '15px 0'
            }}>
              <Tooltip title="순서 올리기">
                <IconButton
                  shape="square"
                  disabled={i === 0}
                  children={<FontAwesomeIcon icon="angle-up" />}
                  onClick={() => {
                    const prevList = conditionList.filter((t,
                                                           k
                    ) => k !== i);
                    const result: ContractConditionVO[] = [];
                    for (let k = 0; k < prevList.length; k++) {
                      if (result.length === i - 1) {
                        result.push(condition);
                      }
                      result.push(prevList[k]);
                    }
                    formik.setFieldValue('conditionList', result);
                  }}
                  sx={{
                    margin: '0 5px'
                  }}
                />
              </Tooltip>
              <Tooltip title="순서 내리기">
                <IconButton
                  shape="square"
                  disabled={i === conditionList.length - 1}
                  children={<FontAwesomeIcon icon="angle-down" />}
                  onClick={() => {
                    const prevList = conditionList.filter((t,
                                                           k
                    ) => k !== i);
                    const result: ContractConditionVO[] = [];
                    for (let k = 0; k < prevList.length; k++) {
                      result.push(prevList[k]);
                      if (result.length === i + 1) {
                        result.push(condition);
                      }
                    }
                    formik.setFieldValue('conditionList', result);
                  }}
                  sx={{
                    margin: '0 5px'
                  }}
                />
              </Tooltip>
              <Button
                shape="basic3"
                disabled={conditionList.length <= 1}
                onClick={() => {
                  if (conditionList.length === 1) {
                    error('최소 하나 이상의 세부 항목이 필요합니다.');
                    return;
                  }
                  formik.setFieldValue('conditionList', conditionList.filter((detail,
                                                                              k
                  ) => k !== i));
                }}
                sx={{
                  margin: '0 5px'
                }}>
                삭제
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}