import SectionLayout from 'layouts/SectionLayout';
import {
  Difficulty,
  difficultyList,
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
  MenuItem,
  TableBody,
  TableContainer,
  TableRow
} from '@mui/material';
import { ProjectComplexBuildingParameter } from 'project_complex/parameter';
import { DefaultFunction } from 'type/Function';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Input from 'layouts/Input';
import Checkbox from 'layouts/Checkbox';
import Select from 'layouts/Select';

interface Props {
  list: ProjectComplexBuildingVO[] | undefined;
  onAdd: DefaultFunction;
  onUpdate: DefaultFunction<ProjectComplexBuildingParameter>;
  onDelete: DefaultFunction<ProjectComplexBuildingId>;
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
        <Table variant="left">
          <TableBody>
            <TableRow>
              <Th>동명</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    type="text"
                    defaultValue={item.name ?? ''}
                    onBlur={(e) => {
                      props.onUpdate({ id: item.id, name: e.target.value || undefined });
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>대지 모형</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  {item.site?.name}
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>평면 형상</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    type="text"
                    defaultValue={item.shape ?? ''}
                    onBlur={(e) => {
                      props.onUpdate({ id: item.id, shape: e.target.value || undefined });
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>층 수</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    type="number"
                    defaultValue={item.floorCount ?? ''}
                    onChange={(e) => {
                      const value = +e.target.value;
                      props.onUpdate({ id: item.id, floorCount: value ?? undefined });
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>건축 높이</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    type="number"
                    defaultValue={item.height ?? ''}
                    onChange={(e) => {
                      const value = +e.target.value;
                      props.onUpdate({ id: item.id, height: value ?? undefined });
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>기준층 바닥 면적</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    type="number"
                    defaultValue={item.baseArea ?? ''}
                    onChange={(e) => {
                      const value = +e.target.value;
                      props.onUpdate({ id: item.id, baseArea: value ?? undefined });
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>형상비</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    readOnly
                    type="number"
                    defaultValue={item.ratio?.toFixed(4) ?? ''}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>형상비 검토 파일 ID</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  {item.buildingDocument?.code}
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>특별 풍하중 조건</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  {item.conditionList?.join(', ')}
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>실험 대상 여부</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Checkbox
                    defaultChecked={item.inTest}
                    onChange={() => {
                      props.onUpdate({ id: item.id, inTest: !item.inTest });
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>실험 종류</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  {item.testTypeList?.join(', ')}
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 제작 난이도</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    variant="standard"
                    defaultValue={item.estimateFigureDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      props.onUpdate({ id: item.id, estimateFigureDifficulty: value });
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 실험 난이도</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    variant="standard"
                    defaultValue={item.estimateTestDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      props.onUpdate({ id: item.id, estimateTestDifficulty: value });
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 평가 난이도</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    variant="standard"
                    defaultValue={item.estimateEvaluationDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      props.onUpdate({ id: item.id, estimateEvaluationDifficulty: value });
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 보고서 난이도</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    variant="standard"
                    defaultValue={item.estimateReportDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      props.onUpdate({ id: item.id, estimateReportDifficulty: value });
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
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