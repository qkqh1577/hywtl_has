import SectionLayout from 'layouts/SectionLayout';
import ButtonSection from 'project_contract/view/ContractList/ButtonSection';
import {
  ProjectContractCollectionVO,
  ProjectContractId,
  ProjectContractShortVO,
  projectContractTypeList,
  projectContractTypeName,
  ProjectFinalContractVO
} from 'project_contract/domain';
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
import TextLink from 'layouts/TextLink';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import DateFormat from 'layouts/DateFormat';
import { DatePicker } from '@mui/x-date-pickers';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import BusinessSelector from 'components/BusinessSelector';
import UserSelector from 'components/UserSelector';
import { ProjectFinalContractParameter } from 'project_contract/parameter';
import {
  snackbarAction,
  SnackbarSeverityType
} from 'components/Snackbar/action';
import { useDispatch } from 'react-redux';
import useDialog from 'dialog/hook';
import CircularProgress from '../../../components/CircularProgress';

interface Props {
  list: ProjectContractShortVO[] | undefined;
  loading: boolean,
  openFinalModal: DefaultFunction;
  openAddModal: DefaultFunction;
  openDetailModal: DefaultFunction<ProjectContractId>;
  finalContract?: ProjectFinalContractVO;
  contractCodeList: string[];
  estimateCodeList: string[];
  onUpdate: (params: ProjectFinalContractParameter) => void;
  openFinalContractCollectionModal: (projectFinalContract: ProjectFinalContractVO) => void;
  openContractCollectionModal: (collection: ProjectContractCollectionVO) => void;
  onValidateFile: (contract: ProjectContractShortVO) => void;
}

