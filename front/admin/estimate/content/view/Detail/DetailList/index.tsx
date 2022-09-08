import React, { useContext } from 'react';
import useDialog from 'components/Dialog';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import { EstimateContentVO } from 'admin/estimate/content/domain';
import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import TextField from 'components/TextField';
import Tooltip from 'components/Tooltip';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import RequiredMark from 'components/RequiredMark';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

export interface DetailListProps {
  detailListFooter: React.ReactNode;
}

export default function (props: DetailListProps) {
  const { error } = useDialog();
  const formikContext: FormikContextType<FormikEditable<EstimateContentVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  const list = formikContext?.values.detailList ?? [];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th>No.</Th>
            <Th>
              <RequiredMark required={edit} text="문구" />
            </Th>
            {edit && <Th>순서</Th>}
            {edit && <Th>삭제</Th>}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((detail,
                     i
          ) => {
            return (
              <TableRow key={i}>
                <Td>
                  {i + 1}
                </Td>
                <Td>
                  {!edit && detail}
                  {edit && (
                    <TextField
                      required
                      disableLabel
                      type=" text"
                      name={`detailList.${i}`}
                      label="문구"
                    />
                  )}
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
                          children={<UpIcon />}
                          onClick={() => {
                            const prevList = list.filter((t,
                                                          k
                            ) => k !== i);
                            const detailList: string[] = [];
                            for (let k = 0; k < prevList.length; k++) {
                              if (detailList.length === i - 1) {
                                detailList.push(detail);
                              }
                              detailList.push(prevList[k]);
                            }
                            formikContext!.setFieldValue('detailList', detailList);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="순서 내리기">
                        <IconButton
                          disabled={i === list.length - 1}
                          children={<DownIcon />}
                          onClick={() => {
                            const prevList = list.filter((t,
                                                          k
                            ) => k !== i);
                            const detailList: string[] = [];
                            for (let k = 0; k < prevList.length; k++) {
                              detailList.push(prevList[k]);
                              if (detailList.length === i + 1) {
                                detailList.push(detail);
                              }
                            }
                            formikContext!.setFieldValue('detailList', detailList);
                          }}
                        />
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
        {edit && props.detailListFooter}
      </Table>
    </TableContainer>
  );
};
