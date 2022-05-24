import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Link } from '@mui/material';
import { Container, Table, DateFormat, UserFormat } from 'components';
import {
  useProjectEstimate,
  projectEstimateSheetStatusName
} from 'services/project_estimate';
import { findModifiedAt } from 'util/DateUtil';

const ProjectEstimateSheetList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;

  const {
    state: {
      sheetList: list,
      sheetId,
    },
    getSheetList: getList,
    setSheetId,
  } = useProjectEstimate();
  const [modifiedAt, setModifiedAt] = useState<Date | undefined>();

  const handler = {
    addModal: () => {
      setSheetId(null);
    },
  };

  useEffect(() => {
    if (projectId && typeof sheetId === 'undefined') {
      getList(projectId);
    }
  }, [projectId, sheetId]);

  useEffect(() => {
    setModifiedAt(findModifiedAt(list));
  }, [list]);

  return (
    <Container
      title="시스템 견적서"
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
            renderCell: (item) => (
              <>
                <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                {item.modifiedAt && (
                  <DateFormat
                    date={item.modifiedAt}
                    format="YYYY-MM-DD HH:mm"
                    prefix="("
                    postfix=" 수정됨)"
                  />
                )}
              </>
            )
          },
          {
            label: '확정 여부',
            renderCell: (item) => item.confirmed ? 'Y' : 'N',
            cellStyle: (item) => ({
              backgroundColor: item.confirmed ? '#c4baf5' : 'inherit'
            })
          },
          {
            label: '상태',
            renderCell: (item) => projectEstimateSheetStatusName(item.status),
          },
          {
            label: '견적서명',
            renderCell: (item) => (
              <Link
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSheetId(item.id);
                }}
              >
                {item.title}
              </Link>
            )
          },
          {
            label: 'PDF 다운로드',
            renderCell: () => (
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  // download pdf
                }}>
                다운로드
              </Button>
            )
          },
          {
            label: '비고',
            renderCell: (item) => item.memo
          },
          {
            label: '등록자',
            renderCell: (item) => (<UserFormat user={item.writer} />),
          },
          {
            label: '복사',
            renderCell: () => (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  // copy
                }}
              >
                복사
              </Button>
            )
          },
        ]}
        list={list}
        hover
      />
    </Container>
  );
};

export default ProjectEstimateSheetList;
