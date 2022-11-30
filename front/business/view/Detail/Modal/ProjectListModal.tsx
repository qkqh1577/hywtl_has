import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { BusinessManagerId } from 'business/domain';
import {
  projectProgressStatusName,
  ProjectShortVO
} from 'project/domain';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';

interface Props {
  open: BusinessManagerId | undefined;
  onClose: () => void;
  projectList?: ProjectShortVO[];
}

function ProjectListModal(props: Props) {
  return (
    <ModalLayout
      title="담당 프로젝트 리스트"
      width="30vw"
      open={!!props.open}
      onClose={props.onClose}
      children={
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <Th>No.</Th>
                <Th>업체명</Th>
                <Th>진행현황</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!props.projectList || props.projectList.length === 0) && (
                <TableRow>
                  <Td colSpan={9} children="결과가 없습니다." />
                </TableRow>
              )}
              {props.projectList && props.projectList.map((item,
                                                           index
              ) => {
                return (
                  <TableRow hover role="checkbox" key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {item.name}
                    </Td>
                    <Td>
                      {projectProgressStatusName(item.progressStatus)}
                    </Td>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      }
    />
  );
}

export default ProjectListModal;
