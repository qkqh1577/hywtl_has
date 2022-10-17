import SectionLayout from 'layouts/SectionLayout';
import ButtonSection from 'project_contract/view/ContractList/ButtonSection';
import {
  ProjectContractId,
  ProjectContractShortVO
} from 'project_contract/domain';
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import TextLink from 'layouts/TextLink';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

interface Props {
  list: ProjectContractShortVO[] | undefined;
  openFinalModal: DefaultFunction;
  openAddModal: DefaultFunction;
  openDetailModal: DefaultFunction<ProjectContractId>;
}

export default function ProjectContractListSection(props: Props) {

  const { list, openDetailModal } = props;

  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if (!list || list.length === 0) {
      setModifiedAt(undefined);
    }
    else {
      setModifiedAt(
        list
        .map(item => item.modifiedAt)
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
        <ButtonSection
          openFinalModal={props.openFinalModal}
          openAddModal={props.openAddModal}
        />
      }>
      <Box sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>계약 번호</Th>
              <Th>최종 여부</Th>
              <Th>견적 번호</Th>
              <Th>Word</Th>
              <Th>PDF</Th>
              <Th>날인본 PDF</Th>
              <Th>등록자</Th>
              <Th>송부 여부</Th>
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
                    justifyContent: 'space-between',
                    alignItems:     'center',
                  }}>
                    <TextLink
                      onClick={() => {
                        openDetailModal(item.id);
                      }}>
                      {item.code}
                    </TextLink>
                  </Box>
                </Td>
                <Td>{item.confirmed ? 'Y' : 'N'}</Td>
                <Td>{item.estimateCode}</Td>
                <Td>
                  <Button shape="small" onClick={() => {console.log(item);}}>다운로드</Button>
                </Td>
                <Td>
                  <Button shape="small" onClick={() => {console.log(item);}}>다운로드</Button>
                </Td>
                <Td>
                  {item.pdfFile && (
                    <Button shape="small" onClick={() => {
                      window.open(`/file-items/${item.pdfFile!.id}`, '_blank');
                    }}>
                      다운로드
                    </Button>
                  )}
                </Td>
                <Td>{item.createdBy.name}</Td>
                <Td>{item.note ?? '-'}</Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </SectionLayout>
  );
}
