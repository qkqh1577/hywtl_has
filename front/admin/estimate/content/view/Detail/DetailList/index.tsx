import React, {
  useContext,
  useRef
} from 'react';
import useDialog from 'dialog/hook';
import { FormikContext, } from 'formik';
import {
  Box,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import RequiredMark from 'layouts/RequiredMark';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Input from 'layouts/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'layouts/Button';
import IconButton from 'layouts/IconButton';

export default function () {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const list = formik.values.detailList ?? [];
  const newInputRef = useRef<HTMLInputElement>(null);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th sx={{ width: '52px' }}>No.</Th>
            <Th>
              <RequiredMark required={edit} text="문구" />
            </Th>
            {edit && (<Th sx={{ width: '70px' }}>순서</Th>)}
            {edit && (<Th sx={{ width: '48px' }}>삭제</Th>)}
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
                  <Input
                    variant="outlined"
                    readOnly={!edit}
                    key={detail}
                    defaultValue={detail ?? ''}
                    onBlur={(e) => {
                      if (!edit) {
                        return;
                      }
                      const value: string | undefined = e.target.value || undefined;
                      if (detail !== value) {
                        const result: string[] = [];
                        for (let j = 0; j < list.length; j++) {
                          result.push(j === i ? value : list[j]);
                        }
                        formik.setFieldValue(`detailList`, result);
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
                          const detailList: string[] = [];
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
                          const detailList: string[] = [];
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
              <Td>신규</Td>
              <Td>
                <Input
                  variant="outlined"
                  inputRef={newInputRef}
                />
              </Td>
              <Td colSpan={2}>
                <Box sx={{
                  display:        'flex',
                  flexWrap:       'nowrap',
                  justifyContent: 'right',
                }}>
                  <Button shape="small" onClick={() => {
                    const value = newInputRef.current?.value;
                    if (!value) {
                      error('문구를 입력해 주시기 바랍니다.');
                      return;
                    }
                    formik.setFieldValue('detailList', [...list, value]);
                    newInputRef.current!.value = '';
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
};
