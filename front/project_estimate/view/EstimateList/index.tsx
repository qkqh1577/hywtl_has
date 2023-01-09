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
  console.log("list : ", list);
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
                <Th>견적 번호</Th>
                <Th>견적 구분</Th>
                <Th>견적 업체</Th>
                <Th>최종 여부</Th>
                <Th>등록 일시</Th>
                <Th>등록자</Th>
                <Th>송부 여부</Th>
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
              {list && list.map((item) => (
                <TableRow key={item.id} selected={item.confirmed}>
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
                          window.open(item.type !== ProjectEstimateType.SYSTEM ? `/file-item/${item.id}` : `/file-item?projectEstimateId=${item.id}`,
                            '_blank');
                        }}
                        children={<FontAwesomeIcon icon="download" />}
                      />
                    </Box>
                  </Td>
                  <Td>
                    {projectEstimateTypeName(item.type)}
                  </Td>
                  <Td>{item.business ? item.business.name : ""}</Td>
                  <Td>{item.confirmed ? 'Y' : 'N'}</Td>
                  <Td>
                    <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                  </Td>
                  <Td>{item.createdBy.name}</Td>
                  <Td>{item.isSent ? 'Y' : 'N'}</Td>
                  <Td>{item.hasExperimentInfo ? 'Y' : 'N'}</Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SectionLayout>
  );
}
