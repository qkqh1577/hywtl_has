import React from 'react';
import {
  ProjectDocumentShort,
  ProjectDocumentType,
  projectDocumentTypeName,
} from 'project_document/domain';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DateFormat from 'components/DateFormat';
import dayjs from 'dayjs';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project_document/route/document';
import { toReadableSize } from 'file-item';
import IconButton from 'components/IconButton';
import SectionLayout from 'layouts/SectionLayout';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'layouts/Button';

interface Props {
  type: ProjectDocumentType;
  list?: ProjectDocumentShort[];
  onAddModalOpen: OnAddModalOpen;
  onDetailModalOpen: OnDetailModalOpen;
}

function AddButton(props: Props) {
  return (
    <Button onClick={() => {
      props.onAddModalOpen(props.type);
    }}>
      + 등록
    </Button>
  );
}

export default function ProjectDocumentSection(props: Props) {
  const modifiedAt = (!props.list || props.list.length === 0)
    ? undefined
    : props.list.map(item => dayjs(item.modifiedAt ? item.modifiedAt : item.createdAt))
           .reduce((a,
                    b
           ) => a.isAfter(b) ? a : b);
  return (
    <SectionLayout
      title={projectDocumentTypeName(props.type)}
      titleRightComponent={<AddButton {...props} />}
      modifiedAt={modifiedAt?.toDate()}
    >
      <TableContainer sx={{
        width: '100%'
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No.</Th>
              <Th>자료 ID</Th>
              <Th>파일</Th>
              <Th>수신처</Th>
              <Th>메일 자료</Th>
              <Th>비고</Th>
              <Th>등록 일시</Th>
              <Th>등록자</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!props.list || props.list.length === 0) && (
              <TableRow>
                <Td colSpan={8}>조회 결과가 없습니다.</Td>
              </TableRow>
            )}
            {props.list?.map((item,
                              i
            ) => (
              <TableRow key={item.id}>
                <Td>{i + 1}</Td>
                <Td>
                  <Typography sx={{
                    fontSize:   '11px',
                    lineHeight: '16px',
                    color:      ColorPalette._386dd6,
                    cursor:     'pointer',
                  }}
                    onClick={() => {
                      props.onDetailModalOpen(item.id);
                    }}
                    children={item.code}
                  />
                </Td>
                <Td>
                  <Box sx={{
                    width:          '100%',
                    display:        'flex',
                    flexWrap:       'nowrap',
                    justifyContent: 'center',
                    alignItems:     'center'
                  }}>
                    {item.file.filename}
                    ({toReadableSize(item.file.size)})
                    <IconButton
                      shape="square"
                      children={<FontAwesomeIcon icon="download" />}
                      onClick={() => {
                        window.open(`/file-items/${item.file.id}`, '_blank');
                      }}
                    />
                  </Box>
                </Td>
                <Td>{item.recipient}</Td>
                <Td>
                  {item.mailFileId && (
                    <IconButton
                      shape="square"
                      children={<FontAwesomeIcon icon="download" />}
                      onClick={() => {
                        window.open(`/file-items/${item.mailFileId}`, '_blank');
                      }}
                    />
                  )}
                </Td>
                <Td>{item.note}</Td>
                <Td>
                  <DateFormat date={item.createdAt} />
                </Td>
                <Td>{item.createdBy.name}</Td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionLayout>

  );
}
