import React, { useContext } from 'react';
import {
  Box,
  TableBody,
  TableRow,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Button from 'layouts/Button';
import Tooltip from 'components/Tooltip';
import useDialog from 'dialog/hook';
import { FormikContext } from 'formik';
import {
  ContractConditionVariableVO,
  ContractConditionVO,
} from 'admin/contract/condition/domain';
import AddRow from 'admin/contract/condition/view/AddRow';
import VariableList from 'admin/contract/condition/view/VariableList';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'layouts/Input';
import { initialContractConditionParameter } from 'admin/contract/condition/parameter';
import { ColorPalette } from 'assets/theme';

interface Props {
  variableList: ContractConditionVariableVO[] | undefined;
}

export default function Form({ variableList }: Props) {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const list = formik.values.contractConditionList;

  const onAddForm = () => {
    formik.setFieldValue(`contractConditionList`, [...list, initialContractConditionParameter]);
  };

  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'nowrap',
      width:          '100%',
      justifyContent: 'space-between',
    }}>
      <Box sx={{ width: '66%' }}>
        {Array.isArray(list) && list.map((condition,
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
                    ??????
                  </Th>
                  <Td colSpan={(!condition.descriptionList || condition.descriptionList.length === 0) ? 2 : 3}>
                    <Input
                      variant="outlined"
                      key={condition.title}
                      defaultValue={condition.title ?? ''}
                      onBlur={(e) => {
                        const value = e.target.value || undefined;
                        if (condition.title !== value) {
                          formik.setFieldValue(`contractConditionList.${i}.title`, value);
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
                          ??????
                        </Th>
                      )}
                      <Td>
                        <Input
                          variant="outlined"
                          key={description}
                          defaultValue={description ?? ''}
                          onBlur={(e) => {
                            const value = e.target.value as string;
                            if (description !== value) {
                              const result: string[] = [];
                              for (let k = 0; k < condition.descriptionList.length; k++) {
                                result.push(k === j ? value : condition.descriptionList[k]);
                              }
                              formik.setFieldValue(`contractConditionList.${i}.descriptionList`, result);
                            }
                          }}
                        />
                      </Td>
                      <Td sx={{ width: '100px' }}>
                        <Box sx={{
                          display:        'flex',
                          width:          '100%',
                          justifyContent: 'space-around',
                        }}>
                          <Tooltip title="?????? ?????????">
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
                                formik.setFieldValue(`contractConditionList.${i}.descriptionList`, result);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="?????? ?????????">
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
                                formik.setFieldValue(`contractConditionList.${i}.descriptionList`, result);
                              }}
                            />
                          </Tooltip>
                        </Box>
                      </Td>
                      <Td sx={{ width: '100px' }}>
                        <Button
                          shape="basic3"
                          disabled={condition.descriptionList.length <= 1}
                          onClick={() => {
                            if (condition.descriptionList.length === 1) {
                              error('?????? ?????? ????????? ?????? ????????? ???????????????.');
                              return;
                            }
                            formik.setFieldValue(`contractConditionList.${i}.descriptionList`, condition.descriptionList.filter((detail,
                                                                                                                                 k
                            ) => k !== j));
                          }}>
                          ??????
                        </Button>
                      </Td>
                    </TableRow>
                  )
                )}
                <AddRow index={i} />
              </TableBody>
            </Table>
            <Box sx={{
              display:        'flex',
              width:          '100%',
              justifyContent: 'center',
              alignItems:     'center',
              margin:         '15px 0'
            }}>
              <Tooltip title="?????? ?????????">
                <IconButton
                  shape="square"
                  disabled={i === 0}
                  children={<FontAwesomeIcon icon="angle-up" />}
                  onClick={() => {
                    const prevList = list.filter((t,
                                                  k
                    ) => k !== i);
                    const contractConditionList: ContractConditionVO[] = [];
                    for (let k = 0; k < prevList.length; k++) {
                      if (contractConditionList.length === i - 1) {
                        contractConditionList.push(condition);
                      }
                      contractConditionList.push(prevList[k]);
                    }
                    formik.setFieldValue('contractConditionList', contractConditionList);
                  }}
                  sx={{
                    margin: '0 5px'
                  }}
                />
              </Tooltip>
              <Tooltip title="?????? ?????????">
                <IconButton
                  shape="square"
                  disabled={i === list.length - 1}
                  children={<FontAwesomeIcon icon="angle-down" />}
                  onClick={() => {
                    const prevList = list.filter((t,
                                                  k
                    ) => k !== i);
                    const contractConditionList: ContractConditionVO[] = [];
                    for (let k = 0; k < prevList.length; k++) {
                      contractConditionList.push(prevList[k]);
                      if (contractConditionList.length === i + 1) {
                        contractConditionList.push(condition);
                      }
                    }
                    formik.setFieldValue('contractConditionList', contractConditionList);
                  }}
                  sx={{
                    margin: '0 5px'
                  }}
                />
              </Tooltip>
              <Button
                shape="basic3"
                disabled={list.length <= 1}
                onClick={() => {
                  if (list.length === 1) {
                    error('?????? ?????? ????????? ?????? ????????? ???????????????.');
                    return;
                  }
                  formik.setFieldValue('contractConditionList', list.filter((detail,
                                                                             k
                  ) => k !== i));
                }}
                sx={{
                  margin: '0 5px'
                }}>
                ??????
              </Button>
            </Box>
          </Box>
        ))}
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'flex-end',
        }}>
          <Button
            onClick={onAddForm}
            sx={{
              marginRight: '10px',
            }}>
            ????????????
          </Button>
        </Box>
      </Box>
      <VariableList variableList={variableList} />
    </Box>
  );
};
