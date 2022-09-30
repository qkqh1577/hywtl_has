import React from 'react';
import {
  Box,
  IconButton,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  ContractCollectionStage,
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import Tooltip from 'components/Tooltip';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import Button from 'layouts/Button';
import AddRow from 'project_contract/view/AddModal/CollectionForm/AddRow';
import { FormikLayoutProps } from 'layouts/PageLayout';
import useDialog from 'components/Dialog';

interface Props
  extends FormikLayoutProps<any> {
  totalRatioCell: React.ReactNode;
}

export default function CollectionForm(props: Props) {
  const { error } = useDialog();
  const { formik, totalRatioCell } = props;
  const list = [];
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Th width="10%">
              단계
            </Th>
            <Th width="8%">
              비율(%)
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
          {Array.isArray(list) && list.length > 0 && list.map((item,
                                                               i
          ) => {
            return (
              <TableRow key={i}>
                <Td>
                  <TextField
                    name={`stageList.${i}.name`}
                    label="단계"
                    disableLabel
                    variant="outlined"
                  />
                </Td>
                <Td>
                  <TextField
                    type="number"
                    name={`stageList.${i}.ratio`}
                    label="비율"
                    disableLabel
                    variant="outlined"
                  />
                </Td>
                <Td align="right">
                  <TextField
                    name={`stageList.${i}.용역금액 × 비율`}
                    label="용역금액 × 비율"
                    disableLabel
                    variant="outlined"
                  />
                </Td>
                <Td>
                  <TextField
                    name={`stageList.${i}.note`}
                    label="시기"
                    disableLabel
                    variant="outlined"
                  />
                </Td>
                <Td>
                  <SelectField
                    disableLabel
                    options={expectedDateTypeList.map(
                      (item) => ({
                        key:  item as string,
                        text: expectedDateTypeName(item)
                      })
                    )}
                    name={`stageList.${i}.expectedDate`}
                    label="예정일"
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
                          formik!.setFieldValue('stageList', stageList);
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
                          formik!.setFieldValue('stageList', stageList);
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
                      formik!.setFieldValue('stageList', list.filter((detail,
                                                                      k
                      ) => k !== i));
                    }}>
                    삭제
                  </Button>
                </Td>
              </TableRow>
            );
          })}
          <AddRow formik={formik} />
          <TableRow>
            <Td>
              합계
            </Td>
            <Td>
              {totalRatioCell}
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
