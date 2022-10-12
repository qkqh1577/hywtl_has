import React, {
  useContext,
  useState
} from 'react';
import { FormikContext } from 'formik';
import {
  Box,
  InputAdornment,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import DataFieldWithLabel from 'components/DataFieldLabel';
import { ColorPalette } from 'app/view/App/theme';
import dayjs from 'dayjs';
import Input from 'layouts/Input';
import { DatePicker } from '@mui/x-date-pickers';
import { ProjectEstimatePlanParameter } from 'project_estimate/parameter';
import TextBox from 'layouts/Text';
import { toAmountKor } from 'util/NumberUtil';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'layouts/Button';

interface Props {

}

export default function ProjectSystemEstimateModalRightForm(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const siteList = formik.values.siteList;
  const buildingList = formik.values.buildingList;
  const templateList = formik.values.templateList;
  const contentList = formik.values.contentList;
  const [plan, setPlan] = useState<Partial<ProjectEstimatePlanParameter>>({});
  const [tempContent, setTempContent] = useState<string>();

  return (
    <Box sx={{
      width:                        '60%',
      display:                      'flex',
      flexWrap:                     'wrap',
      alignContent:                 'flex-start',
      height:                       '100%',
      padding:                      '10px',
      overflowY:                    'scroll',
      overflowX:                    'hidden',
      '&::-webkit-scrollbar':       {
        width:           '10px',
        height:          '10px',
        backgroundColor: ColorPalette._e4e9f2,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: ColorPalette._697183,
      }
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        border:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:   '5px',
        margin:         '10px 0px',
        padding:        '10px',
        justifyContent: 'space-between',
        alignItems:     'center',
        '& > div':      {
          display:    'flex',
          alignItems: 'center',
          width:      'calc(100% / 7)',
          margin:     '10px'
        }
      }}>
        <Box>
          <DataFieldWithLabel label="견적 일자" labelPosition="top" required={edit}>
            <DatePicker
              value={plan?.estimateDate ? dayjs(plan?.estimateDate)
              .format('YYYY-MM-DD') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="month"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('plan.estimateDate', undefined);
                }
                else {
                  formik.setFieldValue('plan.estimateDate', dayjs(e)
                  .format('YYYY-MM-DD'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="착수 가능일" labelPosition="top" required={edit}>
            <DatePicker
              value={plan?.expectedServiceDate ? dayjs(plan?.expectedServiceDate)
              .format('YYYY-MM-DD') : null}
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              openTo="month"
              onChange={(e) => {
                if (e === null) {
                  formik.setFieldValue('plan.expectedServiceDate', undefined);
                }
                else {
                  formik.setFieldValue('plan.expectedServiceDate', dayjs(e)
                  .format('YYYY-MM-DD'));
                }
              }}
              renderInput={(parameter) => (
                <Input
                  {...parameter.InputProps}
                  inputRef={parameter.inputRef}
                  value={parameter.value}
                  inputProps={parameter.inputProps}
                />
              )}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="견적 담당자1" labelPosition="top" required={edit}>
            TBD
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="견적 담당자2" labelPosition="top" required={edit}>
            TBD
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="설풍 납품 가능 주" labelPosition="top" required={edit}>
            <Input
              type="number"
              disabled={!edit}
              value={plan.expectedTestDeadline ?? ''}
              onChange={(e) => {
                const value = +(e.target.value) || undefined;
                if (plan.expectedTestDeadline !== value) {
                  setPlan({ ...formik.values.plan, expectedTestDeadline: value });
                }
              }}
              onBlur={() => {
                formik.setFieldValue('plan', plan);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <TextBox variant="body12">주</TextBox>
                </InputAdornment>
              }
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="최종 보고서 납품 가능 주" labelPosition="top" required={edit}>
            <Input
              type="number"
              disabled={!edit}
              value={plan.expectedFinalReportDeadline ?? ''}
              onChange={(e) => {
                const value = +(e.target.value) || undefined;
                if (plan.expectedFinalReportDeadline !== value) {
                  setPlan({ ...formik.values.plan, expectedFinalReportDeadline: value });
                }
              }}
              onBlur={() => {
                formik.setFieldValue('plan', plan);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <TextBox variant="body12">주</TextBox>
                </InputAdornment>
              }
            />
          </DataFieldWithLabel>
        </Box>
      </Box>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        border:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:   '5px',
        margin:         '10px 0px',
        padding:        '10px',
        justifyContent: 'center',
        alignItems:     'center',
      }}>
        <TextBox variant="body2" sx={{ marginRight: '4px' }}>합계(부가세 별도):</TextBox>
        <TextBox variant="body1" sx={{ marginRight: '4px' }}>{toAmountKor(plan.totalAmount ?? 0)}</TextBox>
        <TextBox variant="body1">{`(￦${(plan.totalAmount ?? 0).toLocaleString()})`}</TextBox>
      </Box>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        border:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:   '5px',
        margin:         '10px 0px',
        padding:        '10px',
        justifyContent: 'center',
        alignItems:     'center',
      }}>

      </Box>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        border:         `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius:   '5px',
        margin:         '10px 0px',
        padding:        '10px',
        justifyContent: 'center',
        alignItems:     'center',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th />
              <Th sx={{ width: '80%' }}>내용</Th>
              <Th>순서</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {contentList.map((content,
                              i
            ) => (
              <TableRow key={`${i}_${content}`}>
                <Td>
                  <Box sx={{
                    display:        'flex',
                    width:          '100%',
                    flexWrap:       'nowrap',
                    justifyContent: 'center',
                  }}>
                    <IconButton
                      shape="square"
                      onClick={() => {
                        formik.setFieldValue('contentList', contentList.filter((c,
                                                                                j
                        ) => j !== i));
                      }}>
                      <FontAwesomeIcon icon="minus" />
                    </IconButton>
                  </Box>
                </Td>
                <Td>
                  <Input
                    defaultValue={content ?? ''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (content !== value) {
                        const result: (string | undefined)[] = [];
                        for (let j = 0; j < contentList.length; j++) {
                          result.push(i === j ? value : contentList[j]);
                        }
                        formik.setFieldValue('contentList', result);
                      }
                    }}
                  />
                </Td>
                <Td>
                  <Box sx={{
                    display:        'flex',
                    width:          '100%',
                    justifyContent: 'space-around',
                    flexWrap:       'nowrap',
                  }}>
                    <IconButton
                      shape="square"
                      disabled={i === 0}
                      onClick={() => {
                        const result: (string | undefined)[] = [];
                        for (let j = 0; j < contentList.length; j++) {
                          if (result.length === i - 1) {
                            result.push(contentList[j]);
                          }
                          result.push(content);
                        }
                        formik.setFieldValue('contentList', result);
                      }}>
                      <FontAwesomeIcon icon="angle-up" />
                    </IconButton>
                    <IconButton
                      shape="square"
                      disabled={i === contentList.length - 1}
                      onClick={() => {
                        const result: (string | undefined)[] = [];
                        for (let j = 0; j < contentList.length; j++) {
                          result.push(contentList[j]);
                          if (result.length === i + 1) {
                            result.push(content);
                          }
                        }
                        formik.setFieldValue('contentList', result);
                      }}>
                      <FontAwesomeIcon icon="angle-down" />
                    </IconButton>
                  </Box>
                </Td>
              </TableRow>
            ))}
            <TableRow>
              <Td colSpan={2}>
                <Input
                  value={tempContent ?? ''}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (tempContent !== value) {
                      setTempContent(value);
                    }
                  }}
                />
              </Td>
              <Td>
                <Button
                  disabled={!tempContent}
                  shape="small"
                  onClick={() => {
                    if (!tempContent) {
                      return;
                    }
                    formik.setFieldValue('contentList', [...contentList, tempContent]);
                    setTempContent(undefined);
                  }}>
                  추가
                </Button>
              </Td>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}