import React, {useCallback} from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box,
  MenuItem, TextFieldProps
} from '@mui/material';
import {
  ProjectBasicBidType,
  projectBasicBidTypeList,
  projectBasicBidTypeName,
  ProjectVO
} from 'project/domain';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import {ProjectBasicParameter} from 'project_basic/parameter';
import Select from 'layouts/Select';
import UserSelector from 'components/UserSelector';
import {DatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {useDispatch} from "react-redux";
import {snackbarAction, SnackbarSeverityType} from "../../components/Snackbar/action";

interface Props {
  basic?: ProjectVO;
  onUpdate: (params: ProjectBasicParameter) => void;
}

function isValidDate(strDate: string) {
  return strDate && ((dayjs(strDate, 'YYYY-MM-DD', true).isValid()));
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
  )
}

export default function ProjectBasicBasicSection({basic, onUpdate}: Props) {

  const dispatch = useDispatch();
  const openSnackbar = useCallback((message, severity: SnackbarSeverityType = SnackbarSeverityType.warning) => {
    dispatch(snackbarAction.show({message, severity}));
  }, [dispatch]);

  return (
    <SectionLayout
      title="기본 정보"
      modifiedAt={basic?.modifiedAt}
    >
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        '& > div': {
          marginBottom: '10px',
          marginRight: '10px',
        },
        '& > div:not(.large)': {
          width: 'calc(24% - 10px)',
        },
        '& > div.large': {
          width: 'calc(48% - 10px)',
        }
      }}>
        <Box>
          <DataFieldWithLabel label="프로젝트 번호">
            <Input
              readOnly
              key={basic?.code}
              defaultValue={basic?.code ?? ''}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="프로젝트 닉네임">
            <Input
              key={basic?.alias}
              defaultValue={basic?.alias ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (basic?.alias !== value) {
                  if (value) {
                    onUpdate({alias: value});
                  } else {
                    openSnackbar('공백은 허용되지 않습니다');
                    basic && (e.target.value = basic.alias);
                  }
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box className="large">
          <DataFieldWithLabel label="프로젝트 풀네임">
            <Input
              key={basic?.name}
              defaultValue={basic?.name ?? ''}
              onBlur={(e) => {
                const value = e.target.value || undefined;
                if (basic?.name !== value) {
                  if (value) {
                    onUpdate({name: value});
                  } else {
                    openSnackbar('공백은 허용되지 않습니다');
                    basic && (e.target.value = basic.name);
                  }
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="견적 구분">
            <Select
              value={basic?.bidType ?? ''}
              onChange={(e) => {
                const value = e.target.value as ProjectBasicBidType || undefined;
                if (basic?.bidType !== value) {
                  onUpdate({bidType: value});
                }
              }}>
              {projectBasicBidTypeList.map(item => (
                <MenuItem key={item} value={item}>
                  {projectBasicBidTypeName(item)}
                </MenuItem>
              ))}
            </Select>
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="문의 접수자">
            <UserSelector
              value={basic?.receptionManager?.id}
              onChange={(value) => {
                if (basic?.receptionManager?.id !== value) {
                  if (value) {
                    onUpdate({receptionManagerId: value} as ProjectBasicParameter);
                  } else {
                    onUpdate({resetReceptionManagerId: true} as ProjectBasicParameter);
                  }
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="영업 담당자">
            <UserSelector
              value={basic?.salesManager?.id}
              onChange={(value) => {
                if (basic?.salesManager?.id !== value) {
                  if (value) {
                    onUpdate({salesManagerId: value} as ProjectBasicParameter);
                  } else {
                    onUpdate({resetSalesManagerId: true} as ProjectBasicParameter);
                  }
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="담당 PM">
            <UserSelector
              value={basic?.projectManager?.id}
              onChange={(value) => {
                if (basic?.projectManager?.id !== value) {
                  if (value) {
                    onUpdate({projectManagerId: value} as ProjectBasicParameter);
                  } else {
                    onUpdate({resetProjectManagerId: true} as ProjectBasicParameter);
                  }
                }
              }}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="예상 착수 시기">
            <DatePicker
              openTo="year"
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              value={basic?.expectedMonth ? dayjs(basic?.expectedMonth)
                .format('YYYY-MM-DD') : null}
              onChange={(e) => {
                const value = e ? dayjs(e)
                  .format('YYYY-MM-DD') : undefined;
                const error = !value || !isValidDate(value);
                const formikValue = basic?.expectedMonth ? dayjs(basic?.expectedMonth)
                  .format('YYYY-MM-DD') : undefined;
                if (formikValue !== value) {
                  if (value) {
                    if (error) {
                      openSnackbar('올바르지 않은 날짜 형식입니다');
                    } else {
                      onUpdate({expectedMonth: value});
                    }
                  } else {
                    onUpdate({resetExpectedMonth: true});
                  }
                }
              }}
              renderInput={renderDateInput}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="요청 일정">
            <DatePicker
              openTo="year"
              inputFormat="YYYY-MM-DD"
              mask="____-__-__"
              value={basic?.requestedMonth ? dayjs(basic?.requestedMonth)
                .format('YYYY-MM-DD') : null}
              onChange={(e) => {
                const value = e ? dayjs(e)
                  .format('YYYY-MM-DD') : undefined;
                const error = !value || !isValidDate(value);
                const formikValue = basic?.requestedMonth ? dayjs(basic?.requestedMonth)
                  .format('YYYY-MM-DD') : undefined;
                if (formikValue !== value) {
                  if (value) {
                    if (error) {
                      openSnackbar('올바르지 않은 날짜 형식입니다');
                    } else {
                      onUpdate({requestedMonth: value});
                    }
                  } else {
                    onUpdate({resetRequestedMonth: true});
                  }
                }
              }}
              renderInput={renderDateInput}
            />
          </DataFieldWithLabel>
        </Box>
        <Box>
          <DataFieldWithLabel label="LH 여부">
            <Select
              value={basic?.isLh === null || typeof basic?.isLh === 'undefined' ? '' : (basic?.isLh ? 'Y' : 'N')}
              onChange={(e) => {
                const value = e.target.value || undefined;
                if (value === 'Y') {
                  onUpdate({isLh: true});
                } else if (value === 'N') {
                  onUpdate({isLh: false});
                } else {
                  onUpdate({isLh: undefined});
                }
              }}>
              <MenuItem value="Y">네</MenuItem>
              <MenuItem value="N">아니요</MenuItem>
            </Select>
          </DataFieldWithLabel>
        </Box>
      </Box>
    </SectionLayout>
  );
}
