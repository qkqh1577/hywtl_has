import { ColorPalette } from 'app/view/App/theme';
import {
  Box,
  MenuItem,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { FormikContext } from 'formik';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import Select from 'layouts/Select';
import {
  TestType,
  TestUnit,
  testUnitList,
  testUnitName
} from 'type/TestType';
import Input from 'layouts/Input';
import { toAmount } from 'util/NumberUtil';
import Toggle from 'layouts/Toggle';
import Button from 'layouts/Button';
import { ProjectEstimateTemplateDetailParameter } from 'project_estimate/parameter';

type getTestCount = (type: TestType,
                     unit: TestUnit
) => number;

interface TotalAmountCellProps {
  testType: TestType;
  detail: ProjectEstimateTemplateDetailParameter;
  fieldName: string;
  getTestCount: getTestCount;
}

function TotalAmountCell(props: TotalAmountCellProps) {
  const { testType, detail, fieldName, getTestCount } = props;
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  const testCount = getTestCount(testType, detail.unit);
  const totalAmount = useMemo(() => {
    if (!detail || !detail.unitAmount) {
      return undefined;
    }
    return testCount * detail.unitAmount;
  }, [detail, testCount]);

  useEffect(() => {
    if (detail && typeof detail.totalAmount === 'undefined' && typeof totalAmount === 'number') {
      formik.setFieldValue(`${fieldName}.totalAmount`, totalAmount);
    }
  }, [detail, totalAmount]);

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'center',
      padding:        '10px 0'
    }}>
      <Box sx={{ width: '80%', marginBottom: '10px' }}>
        {!edit && !detail.inUse && '미사용'}
        {edit && (
          <Toggle
            onText="사용"
            offText="미사용"
            checked={detail.inUse}
            onChange={() => {
              formik.setFieldValue(`${fieldName}.inUse`, !detail.inUse);
            }}
          />
        )}
      </Box>
      <Box sx={{ width: '100%', marginBottom: '10px' }}>
        <Input
          isAmount
          key={detail.totalAmount}
          disabled={!edit || !detail.inUse}
          variant="outlined"
          defaultValue={detail.totalAmount?.toLocaleString() ?? ''}
          onBlur={(e) => {
            const value = toAmount(e.target.value || 0) || 0;
            if (detail.totalAmount !== value) {
              formik.setFieldValue(`${fieldName}.totalAmount`, value);
            }
          }}
        />
      </Box>
      <Box sx={{ width: '80%', height: '30px' }}>
        {edit && detail.inUse && (
          <Button shape="small" onClick={() => {
            const testCount = getTestCount(testType, detail.unit);
            const totalAmount = detail && detail.unitAmount ? testCount * detail.unitAmount : 0;
            formik.setFieldValue(`${fieldName}.totalAmount`, totalAmount);
          }}>
            자동계산
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const siteList = formik.values.siteList;
  const buildingList = formik.values.buildingList;
  const templateList = formik.values.templateList;

  const totalTestAmount = useMemo((): number => {
    if (!templateList || !Array.isArray(templateList)) {
      return 0;
    }
    const withoutReview = templateList.filter(template => template.testType !== TestType.REVIEW);
    if (withoutReview.length === 0) {
      return 0;
    }
    const onlyUse = withoutReview.map(template => template.detailList)
                                 .reduce((a,
                                          b
                                 ) => [...a, ...b])
                                 .filter(detail => detail.inUse);

    if (!Array.isArray(onlyUse) || onlyUse.length === 0) {
      return 0;
    }
    return onlyUse.map(detail => detail.totalAmount ?? 0)
                  .reduce((a,
                           b
                  ) => a + b);
  }, [templateList]);

  const getTestCount: getTestCount = useCallback((testType,
                                                  unit
  ) => {
    if (testType === TestType.COMMON
      && unit === TestUnit.SITE) {
      return siteList.length;
    }

    if (testType === TestType.COMMON
      && unit === TestUnit.BUILDING) {
      buildingList.length;
    }

    if (testType === TestType.REVIEW
      && unit === TestUnit.SITE) {

      return siteList.length;
    }
    if (testType === TestType.REVIEW
      && unit === TestUnit.BUILDING) {

      return buildingList.length;
    }

    if (testType === TestType.B
      && unit === TestUnit.SITE) {

      return siteList.length;
    }
    if (testType === TestType.B
      && unit === TestUnit.BUILDING) {

      return buildingList.length;
    }

    if (testType === TestType.E
      && unit === TestUnit.SITE) {

      return siteList.filter(site => site.withEnvironmentTest).length;
    }

    if (testType === TestType.F
      && unit === TestUnit.BUILDING) {

      return buildingList.filter(building => !!building.testTypeList?.find(testType => testType === TestType.F)).length;
    }

    if (testType === TestType.P
      && unit === TestUnit.BUILDING) {

      return buildingList.filter(building => !!building.testTypeList?.find(testType => testType === TestType.P)).length;
    }
    if (testType === TestType.A
      && unit === TestUnit.BUILDING) {

      return buildingList.filter(building => !!building.testTypeList?.find(testType => testType === TestType.A)).length;
    }
    return 0;

  }, [siteList, buildingList]);

  return (
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
      <Table disableSticky>
        <TableHead>
          <TableRow>
            <Th colSpan={3} sx={{ width: '270px' }}>용역 항목</Th>
            <Th>단위</Th>
            <Th sx={{ width: '55px' }}>수량</Th>
            <Th sx={{ width: '120px' }}>단가</Th>
            <Th sx={{ width: '120px' }}>금액</Th>
            <Th>비고</Th>
          </TableRow>
        </TableHead>
        <TableBody>
          {templateList && templateList.map((template,
                                             i
          ) => {
            if (!template) {
              return null;
            }
            return template.detailList && template.detailList.map((detail,
                                                                   j
            ) => {
              if (!detail) {
                return null;
              }

              return detail.titleList && detail.titleList.map((title,
                                                               k
              ) => (
                <TableRow key={`${i}_${j}_${k}`}>
                  {j === 0 && k === 0 && (
                    <Td rowSpan={template.detailCount}>
                      {i + 1}
                    </Td>
                  )}
                  {j === 0 && k === 0 && (
                    <Td rowSpan={template.detailCount}>
                      {template.title}
                    </Td>
                  )}
                  <Td sx={{
                    textAlign:    'left',
                    borderBottom: k === detail.titleList.length - 1 ? 'auto' : 'none',
                    borderRight:  'none !important',
                  }}>
                    {title}
                  </Td>
                  {k === 0 && (
                    <Td rowSpan={detail.titleList.length}>
                      <Select
                        disabled={!edit}
                        variant="outlined"
                        value={detail.unit ?? ''}
                        onChange={(e) => {
                          const value = e.target.value || undefined;
                          if (detail.unit !== value) {
                            formik.setFieldValue(`templateList.${i}.detailList.${j}.unit`, value);
                          }
                        }}>
                        {testUnitList.map((item) => (
                          <MenuItem key={item} value={item}>{testUnitName(item)}</MenuItem>
                        ))}
                      </Select>
                    </Td>
                  )}
                  {k === 0 && (
                    <Td rowSpan={detail.titleList.length}>
                      {getTestCount(template.testType, detail.unit)}
                    </Td>
                  )}
                  {k === 0 && (
                    <Td rowSpan={detail.titleList.length}>
                      <Input
                        isAmount
                        key={detail.unitAmount}
                        disabled={!edit}
                        variant="outlined"
                        defaultValue={detail.unitAmount?.toLocaleString() ?? ''}
                        onBlur={(e) => {
                          const value = toAmount(e.target.value || 0) || 0;
                          if (detail.unitAmount !== value) {
                            formik.setFieldValue(`templateList.${i}.detailList.${j}.unitAmount`, value);
                          }
                        }}
                      />
                    </Td>
                  )}
                  {k === 0 && (
                    <Td rowSpan={detail.titleList.length}>
                      <TotalAmountCell
                        key={detail.totalAmount}
                        testType={template.testType}
                        fieldName={`templateList.${i}.detailList.${j}`}
                        detail={detail}
                        getTestCount={getTestCount}
                      />
                    </Td>
                  )}
                  {k === 0 && (
                    <Td rowSpan={detail.titleList.length}>
                      <Box sx={{
                        width:   '100%',
                        padding: '10px 0',
                        height:  '100%',
                      }}>
                        <Input
                          multiline
                          fullHeight
                          key={detail.note}
                          disabled={!edit}
                          variant="outlined"
                          defaultValue={detail.note ?? ''}
                          onBlur={(e) => {
                            const value = e.target.value || undefined;
                            if (detail.note !== value) {
                              formik.setFieldValue(`templateList.${i}.detailList.${j}.note`, value);
                            }
                          }}
                        />
                      </Box>
                    </Td>
                  )}
                </TableRow>
              ));
            });
          })}

          <TableRow>
            <Td colSpan={3} />
            <Td align="right" colSpan={3}>
              풍동 실험 소계
            </Td>
            <Td>
              <Input
                isAmount
                readOnly
                key={totalTestAmount}
                variant="outlined"
                defaultValue={totalTestAmount.toLocaleString() ?? 0}
              />
            </Td>
            <Td />
          </TableRow>
          <TableRow>
            <Td colSpan={3} />
            <Td align="right" colSpan={3}>
              특별 할인
            </Td>
            <Td>
              <Input
                isAmount
                key={formik.values.plan?.discountAmount}
                disabled={!edit}
                variant="outlined"
                defaultValue={formik.values.plan?.discountAmount?.toLocaleString() ?? 0}
                onBlur={(e) => {
                  const value = toAmount(e.target.value || 0) || 0;
                  if (formik.values.plan?.discountAmount !== value) {
                    formik.setFieldValue('plan.discountAmount', value);
                  }
                }}
              />
            </Td>
            <Td />
          </TableRow>
        </TableBody>
      </Table>

    </Box>
  );
}