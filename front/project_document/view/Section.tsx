import React from 'react';
import {
  ProjectDocumentShort,
  ProjectDocumentType,
  projectDocumentTypeName,
} from 'project_document/domain';
import {
  Box,
  TableBody,
  TableCell,
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
import { Table } from 'layouts/Table';
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
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{item.recipient}</TableCell>
                <TableCell>
                  {item.mailFileId && (
                    <IconButton
                      shape="square"
                      children={<FontAwesomeIcon icon="download" />}
                      onClick={() => {
                        window.open(`/file-items/${item.mailFileId}`, '_blank');
                      }}
                    />
                  )}
                </TableCell>
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
    </SectionLayout>

  );
}
