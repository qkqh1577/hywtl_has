import React, { useContext } from 'react';
import {
  Box,
  IconButton,
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
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import useDialog from 'components/Dialog';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { ContractConditionVO } from 'admin/contract/condition/domain';

export default function Form() {
  const { error } = useDialog();
  const formikContext: FormikContextType<ContractConditionVO> = useContext(FormikContext);
  const contractConditionList = formikContext?.values ?? [];
  return (
    <>
      {Array.isArray(contractConditionList) && contractConditionList.map((condition,
                                                                          j
      ) => {
        return (
          <TableContainer key={j}>
            <Table>
              <TableBody>
                <TableRow>
                  <Th>
                    제목
                  </Th>
                  <Td colSpan={3}>
                    <TextField
                      label="제목"
                      name={`${j}.title`}
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
                            name={`${j}.descriptionList.${i}`}
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
                                disabled={i === 0}
                                children={<UpIcon />}
                                onClick={() => {
                                  const prevList = item.filter((t,
                                                                k
                                  ) => k !== i);
                                  const descriptionList: string[] = [];
                                  for (let k = 0; k < prevList.length; k++) {
                                    if (descriptionList.length === i - 1) {
                                      descriptionList.push(item);
                                    }
                                    descriptionList.push(prevList[k]);
                                  }
                                  formikContext!.setFieldValue('descriptionList', descriptionList);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="순서 내리기">
                              <IconButton
                                disabled={i === condition.descriptionList.length - 1}
                                children={<DownIcon />}
                                onClick={() => {
                                  const prevList = item.filter((t,
                                                                k
                                  ) => k !== i);
                                  const descriptionList: string[] = [];
                                  for (let k = 0; k < prevList.length; k++) {
                                    descriptionList.push(prevList[k]);
                                    if (descriptionList.length === i + 1) {
                                      descriptionList.push(item);
                                    }
                                  }
                                  formikContext!.setFieldValue('descriptionList', descriptionList);
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
                              formikContext!.setFieldValue('descriptionList', condition.descriptionList.filter((detail,
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
                <TableRow>
                  <Td>
                    <TextField
                      disableLabel
                      name="newDescription"
                      label="설명"
                      variant="outlined"
                    />
                  </Td>
                  <Td colSpan={2}>
                    <Button>
                      내용 추가
                    </Button>
                  </Td>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
      <Box>

      </Box>
    </>
  );
};
