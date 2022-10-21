import SectionLayout from 'layouts/SectionLayout';
import {
  Difficulty,
  difficultyList,
  ProjectComplexBuildingId,
  ProjectComplexBuildingVO,
  ProjectComplexSiteId,
  ProjectComplexSiteVO
} from 'project_complex/domain';
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import Button from 'layouts/Button';
import {
  Box,
  InputAdornment,
  MenuItem,
  TableBody,
  TableContainer,
  TableRow,
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
import { ColorPalette } from 'app/view/App/theme';
import {
  buildingTestTypeList,
  TestType,
  testTypeList,
  testTypeName
} from 'type/TestType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  list: ProjectComplexBuildingVO[] | undefined;
  siteList: ProjectComplexSiteVO[] | undefined;
  onAdd: DefaultFunction;
  onUpdate: DefaultFunction<ProjectComplexBuildingParameter>;
  onDelete: DefaultFunction<ProjectComplexBuildingId>;
  openDocumentModal: DefaultFunction<ProjectComplexBuildingId>;
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
            shape="small"
            onClick={props.onAdd}
            sx={{
              marginRight: '10px'
            }}>
            + 추가
          </Button>
          <Button shape="small">
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
                        const value = (e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.name) {
                          props.onUpdate({ id: item.id, name: value });
                        }
                      }
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>대지 모형</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    displayEmpty
                    variant="outlined"
                    value={props.siteList && item.site ? item.site.id : ''}
                    renderValue={(raw) => {
                      const value = props.siteList?.find((site) => site.id === raw);
                      return value?.name ?? '선택';
                    }}
                    onChange={(e) => {
                      const value = (e.target.value || undefined) as ProjectComplexSiteId | undefined;
                      if (item.site?.id !== value) {
                        props.onUpdate({ id: item.id, siteId: value ?? ProjectComplexSiteId(-1) });
                      }
                    }}>
                    {props.siteList?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>평면 형상</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    variant="outlined"
                    key={item.shape}
                    defaultValue={item.shape ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (value !== item.shape) {
                        props.onUpdate({ id: item.id, shape: value });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = (e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.shape) {
                          props.onUpdate({ id: item.id, shape: value });
                        }
                      }
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
                    variant="outlined"
                    type="number"
                    key={item.floorCount}
                    defaultValue={item.floorCount ?? ''}
                    onBlur={(e) => {
                      const value = +e.target.value ?? undefined;
                      if (value !== item.floorCount) {
                        props.onUpdate({ id: item.id, floorCount: value });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = +(e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.floorCount) {
                          props.onUpdate({ id: item.id, floorCount: value });
                        }
                      }
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
                    variant="outlined"
                    type="number"
                    key={item.height}
                    defaultValue={item.height ?? ''}
                    onBlur={(e) => {
                      const value = +e.target.value ?? undefined;
                      if (value !== item.height) {
                        props.onUpdate({ id: item.id, height: value });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = +(e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.height) {
                          props.onUpdate({ id: item.id, height: value });
                        }
                      }
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
                    variant="outlined"
                    type="number"
                    key={item.baseArea}
                    defaultValue={item.baseArea ?? ''}
                    onBlur={(e) => {
                      const value = +e.target.value ?? undefined;
                      if (value !== item.baseArea) {
                        props.onUpdate({ id: item.id, baseArea: value });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = +(e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.baseArea) {
                          props.onUpdate({ id: item.id, baseArea: value });
                        }
                      }
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
                    variant="outlined"
                    type="number"
                    key={item.ratio}
                    defaultValue={item.ratio?.toFixed(4) ?? ''}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>형상비 검토 파일 ID</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Input
                    readOnly
                    variant="outlined"
                    key={item.buildingDocument?.code}
                    defaultValue={item.buildingDocument?.code || '-'}
                    endAdornment={
                      <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                        <FontAwesomeIcon
                          icon="link"
                          style={{
                            fontSize: '13px',
                            color:    ColorPalette._386dd6,
                            cursor:   'pointer',
                          }}
                          onClick={() => {
                            props.openDocumentModal(item.id);
                          }}
                        />
                      </InputAdornment>
                    }
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>특별 풍하중 조건</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    multiple
                    displayEmpty
                    variant="outlined"
                    value={item.conditionList}
                    renderValue={value => {
                      if (!Array.isArray(value) || value.length === 0) {
                        return '선택';
                      }
                      return value.map((v) => `(${v})`)
                                  .join(', ');
                    }}
                    onChange={(e) => {
                      const value = (e.target.value as string[]).sort((a,
                                                                       b
                      ) => a.localeCompare(b));
                      props.onUpdate({ id: item.id, conditionList: value });
                    }}>
                    {['2', '3', '4', '5'].map((value) => (
                      <MenuItem key={value} value={value}>
                        <Checkbox
                          readOnly
                          checked={item.conditionList?.includes(value)}
                          value={value}
                        />
                        <Box sx={{
                          fontSize:   '13px',
                          color:      ColorPalette._252627,
                          marginLeft: '6px',
                          display:    'flex',
                        }}>
                          ({value})
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>실험 대상 여부</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Box sx={{
                    display:        'flex',
                    flexWrap:       'nowrap',
                    width:          '100%',
                    height:         '100%',
                    justifyContent: 'center',
                    alignItems:     'center',
                  }}>
                    <Checkbox
                      defaultChecked={item.inTest}
                      onChange={() => {
                        props.onUpdate({ id: item.id, inTest: !item.inTest });
                      }}
                    />
                    <Box sx={{
                      fontSize:   '13px',
                      color:      ColorPalette._252627,
                      marginLeft: '6px',
                      display:    'flex',
                    }}>
                      (1)
                    </Box>
                  </Box>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>실험 종류</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    multiple
                    displayEmpty
                    variant="outlined"
                    value={item.testTypeList}
                    renderValue={value => {
                      if (!Array.isArray(value) || value.length === 0) {
                        return '선택';
                      }
                      return value.map(testTypeName)
                                  .join(', ');
                    }}
                    onChange={(e) => {
                      const value = (e.target.value as TestType[]).sort((a,
                                                                         b
                      ) => testTypeList.indexOf(a) - testTypeList.indexOf(b));
                      props.onUpdate({ id: item.id, testTypeList: value });
                    }}>
                    {buildingTestTypeList.map((value) => (
                      <MenuItem key={value} value={value}>
                        <Checkbox
                          readOnly
                          checked={item.testTypeList?.includes(value)}
                          value={value}
                        />
                        <Box sx={{
                          fontSize:   '13px',
                          color:      ColorPalette._252627,
                          marginLeft: '6px',
                          display:    'flex',
                        }}>
                          {testTypeName(value)}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>견적 제작 난이도</Th>
              {list?.map(item => (
                <Td key={item.id}>
                  <Select
                    displayEmpty
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateFigureDifficulty ?? ''}
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
                    displayEmpty
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateTestDifficulty ?? ''}
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
                    displayEmpty
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateEvaluationDifficulty ?? ''}
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
                    displayEmpty
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateReportDifficulty ?? ''}
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
                    shape="basic3"
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