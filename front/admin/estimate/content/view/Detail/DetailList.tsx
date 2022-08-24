import React, { useContext } from 'react';
import useDialog from 'components/Dialog';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import { EstimateContentVO } from 'admin/estimate/content/domain';
import TableCell, { TableCellProps } from 'components/TableCell';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import TextField from 'components/TextField';
import Tooltip from 'components/Tooltip';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import {
  EstimateContentDetailId,
  EstimateContentDetailVO,
} from 'admin/estimate/content/domain/estimateContentDetail';

export default function () {
  const { error } = useDialog();
  const formikContext: FormikContextType<FormikEditable<EstimateContentVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  const list = formikContext?.values.detailList ?? [];
  const columnProps: TableCellProps[] = [
    {
      key:      'no',
      children: 'No',
    },
    {
      key:      'description',
      children: '문구',
      required: edit,
    },
    {
      key:      'seq',
      children: '순서',
      hidden:   !edit,
    },
    {
      key:      'remove',
      children: '삭제',
      hidden:   !edit,
    }
  ];
  const addDescription = () => {
    // 새로운 문구 등록
    formikContext!.setFieldValue(
      'detailList',
      [...list, { description: formikContext?.values.newDescription }]
    );

    // 초기화
    formikContext!.setFieldValue(
      'newDescription',
      ''
    )
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columnProps.map((props) => (
              <TableCell {...props} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((detail,
                     i
          ) => {
            return (
              <TableRow key={detail.id || `added-${i}`}>
                <TableCell>
                  {i + 1}
                </TableCell>
                <TableCell>
                  {!edit ? list[i].description : (<TextField
                    required
                    disableLabel
                    type=" text"
                    name={`detailList.${i}.description`}
                    label="문구"
                  />)}
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
                          children={<UpIcon />}
                          onClick={() => {
                            const prevList = list.filter((t,
                                                          k
                            ) => k !== i);
                            const detailList: EstimateContentDetailVO[] = [];
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
                            const detailList: EstimateContentDetailVO[] = [];
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
              <TableCell colSpan={1}>
                신규
              </TableCell>
              <TableCell colSpan={2}>
                <TextField
                  disableLabel
                  type="text"
                  name="newDescription"
                  label="문구"
                />
              </TableCell>
              <TableCell colSpan={1}>
                <Box sx={{
                  display:        'flex',
                  flexWrap:       'nowrap',
                  width:          '100%',
                  justifyContent: 'right',
                }}>
                  <Button onClick={addDescription}>
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
};
