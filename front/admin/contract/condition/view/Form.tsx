import React, { useContext } from 'react';
import {
  Box,
  Grid,
  TableBody,
  TableContainer,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextField from 'components/TextField';
import Button from 'layouts/Button';
import Tooltip from 'components/Tooltip';
import useDialog from 'components/Dialog';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  ContractConditionListVO,
  ContractConditionVO,
  initialContractConditionVO
} from 'admin/contract/condition/domain';
import AddRow from 'admin/contract/condition/view/addRow';
import VariableList, { VariableListProps } from 'admin/contract/condition/view/VariableList';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props
  extends VariableListProps {

}

export default function Form({ variableList }: Props) {
  const { error } = useDialog();
  const formikContext: FormikContextType<ContractConditionListVO> = useContext(FormikContext);
  const list = formikContext?.values.contractConditionList;

  const onAddForm = () => {
    formikContext.setFieldValue(`contractConditionList`, [...(list ?? []), initialContractConditionVO]);
  };

  return (
    <Box sx={{
      display:       'flex',
      flexWrap:      'wrap',
      width:         '100%',
      flexDirection: 'row'

    }}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          sm={8}
        >
          {Array.isArray(list) &&
          list.map(
            (condition,
             j
            ) => {
              return (
                <Box key={j}>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <Th>
                            제목
                          </Th>
                          <Td colSpan={3}>
                            <TextField
                              label="제목"
                              name={`contractConditionList.${j}.title`}
                              disableLabel
                              variant="outlined"
                            />
                          </Td>
                        </TableRow>
                        {condition.descriptionList.map((item,
                                                        i
                          ) => {
                            return (
                              <TableRow key={i}>
                                {i == 0 && <Th rowSpan={condition.descriptionList.length + 1}>내용</Th>}
                                <Td>
                                  <TextField
                                    disableLabel
                                    name={`contractConditionList.${j}.descriptionList.${i}`}
                                    label="설명"
                                    variant="outlined"
                                  />
                                </Td>
                                <Td>
                                  <Box sx={{
                                    display:        'flex',
                                    width:          '100%',
                                    justifyContent: 'space-around',
                                  }}>
                                    <Tooltip title="순서 올리기">
                                      <IconButton
                                        shape="square"
                                        disabled={i === 0}
                                        children={<FontAwesomeIcon icon="angle-up" />}
                                        onClick={() => {
                                          const prevList = condition.descriptionList.filter((t,
                                                                                             k
                                          ) => k !== i);
                                          const descriptionList: string[] = [];
                                          for (let k = 0; k < prevList.length; k++) {
                                            if (descriptionList.length === i - 1) {
                                              descriptionList.push(item);
                                            }
                                            descriptionList.push(prevList[k]);
                                          }
                                          formikContext!.setFieldValue(`contractConditionList.${j}.descriptionList`, descriptionList);
                                        }}
                                      />
                                    </Tooltip>
                                    <Tooltip title="순서 내리기">
                                      <IconButton
                                        shape="square"
                                        disabled={i === condition.descriptionList.length - 1}
                                        children={<FontAwesomeIcon icon="angle-down" />}
                                        onClick={() => {
                                          const prevList = condition.descriptionList.filter((t,
                                                                                             k
                                          ) => k !== i);
                                          const descriptionList: string[] = [];
                                          for (let k = 0; k < prevList.length; k++) {
                                            descriptionList.push(prevList[k]);
                                            if (descriptionList.length === i + 1) {
                                              descriptionList.push(item);
                                            }
                                          }
                                          formikContext!.setFieldValue(`contractConditionList.${j}.descriptionList`, descriptionList);
                                        }}
                                      />
                                    </Tooltip>
                                  </Box>
                                </Td>
                                <Td>
                                  <Button
                                    shape="basic2"
                                    color="warning"
                                    disabled={condition.descriptionList.length <= 1}
                                    onClick={() => {
                                      if (condition.descriptionList.length === 1) {
                                        error('최소 하나 이상의 세부 항목이 필요합니다.');
                                        return;
                                      }
                                      formikContext!.setFieldValue(`contractConditionList.${j}.descriptionList`, condition.descriptionList.filter((detail,
                                                                                                                                                   k
                                      ) => k !== i));
                                    }}>
                                    삭제
                                  </Button>
                                </Td>
                              </TableRow>
                            );
                          }
                        )}
                        <AddRow index={j} descriptionCount={condition.descriptionList.length} />
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box key={j} sx={{
                    display:        'flex',
                    width:          '100%',
                    justifyContent: 'center',
                    alignItems:     'center',
                    margin:         '10px 0'
                  }}>
                    <Tooltip title="순서 올리기">
                      <IconButton
                        shape="square"
                        disabled={j === 0}
                        children={<FontAwesomeIcon icon="angle-up" />}
                        onClick={() => {
                          const prevList = list.filter((t,
                                                        k
                          ) => k !== j);
                          const contractConditionList: ContractConditionVO[] = [];
                          for (let k = 0; k < prevList.length; k++) {
                            if (contractConditionList.length === j - 1) {
                              contractConditionList.push(condition);
                            }
                            contractConditionList.push(prevList[k]);
                          }
                          formikContext!.setFieldValue('contractConditionList', contractConditionList);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="순서 내리기">
                      <IconButton
                        shape="square"
                        disabled={j === list.length - 1}
                        children={<FontAwesomeIcon icon="angle-down" />}
                        onClick={() => {
                          const prevList = list.filter((t,
                                                        k
                          ) => k !== j);
                          const contractConditionList: ContractConditionVO[] = [];
                          for (let k = 0; k < prevList.length; k++) {
                            contractConditionList.push(prevList[k]);
                            if (contractConditionList.length === j + 1) {
                              contractConditionList.push(condition);
                            }
                          }
                          formikContext!.setFieldValue('contractConditionList', contractConditionList);
                        }}
                      />
                    </Tooltip>
                    <Button
                      shape="basic2"
                      color="warning"
                      disabled={list.length <= 1}
                      onClick={() => {
                        if (list.length === 1) {
                          error('최소 하나 이상의 세부 항목이 필요합니다.');
                          return;
                        }
                        formikContext!.setFieldValue('contractConditionList', list.filter((detail,
                                                                                           k
                        ) => k !== j));
                      }}>
                      삭제
                    </Button>
                  </Box>
                </Box>
              );
            })}
          <Box sx={{
            display:        'flex',
            width:          '100%',
            justifyContent: 'flex-end',
          }}>
            <Button
              shape="basic1"
              onClick={onAddForm}
              sx={{
                marginRight: '10px',
              }}>
              조건추가
            </Button>
          </Box>
        </Grid>
        <VariableList variableList={variableList} />
      </Grid>
    </Box>
  );
};
