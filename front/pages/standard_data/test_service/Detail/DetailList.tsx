import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { TableCellProps } from '@mui/material/TableCell/TableCell';
import {
  RequiredMark,
  Tooltip,
  useDialog
} from 'components';
import React, { useEffect } from 'react';
import {
  initTestServiceDetailTemplateView as initDetailView,
  TestServiceTemplateView
} from 'services/standard_data/test_service_template';
import { useFormikContext } from 'formik';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import TitleListCell from './TitleListCell';

interface ThProps
  extends Omit<TableCellProps, | 'variant' | 'align'> {
  required?: boolean;
}

function Th({ children, required, ...props }: ThProps) {

  return (
    <TableCell {...props} variant="head" align="center">
      <RequiredMark text={children} required={required} />
    </TableCell>
  );
}

export default function TestServiceDetailDetailList() {

  const { error } = useDialog();
  const { values, setFieldValue } = useFormikContext<TestServiceTemplateView>();
  const edit = values.edit;

  useEffect(() => {
    console.log('edit is ', edit);
  }, [edit]);

  return (
    <TableContainer sx={{
      width: '100%'
    }}>
      <Table>
        <TableHead>
          <TableRow>
            <Th required={edit}>세부 항목명</Th>
            <Th required={edit}>단위</Th>
            <Th required={edit}>단가</Th>
            <Th>비고</Th>
            {edit && (<Th>순서</Th>)}
            {edit && (<Th>삭제</Th>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.detailList && values.detailList.map((detail,
                                                       i
          ) => (
            <TableRow key={detail.id}>
              <TableCell>
                <TitleListCell index={i} />
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <TextField
                  required
                  disableLabel
                  type="number"
                  name={`detailList.${i}.unitPrice`}
                  label="단가"
                />
              </TableCell>
              <TableCell>
                <TextField
                  disableLabel
                  name={`detailList.${i}.memo`}
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
                          const prevList = values.detailList.filter((t,
                                                                     k
                          ) => k !== i);
                          const detailList = [];
                          for (let k = 0; k < prevList.length; k++) {
                            if (detailList.length === i - 1) {
                              detailList.push(detail);
                            }
                            detailList.push(prevList[k]);
                          }
                          setFieldValue('detailList', detailList);
                        }}>
                        <UpIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="순서 내리기">
                      <IconButton
                        disabled={i === values.detailList.length - 1}
                        onClick={() => {
                          const prevList = values.detailList.filter((t,
                                                                     k
                          ) => k !== i);
                          const detailList = [];
                          for (let k = 0; k < prevList.length; k++) {
                            detailList.push(prevList[k]);
                            if (detailList.length === i + 1) {
                              detailList.push(detail);
                            }
                          }
                          setFieldValue('detailList', detailList);
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
                    disabled={values.detailList.length <= 1}
                    onClick={() => {
                      if (values.detailList.length === 1) {
                        error('최소 하나 이상의 세부 항목이 필요합니다.');
                        return;
                      }
                      setFieldValue('detailList', values.detailList.filter((detail,
                                                                            k
                      ) => k !== i));
                    }}>
                    삭제
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
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
                    setFieldValue('detailList', [...(values.detailList ?? []), initDetailView]);
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