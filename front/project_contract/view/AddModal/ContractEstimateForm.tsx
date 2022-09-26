import React, { useEffect } from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ColorPalette } from 'app/view/App/theme';
import {
  Box,
  Radio,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Button from 'layouts/Button';
import ModalLayout from 'layouts/ModalLayout';

import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  ProjectEstimateId,
  projectEstimateTypeName
} from 'project_contract/domain';
import DateFormat from 'components/DateFormat';
import { projectContractApi } from 'project_contract/api';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';
import { ProjectEstimateVO } from 'project_contract/domain';

export default function (props: FormikLayoutProps<any>) {
  const [selectEstimateModalOpen, setSelectEstimateModalOpen] = React.useState(false);
  const [estimateDetail, setEstimateDetail] = React.useState<ProjectEstimateVO | null>(null);
  const { formik } = props;

  const openSelectEstimateModal = () => {
    setSelectEstimateModalOpen(true);
  };

  const closeSelectEstimateModal = () => {
    setSelectEstimateModalOpen(false);
  };
  const setEstimateId = (estimateId) => {
    formik.setFieldValue('estimateId', estimateId);
  };

  useEffect(() => {
    if (formik.values.estimateId) {
      return;
    }
    if (estimateDetail?.id === formik.values.estimateId) {
      return;
    }

    projectContractApi.getEstimateDetail(ProjectEstimateId(formik.values.estimateId))
                      .then(setEstimateDetail);

  }, [formik.values.estimateId]);

  return <>
    {selectEstimateModalOpen && <SelectEstimateModal estimateId={formik.values.estimateId} onClose={closeSelectEstimateModal} onSubmit={setEstimateId} />}
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
    </Box>
  </>;
};

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