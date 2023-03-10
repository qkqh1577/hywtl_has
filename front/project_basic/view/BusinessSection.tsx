import React, {
  useEffect,
  useState
} from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box, Fade,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Button from 'layouts/Button';
import { ProjectBasicBusiness, } from 'project_basic/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { DefaultFunction } from 'type/Function';
import dayjs from 'dayjs';
import { businessInvolvedTypeName } from 'business/domain';
import TextLink from 'layouts/TextLink';
import CircularProgress from "../../components/CircularProgress";

interface Props {
  businessList: ProjectBasicBusiness[] | undefined;
  openAddModal: DefaultFunction;
  openChangeModal: (item: ProjectBasicBusiness) => void;
}

export default function ProjectBasicBusinessSection(props: Props) {

  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if (!Array.isArray(props.businessList) || props.businessList.length === 0) {
      setModifiedAt(undefined);
    }
    else {
      setModifiedAt(props.businessList.map(item => dayjs(item.modifiedAt))
                         .reduce((a,
                                  b
                         ) => a.isAfter(b) ? a : b)
                         .toDate());
    }
  }, [props.businessList]);

  return (
    <SectionLayout
      title="관계사"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <Button shape="small" onClick={props.openAddModal}>
          + 등록
        </Button>
      }>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
      }}>
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'nowrap',
        }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <Th width="10%" />
                  <Th width="25%">업체명</Th>
                  <Th width="15%">소속</Th>
                  <Th width="10%">이름</Th>
                  <Th width="10%">직위</Th>
                  <Th width="20%">핸드폰번호</Th>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!props.businessList) && (
                  <TableRow>
                    <Td colSpan={6} sx={{minHeight: '38px'}}>
                      <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
                    </Td>
                  </TableRow>
                )}
                {(props.businessList?.length === 0) && (
                  <TableRow>
                    <Td colSpan={6}>
                      <Fade in={true}>
                        <Box>조회 결과가 없습니다</Box>
                      </Fade>
                    </Td>
                  </TableRow>
                )}
                {Array.isArray(props.businessList) && props.businessList.sort((a, b) => {
                  return a.involvedType.length < b.involvedType.length ? -1 : 1;
                }).map(item => (
                  <TableRow key={item.id}>
                    <Td>
                      {businessInvolvedTypeName(item.involvedType)}
                    </Td>
                    <Td>
                      <TextLink onClick={() => {
                        props.openChangeModal(item);
                      }}>
                        {item.business?.name}
                      </TextLink>
                    </Td>
                    <Td>
                      {item.businessManager?.department}
                    </Td>
                    <Td>
                      {item.businessManager?.name}
                    </Td>
                    <Td>
                      {item.businessManager?.jobTitle}
                    </Td>
                    <Td>
                      {item.businessManager?.mobilePhone}
                    </Td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </SectionLayout>
  );
}
