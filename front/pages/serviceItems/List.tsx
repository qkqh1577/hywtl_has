import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  FormLabel,
  FormControl,
  Input,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody, Link,
} from "@mui/material";
import { Formik, FormikHelpers, Form } from 'formik';
import { ServiceItemQuery, typeList, useServiceItem } from "services/serviceItem";
import { CheckboxField } from "components";

const initFilter: ServiceItemQuery = {
  type: ['공통', 'F', 'P', 'E', 'A', 'B', '구검'],
  item: '',
}

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'no', label: 'No.', style: { minWidth: 50 }, align: 'center' },
  { key: 'type', label: '실험타입', style: { minWidth: 100 }, align: 'center' },
  { key: 'item', label: '용역 항목', style: { minWidth: 100 }, align: 'center' },
  { key: 'detailItemCount', label: '세부항목', style: { minWidth: 100 }, align: 'center' },
  { key: 'unit', label: '단위', style: { minWidth: 100 }, align: 'center' },
  { key: 'price', label: '단가', style: { minWidth: 100 }, align: 'center' },
  { key: 'memo', label: '비고', style: { minWidth: 100 }, align: 'center' },
];

const ServiceItemListPage = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<ServiceItemQuery>(initFilter);

  const { state: { list }, getList } = useServiceItem();

  useEffect(() => {
    getList(filter);
  }, [filter]);

  const handler = {
    toAdd: () => {
      navigate('/serviceItem/add');
    },

    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter({
        type: values.type,
        item: values.item,
      });
      setSubmitting(false);
    },

    clear: () => {
      setFilter(initFilter);
    },
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>용역항목 목록</h2>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
        <Formik
          initialValues={{
            type: filter.type ?? typeList,
            item: filter.item
          }}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({
              values,
              errors,
              isSubmitting,
              setFieldValue,
              handleChange,
              handleSubmit,
              resetForm
            }) => (
            <Grid container spacing={1}>
              <Grid item sm={10}>
                <Form>
                  <Grid container spacing={1}>
                    <Grid container spacing={1} item sm={12}>
                      <Grid item sm={12}>
                        <CheckboxField
                          name="type"
                          label="실험타입"
                          value={values.type}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          options={typeList}
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <FormControl variant="standard" fullWidth>
                          <FormLabel component="legend">용역항목</FormLabel>
                          <Input
                            type="text"
                            name="keyword"
                            value={values.item}
                            onChange={handleChange}
                            placeholder="검색어를 입력하세요"
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Grid>
              <Grid item sm={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ width: '80px' }}
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  검색
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ width: '80px', marginTop: '5px' }}
                  onClick={() => {
                    handler.clear();
                    resetForm();
                  }}
                >
                  초기화
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxHeight: 740,
        mb: '20px',
      }}>
        <Grid item sm={12} sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button
            color="primary"
            variant="contained"
          >
            순서 설정
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginLeft: '5px' }}
            onClick={handler.toAdd}
          >
            등록
          </Button>
        </Grid>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxHeight: 740,
        mb: '20px',
      }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(({ label, ...props }) => (
                  <TableCell {...props}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((serviceItem, i) => {
                return (
                  <TableRow>
                    <TableCell align="center">{serviceItem.order}</TableCell>
                    <TableCell align="center">{serviceItem.type}</TableCell>
                    <TableCell align="center">
                      <Link
                        sx={{
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigate(`/serviceItem/${serviceItem.id}`);
                        }}>
                        {serviceItem.item}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{serviceItem.detailItemCount}개</TableCell>
                    <TableCell align="center">{serviceItem.unit}</TableCell>
                    <TableCell align="center">{serviceItem.price.toLocaleString()}</TableCell>
                    <TableCell align="center">{serviceItem.memo}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  )
}

export default ServiceItemListPage;