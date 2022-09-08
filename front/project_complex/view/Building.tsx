import SectionLayout from 'layouts/SectionLayout';
import {
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO
} from 'project_complex/domain';
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import Button from 'layouts/Button';
import {
  TableBody,
  TableContainer,
  TableRow
} from '@mui/material';
import { ProjectComplexBuildingNameCell } from 'project_complex/view/BuildingCell';
import { ProjectComplexBuildingParameter } from 'project_complex/parameter';
import { DefaultFunction } from 'type/Function';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

interface Props {
  list: ProjectComplexBuildingVO[] | undefined;
  onAdd: DefaultFunction;
  onSubmit: (values: ProjectComplexBuildingParameter) => void;
  onDelete: (id: ProjectComplexBuildingId) => void;
}

export default function ProjectComplexBuildingSection(props: Props) {
  const { list } = props;

  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {

    if (list && list.length > 0) {
      setModifiedAt(
        list.map(item => item.modifiedAt)
            .map(item => dayjs(item))
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
      title="동"
      titleRightComponent={
        <>
          <Button
            onClick={props.onAdd}
            sx={{
              marginRight: '10px'
            }}>
            + 추가
          </Button>
          <Button>
            계약에 사용된 견적서 새창열기
          </Button>
        </>
      }
      modifiedAt={modifiedAt}
    >
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <Th>동명</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="name"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>대지 모형</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="site.id"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>평면 형상</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="shape"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>층 수</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="floorCount"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>건축 높이</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="height"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>기준층 바닥 면적</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="baseArea"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>형상비</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="ratio"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>형상비 검토 파일 ID</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="buildingDocument.id"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>특별 풍하중 조건</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="specialWindWeightConditionList"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>실험 대상 여부</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="inTest"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>실험 종류</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="testTypeList"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 제작 난이도</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="estimateFigureDifficulty"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 실험 난이도</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="estimateTestDifficulty"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 평가 난이도</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="estimateEvaluationDifficulty"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 보고서 난이도</Th>
              {list?.map(item => (
                <ProjectComplexBuildingNameCell
                  key={item.id}
                  fieldName="estimateReportDifficulty"
                  onSubmit={props.onSubmit}
                  {...item}
                />
              ))}
            </TableRow>
            <TableRow>
              <Th>삭제</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Button
                    shape="basic2"
                    onClick={() => {
                      props.onDelete(item.id);
                    }}>
                    삭제
                  </Button>
                </Td>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </SectionLayout>
  );
}