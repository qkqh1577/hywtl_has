import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
} from '@mui/material';
import { Container, DateFormat, Table } from 'components';
import { toReadableSize } from 'services/common/file-item';
import { useProjectTarget } from 'services/project_target';
import { findModifiedAt } from 'util/DateUtil';

const ProjectTargetDocumentList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      documentList: list,
      documentId,
    },
    getDocumentList: getList,
    clearDocumentList: clearList,
    setDocumentId: setId,
  } = useProjectTarget();
  const [modifiedAt, setModifiedAt] = useState<Date | undefined>();

  const handler = {
    addModal: () => {
      setId(null);
    }
  };

  useEffect(() => {
    if (!documentId && projectId) {
      getList(projectId);
    }
    return () => {
      if (typeof projectId === 'undefined') {
        clearList();
      }
    };
  }, [documentId, projectId]);

  useEffect(() => {
    setModifiedAt(findModifiedAt(list));
  }, [list]);

  return (
    <Container
      title="형상비 검토 자료"
      modifiedAt={modifiedAt}
    >
      <Box sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row-reverse'
      }}>
        <Button
          color="primary"
          variant="contained"
          sx={{
            maxHeight: '30px'
          }}
          onClick={handler.addModal}
        >
          등록
        </Button>
      </Box>
      <Table
        columns={[
          {
            label: '등록일시',
            align: 'center',
            width: 150,
            renderCell: (item) =>
              <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
          },
          {
            label: '파일명',
            width: 200,
            renderCell: (item) => {
              const size: string = toReadableSize(item.fileItem.size);
              return <Link
                sx={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setId(item.id);
                }}
              >
                {`${item.fileItem.filename} (${size})`}
              </Link>;
            }
          },
          {
            label: '다운로드',
            align: 'center',
            renderCell: (item) =>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {

                  window.open(`/file-items/${item.fileItem.id}`, '_blank');
                }}
              >
                다운로드
              </Button>
          },
          {
            label: '비고',
            renderCell: item => item.memo
          },
          {
            label: '등록자',
            renderCell: item => item.writer.name
          },
        ]}
        list={list}
        hover
      />
    </Container>
  );
};

export default ProjectTargetDocumentList;
