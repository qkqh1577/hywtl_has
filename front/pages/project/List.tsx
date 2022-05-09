import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid, Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { Divider, DataField } from 'components';
import useProject from 'services/project/hook';
import { initProjectFilter, ProjectFilterView } from 'services/project/view';
import { projectStatusName } from 'services/project/data';

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'code', label: '프로젝트번호', style: { minWidth: 30 } },
  { key: 'name', label: '프로젝트 이름', style: { minWidth: 50 } },
  { key: 'status', label: '상태', style: { minWidth: 50 } },
];

const ProjectList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const {
    projectState: { page },
    getPage,
    setAddModal
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
    addModal: () => {
      setAddModal(true);
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
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '15px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Formik
          initialValues={filter}
          onSubmit={handler.search}
          enableReinitialize
        >
          {({
            values,
            errors,
            isSubmitting,
            setFieldValue,
            handleSubmit,
          }) => (
            <Grid container spacing={1}>
              <Grid item sm={9}>
                <DataField
                  name="keyword"
                  label="프로젝트명 또는 코드"
                  value={values.keyword}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit();
                  }}
                  fullWidth
                >
                  검색
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Box>
      <Divider variant="middle" />
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        width: '100%',
        mb: '20px',
      }}>
        <TableContainer
          sx={{
            display: 'flex',
            width: '100%',
            mb: '20px',
          }}
        >
          <Table
            aria-label="sticky table"
            sx={{
              border: '1px solid #b9b9b9',
              borderRadius: '4px',
            }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {columns.map(({ label, ...props }, i) => (
                  <TableCell
                    {...props}
                    sx={{
                      textAlign: 'center',
                      border: '1px solid #b9b9b9',
                      backgroundColor: '#0000000D',
                      fontWeight: 'bold',
                      borderTopLeftRadius: i === 0 ? '4px' : 0,
                      borderTopRightRadius: i === columns.length - 1 ? '4px' : 0,
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {page.content.map((item, i) => {
                return (
                  <TableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={item.id}
                    hover
                  >
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        border: '1px solid #b9b9b9',
                        borderBottomLeftRadius: i === page.content.length - 1 ? '4px' : 0,
                      }}
                    >{item.code}</TableCell>
                    <TableCell
                      sx={{
                        border: '1px solid #b9b9b9',
                      }}
                    >
                      <Link
                        sx={{
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          navigate(`/project/${item.id}/basic`);
                        }}>
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        border: '1px solid #b9b9b9',
                        borderBottomRightRadius: i === page.content.length - 1 ? '4px' : 0,
                      }}
                    >
                      {projectStatusName(item.status)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: '100%',
            bottom: 0,
            position: 'sticky',
            height: '30px',
          }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handler.addModal}
            fullWidth
          >
            등록
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectList;
