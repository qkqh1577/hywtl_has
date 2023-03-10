import SectionLayout from 'layouts/SectionLayout';
import ButtonSection, { ProjectEstimateListButtonProps } from 'project_estimate/view/EstimateList/ButtonSection';
import {
  ProjectEstimateId,
  ProjectEstimateShortVO,
  ProjectEstimateType,
  projectEstimateTypeList,
  projectEstimateTypeName,
  ProjectFinalEstimateVO,
} from 'project_estimate/domain';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import dayjs from 'dayjs';
import {
  Box,
  MenuItem,
  TableBody,
  TableHead,
  TableRow,
  TextFieldProps
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
import { DatePicker } from '@mui/x-date-pickers';
import { ProjectFinalEstimateParameter } from 'project_estimate/parameter';
import {
  snackbarAction,
  SnackbarSeverityType
} from 'components/Snackbar/action';
import { useDispatch } from 'react-redux';
import CircularProgress from '../../../components/CircularProgress';

interface Props
  extends ProjectEstimateListButtonProps {
  list?: ProjectEstimateShortVO[];
  openCustomDetailModal: DefaultFunction<ProjectEstimateId>;
  openSystemDetailModal: DefaultFunction<ProjectEstimateId>;
  onUpdate: (params: ProjectFinalEstimateParameter) => void;
  finalEstimate?: ProjectFinalEstimateVO;
  codeList?: string[];
  loading: boolean;
  onValidateFile: (estimate: ProjectEstimateShortVO) => void;
}

export default function ProjectEstimateListSection(props: Props) {

  const {
          list,
          loading,
          openCustomDetailModal,
          openSystemDetailModal,
        } = props;
  const [modifiedAt, setModifiedAt] = useState<Date>();
  const dispatch = useDispatch();
  const openSnackbar = useCallback((message,
                                    severity: SnackbarSeverityType = SnackbarSeverityType.warning
  ) => {
    dispatch(snackbarAction.show({ message, severity }));
  }, [dispatch]);

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
      title="?????????"
      modifiedAt={modifiedAt}
      titleRightComponent={
        <ButtonSection
          openCustomAddModal={props.openCustomAddModal}
          openSystemAddModal={props.openSystemAddModal}
          openFinalModal={props.openFinalModal}
        />
      }>
      <Box sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th width="5%">No.</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="8%">?????? ??????</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="5%">??????</Th>
              <Th width="5%">??????</Th>
              <Th width="5%">??????</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="12%">?????? ??????</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="5%">?????????</Th>
              <Th width="5%">?????????</Th>
              <Th width="5%">?????? ??????</Th>
              <Th width="10%">??????</Th>
              <Th width="5%">???????????? ?????? ??????</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <Td colSpan={17} sx={{ height: '40px' }}>
                  <CircularProgress size={30} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} />
                </Td>
              </TableRow>
            )}
            {!loading && (!list || list.length === 0) && (
              <TableRow>
                <Td colSpan={17}>
                  ?????? ????????? ????????????.
                </Td>
              </TableRow>
            )}
            {!loading && list && list.map((item,
                                           index
            ) => (
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
                        props.onValidateFile(item);
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
                <Td>{item.schedule}</Td>
                <Td>
                  {projectEstimateTypeName(item.type)}
                </Td>
                <Td>{item.business ? item.business.name : ''}</Td>
                <Td>
                  <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
                </Td>
                <Td>{item.createdBy.name}</Td>
                <Td>
                  <DateFormat date={item.sentDate} format="YYYY-MM-DD" />
                </Td>
                <Td>{item.isSent ? 'Y' : 'N'}</Td>
                <Td>{item.note ?? ''}</Td>
                <Td>{item.hasExperimentInfo ? 'Y' : 'N'}</Td>
              </TableRow>
            ))}
            <TableRow>
              <Td colSpan={2}>
                ?????? ?????????
              </Td>
              <Td>
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  value={props.finalEstimate ?
                    dayjs(props.finalEstimate.estimateDate)
                    .format('YYYY-MM-DD')
                    : null}
                  onChange={(e) => {
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const error = !value || !isValidDate(value);
                    if (value) {
                      if (error) {
                        openSnackbar('???????????? ?????? ?????? ???????????????.');
                      }
                      else {
                        props.onUpdate({ estimateDate: value });
                      }
                    }
                    else {
                      props.onUpdate({ resetEstimateDate: true });
                    }
                  }}
                  renderInput={renderDateInput}
                />
              </Td>
              <Td>
                <Select
                  displayEmpty
                  value={props.finalEstimate?.code ?? ''}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalEstimate?.code !== value) {
                      if (value) {
                        props.onUpdate({ code: value });
                      }
                      else {
                        props.onUpdate({ resetCode: true });
                      }
                    }
                  }}>
                  <MenuItem value="">??????</MenuItem>
                  {props.codeList && props.codeList.map((code) => (
                      <MenuItem key={code} value={code}>
                        {code}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Td>
              <Td>
                <Input
                  key={props.finalEstimate?.targetTest}
                  defaultValue={props.finalEstimate?.targetTest ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (props.finalEstimate?.targetTest !== value) {
                      if (value) {
                        props.onUpdate({ targetTest: value });
                      }
                      else {
                        props.onUpdate({ resetTargetTest: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  isAmount
                  key={props.finalEstimate?.testAmount}
                  defaultValue={props.finalEstimate?.testAmount ? props.finalEstimate?.testAmount.toLocaleString() : ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +e.target.value as number || undefined;
                    if (props.finalEstimate?.testAmount !== value) {
                      if (value) {
                        props.onUpdate({ testAmount: value });
                      }
                      else {
                        openSnackbar('????????? ?????? ???????????????.');
                        props.onUpdate({ resetTestAmount: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  isAmount
                  key={props.finalEstimate?.reviewAmount}
                  defaultValue={props.finalEstimate?.reviewAmount ? props.finalEstimate?.reviewAmount.toLocaleString() : ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +e.target.value as number || undefined;
                    if (props.finalEstimate?.reviewAmount !== value) {
                      if (value) {
                        props.onUpdate({ reviewAmount: value });
                      }
                      else {
                        openSnackbar('????????? ?????? ???????????????.');
                        props.onUpdate({ resetReviewAmount: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  isAmount
                  key={props.finalEstimate?.totalAmount}
                  defaultValue={props.finalEstimate?.totalAmount ? props.finalEstimate?.totalAmount.toLocaleString() : ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +e.target.value as number || undefined;
                    if (props.finalEstimate?.totalAmount !== value) {
                      if (value) {
                        props.onUpdate({ totalAmount: value });
                      }
                      else {
                        openSnackbar('????????? ?????? ???????????????.');
                        props.onUpdate({ resetTotalAmount: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <Input
                  key={props.finalEstimate?.schedule}
                  defaultValue={props.finalEstimate?.schedule ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalEstimate?.schedule !== value) {
                      if (value) {
                        props.onUpdate({ schedule: value });
                      }
                      else {
                        props.onUpdate({ resetSchedule: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <Select
                  displayEmpty
                  value={props.finalEstimate?.type ?? ''}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalEstimate?.type !== value) {
                      if (value) {
                        props.onUpdate({ type: value });
                      }
                      else {
                        props.onUpdate({ resetType: true });
                      }
                    }
                  }}>
                  <MenuItem value="">??????</MenuItem>
                  {projectEstimateTypeList.map((type) => (
                      <MenuItem key={type} value={type}>
                        {projectEstimateTypeName(type)}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Td>
              <Td>
                <BusinessSelector
                  value={props.finalEstimate?.business?.id ?? ''}
                  onChange={(business) => {
                    if (props.finalEstimate?.business?.id !== business.id) {
                      if (business.id) {
                        props.onUpdate({ businessId: business.id });
                      }
                      else {
                        props.onUpdate({ resetBusinessId: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <DateFormat date={props.finalEstimate?.createdAt} format="YYYY-MM-DD hh:mm" />
              </Td>
              <Td>
                <UserSelector
                  variant="outlined"
                  value={props.finalEstimate?.createdBy?.id}
                  onChange={(value) => {
                    if (props.finalEstimate?.createdBy?.id !== value) {
                      if (value && !Array.isArray(value)) {
                        props.onUpdate({ writerId: value });
                      }
                      else {
                        props.onUpdate({ resetWriterId: true });
                      }
                    }
                  }}
                />
              </Td>
              <Td>
                <DatePicker
                  openTo="year"
                  inputFormat="YYYY-MM-DD"
                  mask="____-__-__"
                  value={props.finalEstimate ?
                    dayjs(props.finalEstimate.sentDate)
                    .format('YYYY-MM-DD')
                    : null}
                  onChange={(e) => {
                    const value = e ? dayjs(e)
                    .format('YYYY-MM-DD') : undefined;
                    const error = !value || !isValidDate(value);
                    if (value) {
                      if (error) {
                        openSnackbar('???????????? ?????? ?????? ???????????????.');
                      }
                      else {
                        props.onUpdate({ sentDate: value });
                      }
                    }
                    else {
                      props.onUpdate({ resetSentDate: true });
                    }
                  }}
                  renderInput={renderDateInput}
                />
              </Td>
              <Td>
                <Select
                  displayEmpty
                  value={props.finalEstimate?.isSent ?
                    'Y' : (props.finalEstimate?.isSent == null ? '' : 'N')}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (props.finalEstimate?.isSent !== value && value === 'Y') {
                      props.onUpdate({ isSent: true });
                    }
                    else {
                      if (value) {
                        props.onUpdate({ isSent: false });
                      }
                      else {
                        props.onUpdate({ resetIsSent: true });
                      }
                    }
                  }}>
                  <MenuItem value="">??????</MenuItem>
                  <MenuItem value="Y">Y</MenuItem>
                  <MenuItem value="N">N</MenuItem>
                </Select>
              </Td>
              <Td colSpan={2}>
                <Input
                  key={props.finalEstimate?.note}
                  defaultValue={props.finalEstimate?.note ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (props.finalEstimate?.note !== value) {
                      if (value) {
                        props.onUpdate({ note: value });
                      }
                      else {
                        props.onUpdate({ resetNote: true });
                      }
                    }
                  }}
                />
              </Td>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </SectionLayout>
  );
}

function isValidDate(strDate: string) {
  return strDate && ((dayjs(strDate, 'YYYY-MM-DD', true)
  .isValid()));
}

function renderDateInput(parameter: TextFieldProps) {
  const value = parameter.inputProps?.value;
  const error = value != '' && !isValidDate(value);
  return (
    <Input
      {...parameter.InputProps}
      inputRef={parameter.inputRef}
      variant="standard"
      inputProps={parameter.inputProps}
      error={error}
    />
  );
}
