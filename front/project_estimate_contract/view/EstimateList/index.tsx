import SectionLayout from 'layouts/SectionLayout';
import ButtonSection from 'project_estimate_contract/view/EstimateList/ButtonSection';
import {
  projectEstimateTypeName,
  ProjectEstimateVO
} from 'project_estimate/domain';
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Table } from 'layouts/Table';
import IconButton from 'components/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateFormat from 'components/DateFormat';

interface Props {
  list?: ProjectEstimateVO[];
}

export default function ProjectEstimateListSection(props: Props) {

  const {
          list
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
  return (
    <SectionLayout
      title="견적서"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <ButtonSection />
      }
    >
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>견적 번호</TableCell>
                <TableCell>견적 구분</TableCell>
                <TableCell>견적 업체</TableCell>
                <TableCell>최종 여부</TableCell>
                <TableCell>등록 일시</TableCell>
                <TableCell>등록자</TableCell>
                <TableCell>송부 여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!list || list.length === 0) && (
                <TableRow>
                  <TableCell colSpan={7}>
                    조회 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
              {list && list.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.code}
                    <IconButton
                      shape="square"
                      onClick={() => {console.log(item);}}
                      children={<FontAwesomeIcon icon="download" />}
                    />
                  </TableCell>
                  <TableCell>
                    {projectEstimateTypeName(item.type)}
                  </TableCell>
                  <TableCell>{item.business}</TableCell>
                  <TableCell>{item.confirmed ? 'Y' : 'N'}</TableCell>
                  <TableCell>
                    <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                  </TableCell>
                  <TableCell>{item.createdBy.name}</TableCell>
                  <TableCell>{item.isSent ? 'Y' : 'N'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SectionLayout>
  );
}