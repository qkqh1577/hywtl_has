import SectionLayout from 'layouts/SectionLayout';
import React, {
  useEffect,
  useState
} from 'react';
import {
  Box,
  InputAdornment,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import TextBox from 'layouts/Text';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  ProjectBasicContributorId,
  ProjectBasicExternalContributorVO,
  ProjectBasicInternalContributorVO
} from 'project_basic/domain';
import UserSelector from 'components/UserSelector';
import {
  ProjectBasicExternalContributorParameter,
  ProjectBasicInternalContributorParameter
} from 'project_basic/parameter';
import Input from 'layouts/Input';
import dayjs from 'dayjs';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import BusinessSelector from 'components/BusinessSelector';

interface Props {
  internalList: ProjectBasicInternalContributorVO[] | undefined;
  externalList: ProjectBasicExternalContributorVO[] | undefined;
  onAddInternal: DefaultFunction;
  onUpdateInternal: DefaultFunction<ProjectBasicInternalContributorParameter>;
  onDeleteInternal: DefaultFunction<ProjectBasicContributorId>;
  onAddExternal: DefaultFunction;
  onUpdateExternal: DefaultFunction<ProjectBasicExternalContributorParameter>;
  onDeleteExternal: DefaultFunction<ProjectBasicContributorId>;
}

export default function ProjectBasicContributorSection(props: Props) {

  const [modifiedAt, setModifiedAt] = useState<Date>();

  useEffect(() => {
    if ((!props.internalList || props.internalList.length === 0)
      &&
      (!props.externalList || props.externalList.length === 0)) {
      setModifiedAt(undefined);
      return;
    }

    const list = [...(props.internalList ?? []), ...(props.externalList ?? [])];
    if (list.length === 0) {
      setModifiedAt(undefined);
      return;
    }

    setModifiedAt(list.map(item => dayjs(item.modifiedAt))
                      .reduce((a,
                               b
                      ) => a.isAfter(b) ? a : b)
                      .toDate());

  }, [props.internalList, props.externalList]);

  return (
    <SectionLayout title="수주 기여자" modifiedAt={modifiedAt}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignContent:   'flex-start',
      }}>
        <Box sx={{
          display:        'flex',
          flexWrap:       'wrap',
          width:          '400px',
          justifyContent: 'space-between',
          alignContent:   'flex-start',
        }}>
          <Box sx={{
            display:        'flex',
            width:          '100%',
            flexWrap:       'nowrap',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   '10px',
            '& > *':        {
              width: '80px'
            }
          }}>
            <TextBox variant="menu">사내</TextBox>
            {(!props.internalList || props.internalList.length < 3) && (
              <Button shape="small" onClick={props.onAddInternal}>+ 추가</Button>
            )}
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <Th sx={{ width: '150px' }}>소속</Th>
                <Th sx={{ width: '150px' }}>이름</Th>
                <Th sx={{ width: '100px' }}>기여도(%)</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!props.internalList || props.internalList.length === 0) && (
                <TableRow>
                  <Td colSpan={3}>조회 결과가 없습니다.</Td>
                </TableRow>
              )}
              {props.internalList?.map(item => (
                <TableRow key={item.id}>
                  <Td>
                    {item.user?.department.name}
                  </Td>
                  <Td>
                    <UserSelector
                      variant="outlined"
                      value={item.user?.id}
                      onChange={(value) => {
                        if (item.user?.id !== value) {
                          props.onUpdateInternal({ id: item.id, userId: value });
                        }
                      }}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      variant="outlined"
                      key={item.rate}
                      defaultValue={item.rate ?? ''}
                      onBlur={(e) => {
                        const value = +(e.target.value) || undefined;
                        if (item.rate !== value) {
                          props.onUpdateInternal({ id: item.id, rate: value });
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <TextBox variant="body11">%</TextBox>
                        </InputAdornment>
                      }
                    />
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{
          display:        'flex',
          flexWrap:       'wrap',
          width:          '550px',
          justifyContent: 'space-between',
          alignContent:   'flex-start',
        }}>
          <Box sx={{
            display:        'flex',
            width:          '100%',
            flexWrap:       'nowrap',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   '10px',
            '& > *':        {
              width: '80px'
            }
          }}>
            <TextBox variant="menu">사외</TextBox>
            {(!props.externalList || props.externalList.length < 3) && (
              <Button shape="small" onClick={props.onAddExternal}>+ 추가</Button>
            )}
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <Th sx={{ width: '150px' }}>업체명</Th>
                <Th sx={{ width: '150px' }}>소속</Th>
                <Th sx={{ width: '150px' }}>이름</Th>
                <Th sx={{ width: '100px' }}>기여도(%)</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!props.externalList || props.externalList.length === 0) && (
                <TableRow>
                  <Td colSpan={4}>조회 결과가 없습니다.</Td>
                </TableRow>
              )}
              {props.externalList?.map(item => (
                <TableRow key={item.id}>
                  <Td>
                    <BusinessSelector
                      variant="outlined"
                      value={item.business?.id}
                      onChange={(value) => {
                        if (item.business?.id !== value) {
                          props.onUpdateExternal({ id: item.id, businessId: value });
                        }
                      }}
                    />
                  </Td>
                  <Td>
                    {item.businessManager?.department}
                  </Td>
                  <Td>
                    {item.businessManager?.name}
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      variant="outlined"
                      key={item.rate}
                      defaultValue={item.rate ?? ''}
                      onBlur={(e) => {
                        const value = +(e.target.value) || undefined;
                        if (item.rate !== value) {
                          props.onUpdateExternal({ id: item.id, rate: value });
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <TextBox variant="body11">%</TextBox>
                        </InputAdornment>
                      }
                    />
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

    </SectionLayout>
  );
}
