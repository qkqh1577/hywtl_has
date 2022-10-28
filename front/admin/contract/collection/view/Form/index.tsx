import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Box,
  MenuItem,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  ContractCollectionStage,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import { FormikContext } from 'formik';
import useDialog from 'dialog/hook';
import Button from 'layouts/Button';
import AddRow from 'admin/contract/collection/view/Form/AddRow';
import Input from 'layouts/Input';
import RequiredMark from 'layouts/RequiredMark';
import Select from 'layouts/Select';
import { ColorPalette } from 'assets/theme';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TotalRate() {

  const formik = useContext(FormikContext);
  const list = formik.values.stageList;
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    setValue(
      list.map((item) => item.rate)
          .map(rate => !rate || Number.isNaN(+rate) ? 0 : +rate)
          .reduce((a,
                   b
            ) => a + b
            , 0)
    );
  }, [list]);
  return (
    <Typography sx={{
      fontSize:   'inherit',
      fontWeight: 'inherit',
      color:      value !== 100 ? ColorPalette._eb4c4c : 'inherit',
    }}>
      {value}
    </Typography>
  );
}

export default function Form() {
  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const list = formik.values.stageList ?? [];
  return (
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
                  key={item.name}
                  defaultValue={item.name ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (item.name !== value) {
                      formik.setFieldValue(`stageList.${i}.name`, value);
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  key={item.rate}
                  type="number"
                  defaultValue={item.rate ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +(e.target.value) || undefined;
                    if (item.rate !== value) {
                      formik.setFieldValue(`stageList.${i}.rate`, value);
                    }
                  }}
                />
              </Td>
              <Td align="right">
                용역금액 × 비율
              </Td>
              <Td>
                <Input
                  key={item.note}
                  defaultValue={item.note ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
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
                  justifyContent: 'space-between',
                }}>
                  <IconButton
                    shape="square"
                    tooltip="순서 올리기"
                    disabled={i === 0}
                    children={<FontAwesomeIcon icon="angle-up" />}
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
                    sx={{
                      marginRight: '10px',
                    }}
                  />
                  <IconButton
                    shape="square"
                    tooltip="순서 내리기"
                    disabled={i === list.length - 1}
                    children={<FontAwesomeIcon icon="angle-down" />}
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
                </Box>
              </Td>
              <Td>
                <Button
                  shape="basic3"
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
            <TotalRate />
          </Td>
          <Td align="right">
            금액 합계
          </Td>
          <Td colSpan={4}>
            <Input
              key={formik.values.totalAmountNote}
              defaultValue={formik.values.totalAmountNote ?? ''}
              variant="outlined"
              placeholder="입력"
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (formik.values.totalAmountNote !== value) {
                  formik.setFieldValue('totalAmountNote', value);
                }
              }}
            />
          </Td>
        </TableRow>
      </TableBody>
    </Table>
  );
}
