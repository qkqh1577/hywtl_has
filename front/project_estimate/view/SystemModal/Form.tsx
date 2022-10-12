import {
  Box,
  InputAdornment,
  MenuItem,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import React, { useContext } from 'react';
import { DefaultFunction } from 'type/Function';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'components/DataFieldLabel';
import TextBox from 'layouts/Text';
import Select from 'layouts/Select';
import { ColorPalette } from 'app/view/App/theme';
import SectionLayout from 'layouts/SectionLayout';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Checkbox from 'layouts/Checkbox';
import {
  Difficulty,
  difficultyList,
} from 'project_complex/domain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  buildingTestTypeList,
  TestType,
  testTypeList,
  testTypeName
} from 'type/TestType';
import { getRatio } from 'project_complex/util';

interface Props {
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  openDocumentModal: DefaultFunction<number>;
}

export default function ProjectSystemEstimateModalForm(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const siteList = formik.values.siteList;
  const buildingList = formik.values.buildingList;

  return (
    <Box sx={{
      width:          '100%',
      height:         '75vh',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      alignContent:   'flex-start'
    }}>
      <Box
        sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: edit ? 'space-between' : 'flex-end',
          height:         '50px',
          paddingBottom:  '10px',
          borderBottom:   `1px solid ${ColorPalette._e4e9f2}`
        }}>
        {!edit && (
          <Box sx={{
            display:        'flex',
            flexWrap:       'nowrap',
            width:          '60%',
            justifyContent: 'space-between',
            alignItems:     'center',
          }}>
            <Box sx={{ width: '30%' }}>
              <DataFieldWithLabel label="견적 구분">
                <Input
                  disabled
                  defaultValue="시스템"
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '30%' }}>
              <DataFieldWithLabel label="견적 번호">
                <Input
                  disabled
                  value={formik.values.code ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '30%' }}>
              <DataFieldWithLabel label="최종 여부">
                <Input
                  disabled
                  value={formik.values.confirmed ? 'Y' : 'N'}
                />
              </DataFieldWithLabel>
            </Box>
          </Box>
        )}
        <Box sx={{
          display:                      'flex',
          justifyContent:               'flex-end',
          alignItems:                   'center',
          '&> button:not(:last-child)': {
            marginRight: '10px',
          }
        }}>
          {edit && (
            <Button onClick={() => {
              formik.handleSubmit();
            }}>
              저장
            </Button>
          )}
          {edit && (
            <Button shape="basic2" onClick={props.onCancel}>취소</Button>
          )}
          {!edit && (
            <Button shape="basic3" onClick={props.onDelete}>삭제</Button>
          )}
          {!edit && (
            <Button shape="basic3" onClick={() => {
              formik.setFieldValue('edit', true);
            }}>수정</Button>
          )}
          {!edit && (
            <Button>PDF 다운로드</Button>
          )}
          {!edit && (
            <Button shape="basic4">계약서 등록</Button>
          )}
        </Box>
      </Box>
      <Box sx={{
        width:    '100%',
        display:  'flex',
        height:   'calc(100% - 40px)',
        flexWrap: 'nowrap',
      }}>
        <Box sx={{
          width:        '40%',
          display:      'flex',
          flexWrap:     'wrap',
          alignContent: 'flex-start',
          height:       '100%',
        }}>
          <Box sx={{
            display:      'flex',
            flexWrap:     'wrap',
            width:        '100%',
            border:       `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius: '5px',
            height:       '200px',
            margin:       '10px 0px',
            padding:      '10px',
          }}>
            <Box sx={{ width: '45%', marginRight: '55%', marginBottom: '15px' }}>
              <DataFieldWithLabel required={edit} labelWidth={60} label="송부 여부">
                <Select
                  disabled={!edit}
                  value={formik.values.isSent ? 'Y' : 'N'}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (value === 'Y') {
                      formik.setFieldValue('isSent', true);
                    }
                    else if (value === 'N') {
                      formik.setFieldValue('isSent', false);
                    }
                    else {
                      formik.setFieldValue('isSent', undefined);
                    }
                  }}
                >
                  <MenuItem value="Y">Y</MenuItem>
                  <MenuItem value="N">N</MenuItem>
                </Select>
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '90%', marginBottom: '15px' }}>
              <DataFieldWithLabel required={edit} labelWidth={60} label="송신처">
                <Input
                  disabled={!edit}
                  value={formik.values.recipient ?? ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (formik.values.recipient !== value) {
                      formik.setFieldValue('recipient', value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
            <Box sx={{ width: '90%', marginBottom: '15px' }}>
              <DataFieldWithLabel labelWidth={60} label="비고">
                <Input
                  disabled={!edit}
                  value={formik.values.note ?? ''}
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (formik.values.note !== value) {
                      formik.setFieldValue('note', value);
                    }
                  }}
                />
              </DataFieldWithLabel>
            </Box>
          </Box>
          <Box sx={{
            width:                        '100%',
            overflow:                     'scroll',
            height:                       'calc(100% - 220px)',
            display:                      'flex',
            flexWrap:                     'wrap',
            alignContent:                 'flex-start',
            border:                       `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius:                 '5px',
            padding:                      '10px',
            '&::-webkit-scrollbar':       {
              width:           '10px',
              height:          '10px',
              backgroundColor: ColorPalette._e4e9f2,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: ColorPalette._697183,
            }
          }}>
            <TextBox variant="body19" sx={{ marginRight: '10px' }}>형상비</TextBox>
            <TextBox variant="body12">이곳에서 수정된 대지모형 정보와 동 정보는 실제 '단지 정보'에 반영되지 않습니다</TextBox>
            <Box sx={{
              display:   'flex',
              flexWrap:  'wrap',
              minWidth:  '1000px',
              minHeight: '1000px',
              padding:   '10px 0'
            }}>
              <Box sx={{
                width:        '100%',
                marginBottom: '10px',
              }}>
                <SectionLayout
                  disableFold
                  title="대지 모형"
                  titleLeftComponent={
                    <Button shape="small" onClick={() => {
                      formik.setFieldValue('siteList', [...siteList, {}]);
                    }}>
                      + 추가
                    </Button>
                  }>
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
                      {siteList.map((item,
                                     i
                      ) => (
                        <TableRow key={i}>
                          <Td>
                            <Input
                              type="text"
                              variant="outlined"
                              defaultValue={item.name ?? ''}
                              onBlur={(e) => {
                                const value = e.target.value || undefined;
                                if (value !== item.name) {
                                  formik.setFieldValue(`siteList.${i}.name`, value);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key.toLowerCase() === 'enter') {
                                  const value = (e.target as HTMLInputElement).value || undefined;
                                  if (value !== item.name) {
                                    formik.setFieldValue(`siteList.${i}.name`, value);
                                  }
                                }
                              }}
                            />
                          </Td>
                          <Td>
                            <Checkbox
                              checked={item.withEnvironmentTest}
                              onChange={() => {
                                formik.setFieldValue(`siteList.${i}.withEnvironmentTest`, !item.withEnvironmentTest);
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
                                  formik.setFieldValue(`siteList.${i}.estimateFigureDifficulty`, value);
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
                                  formik.setFieldValue(`siteList.${i}.figureDifficulty`, value);
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
                            <Button shape="basic3" onClick={() => {
                              formik.setFieldValue('siteList', siteList.filter((site,
                                                                                j
                              ) => j !== i));
                            }}>
                              삭제
                            </Button>
                          </Td>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </SectionLayout>
              </Box>
              <Box sx={{
                width:        '100%',
                marginBottom: '10px',
              }}>
                <SectionLayout
                  disableFold
                  title="동"
                  titleLeftComponent={
                    <Button shape="small" onClick={() => {
                      formik.setFieldValue('buildingList', [...buildingList, {}]);
                    }}>
                      + 추가
                    </Button>
                  }>
                  <Table variant="left">
                    <TableBody>
                      <TableRow>
                        <Th>동명</Th>
                        {buildingList.map((item,
                                           i
                        ) => (
                          <Td key={i}>
                            <Input
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
                          <Td key={i}>
                            <Select
                              displayEmpty
                              variant="outlined"
                              value={item.siteId ?? ''}
                              renderValue={(raw) => {
                                const value = siteList.find((site) => site.id === raw);
                                return value?.name ?? '선택';
                              }}
                              onChange={(e) => {
                                const value = e.target.value || undefined;
                                if (item.siteId !== value) {
                                  formik.setFieldValue(`buildingList.${i}.siteId`, value);
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
                          <Td key={i}>
                            <Input
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
                          <Td key={i}>
                            <Input
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
                          <Td key={i}>
                            <Input
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
                          <Td key={i}>
                            <Input
                              variant="outlined"
                              type="number"
                              defaultValue={item.baseArea ?? ''}
                              onChange={(e) => {
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
                        ) => (
                          <Td key={i}>
                            <Input
                              readOnly
                              variant="outlined"
                              type="number"
                              value={getRatio(item.height, item.baseArea)}
                            />
                          </Td>
                        ))}
                      </TableRow>
                      <TableRow>
                        <Th>형상비 검토 파일 ID</Th>
                        {buildingList.map((item,
                                           i
                        ) => (
                          <Td key={i}>
                            <Input
                              readOnly
                              variant="outlined"
                              value={item.buildingDocument?.code || '-'}
                              endAdornment={
                                <InputAdornment position="end">
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
                              }
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
                                formik.setFieldValue(`buildingList.${i}.conditionList`, value);
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
                                defaultChecked={item.inTest}
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
                                formik.setFieldValue(`buildingList.${i}.testTypeList`, value);
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
                        {buildingList.map((item,
                                           i
                        ) => (
                          <Td key={i}>
                            <Select
                              displayEmpty
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
                    </TableBody>
                  </Table>
                </SectionLayout>

              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          width: '60%',
        }}>

        </Box>

      </Box>
    </Box>);
}
