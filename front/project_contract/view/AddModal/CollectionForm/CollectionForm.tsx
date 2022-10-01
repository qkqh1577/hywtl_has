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
import { FieldArray } from 'formik';
import CollectionTotalRatioCellRoute from 'project_contract/route/CollectionTotalRatioCellRoute';

interface Props
  extends FormikLayoutProps<any> {
}

export default function CollectionForm(props: Props) {
  const { error } = useDialog();
  const { formik } = props;
  const collection = props.formik.values.collection;

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
          <FieldArray
            name="collection.stageList"
            render={(arrayHelpers) => {
              return <>
                {Array.isArray(collection?.stageList) && collection.stageList.map((item,
                                                                                   i
                ) => {
                  return (
                    <TableRow key={i}>
                      <Td>
                        <TextField
                          name={`collection.stageList.${i}.name`}
                          label="단계"
                          disableLabel
                          variant="outlined"
                        />
                      </Td>
                      <Td>
                        <TextField
                          type="number"
                          name={`collection.stageList.${i}.ratio`}
                          label="비율"
                          disableLabel
                          variant="outlined"
                        />
                      </Td>
                      <Td align="right">
                        {collection?.stageList[i]?.amount && collection.stageList[i].amount.toLocaleString()}
                      </Td>
                      <Td>
                        <TextField
                          name={`collection.stageList.${i}.note`}
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
                          name={`collection.stageList.${i}.expectedDate`}
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
                                arrayHelpers.swap(i, i - 1);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="순서 내리기">
                            <IconButton
                              disabled={i === collection.stageList.length - 1}
                              children={<DownIcon />}
                              onClick={() => arrayHelpers.swap(i, i + 1)}
                            />
                          </Tooltip>
                        </Box>
                      </Td>
                      <Td>
                        <Button
                          shape="basic2"
                          color="warning"
                          disabled={collection.stageList.length <= 1}
                          onClick={() => {
                            if (collection.stageList.length === 1) {
                              error('최소 하나 이상의 세부 항목이 필요합니다.');
                              return;
                            }
                            arrayHelpers.remove(i);
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
                    <CollectionTotalRatioCellRoute />
                  </Td>
                  <Td align="right">
                    {collection?.totalAmount && collection?.totalAmount.toLocaleString()}
                  </Td>
                  <Td colSpan={4}>
                    <TextField
                      name="collection.totalAmountNote"
                      label="금액합계에 대한 설명"
                      disableLabel
                      variant="outlined"
                      placeholder="입력"
                    />
                  </Td>
                </TableRow>
              </>;
            }} />
        </TableBody>
      </Table>
    </TableContainer>
  )
    ;
}
