import ModalLayout from 'layouts/ModalLayout';
import {
  ProjectDocumentId,
  ProjectDocumentShortVO,
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
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { toReadableSize } from 'file-item';
import DateFormat from 'layouts/DateFormat';
import React, {
  useEffect,
  useState
} from 'react';
import { ProjectComplexBuildingId } from 'project_complex/domain';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectComplexBuildingParameter } from 'project_complex/parameter';
import useDialog from 'components/Dialog';
import TextBox from 'layouts/Text';

interface Props {
  fileList?: ProjectDocumentShortVO[];
  onClose: DefaultFunction;
  onUpdate: DefaultFunction<ProjectComplexBuildingParameter>;
  buildingId?: ProjectComplexBuildingId;
  fileId?: ProjectDocumentId;
}


interface EditFooterProps {
  onUpdate: DefaultFunction;
  onCancel: DefaultFunction;
}

function EditFooter(props: EditFooterProps) {

  return (
    <Box sx={{
      display:  'flex',
      width:    '100%',
      flexWrap: 'wrap',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        justifyContent: 'center',
        width:          '100%',
        marginBottom:   '10px',
      }}>
        <TextBox variant="body10">형상비 검토 자료는 자료 정보 탭에서 등록할 수 있습니다.</TextBox>
      </Box>
      <Box sx={{
        display:                       'flex',
        flexWrap:                      'nowrap',
        width:                         '100%',
        justifyContent:                'center',
        '& > button:not(:last-child)': {
          marginRight: '10px',
        }
      }}>
        <Button onClick={props.onUpdate}>저장</Button>
        <Button shape="basic2" onClick={props.onCancel}>취소</Button>
      </Box>
    </Box>
  );
}

interface DetailFooterProps {
  buildingId: ProjectComplexBuildingId;
  onClose: DefaultFunction;
  onUpdate: DefaultFunction<ProjectComplexBuildingParameter>;
  onEdit: DefaultFunction;
}

function DetailFooter(props: DetailFooterProps) {

  const { confirm } = useDialog();
  return (
    <Box sx={{
      width:                         '100%',
      '& > button:not(:last-child)': {
        marginRight: '10px',
      }
    }}>
      <Button
        shape="basic3"
        onClick={() => {
          confirm({
            status:       'warn',
            children:     '연결을 해제하시겠습니까?',
            confirmText:  '해제',
            afterConfirm: () => {
              props.onUpdate({ id: props.buildingId, buildingDocumentId: ProjectComplexBuildingId(-1) });
            }
          });
        }}>
        연결 해제
      </Button>
      <Button onClick={props.onEdit}>
        자료 변경
      </Button>
      <Button shape="basic2" onClick={props.onClose}>
        닫기
      </Button>
    </Box>
  );
}

function isOpen(buildingId: ProjectComplexBuildingId | undefined): buildingId is ProjectComplexBuildingId {
  return typeof buildingId !== 'undefined';
}

export default function ProjectComplexBuildingFileModal(props: Props) {

  const {
          buildingId,
          onClose,
          onUpdate,
          fileId,
          fileList,
        } = props;
  const open = isOpen(buildingId);
  const [edit, setEdit] = useState<boolean>(false);
  const [file, setFile] = useState<ProjectDocumentShortVO>();

  const isDetail = open && fileId && !edit;

  useEffect(() => {
    if (open && !fileId) {
      setEdit(true);
    }
    if (open && fileId) {
      setEdit(false);
    }
    if (open && fileId && fileList) {
      setFile(fileList.find(item => item.id === fileId));
    }
  }, [open, fileId, fileList]);

  return (
    <ModalLayout
      width="45vw"
      open={open}
      title={fileId ? (edit ? '형상비 검토 자료 변경' : '형상비 검토 자료 상세') : '형상비 검토 자료 선택'}
      onClose={onClose}
      children={
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
              {isDetail && file && (
                <TableRow>
                  <Td>{file.code}</Td>
                  <Td>
                    <Box sx={{
                      width:          '100%',
                      display:        'flex',
                      flexWrap:       'nowrap',
                      justifyContent: 'space-between',
                      alignItems:     'center'
                    }}>
                      <TextBox variant="body8">
                        {file.file.filename}
                        ({toReadableSize(file.file.size)})
                      </TextBox>
                      <IconButton
                        shape="square"
                        children={<FontAwesomeIcon icon="download" />}
                        onClick={() => {
                          window.open(`/file-items/${file.file.id}`, '_blank');
                        }}
                      />
                    </Box>
                  </Td>
                  <Td>{file.note}</Td>
                  <Td>
                    <DateFormat date={file.createdAt} format="YYYY-MM-DD HH:mm" />
                  </Td>
                  <Td>{file.createdBy.name}</Td>
                </TableRow>
              )}
              {!isDetail && fileList && fileList.map((item) => (
                <TableRow key={item.id}>
                  {edit && (
                    <Td>
                      <Radio
                        value={item.id}
                        onClick={() => {
                          setFile(item);
                        }}
                        checked={file?.id === item.id}
                      />
                    </Td>
                  )}
                  <Td>{item.code}</Td>
                  <Td>
                    <Box sx={{
                      width:          '100%',
                      display:        'flex',
                      flexWrap:       'nowrap',
                      justifyContent: 'flex-start',
                      alignItems:     'center'
                    }}>
                      <TextBox variant="body8">
                        {item.file.filename}
                        ({toReadableSize(item.file.size)})
                      </TextBox>
                    </Box>
                  </Td>
                  <Td>{item.note}</Td>
                  <Td>
                    <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                  </Td>
                  <Td>{item.createdBy.name}</Td>
                </TableRow>
              ))}
              {(!fileList || fileList.length === 0) && (
                <TableRow>
                  <Td colSpan={edit ? 6 : 5}>등록된 형상비 검토 자료가 없습니다</Td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      }
      footer={
        open && (isDetail
          ? (
            <DetailFooter
              buildingId={buildingId}
              onUpdate={onUpdate}
              onClose={onClose}
              onEdit={() => {
                setEdit(true);
              }}
            />
          )
          : (
            <EditFooter
              onUpdate={() => {
                if (file && file.id !== fileId) {
                  props.onUpdate({ id: buildingId, buildingDocumentId: file.id });
                }
              }}
              onCancel={() => {
                if (fileId) {
                  setFile(fileList?.find(item => item.id === fileId));
                  setEdit(false);
                }
                else {
                  onClose();
                }
              }}
            />
          ))
      }
    />
  );
}