import React from 'react';
import {
  ProjectDocumentShort,
  ProjectDocumentType,
  projectDocumentTypeName,
} from 'project/document/domain';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Title from 'components/Title';
import DateFormat from 'components/DateFormat';
import dayjs from 'dayjs';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project/document/route/document';
import { toReadableSize } from 'file-item';
import IconButton from 'components/IconButton';
import {
  Download
} from '@mui/icons-material';

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
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      <Title
        title={projectDocumentTypeName(props.type)}
        titleRightComponent={
          <>
            {modifiedAt && (
              <>
                최종수정일시
                <DateFormat date={modifiedAt?.toDate()} format="YYYY-MM-DD HH:mm" />
              </>
            )}
            <AddButton {...props} />
          </>
        }
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>자료 ID</TableCell>
              <TableCell>파일</TableCell>
              <TableCell>수신처</TableCell>
              <TableCell>메일 자료</TableCell>
              <TableCell>비고</TableCell>
              <TableCell>등록 일시</TableCell>
              <TableCell>등록자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(!props.list || props.list.length === 0) && (
              <TableRow>
                <TableCell colSpan={8}>조회 결과가 없습니다.</TableCell>
              </TableRow>
            )}
            {props.list?.map((item,
                              i
            ) => (
              <TableRow key={item.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Button onClick={() => {
                    props.onDetailModalOpen(item.id);
                  }}>
                    {item.code}
                  </Button>
                </TableCell>
                <TableCell>
                  {item.file.filename}
                  ({toReadableSize(item.file.size)})
                  <IconButton
                    children={<Download />}
                    onClick={() => {
                      window.open(`/file-items/${item.file.id}`, '_blank');
                    }}
                  />

                </TableCell>
                <TableCell>{item.recipient}</TableCell>
                <TableCell>{item.mailFileId}</TableCell>
                <TableCell>{item.note}</TableCell>
                <TableCell>
                  <DateFormat date={item.createdAt} />
                </TableCell>
                <TableCell>{item.createdBy.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}