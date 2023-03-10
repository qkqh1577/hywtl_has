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
  Box, Fade,
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
import UserSelector from 'components/UserSelector';
import CircularProgress from "../../components/CircularProgress";
import {UserId} from "../../user/domain";

interface Props {
  list: ProjectComplexSiteVO[] | undefined;
  loading: boolean,
  onAdd: DefaultFunction;
  onUpdate: (params: ProjectComplexSiteParameter) => void;
  onDelete: (id: ProjectComplexSiteId) => void;
  testDetail: ProjectComplexTestVO | undefined;
}

export default function ProjectComplexSiteSection(props: Props) {
  const {
          list, loading
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
        <Button shape="small" onClick={props.onAdd}>
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
                <Th width="20%">대지 모형</Th>
                <Th width="20%">실험 종류 E 여부</Th>
                <Th width="20%">견적 대지 모형 제작 난이도</Th>
                <Th width="15%">대지 모형 제작 난이도</Th>
                <Th width="15%">담당자</Th>
                <Th width="10%">삭제</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && !list && (
                <TableRow>
                  <Td colSpan={6}>
                    <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
                  </Td>
                </TableRow>
              )}
              {list?.length === 0 && (
                <TableRow>
                  <Td colSpan={6}>
                    <Fade in>
                      <span>조회 결과가 없습니다.</span>
                    </Fade>
                  </Td>
                </TableRow>
              )}
              {list && list.map((item) => (
                <TableRow key={item.id}>
                  <Td>
                    <Input
                      variant="outlined"
                      key={item.name}
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
                      checked={item.withEnvironmentTest ?? false}
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
                    <UserSelector
                      variant="outlined"
                      value={item.manager?.id}
                      onChange={(value) => {
                        if (item.manager?.id !== value) {
                          props.onUpdate({ id: item.id, managerId: value as UserId});
                        }
                      }}
                    />
                  </Td>
                  <Td>
                    <Button shape="basic3" onClick={() => {props.onDelete(item.id);}}>삭제</Button>
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