export default function ProjectContractListSection(props: Props) {

  const { list, loading, openDetailModal } = props;
  const [modifiedAt, setModifiedAt] = useState<Date>();
  const { error } = useDialog();
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
        .map(item => item.modifiedAt)
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
          openFinalModal={props.openFinalModal}
          openAddModal={props.openAddModal}
        />
      }>
      <Box sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th>No.</Th>
              <Th>?????? ??????</Th>
              <Th>?????? ??????</Th>
              <Th>?????? ??????</Th>
              <Th>?????? ??????</Th>
              <Th>?????? ??????</Th>
              <Th>Word</Th>
              <Th>PDF</Th>
              <Th>????????? PDF</Th>
              <Th>?????? ??????</Th>
              <Th>?????? ??????</Th>
              <Th>??????</Th>
              <Th>??????</Th>
              <Th>??????</Th>
              <Th>??????</Th>
              <Th>?????????</Th>
              <Th>??????</Th>
              <Th>?????????</Th>
              <Th>?????? ??????</Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <Td colSpan={19} sx={{minHeight: '38px'}}>
                  <CircularProgress size={24} sx={{justifyContent: 'center', alignItems: 'center'}}/>
                </Td>
              </TableRow>
            )}
            {!loading && (!list || list.length === 0) && (
              <TableRow>
                <Td colSpan={19}>
                  ?????? ????????? ????????????.
                </Td>
              </TableRow>
            )}
            {!loading && list && list.map((item,
                               index
            ) => (
              <TableRow key={item.id} selected={item.confirmed}>
                <Td>
                  {index + 1}
                </Td>
                <Td>{item.confirmed ? 'Y' : 'N'}</Td>
                <Td>
                  <DateFormat date={item.contractDate} format="YYYY-MM-DD" />
                </Td>
                <Td>
                  {projectContractTypeName(item.contractType)}
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
                        openDetailModal(item.id);
                      }}>
                      {item.code}
                    </TextLink>
                  </Box>
                </Td>
                <Td>{item.estimateCode}</Td>
                <Td>
                  <Button shape="small" onClick={() => {props.onValidateFile({ ...item, fileType: 'word' })}}>????????????</Button>
                </Td>
                <Td>
                  <Button shape="small" onClick={() => {props.onValidateFile({ ...item, fileType: 'pdf' })}}>????????????</Button>
                </Td>
                <Td>
                  {/*TODO: ????????? pdf ???????????? ?????? */}
                  {item.pdfFile && (
                    <Button shape="small" onClick={() => {
                      window.open(`/file-item/${item.pdfFile!.id}`, '_blank');
                    }}>
                      ????????????
                    </Button>
                  )}
                </Td>
                <Td>{item.targetTest}</Td>
                <Td>{item.testAmount.toLocaleString()}</Td>
                <Td>{item.reviewAmount.toLocaleString()}</Td>
                <Td>{item.totalAmount.toLocaleString()}</Td>
                <Td>{item.schedule}</Td>
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
                        props.openContractCollectionModal(item.collection);
                      }}>
                      {item.collectionRate}
                    </TextLink>
                  </Box>
                  </Td>
                <Td>{item.orderer}</Td>
                <Td>{item.note ?? '-'}</Td>
                <Td>{item.createdBy.name}</Td>
                <Td>{item.isSent ? 'Y' : 'N'}</Td>
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
                  value={props.finalContract ?
                    dayjs(props.finalContract.contractDate)
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
                        props.onUpdate({ contractDate: value });
                      }
                    }
                    else {
                      props.onUpdate({ resetContractDate: true });
                    }
                  }}
                  renderInput={renderDateInput}
                />
              </Td>
              <Td>
                <Select
                  displayEmpty
                  value={props.finalContract?.contractType ?? ''}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalContract?.contractType !== value) {
                      if (value) {
                        props.onUpdate({ contractType: value });
                      }
                      else {
                        props.onUpdate({ resetContractType: true });
                      }
                    }
                  }}>
                  <MenuItem value="">??????</MenuItem>
                  {projectContractTypeList.map((type) => (
                      <MenuItem key={type} value={type}>
                        {projectContractTypeName(type)}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Td>
              <Td>
                <Select
                  displayEmpty
                  value={props.finalContract?.code ?? ''}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalContract?.code !== value) {
                      if (value) {
                        props.onUpdate({ code: value });
                      }
                      else {
                        props.onUpdate({ resetCode: true });
                      }
                    }
                  }}>
                  <MenuItem value="">??????</MenuItem>
                  {props.contractCodeList && props.contractCodeList.map((code) => (
                      <MenuItem key={code} value={code}>
                        {code}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Td>
              <Td>
                <Select
                  displayEmpty
                  value={props.finalContract?.estimateCode ?? ''}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalContract?.estimateCode !== value) {
                      if (value) {
                        props.onUpdate({ estimateCode: value });
                      }
                      else {
                        props.onUpdate({ resetEstimateCode: true });
                      }
                    }
                  }}>
                  <MenuItem value="">??????</MenuItem>
                  {props.estimateCodeList && props.estimateCodeList.map((code) => (
                      <MenuItem key={code} value={code}>
                        {code}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td>
                <Input
                  key={props.finalContract?.targetTest}
                  defaultValue={props.finalContract?.targetTest ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (props.finalContract?.targetTest !== value) {
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
                  key={props.finalContract?.testAmount}
                  defaultValue={props.finalContract?.testAmount ? props.finalContract?.testAmount.toLocaleString() : ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +e.target.value as number || undefined;
                    if (props.finalContract?.testAmount !== value) {
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
                  key={props.finalContract?.reviewAmount}
                  defaultValue={props.finalContract?.reviewAmount ? props.finalContract?.reviewAmount.toLocaleString() : ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +e.target.value as number || undefined;
                    if (props.finalContract?.reviewAmount !== value) {
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
                  key={props.finalContract?.totalAmount}
                  defaultValue={props.finalContract?.totalAmount ? props.finalContract?.totalAmount.toLocaleString() : ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = +e.target.value as number || undefined;
                    if (props.finalContract?.totalAmount !== value) {
                      if (value) {
                        // TODO: ?????? ?????? ?????? ??? ??????.
                        // if (props.finalContract?.totalAmount) {
                        //   confirm({
                        //     children:     '?????? ????????? ????????? ???????????? ?????? ?????? ????????? ???????????????. ?????????????????????????',
                        //     confirmText:  '??????',
                        //     afterConfirm: () => {
                        //       props.onUpdate({ totalAmount: value });
                        //     }
                        //   });
                        // }
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
                  key={props.finalContract?.schedule}
                  defaultValue={props.finalContract?.schedule ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value as string || undefined;
                    if (props.finalContract?.schedule !== value) {
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
                <Button onClick={() => {
                  if (props.finalContract?.id && props.finalContract?.totalAmount) {
                    props.openFinalContractCollectionModal(props.finalContract);
                  }
                  else {
                    error('?????? ????????? "??????"??? ????????? ????????? ????????????.');
                  }
                }}>
                  ?????? ?????? ?????? ??????
                </Button>
              </Td>
              <Td>
                <BusinessSelector
                  value={props.finalContract?.business?.id ?? ''}
                  onChange={(business) => {
                    if (props.finalContract?.business?.id !== business.id) {
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
                <Input
                  key={props.finalContract?.note}
                  defaultValue={props.finalContract?.note ?? ''}
                  variant="outlined"
                  onBlur={(e) => {
                    const value = e.target.value || undefined;
                    if (props.finalContract?.note !== value) {
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
              <Td>
                <UserSelector
                  variant="outlined"
                  value={props.finalContract?.createdBy?.id}
                  onChange={(value) => {
                    if (props.finalContract?.createdBy?.id !== value) {
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
                <Select
                  displayEmpty
                  value={props.finalContract?.isSent ?
                    'Y' : (props.finalContract?.isSent == null ? '' : 'N')}
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value || undefined;
                    if (props.finalContract?.isSent !== value && value === 'Y') {
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
