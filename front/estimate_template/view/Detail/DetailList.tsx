import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, {
  useContext,
} from 'react';
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
import { Table } from 'layouts/Table';
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
            <TableCell>
              <RequiredMark required={edit} text="세부 항목명" />
            </TableCell>
            <TableCell>
              <RequiredMark required={edit} text="단위" />
            </TableCell>
            <TableCell>
              <RequiredMark required={edit} text="단가" />
            </TableCell>
            <TableCell>비고</TableCell>
            {edit && (<TableCell>순서</TableCell>)}
            {edit && (<TableCell>삭제</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((detail,
                     i
          ) => {
            return (
              <TableRow key={detail.id || `added-${i}`}>
                <TableCell>
                  <TitleListField index={i} edit={edit} titleList={detail.titleList} />
                </TableCell>
                <TableCell>
                  {!edit && (<Typography>{detail.unit} </Typography>)}
                  {edit && (
                    <SelectField
                      required
                      labelProps={{
                        disableLabel: true,
                      }}
                      name={`detailList.${i}.unit`}
                      label="단위"
                      options={['단지', '동']}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    labelProps={{
                      disableLabel: true,
                    }}
                    type="number"
                    name={`detailList.${i}.unitPrice`}
                    label="단가"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    labelProps={{
                      disableLabel: true,
                    }}
                    name={`detailList.${i}.note`}
                    label="비고"
                  />
                </TableCell>
                {edit && (
                  <TableCell>
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
                  </TableCell>
                )}
                {edit && (
                  <TableCell>
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
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
        {edit && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
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
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}