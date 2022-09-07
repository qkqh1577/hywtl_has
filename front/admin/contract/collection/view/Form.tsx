import React, { useContext } from 'react';
import {
  Box,
  Button,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Table } from 'layouts/Table';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  ContractCollectionVO,
  expectedDateTypeList,
  expectedDateTypeName,
  Stage
} from 'admin/contract/collection/domain';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import Tooltip from 'components/Tooltip';
import {
  KeyboardArrowDown as DownIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import useDialog from 'components/Dialog';
import { ColorPalette } from 'app/view/App/theme';

const typographyStyle = {
  fontWeight: 'bold',
  fontSize:   '14px',
  lineHeight: '22px',
  color:      `${ColorPalette._252627}`,
};
const contentsStyle = {
  width:       '100%',
  textAlign:   'right',
  paddingLeft: '10px',
  color:       '#b2b4b7'
};

export interface FormProps {
  formFooter: React.ReactNode;
}

export default function Form(props: FormProps) {
  const { error } = useDialog();
  const formikContext: FormikContextType<ContractCollectionVO> = useContext(FormikContext);
  const list = formikContext?.values.stageList ?? [];
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                단계
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                비율
                (%)</Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                금액
                (원)</Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                시기
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                예정일
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                순서
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={typographyStyle}
              >
                삭제
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,
                     i
          ) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <TextField
                    name={`stageList.${i}.name`}
                    label="단계"
                    disableLabel
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    name={`stageList.${i}.ratio`}
                    label="비율"
                    disableLabel
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={contentsStyle}>
                    용역금액x비율
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    name={`stageList.${i}.note`}
                    label="시기"
                    disableLabel
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <SelectField
                    disableLabel
                    options={expectedDateTypeList.map(
                      (item) => ({
                        key:  item as string,
                        text: expectedDateTypeName(item)
                      })
                    )}
                    name={`stageList.${i}.expectedDate`}
                    label="예정일"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{
                    display:        'flex',
                    width:          '100%',
                    justifyContent: 'space-around',
                  }}>
                    <Tooltip title="순서 올리기">
                      <IconButton
                        disabled={i === 0}
                        children={<UpIcon />}
                        onClick={() => {
                          const prevList = list.filter((t,
                                                        k
                          ) => k !== i);
                          const stageList: Stage[] = [];
                          for (let k = 0; k < prevList.length; k++) {
                            if (stageList.length === i - 1) {
                              stageList.push(item);
                            }
                            stageList.push(prevList[k]);
                          }
                          formikContext!.setFieldValue('stageList', stageList);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="순서 내리기">
                      <IconButton
                        disabled={i === list.length - 1}
                        children={<DownIcon />}
                        onClick={() => {
                          const prevList = list.filter((t,
                                                        k
                          ) => k !== i);
                          const stageList: Stage[] = [];
                          for (let k = 0; k < prevList.length; k++) {
                            stageList.push(prevList[k]);
                            if (stageList.length === i + 1) {
                              stageList.push(item);
                            }
                          }
                          formikContext!.setFieldValue('stageList', stageList);
                        }}
                      />
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    color="warning"
                    disabled={list.length <= 1}
                    onClick={() => {
                      if (list.length === 1) {
                        error('최소 하나 이상의 세부 항목이 필요합니다.');
                        return;
                      }
                      formikContext!.setFieldValue('stageList', list.filter((detail,
                                                                              k
                      ) => k !== i));
                    }}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {props.formFooter}
      </Table>
    </TableContainer>
  );
}
