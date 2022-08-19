import React, { useContext } from 'react';
import useDialog from 'components/Dialog';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import {
  BusinessId,
  InvolvedProjectVO,
  involvedTypeName
} from 'business/domain';
import TableCell, { TableCellProps } from 'components/TableCell';
import useId from 'services/useId';
import { businessApi } from 'business/api';
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const getList = async () => {
  const id = useId();
  return id !== undefined ? await businessApi.getRivalProjectList(BusinessId(id)) : [];
}

export default function () {
  const { error } = useDialog();
  const formikContext: FormikContextType<InvolvedProjectVO & { edit: boolean; }> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;
  const list = getList();

  const columnProps: TableCellProps[] = [
    {
      key:      'no',
      children: 'No',
      required: edit,
    },
    {
      key:      ' projectCode',
      children: '프로젝트 번호',
      required: edit,
    },
    {
      key:      'name',
      children: '프로젝트명',
      required: edit,
    },
    {
      key:      'bidDate',
      children: '입찰기간',
      required: edit,
    },
    {
      key:      'win',
      children: '낙찰업체',
      required: edit,
    },
    {
      key:      'detail',
      children: '상세',
      required: edit,
    }];

  if (edit) {
    return null;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columnProps.map((props) =>
              (<TableCell {...props} />)
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!edit && (
            <TableRow>
              <TableCell>
                {!edit && (<Typography>참여한 프로젝트가 없습니다.</Typography>)}
              </TableCell>
            </TableRow>
          )}
          {!edit &&
            Array.isArray(list) &&
            list.map((project,
                      no
            ) =>
              (
                <TableRow key={project.id}>
                  <TableCell>
                    {no}
                  </TableCell>
                  <TableCell>
                    {project.projectCode}
                  </TableCell>
                  <TableCell>
                    {project.name}
                  </TableCell>
                  <TableCell>
                    {`${project.bidBeginDate} ~ ${project.bidCloseDate}`}
                  </TableCell>
                  <TableCell>
                    {project.win}
                  </TableCell>
                  <TableCell>
                    <Button children="새 창으로 상세 보기"></Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
