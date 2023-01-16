import SectionLayout from 'layouts/SectionLayout';
import ButtonSection, { ProjectEstimateListButtonProps } from 'project_estimate/view/EstimateList/ButtonSection';
import {
  ProjectEstimateId,
  ProjectEstimateShortVO,
  ProjectEstimateType,
  projectEstimateTypeName,
} from 'project_estimate/domain';
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import {
  Box,
  MenuItem,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateFormat from 'layouts/DateFormat';
import TextLink from 'layouts/TextLink';
import { DefaultFunction } from 'type/Function';
import Input from 'layouts/Input';
import UserSelector from 'components/UserSelector';
import BusinessSelector from 'components/BusinessSelector';
import Select from 'layouts/Select';
import {
  expectedDateTypeList,
  expectedDateTypeName
} from 'admin/contract/collection/domain';
import { DatePicker } from '@mui/x-date-pickers';

interface Props
  extends ProjectEstimateListButtonProps {
  list?: ProjectEstimateShortVO[];
  openCustomDetailModal: DefaultFunction<ProjectEstimateId>;
  openSystemDetailModal: DefaultFunction<ProjectEstimateId>;
}

export default function ProjectEstimateListSection(props: Props) {

  const {
          list,
          openCustomDetailModal,
          openSystemDetailModal,
        } = props;
  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if (!list || list.length === 0) {
      setModifiedAt(undefined);
    }
    else {
      setModifiedAt(
        list
        .map(item => item.modifiedAt ? item.modifiedAt : item.createdAt)
        .map(date => dayjs(date))
        .reduce((a,
                 b
        ) => a.isAfter(b) ? a : b)
        .toDate()
      );
    }
  }, [list]);
  const date = Date.now();
  return (
    <SectionLayout
      title="견적서"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <ButtonSection
          openCustomAddModal={props.openCustomAddModal}
          openSystemAddModal={props.openSystemAddModal}
          openFinalModal={props.openFinalModal}
        />
      }>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>No.</Th>
                <Th>확정 여부</Th>
                <Th>견적 일자</Th>
                <Th>견적 번호</Th>
                <Th>실험 정보</Th>
                <Th>풍동 금액</Th>
                <Th>구검</Th>
                <Th>총액</Th>
                {/*<Th>일정</Th>*/}
                <Th>견적 구분</Th>
                <Th>견적 업체</Th>
                <Th>등록 일시</Th>
                <Th>등록자</Th>
                <Th>송부 여부</Th>
                <Th>비고</Th>
                <Th>실험정보 입력 여부</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!list || list.length === 0) && (
                <TableRow>
                  <Td colSpan={8}>
                    조회 결과가 없습니다.
                  </Td>
                </TableRow>
              )}
              {list && list.map((item, index) => (
                <TableRow key={item.id} selected={item.confirmed}>
                  <Td>{index + 1}</Td>
                  <Td>{item.confirmed ? 'Y' : 'N'}</Td>
                  <Td>
                    <DateFormat date={item.estimateDate} format="YYYY-MM-DD" />
                  </Td>
                  <Td>
                    <Box sx={{
                      width:          '100%',
                      display:        'flex',
                      flexWrap:       'nowrap',
                      justifyContent: 'space-between',
                      alignItems:     'center',
                    }}>
                      <TextLink
                        onClick={() => {
                          if (item.type === ProjectEstimateType.SYSTEM) {
                            openSystemDetailModal(item.id);
                          }
                          else {
                            openCustomDetailModal(item.id);
                          }
                        }}>
                        {item.code}
                      </TextLink>
                      <IconButton
                        shape="square"
                        onClick={() => {
                          window.open(item.type !== ProjectEstimateType.SYSTEM ? `/project/sales/estimate/${item.id}/file` : `/file-item?projectEstimateId=${item.id}`,
                            '_blank');
                        }}
                        children={<FontAwesomeIcon icon="download" />}
                      />
                    </Box>
                  </Td>
                  <Td>
                    {item.targetTest ?? ''}
                  </Td>
                  <Td>{item.testAmount.toLocaleString()}</Td>
                  <Td>{item.reviewAmount.toLocaleString()}</Td>
                  <Td>{item.totalAmount.toLocaleString()}</Td>
                  <Td>
                    {projectEstimateTypeName(item.type)}
                  </Td>
                  <Td>{item.business ? item.business.name : ''}</Td>
                  <Td>
                    <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                  </Td>
                  <Td>{item.createdBy.name}</Td>
                  <Td>{item.isSent ? 'Y' : 'N'}</Td>
                  <Td>{item.note ?? ''}</Td>
                  <Td>{item.hasExperimentInfo ? 'Y' : 'N'}</Td>
                </TableRow>
              ))}
              <TableRow>
                <Td colSpan={2}>
                  최종 견적서
                </Td>
                <Td>
                  <DatePicker
                    openTo="year"
                    inputFormat="YYYY-MM-DD"
                    mask="____-__-__"
                    value={dayjs(date).format('YYYY-MM-DD')}
                    // value={stage.expectedDate ? dayjs(stage.expectedDate)
                    // .format('YYYY-MM-DD') : null}
                    onChange={(e) => {
                      // const value = e ? dayjs(e)
                      // .format('YYYY-MM-DD') : undefined;
                      // const formikValue = stage.expectedDate ? dayjs(stage.expectedDate)
                      // .format('YYYY-MM-DD') : undefined;
                      // if (formikValue !== value) {
                      //   formik.setFieldValue(`collection.stageList.${i}.expectedDate`, value);
                      // }
                    }}
                    renderInput={(parameter) => (
                      <Input
                        {...parameter.InputProps}
                        inputRef={parameter.inputRef}
                        variant="outlined"
                        value={parameter.value}
                        inputProps={parameter.inputProps}
                      />
                    )}
                  />
                </Td>
                <Td>
                  <Select
                    displayEmpty
                    // value={item.expectedDate ?? ''}
                    variant="outlined"
                    onChange={(e) => {

                    }}>
                    <MenuItem value="">선택</MenuItem>
                    {expectedDateTypeList.map((type) => (
                        <MenuItem key={type} value={type}>
                          {expectedDateTypeName(type)}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Td>
                <Td>
                  <Input
                    // key={}
                    defaultValue={''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    // key={}
                    defaultValue={''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    // key={}
                    defaultValue={''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                    }}
                  />
                </Td>
                <Td>
                  <Input
                    // key={}
                    defaultValue={''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                    }}
                  />
                </Td>
                <Td>
                  <Select
                    displayEmpty
                    // value={item.expectedDate ?? ''}
                    variant="outlined"
                    onChange={(e) => {

                    }}>
                    <MenuItem value="">선택</MenuItem>
                    {expectedDateTypeList.map((type) => (
                        <MenuItem key={type} value={type}>
                          {expectedDateTypeName(type)}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Td>
                <Td>
                  <BusinessSelector
                    // value={item.business?.id ?? ''}
                    onChange={(business) => {
                      // if (item.business?.id !== business.id) {
                      //   props.onUpdate({
                      //     id:         item.id,
                      //     businessId: business.id,
                      //   });
                      // }
                    }}
                  />
                </Td>
                <Td>

                </Td>
                <Td>
                  <UserSelector
                    variant="outlined"
                    // value={item.user?.id}
                    onChange={(value) => {
                      // if (item.user?.id !== value) {
                      //   props.onUpdateInternal({id: item.id, userId: value});
                      // }
                    }}
                  />
                </Td>
                <Td>
                  <Select
                    displayEmpty
                    // value={item.expectedDate ?? ''}
                    variant="outlined"
                    onChange={(e) => {

                    }}>
                    <MenuItem value="">선택</MenuItem>
                    {expectedDateTypeList.map((type) => (
                        <MenuItem key={type} value={type}>
                          {expectedDateTypeName(type)}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Td>
                <Td>
                  <Input
                    // key={}
                    defaultValue={''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                    }}
                  />
                </Td>
                <Td></Td>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SectionLayout>
  );
}
