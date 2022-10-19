import SectionLayout from 'layouts/SectionLayout';
import Button from 'layouts/Button';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Box,
  InputAdornment,
  MenuItem,
  TableBody,
  TableRow
} from '@mui/material';
import Input from 'layouts/Input';
import Select from 'layouts/Select';
import { getRatio } from 'project_complex/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorPalette } from 'app/view/App/theme';
import Checkbox from 'layouts/Checkbox';
import {
  buildingTestTypeList,
  TestType,
  testTypeList,
  testTypeName
} from 'type/TestType';
import {
  Difficulty,
  difficultyList
} from 'project_complex/domain';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';

interface Props {
  openDocumentModal: DefaultFunction<number>;
}

export default function (props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const siteList = formik.values.siteList;
  const buildingList = formik.values.buildingList;
  return (
    <Box sx={{
      width:        '100%',
      marginBottom: '10px',
    }}>
      <SectionLayout
        disableFold
        title="동"
        titleLeftComponent={edit && (
          <Button shape="small" onClick={() => {
            formik.setFieldValue('buildingList', [...buildingList, {}]);
          }}>
            + 추가
          </Button>
        )}>
        <Table variant="left">
          <TableBody>
            <TableRow>
              <Th>동명</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.name}`}>
                  <Input
                    readOnly={!edit}
                    variant="outlined"
                    type="text"
                    defaultValue={item.name ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (value !== item.name) {
                        formik.setFieldValue(`buildingList.${i}.name`, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = (e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.name) {
                          formik.setFieldValue(`buildingList.${i}.name`, value);
                        }
                      }
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>대지 모형</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.siteSeq}`}>
                  <Select
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    value={item.siteSeq ?? ''}
                    renderValue={(raw) => {
                      const value = siteList.find((site) => site.id === raw);
                      return value?.name ?? '선택';
                    }}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (item.siteSeq !== value) {
                        formik.setFieldValue(`buildingList.${i}.siteSeq`, value);
                      }
                    }}>
                    {siteList.map((site,
                                   j
                    ) => (
                      <MenuItem key={j} value={j}>
                        {site.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>평면 형상</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.shape}`}>
                  <Input
                    readOnly={!edit}
                    variant="outlined"
                    type="text"
                    defaultValue={item.shape ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (value !== item.shape) {
                        formik.setFieldValue(`buildingList.${i}.shape`, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = (e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.shape) {
                          formik.setFieldValue(`buildingList.${i}.shape`, value);
                        }
                      }
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>층 수</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.floorCount}`}>
                  <Input
                    readOnly={!edit}
                    variant="outlined"
                    type="number"
                    defaultValue={item.floorCount ?? ''}
                    onBlur={(e) => {
                      const value = +e.target.value ?? undefined;
                      if (value !== item.floorCount) {
                        formik.setFieldValue(`buildingList.${i}.floorCount`, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = +(e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.floorCount) {
                          formik.setFieldValue(`buildingList.${i}.floorCount`, value);
                        }
                      }
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>건축 높이</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.height}`}>
                  <Input
                    readOnly={!edit}
                    variant="outlined"
                    type="number"
                    defaultValue={item.height ?? ''}
                    onBlur={(e) => {
                      const value = +e.target.value ?? undefined;
                      if (value !== item.height) {
                        formik.setFieldValue(`buildingList.${i}.height`, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = +(e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.height) {
                          formik.setFieldValue(`buildingList.${i}.height`, value);
                        }
                      }
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>기준층 바닥 면적</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.baseArea}`}>
                  <Input
                    readOnly={!edit}
                    variant="outlined"
                    type="number"
                    defaultValue={item.baseArea ?? ''}
                    onBlur={(e) => {
                      const value = +e.target.value ?? undefined;
                      if (value !== item.baseArea) {
                        formik.setFieldValue(`buildingList.${i}.baseArea`, value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === 'enter') {
                        const value = +(e.target as HTMLInputElement).value ?? undefined;
                        if (value !== item.baseArea) {
                          formik.setFieldValue(`buildingList.${i}.baseArea`, value);
                        }
                      }
                    }}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>형상비</Th>
              {buildingList.map((item,
                                 i
              ) => {
                const ratio = getRatio(item.height, item.baseArea);
                return (
                  <Td key={`${i}_${ratio}`}>
                    <Input
                      readOnly
                      variant="outlined"
                      value={ratio}
                    />
                  </Td>
                );
              })}
            </TableRow>
            <TableRow>
              <Th>형상비 검토 파일 ID</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={`${i}_${item.buildingDocument?.id}`}>
                  <Input
                    readOnly
                    variant="outlined"
                    defaultValue={item.buildingDocument?.code || '-'}
                    endAdornment={edit && (
                      <InputAdornment position="end" sx={{ marginRight: '10px' }}>
                        <FontAwesomeIcon
                          icon="link"
                          style={{
                            fontSize: '13px',
                            color:    ColorPalette._386dd6,
                            cursor:   'pointer',
                          }}
                          onClick={() => {
                            props.openDocumentModal(i);
                          }}
                        />
                      </InputAdornment>
                    )}
                  />
                </Td>
              ))}
            </TableRow>
            <TableRow>
              <Th>특별 풍하중 조건</Th>
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Select
                    multiple
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    value={item.conditionList ?? []}
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
                      formik.setFieldValue(`buildingList.${i}.conditionList`, value);
                    }}>
                    {['2', '3', '4', '5'].map((value) => (
                      <MenuItem key={value} value={value}>
                        <Checkbox
                          readOnly
                          checked={!!item.conditionList?.includes(value)}
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
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Box sx={{
                    display:        'flex',
                    flexWrap:       'nowrap',
                    width:          '100%',
                    height:         '100%',
                    justifyContent: 'center',
                    alignItems:     'center',
                  }}>
                    <Checkbox
                      readOnly={!edit}
                      checked={!!item.inTest}
                      onChange={() => {
                        formik.setFieldValue(`buildingList.${i}.inTest`, !item.inTest);
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
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Select
                    multiple
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    value={item.testTypeList ?? []}
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
                      formik.setFieldValue(`buildingList.${i}.testTypeList`, value);
                    }}>
                    {buildingTestTypeList.map((value) => (
                      <MenuItem key={value} value={value}>
                        <Checkbox
                          readOnly
                          checked={!!item.testTypeList?.includes(value)}
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
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Select
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateFigureDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      formik.setFieldValue(`buildingList.${i}.estimateFigureDifficulty`, value);
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
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Select
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateTestDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      formik.setFieldValue(`buildingList.${i}.estimateTestDifficulty`, value);
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
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Select
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateEvaluationDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      formik.setFieldValue(`buildingList.${i}.estimateEvaluationDifficulty`, value);
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
              {buildingList.map((item,
                                 i
              ) => (
                <Td key={i}>
                  <Select
                    displayEmpty
                    readOnly={!edit}
                    variant="outlined"
                    renderValue={(value) => value as any || '선택'}
                    value={item.estimateReportDifficulty ?? ''}
                    onChange={(e) => {
                      const value = (e.target.value as Difficulty) || undefined;
                      formik.setFieldValue(`buildingList.${i}.estimateReportDifficulty`, value);
                    }}>
                    {difficultyList.map(item => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </Td>
              ))}
            </TableRow>
            {edit && (
              <TableRow>
                <Th>삭제</Th>
                {buildingList.map((item,
                                   i
                ) => (
                  <Td key={i}>
                    <Button
                      shape="basic3"
                      onClick={() => {
                        formik.setFieldValue('buildingList', buildingList.filter((building,
                                                                                  j
                        ) => i !== j));
                      }}>
                      삭제
                    </Button>
                  </Td>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </SectionLayout>

    </Box>
  );
}