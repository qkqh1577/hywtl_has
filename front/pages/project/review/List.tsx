import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
} from '@mui/material';
import { Table, DateFormat, UserFormat, Container } from 'components';
import { projectReviewStatusName, useProjectReview } from 'services/project_review';
import { findModifiedAt } from 'util/DateUtil';

const ProjectReviewList = () => {
  const { id: idString } = useParams<{ id: string }>();
  const projectId = !idString || Number.isNaN(+idString) ? undefined : +idString;
  const {
    state: {
      list,
      id,
    },
    getList,
    setId,
  } = useProjectReview();
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
    <Container title="형상비 검토" modifiedAt={modifiedAt}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row-reverse'
      }}>
        <Button onClick={handler.addModal}>
          등록
        </Button>
      </Box>
      <Table
        list={list}
        columns={[
          {
            label: '등록일시',
            renderCell: (item) => (
              <>
                <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                {item.modifiedAt && (
                  <>
                    <br />
                    <DateFormat
                      date={item.modifiedAt}
                      format="YYYY-MM-DD HH:mm"
                      prefix="("
                      postfix=" 수정됨)"
                    />
                  </>
                )}
              </>
            )
          }, {
            label: '견적 여부',
            renderCell: (item) => item.confirmed ? 'Y' : 'N',
            cellStyle: (item) => ({
              backgroundColor: item.confirmed ? '#c4baf5' : 'inherit'
            })
          }, {
            label: '형상비 번호',
            renderCell: (item) =>
              <Link onClick={() => {
                handler.detailModal(item.id);
              }}>
                {item.code}
              </Link>
          }, {
            label: '상태',
            renderCell: (item) => projectReviewStatusName(item.status),
          }, {
            label: '대상 동수',
            renderCell: (item) => item.detailCount,
          }, {
            label: '실험 종류',
            renderCell: (item) => item.testList.join(', ')
          }, {
            label: 'PDF 다운로드',
            renderCell: () =>
              <Button onClick={() => {
                // download pdf
              }}>
                다운로드
              </Button>
          }, {
            label: '관련 파일',
            renderCell: (item) => item.fileCount ? `${item.fileCount}개` : ''
          }, {
            label: '등록자',
            renderCell: (item) => <UserFormat user={item.writer} />,
          }, {
            label: '복사',
            renderCell: () =>
              <Button
                color="secondary"
                onClick={() => {
                  // copy
                }}>
                복사
              </Button>
          },
        ]}
      />
    </Container>
  );
};

export default ProjectReviewList;
