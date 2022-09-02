import React, {
  useEffect,
  useState
} from 'react';
import {
  ProjectComplexBuildingVO,
  ProjectComplexSiteId,
  ProjectComplexSiteVO
} from 'project_complex/domain';
import SectionLayout from 'layouts/SectionLayout';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';
import dayjs from 'dayjs';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Table } from 'layouts/Table';
import ProjectComplexSiteRow from 'project_complex/view/SiteRow';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';

interface Props {
  list: ProjectComplexSiteVO[] | undefined;
  buildingList: ProjectComplexBuildingVO[] | undefined;
  onAdd: DefaultFunction;
  onUpdate: (params: ProjectComplexSiteParameter) => void;
  onDelete: (id: ProjectComplexSiteId) => void;
}

function AddButton(props: Props) {
  return (
    <Button shape="basic1" onClick={props.onAdd}>
      + 추가
    </Button>
  );
}

export default function ProjectComplexSiteSection(props: Props) {

  const [modifiedAt, setModifiedAt] = useState<Date>();
  useEffect(() => {
    if (props.list) {
      setModifiedAt(
        props.list.map(item => item.modifiedAt)
             .map(date => dayjs(date))
             .reduce((a,
                      b
             ) => a.isAfter(b) ? a : b)
             .toDate()
      );
    }
  }, [props.list]);

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
                  <TableCell>대지 모형</TableCell>
                  <TableCell>실험 종류 E 여부</TableCell>
                  <TableCell>견적 대지 모형 제작 난이도</TableCell>
                  <TableCell>대지 모형 제작 난이도</TableCell>
                  <TableCell>담당자</TableCell>
                  <TableCell>삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!props.list || props.list.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={6}>조회 결과가 없습니다.</TableCell>
                  </TableRow>
                )}
                {props.list && props.list.map((item) => (
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>실험 종류</TableCell>
                  <TableCell>동 수</TableCell>
                  <TableCell colSpan={props.buildingList?.length ?? 1}>실험 대상 동명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!props.buildingList || props.buildingList.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={3}>조회 결과가 없습니다.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </SectionLayout>
  );
}