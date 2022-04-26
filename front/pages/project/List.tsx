import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { DataField } from 'components';
import useProject from 'services/project/hook';
import { initProjectFilter, ProjectFilterView } from 'services/project/view';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'code', label: 'PN', style: { minWidth: 30 } },
  { key: 'name', label: '아이디', style: { minWidth: 50 } },
  { key: 'status', label: '상태', style: { minWidth: 50 } },
];

const ProjectList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const {
    projectState: { page },
    getPage,
  } = useProject();

  const [filter, setFilter] = useState<ProjectFilterView>(initProjectFilter);

  const handler = {
    search: (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setFilter(values);
      setSubmitting(false);
    },
    clear: () => {
      setFilter(initProjectFilter);
    },
    toAdd: () => {
      navigate('/project/add');
    }
  };

  useEffect(() => {
    getPage({
      size: filter.size,
      page: filter.page,
      keyword: filter.keyword || undefined,
    });
  }, [filter, path]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <Formik
          initialValues={filter}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({
            values,
            isSubmitting,
            setFieldValue,
            handleSubmit,
            resetForm
          }) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <DataField
                    name="keyword"
                    label="프로젝트명 또는 코드"
                    value={values.keyword}
                    setFieldValue={setFieldValue}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Button
                    color="primary"
                    variant="contained"
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
                    onClick={() => {
                      handler.clear();
                      resetForm();
                    }}
                  >
                    초기화
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
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
              {page.content.map((item) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{
        float: 'bottom',
        height: '30px',
      }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handler.toAdd}
        >
          등록
        </Button>
      </Box>
    </Paper>
  );
};

export default ProjectList;
