import ModalLayout from 'layouts/ModalLayout';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  ProjectDocumentId,
  ProjectDocumentShort
} from 'project/document/domain';
import {
  Box,
  Radio,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikProps } from 'project_complex/route/buildingFileModal';
import { Table } from 'layouts/Table';
import { toReadableSize } from 'file-item';
import DateFormat from 'components/DateFormat';
import React from 'react';
import { ProjectComplexBuildingId } from 'project_complex/domain';

interface Props
  extends FormikLayoutProps<FormikProps> {
  fileList?: ProjectDocumentShort[];
  onClose: DefaultFunction;
  onUnlink: DefaultFunction;
  onChange: DefaultFunction;
  buildingId?: ProjectComplexBuildingId;
  fileId?: ProjectDocumentId;
}

export function DetailFooter(props: Pick<Props, | 'onClose' | 'onUnlink' | 'onChange'>) {

  return (
    <Box sx={{
      width:                         '100%',
      '& > button:not(:last-child)': {
        marginRight: '10px',
      }
    }}>
      <Button shape="basic2" onClick={props.onUnlink}>
        연결 해제
      </Button>
      <Button shape="basic1" onClick={props.onChange}>
        자료 변경
      </Button>
      <Button shape="basic3" onClick={props.onClose}>
        닫기
      </Button>
    </Box>
  );
}

export default function ProjectComplexBuildingFileModal(props: Props) {

  const {
          fileId,
          fileList,
          formik,
          onClose
        } = props;
  const edit = formik.values.edit;
  const open = formik.values.open;

  return (
    <ModalLayout
      width="45vw"
      open={open}
      title={fileId ? (edit ? '형상비 검토 자료 변경' : '형상비 검토 자료 상세') : '형상비 검토 자료 선택'}
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>선택</TableCell>
                  <TableCell>자료 ID</TableCell>
                  <TableCell>파일</TableCell>
                  <TableCell>비고</TableCell>
                  <TableCell>등록일시</TableCell>
                  <TableCell>등록자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fileList && fileList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Radio
                        value={item.id}
                        onClick={() => {
                          formik.setFieldValue('fileId', item.id);
                        }}
                        checked={formik.values['fileId'] === item.id}
                      />
                    </TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>
                      {`${item.file.filename} (${toReadableSize(item.file.size)})`}
                    </TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>
                      <DateFormat date={item.modifiedAt} />
                    </TableCell>
                    <TableCell>
                      {item.createdBy.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FormikProvider>
      }
      footer={
        edit
          ? (
            <FormikProvider value={formik}>
              <DetailFormFooter />
            </FormikProvider>
          )
          : (
            <DetailFooter {...props} />
          )
      }
    />
  );
}