import React, { useEffect } from 'react';
import { ColorPalette } from 'app/view/App/theme';
import {
  Box,
  Grid,
  Radio,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Button from 'layouts/Button';
import ModalLayout from 'layouts/ModalLayout';

import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import DateFormat from 'layouts/DateFormat';
import { projectContractApi } from 'project_contract/api';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import { toAmountKor } from 'util/NumberUtil';
import { FormikContextType } from 'formik';
import {
  TestType,
  testTypeList
} from 'type/TestType';
import {
  projectEstimateTypeName,
  ProjectEstimateVO
} from 'project_estimate/domain';

export default function (props: {
  formik: FormikContextType<any>,
  handleEstimateIdChange: (estimateId: number) => void,
  estimateDetail?: ProjectEstimateVO,
}) {
  const [selectEstimateModalOpen, setSelectEstimateModalOpen] = React.useState(false);
  const { formik, handleEstimateIdChange, estimateDetail } = props;

  const openSelectEstimateModal = () => {
    setSelectEstimateModalOpen(true);
  };

  const closeSelectEstimateModal = () => {
    setSelectEstimateModalOpen(false);
  };
  return <>
    {selectEstimateModalOpen && <SelectEstimateModal estimateId={formik.values.estimateId} onClose={closeSelectEstimateModal} onSubmit={handleEstimateIdChange} />}
    <Box sx={{
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      padding:      '10px',
      marginBottom: '15px',
      width:        '100%',
    }}>
      <div>{estimateDetail?.code}</div>
      <div>
        <Button onClick={openSelectEstimateModal}>견적서 선택</Button>
      </div>
      {estimateDetail &&
      <Grid container>
        <Grid item xs={6}>
          <DataFieldWithLabel label="견적일자" labelPosition="top" required={false}>
            <Input value={estimateDetail?.plan?.estimateDate} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={6}>
          <DataFieldWithLabel label="착수가능일" labelPosition="top" required={false}>
            <Input value={estimateDetail?.plan?.expectedServiceDate} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={6}>
          <DataFieldWithLabel label="설풍 납품 가능 주" labelPosition="top" required={false}>
            <Input value={estimateDetail?.plan?.expectedTestDeadline} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={6}>
          <DataFieldWithLabel label="최종보고서 납품 가능 주" labelPosition="top" required={false}>
            <Input value={estimateDetail?.plan?.expectedFinalReportDeadline} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={5}>
          <DataFieldWithLabel label="풍동 금액" labelPosition="top" required={false}>
            <Input value={estimateDetail?.plan?.testAmount && estimateDetail.plan.testAmount.toLocaleString()} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={5}>
          <DataFieldWithLabel label="구검" labelPosition="top" required={false}>
            <Input value={estimateDetail?.plan?.reviewAmount && estimateDetail.plan.reviewAmount.toLocaleString()} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={2}>
          <DataFieldWithLabel label="LH 여부" labelPosition="top" required={false}>
            <Input value={'N'} readOnly />
          </DataFieldWithLabel>
        </Grid>
      </Grid>}
    </Box>
    {estimateDetail &&
    <Box sx={{
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      padding:      '10px',
      marginBottom: '15px',
      width:        '100%',
    }}>
      <div>합계(부가세 별도): {estimateDetail?.plan?.totalAmount && `${toAmountKor(estimateDetail?.plan.totalAmount)}(￦ ${estimateDetail?.plan.totalAmount.toLocaleString()})`}</div>
    </Box>
    }
    {estimateDetail &&
    <Box sx={{
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      padding:      '10px',
      marginBottom: '15px',
      width:        '100%',
    }}>
      <Grid container>
        <Grid item xs={6}>
          <DataFieldWithLabel label="대지모형 수" labelPosition="top" required={false}>
            <Input value={estimateDetail?.siteList?.length} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={6}>
          <DataFieldWithLabel label="실험대상 동수" labelPosition="top" required={false}>
            <Input value={estimateDetail?.buildingList?.length} readOnly />
          </DataFieldWithLabel>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {testTypeList.map((testType) => <Th key={testType}>{testType}</Th>)}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={-1}>
                  {testTypeList.map((testType) => {
                      if (!estimateDetail?.buildingList) {
                        return <Td key={testType}>0</Td>;
                      }
                      const buildings = estimateDetail?.buildingList.filter((building) => building?.testTypeList?.includes(testType));
                      const count = buildings ? buildings.length : 0;
                      return <Td key={testType}>{count}</Td>;
                    }
                  )}
                </TableRow>
                {estimateDetail?.buildingList?.map((item) => (
                  <TableRow key={item.id}>
                    {testTypeList.map((testType) => {
                        if (testType === TestType.E) {
                          return <Td key={testType}>{item.testTypeList && item.testTypeList.includes(testType) && item.site?.name}</Td>;
                        }
                        return <Td key={testType}>{item.testTypeList && item.testTypeList.includes(testType) && item.name}</Td>;
                      }
                    )}

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
    }
  </>;
}
;

function SelectEstimateModal(props) {
  const id = useId();
  const [list, setList] = React.useState<ProjectEstimateVO[]>([]);
  const [estimateId, setEstimateId] = React.useState<number>(props.estimateId);
  const onSubmit = () => {
    props.onSubmit(estimateId);
    props.onClose();
  };

  useEffect(() => {
    if (id) {
      projectContractApi.getEstimateList(ProjectId(id))
                        .then(setList);
    }
  }, []);

  return (
    <ModalLayout
      open
      title="견적서 선택"
      onClose={props.onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>선택</Th>
                  <Th>견적번호</Th>
                  <Th>견적구분</Th>
                  <Th>견적업체</Th>
                  <Th>등록일시</Th>
                  <Th>등록자</Th>
                  <Th>송부여부</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!list || list.length === 0) && (
                  <TableRow>
                    <Td colSpan={7}>
                      조회 결과가 없습니다.
                    </Td>
                  </TableRow>
                )}
                {list && list.map((item) => (
                  <TableRow key={item.id}>
                    <Td>
                      <Radio
                        value={item.id}
                        checked={item.id === estimateId}
                        onClick={() => setEstimateId(item.id)}
                      />
                    </Td>
                    <Td>{item.code}</Td>
                    <Td>{projectEstimateTypeName(item.type)}</Td>
                    <Td>{item.business.name}</Td>
                    <Td><DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" /></Td>
                    <Td>{item.createdBy.name}</Td>
                    <Td>{item.isSent ? 'Y' : 'N'}</Td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{
            display:        'flex',
            height:         '30px',
            width:          '100%',
            justifyContent: 'center',
          }}>
            <Button onClick={onSubmit}>저장</Button>
            <Button onClick={props.onClose}>취소</Button>
          </Box>
        </Box>
      }
    />
  );
}