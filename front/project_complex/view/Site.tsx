import React, {
  useEffect,
  useState
} from 'react';
import {
  Difficulty,
  difficultyList,
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
  MenuItem,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';
import ProjectComplexTestSection from 'project_complex/view/TestSection';
import Select from 'layouts/Select';
import Checkbox from 'layouts/Checkbox';
import Input from 'layouts/Input';

interface Props {
  list: ProjectComplexSiteVO[] | undefined;
  onAdd: DefaultFunction;
  onUpdate: (params: ProjectComplexSiteParameter) => void;
  onDelete: (id: ProjectComplexSiteId) => void;
  testDetail: ProjectComplexTestVO | undefined;
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
      titleRightComponent={
        <Button onClick={props.onAdd}>
          + 추가
        </Button>
      }
      modifiedAt={modifiedAt}
    >
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{
          width:        '100%',
          display:      'flex',
          marginBottom: '15px',
        }}>
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
                <TableRow key={item.id}>
                  <Td>
                    <Input
                      type="text"
                      variant="outlined"
                      defaultValue={item.name ?? ''}
                      onBlur={(e) => {
                        const value = e.target.value || undefined;
                        if (value !== item.name) {
                          props.onUpdate({ id: item.id, name: value });
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key.toLowerCase() === 'enter') {
                          const value = (e.target as HTMLInputElement).value || undefined;
                          if (value !== item.name) {
                            props.onUpdate({ id: item.id, name: value });
                          }
                        }
                      }}
                    />
                  </Td>
                  <Td>
                    <Checkbox
                      checked={item.withEnvironmentTest}
                      onChange={() => {
                        props.onUpdate({ id: item.id, withEnvironmentTest: !item.withEnvironmentTest });
                      }}
                    />
                  </Td>
                  <Td>
                    <Select
                      variant="outlined"
                      value={item.estimateFigureDifficulty ?? ''}
                      onChange={(e) => {
                        const value = (e.target.value as Difficulty) || undefined;
                        if (item.estimateFigureDifficulty !== value) {
                          props.onUpdate({ id: item.id, estimateFigureDifficulty: value });
                        }
                      }}>
                      {difficultyList.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </Td>
                  <Td>
                    <Select
                      variant="outlined"
                      value={item.figureDifficulty ?? ''}
                      onChange={(e) => {
                        const value = (e.target.value as Difficulty) || undefined;
                        if (item.figureDifficulty !== value) {
                          props.onUpdate({ id: item.id, figureDifficulty: value });
                        }
                      }}>
                      {difficultyList.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </Td>
                  <Td>
                    담당자
                  </Td>
                  <Td>
                    <Button shape="basic2" onClick={() => {props.onDelete(item.id);}}>삭제</Button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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