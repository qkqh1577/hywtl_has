import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Box,
  IconButton,
  MenuItem,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextField from 'components/TextField';
import {
  ContractCollectionStage,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import { FormikContext } from 'formik';
import Tooltip from 'components/Tooltip';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import useDialog from 'components/Dialog';
import Button from 'layouts/Button';
import AddRow from 'admin/contract/collection/view/Form/AddRow';
import Input from 'layouts/Input';
import RequiredMark from 'components/RequiredMark';
import Select from 'layouts/Select';
import { ColorPalette } from 'app/view/App/theme';

function TotalRatio() {

  const formik = useContext(FormikContext);
  const list = formik.values.stageList;
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    setValue(
      list.map((item) => item.ratio)
          .map(ratio => !ratio || Number.isNaN(+ratio) ? 0 : +ratio)
          .reduce((a,
                   b
            ) => a + b
            , 0)
    );
  }, [list]);
  return (
    <Typography
      sx={{
        fontSize:   'inherit',
        fontWeight: 'inherit',
        color:      value !== 100 ? ColorPalette._eb4c4c : 'inherit',
      }}
    >
      {value}
    </Typography>
  );
}

export default function Form() {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const list = formik.values.stageList ?? [];
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th width="10%">
              <RequiredMark required text="단계" />
            </Th>
            <Th width="5%">
              <RequiredMark required text="비율(%)" />
            </Th>
            <Th width="10%">
              금액(원)
            </Th>
            <Th>
              시기
            </Th>
            <Th width="10%">
              예정일
            </Th>
            <Th width="5%">
              순서
            </Th>
            <Th width="5%">
              삭제
            </Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,
                     i
          ) => {
            return (
              <TableRow key={i}>
                <Td>
                  <Input
                    value={item.name ?? ''}
                    variant="outlined"
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (item.name !== value) {
                        formik.setFieldValue(`stageList.${i}.name`, value);
                      }
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={item.ratio ?? ''}
                    variant="outlined"
                    onChange={(e) => {
                      const value = +(e.target.value) || undefined;
                      if (item.ratio !== value) {
                        formik.setFieldValue(`stageList.${i}.ratio`, value);
                      }
                    }}
                  />
                </Td>
                <Td align="right">
                  용역금액 × 비율
                </Td>
                <Td>
                  <Input
                    value={item.note ?? ''}
                    variant="outlined"
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (item.note !== value) {
                        formik.setFieldValue(`stageList.${i}.note`, value);
                      }
                    }}
                  />
                </Td>
                <Td>
                  <Select
                    value={item.expectedDate ?? ''}
                    variant="outlined"
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (item.expectedDate !== value) {
                        formik.setFieldValue(`stageList.${i}.expectedDate`, value);
                      }
                    }}>
                    {expectedDateTypeList.map((type) => (
                        <MenuItem key={type} value={type}>
                          {expectedDateTypeName(type)}
                        </MenuItem>
                      )
                    )}
                  </Select>
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
                          const prevList = list.filter((t,
                                                        k
                          ) => k !== i);
                          const stageList: ContractCollectionStage[] = [];
                          for (let k = 0; k < prevList.length; k++) {
                            if (stageList.length === i - 1) {
                              stageList.push(item);
                            }
                            stageList.push(prevList[k]);
                          }
                          formik.setFieldValue('stageList', stageList);
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
                          const stageList: ContractCollectionStage[] = [];
                          for (let k = 0; k < prevList.length; k++) {
                            stageList.push(prevList[k]);
                            if (stageList.length === i + 1) {
                              stageList.push(item);
                            }
                          }
                          formik.setFieldValue('stageList', stageList);
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Td>
                <Td>
                  <Button
                    shape="basic2"
                    color="warning"
                    disabled={list.length <= 1}
                    onClick={() => {
                      if (list.length === 1) {
                        error('최소 하나 이상의 세부 항목이 필요합니다.');
                        return;
                      }
                      formik.setFieldValue('stageList', list.filter((detail,
                                                                     k
                      ) => k !== i));
                    }}>
                    삭제
                  </Button>
                </Td>
              </TableRow>
            );
          })}
          <AddRow />
          <TableRow>
            <Td>
              합계
            </Td>
            <Td>
              <TotalRatio />
            </Td>
            <Td align="right">
              금액 합계
            </Td>
            <Td colSpan={4}>
              <TextField
                name="totalAmountNote"
                label="금액합계에 대한 설명"
                disableLabel
                variant="outlined"
                placeholder="입력"
              />
            </Td>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
