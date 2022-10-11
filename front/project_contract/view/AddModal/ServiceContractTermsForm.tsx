import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  Box,
  Grid,
  TableBody,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextField from 'components/TextField';
import Tooltip from 'components/Tooltip';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'layouts/Button';
import AddRow from 'admin/contract/condition/view/AddRow';
import {
  ContractConditionVariableVO,
  ContractConditionVO,
} from 'admin/contract/condition/domain';
import Text from 'layouts/Text';
import VariableList from 'admin/contract/condition/view/VariableList';
import useDialog from 'components/Dialog';
import { initialContractCollectionParameter } from 'admin/contract/collection/parameter';

interface Props
  extends FormikLayoutProps<any> {
  variableList: ContractConditionVariableVO[] | undefined;
}

export default function (props: Props) {
  const {
          formik,
          variableList
        } = props;
  const { error } = useDialog();
  const list = formik.values.conditionList;
  const onAddForm = () => {
    formik.setFieldValue(`contractConditionList`, [...(list ?? []), initialContractCollectionParameter]);
  };

  return (
    <>
      <Box sx={{
        display:        'flex',
        width:          '100%',
        justifyContent: 'center',
        mt:             1
      }}>
        <Text variant="heading1">
          용역계약조건
        </Text>
      </Box>
      <Box sx={{
        display:        'flex',
        width:          '100%',
        justifyContent: 'flex-end',
        mb:             1
      }}>
        <Button
          onClick={onAddForm}
          sx={{
            marginRight: '10px',
          }}>
          조건추가
        </Button>
      </Box>
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
                                name={`conditionList.${j}.title`}
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
                                      name={`conditionList.${j}.descriptionList.${i}`}
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
                                            formik!.setFieldValue(`conditionList.${j}.descriptionList`, descriptionList);
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
                                            formik!.setFieldValue(`conditionList.${j}.descriptionList`, descriptionList);
                                          }}
                                        />
                                      </Tooltip>
                                    </Box>
                                  </Td>
                                  <Td>
                                    <Button
                                      shape="basic3"
                                      disabled={condition.descriptionList.length <= 1}
                                      onClick={() => {
                                        if (condition.descriptionList.length === 1) {
                                          error('최소 하나 이상의 세부 항목이 필요합니다.');
                                          return;
                                        }
                                        formik!.setFieldValue(`conditionList.${j}.descriptionList`, condition.descriptionList.filter((detail,
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
                          <AddRow index={j} />
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
                            formik!.setFieldValue('conditionList', contractConditionList);
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
                            formik!.setFieldValue('conditionList', contractConditionList);
                          }}
                        />
                      </Tooltip>
                      <Button
                        shape="basic3"
                        disabled={list.length <= 1}
                        onClick={() => {
                          if (list.length === 1) {
                            error('최소 하나 이상의 세부 항목이 필요합니다.');
                            return;
                          }
                          formik!.setFieldValue('conditionList', list.filter((detail,
                                                                              k
                          ) => k !== j));
                        }}
                        sx={{
                          marginLeft: '10px'
                        }}
                      >
                        삭제
                      </Button>
                    </Box>
                  </Box>
                );
              })}
          </Grid>
          <VariableList variableList={variableList ? variableList : []} />
        </Grid>
      </Box>
    </>
  );
};
