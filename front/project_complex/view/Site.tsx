import React, {
  useEffect,
  useState
} from 'react';
import {
  ProjectComplexSiteId,
  ProjectComplexSiteVO,
  ProjectComplexTestVO
} from 'project_complex/domain';
import SectionLayout from 'layouts/SectionLayout';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';
import dayjs from 'dayjs';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import ProjectComplexSiteRow from 'project_complex/view/SiteRow';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';
import ProjectComplexTestSection from 'project_complex/view/TestSection';

interface Props {
  list: ProjectComplexSiteVO[] | undefined;
  onAdd: DefaultFunction;
  onUpdate: (params: ProjectComplexSiteParameter) => void;
  onDelete: (id: ProjectComplexSiteId) => void;
  testDetail: ProjectComplexTestVO | undefined;
}

function AddButton(props: Props) {
  return (
    <Button onClick={props.onAdd}>
      + 추가
    </Button>
  );
}

export default function ProjectComplexSiteSection(props: Props) {
  const {
          list,
        } = props;

  const [modifiedAt, setModifiedAt] = useState<Date>();
  useEffect(() => {
    if (list && list.length > 0) {
      setModifiedAt(
        list.map(item => item.modifiedAt)
            .map(date => dayjs(date))
            .reduce((a,
                     b
            ) => a.isAfter(b) ? a : b)
            .toDate()
      );
    }
    else {
      setModifiedAt(undefined);
    }
  }, [list]);

  return (
    <SectionLayout
      title="대지 모형"
      titleRightComponent={<AddButton {...props} />}
      modifiedAt={modifiedAt}
    >
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{
          width:        '100%',
          display:      'flex',
          marginBottom: '15px',
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Th>대지 모형</Th>
                  <Th>실험 종류 E 여부</Th>
                  <Th>견적 대지 모형 제작 난이도</Th>
                  <Th>대지 모형 제작 난이도</Th>
                  <Th>담당자</Th>
                  <Th>삭제</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!list || list.length === 0) && (
                  <TableRow>
                    <Td colSpan={6}>조회 결과가 없습니다.</Td>
                  </TableRow>
                )}
                {list && list.map((item) => (
                  <ProjectComplexSiteRow
                    key={item.id}
                    onUpdate={props.onUpdate}
                    onDelete={props.onDelete}
                    {...item}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{
          width:        '100%',
          display:      'flex',
          marginBottom: '15px',
        }}>
          <ProjectComplexTestSection testList={props.testDetail?.testList} />
        </Box>
      </Box>
    </SectionLayout>
  );
}