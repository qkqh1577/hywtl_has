import SectionLayout from 'layouts/SectionLayout';
import React, {
  useEffect,
  useState
} from 'react';
import {
  Box, Fade,
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
import {DefaultFunction} from 'type/Function';
import BusinessSelector from 'components/BusinessSelector';
import CircularProgress from "../../components/CircularProgress";
import {UserId} from "../../user/domain";

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
    <SectionLayout title="?????? ?????????" modifiedAt={modifiedAt}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
      }}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '49%',
          justifyContent: 'space-between',
          alignContent: 'flex-start',
        }}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            '& > *': {
              width: '80px'
            }
          }}>
            <TextBox variant="menu">??????</TextBox>
            {(!props.internalList || props.internalList.length < 3) && (
              <Button shape="small" onClick={props.onAddInternal}>+ ??????</Button>
            )}
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <Th sx={{width: '150px'}}>??????</Th>
                <Th sx={{width: '140px'}}>??????</Th>
                <Th sx={{width: '90px'}}>?????????(%)</Th>
                <Th sx={{width: '90px'}}></Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!props.internalList) && (
                <TableRow>
                  <Td colSpan={4} sx={{minHeight: '38px'}}>
                    <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
                  </Td>
                </TableRow>
              )}
              {(props.internalList?.length === 0) && (
                <TableRow>
                  <Td colSpan={4}>
                    <Fade in={true}>
                      <Box>?????? ????????? ????????????</Box>
                    </Fade>
                  </Td>
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
                          props.onUpdateInternal({id: item.id, userId: value as UserId});
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
                          props.onUpdateInternal({id: item.id, rate: value});
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <TextBox variant="body11">%</TextBox>
                        </InputAdornment>
                      }
                    />
                  </Td>
                  <Td>
                    <Button shape="basic3" onClick={() => {
                      props.onDeleteInternal(item.id);
                    }}>??????</Button>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '50%',
          justifyContent: 'space-between',
          alignContent: 'flex-start',
        }}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            '& > *': {
              width: '80px'
            }
          }}>
            <TextBox variant="menu">??????</TextBox>
            {(!props.externalList || props.externalList.length < 3) && (
              <Button shape="small" onClick={props.onAddExternal}>+ ??????</Button>
            )}
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <Th sx={{width: '150px'}}>?????????</Th>
                <Th sx={{width: '150px'}}>??????</Th>
                <Th sx={{width: '140px'}}>??????</Th>
                <Th sx={{width: '90px'}}>?????????(%)</Th>
                <Th sx={{width: '90px'}}></Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!props.externalList) && (
                <TableRow>
                  <Td colSpan={5} sx={{minHeight: '38px'}}>
                    <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
                  </Td>
                </TableRow>
              )}
              {(props.externalList?.length === 0) && (
                <TableRow>
                  <Td colSpan={5}>
                    <Fade in={true}>
                      <Box>?????? ????????? ????????????</Box>
                    </Fade>
                  </Td>
                </TableRow>
              )}
              {props.externalList?.map(item => (
                <TableRow key={item.id}>
                  <Td>
                    <BusinessSelector
                      variant="outlined"
                      hasEmployee
                      withEmployee={item.businessManager?.id ?? undefined}
                      value={item.business?.id}
                      onChange={(business) => {
                        if (item.business?.id !== business.id || item.businessManager?.id !== business.managerId) {
                          props.onUpdateExternal({
                            id: item.id,
                            businessId: business.id,
                            businessManagerId: business.managerId
                          });
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
                          props.onUpdateExternal({id: item.id, rate: value});
                        }
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <TextBox variant="body11">%</TextBox>
                        </InputAdornment>
                      }
                    />
                  </Td>
                  <Td>
                    <Button shape="basic3" onClick={() => {
                      props.onDeleteExternal(item.id)
                    }}>??????</Button>
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
