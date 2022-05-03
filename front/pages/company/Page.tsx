import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Link,
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useCompany from "services/company/hook";
import {CompanyQuery} from "services/company/parameters";

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'no', label: 'No.', style: { minWidth: 50 } },
  { key: 'name', label: '업체명', style: { minWidth: 100 } },
  { key: 'representativeName', label: '대표명', style: { minWidth: 100 } },
  { key: 'companyNumber', label: '사업자번호', style: { minWidth: 100 } },
  { key: 'address', label: '주소', style: { minWidth: 100 } },
  { key: 'phone', label: '대표 전화번호', style: { minWidth: 100 } },
  { key: 'managerCount', label: '담당자', style: { minWidth: 100 } },
  { key: 'projectCount', label: '참여 프로젝트 총 개수', style: { minWidth: 100 } },
  { key: 'memo', label: '비고', style: { minWidth: 100 } },
];

const initFilter: CompanyQuery = {
  page: 0,
  size: 10,
};

const CompanyPage = () => {
  const navigate = useNavigate();

  const { companyState: { page }, getPage } = useCompany();
  const [filter, setFilter] = useState<CompanyQuery>(initFilter);

  const handler = {
    toAdd: () => {
      navigate('/company/add');
    },
  };

  useEffect(() => {
    getPage(filter);
  }, [filter])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        mb: '40px',
      }}>
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
              {page.content.map((company, i) => {
                const no: number = i + 1;
                return (
                  <TableRow>
                    <TableCell>{no}</TableCell>
                    <TableCell>
                      <Link
                        sx={{
                          cursor: 'pointer'
                        }}
                        onClick={() => {navigate(`/company/${company.id}`)}}>
                        {company.name}
                      </Link>
                    </TableCell>
                    <TableCell>{company.representativeName}</TableCell>
                    <TableCell>{company.companyNumber}</TableCell>
                    <TableCell>{company.address}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.managerCount}명</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{company.memo}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        mb: '20px',
      }}>
        <Grid container spacing={1}>
          <Grid item sm={8} sx={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}>
          </Grid>
          <Grid item sm={4}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mt: '40px',
            }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handler.toAdd}
              >
                등록
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default CompanyPage;