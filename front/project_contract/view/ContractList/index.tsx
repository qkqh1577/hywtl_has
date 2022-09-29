import SectionLayout from 'layouts/SectionLayout';
import ButtonSection from 'project_contract/view/ContractList/ButtonSection';
import {
  ProjectContractId,
  ProjectContractShort
} from 'project_contract/domain';
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import {
  Box,
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
import TextLink from 'components/TextLink';
import Button from 'layouts/Button';

interface Props {
  list?: ProjectContractShort[];
  openConfirmModal: () => void;
  openAddModal: () => void;
  openDetailModal: (id: ProjectContractId) => void;
}

export default function ProjectContractListSection(props: Props) {

  const { list, openConfirmModal, openAddModal, openDetailModal } = props;
  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if (!list || list.length === 0) {
      setModifiedAt(undefined);
    }
    else {
      setModifiedAt(
        list
        .map(item => item.modifiedAt ? item.modifiedAt : item.createdAt)
        .map(date => dayjs(date))
        .reduce((a,
                 b
        ) => a.isAfter(b) ? a : b)
        .toDate()
      );
    }
  }, [list]);
  return (
    <SectionLayout
      title="계약서"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <ButtonSection openConfirmModal={openConfirmModal} openAddModal={openAddModal} />
      }>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>계약번호</Th>
                <Th>최종 여부</Th>
                <Th>견적번호</Th>
                <Th>Word</Th>
                <Th>PDF</Th>
                <Th>날인본 PDF</Th>
                <Th>등록자</Th>
                <Th>비고</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!list || list.length === 0) && (
                <TableRow>
                  <Td colSpan={8}>
                    조회 결과가 없습니다.
                  </Td>
                </TableRow>
              )}
              {list && list.map((item) => (
                <TableRow key={item.id} selected={item.confirmed}>
                  <Td>
                    <Box sx={{
                      width:          '100%',
                      display:        'flex',
                      flexWrap:       'nowrap',
                      justifyContent: 'center',
                      alignItems:     'center',
                    }}>
                      <TextLink
                        onClick={() => {
                          openDetailModal(item.id);
                        }}>{item.code}</TextLink>
                    </Box>
                  </Td>
                  <Td>{item.confirmed ? 'Y' : 'N'}</Td>
                  <Td>{item.estimateCode}</Td>
                  <Td>
                    <Button onClick={() => {console.log(item);}}>다운로드</Button>
                  </Td>
                  <Td>
                    <Button onClick={() => {console.log(item);}}>다운로드</Button>
                  </Td>
                  <Td>
                    {item.pdfFile ? <Button onClick={() => {console.log(item);}}>다운로드</Button> : ''}
                  </Td>
                  <Td>{item.createdBy.name}</Td>
                  <Td>{item.note ?? '-'}</Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SectionLayout>
  );
}