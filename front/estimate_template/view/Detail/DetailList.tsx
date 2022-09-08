import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useContext, } from 'react';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import TitleListField from 'estimate_template/view/Detail/TitleListField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  EstimateTemplateDetailVO,
  EstimateTemplateVO,
  initialEstimateTemplateDetailVO
} from 'estimate_template/domain';
import Tooltip from 'components/Tooltip';
import useDialog from 'components/Dialog';
import { FormikEditable } from 'type/Form';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import RequiredMark from 'components/RequiredMark';

export default function () {
  const { error } = useDialog();
  const formikContext: FormikContextType<FormikEditable<EstimateTemplateVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  const list = formikContext?.values.detailList ?? [];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>
              <RequiredMark required={edit} text="세부 항목명" />
            </Th>
            <Th>
              <RequiredMark required={edit} text="단위" />
            </Th>
            <Th>
              <RequiredMark required={edit} text="단가" />
            </Th>
            <Th>비고</Th>
            {edit && (<Th>순서</Th>)}
            {edit && (<Th>삭제</Th>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((detail,
                     i
          ) => {
            return (
              <TableRow key={detail.id || `added-${i}`}>
                <Td>
                  <TitleListField index={i} edit={edit} titleList={detail.titleList} />
                </Td>
                <Td>
                  {!edit && (<Typography>{detail.unit} </Typography>)}
                  {edit && (
                    <SelectField
                      required
                      disableLabel
                      name={`detailList.${i}.unit`}
                      label="단위"
                      options={['단지', '동']}
                    />
                  )}
                </Td>
                <Td>
                  <TextField
                    required
                    disableLabel
                    type="number"
                    name={`detailList.${i}.unitPrice`}
                    label="단가"
                  />
                </Td>
                <Td>
                  <TextField
                    disableLabel
                    name={`detailList.${i}.note`}
                    label="비고"
                  />
                </Td>
                {edit && (
                  <Td>
                    <Box sx={{
                      display:        'flex',
                      width:          '100%',
                      justifyContent: 'space-around',
                    }}>
                      <Tooltip title="순서 올리기">
                        <IconButton
                          disabled={i === 0}
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
                            formikContext!.setFieldValue('detailList', detailList);
                          }}>
                          <UpIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="순서 내리기">
                        <IconButton
                          disabled={i === list.length - 1}
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
                            formikContext!.setFieldValue('detailList', detailList);
                          }}>
                          <DownIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Td>
                )}
                {edit && (
                  <Td>
                    <Button
                      color="warning"
                      disabled={list.length <= 1}
                      onClick={() => {
                        if (list.length === 1) {
                          error('최소 하나 이상의 세부 항목이 필요합니다.');
                          return;
                        }
                        formikContext!.setFieldValue('detailList', list.filter((detail,
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
              <Td colSpan={6}>
                <Box sx={{
                  display:        'flex',
                  flexWrap:       'nowrap',
                  width:          '100%',
                  justifyContent: 'right',
                }}>
                  <Button onClick={() => {
                    formikContext!.setFieldValue('detailList', [...(list ?? []), initialEstimateTemplateDetailVO]);
                  }}>
                    추가
                  </Button>
                </Box>
              </Td>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}