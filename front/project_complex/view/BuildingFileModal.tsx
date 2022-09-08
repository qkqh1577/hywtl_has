import ModalLayout from 'layouts/ModalLayout';
import { FormikProvider } from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  ProjectDocumentId,
  ProjectDocumentShort
} from 'project_document/domain';
import {
  Box,
  Radio,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikProps } from 'project_complex/route/buildingFileModal';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { toReadableSize } from 'file-item';
import DateFormat from 'components/DateFormat';
import React from 'react';
import { ProjectComplexBuildingId } from 'project_complex/domain';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <Button onClick={props.onChange}>
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
                  {edit && (<Th>선택</Th>)}
                  <Th>자료 ID</Th>
                  <Th>파일</Th>
                  <Th>비고</Th>
                  <Th>등록일시</Th>
                  <Th>등록자</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {!edit && fileId && fileList && fileList
                .filter((item) => item.id === fileId)
                .map((item) => (
                  <TableRow key={item.id}>
                    <Td>{item.code}</Td>
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
                    <Td>{item.note}</Td>
                    <Td>
                      <DateFormat date={item.modifiedAt} format="YYYY-MM-DD HH:mm" />
                    </Td>
                    <Td>
                      {item.createdBy.name}
                    </Td>
                  </TableRow>
                ))}
                {edit && fileList && fileList.map((item) => (
                  <TableRow key={item.id}>
                    {edit && (
                      <Td>
                        <Radio
                          value={item.id}
                          onClick={() => {
                            formik.setFieldValue('fileId', item.id);
                          }}
                          checked={formik.values['fileId'] === item.id}
                        />
                      </Td>
                    )}
                    <Td>{item.code}</Td>
                    <Td>
                      {`${item.file.filename} (${toReadableSize(item.file.size)})`}
                    </Td>
                    <Td>{item.note}</Td>
                    <Td>
                      <DateFormat date={item.modifiedAt} />
                    </Td>
                    <Td>
                      {item.createdBy.name}
                    </Td>
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