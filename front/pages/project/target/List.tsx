import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
} from '@mui/material';
import { Container, DateFormat, Table, UserFormat } from 'components';
import { useProjectTarget } from 'services/project_target';
import { findModifiedAt } from 'util/DateUtil';

const ProjectTargetDocumentList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      list,
      id,
    },
    getList,
    setId,
  } = useProjectTarget();
  const [modifiedAt, setModifiedAt] = useState<Date | undefined>();

  const handler = {
    addModal: () => {
      setId(null);
    },
    detailModal: (id: number) => {
      setId(id);
    }
  };

  useEffect(() => {
    if (!id && projectId) {
      getList(projectId);
    }
  }, [id, projectId]);

  useEffect(() => {
    setModifiedAt(findModifiedAt(list));
  }, [list]);

  return (
    <Container
      title="실험대상"
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
            label: '견적 여부',
            renderCell: (item) => item.confirmed ? 'Y' : 'N',
            cellStyle: (item) => ({
              backgroundColor: item.confirmed ? '#c4baf5' : 'inherit'
            })
          },
          {
            label: '실험대상 번호',
            renderCell: (item) => (
              <Link
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handler.detailModal(item.id);
                }}
              >
                {item.code}
              </Link>
            )
          },
          {
            label: '대상 동수',
            renderCell: (item) => item.detailCount,
          },
          {
            label: '실험 종류',
            renderCell: (item) => item.testList.join(', ')
          },
          {
            label: '등록자',
            renderCell: (item) => (<UserFormat user={item.writer} />),
          },
          {
            label: '비고',
            renderCell: item => item.memo
          },
        ]}
        list={list}
        hover
      />
    </Container>
  );
};

export default ProjectTargetDocumentList;
