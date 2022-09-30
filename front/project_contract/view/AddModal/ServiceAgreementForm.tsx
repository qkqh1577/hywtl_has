import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import { ColorPalette } from 'app/view/App/theme';
import TextField from 'components/TextField';
import CollectionForm from 'project_contract/view/AddModal/CollectionForm/CollectionForm';

interface Props
  extends FormikLayoutProps<any> {
  totalRatioCell: React.ReactNode;
}

export default function (props: Props) {
  const {
          formik,
          totalRatioCell
        } = props;
  return (
    <>
      <TableContainer sx={{
        marginBottom: '20px',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <Th colSpan={2} backgroundColor={ColorPalette._e4e9f2}>
                풍동실험 용역 계약서
              </Th>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Th>
                용역명
              </Th>
              <Td>
                <TextField
                  name="serviceName"
                  label="용역명"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Th rowSpan={2}>
                용역 기간
              </Th>
              <Td>
                <TextField
                  name="serviceDuration"
                  label="용역기간"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Td>
                <TextField
                  name="견적서에 등록된 납품가능 주 value"
                  label="견적서에 등록된 납품가능 주"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Th>
                용역금액
              </Th>
              <Td>
                <TextField
                  name="견적서에 등록된 금액(부가세 포함) value"
                  label="견적서에 등록된 금액(부가세 포함)"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Th rowSpan={2}>
                기성 단계
              </Th>
              <Td>
                <TextField
                  name="collectionStageNote"
                  label="기성단계"
                  disableLabel
                  variant="outlined"
                />
              </Td>
            </TableRow>
            <TableRow>
              <Td>
                <CollectionForm {...props} />
              </Td>
            </TableRow>
            <TableRow>
              <Th>
                성과품
              </Th>
              <Td>
                <TextField
                  name="outcome"
                  label="성과품"
                  disableLabel
                  variant="outlined" />
              </Td>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        padding:      '15px 20px',
        border:       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius: '5px',
        marginBottom: '20px',
      }}>
        <TextField
          disableLabel
          multiline
          variant="outlined"
          name="description"
          label="설명"
        />
      </Box>
    </>
  );
};
