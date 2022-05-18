import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  List,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Switch,
  Box,
} from "@mui/material";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import React from "react";
import {DataField} from "components";
import InfoIcon from "@mui/icons-material/Info";
import {useNavigate} from "react-router-dom";

const notiList = [
  '직접입력 설정 변경 시, 입력된 값은 초기화 됩니다.',
  '직접입력 사용의 세부항목은 시스템 견적서 생성 시, 수량과 금액도 개별 입력합니다.',
  '직접입력 미사용의 세부항목은 항목정보의 기본값으로 보여집니다.'
];

type TableCellProperty = {
  key: string;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  style?: any;
}

const columns: TableCellProperty[] = [
  { key: 'directInputUseYn', label: '직접입력 사용여부', style: { minWidth: 50 }, align: 'center' },
  { key: 'item', label: '세부 항목명', style: { minWidth: 50 }, align: 'center' },
  { key: 'unit', label: '단위', style: { minWidth: 100 }, align: 'center' },
  { key: 'price', label: '단가', style: { minWidth: 100 }, align: 'center' },
  { key: 'memo', label: '비고', style: { minWidth: 100 }, align: 'center' },
  { key: 'orderButtons', label: '순서', style: { minWidth: 100 }, align: 'center' },
  { key: 'deleteButton', label: '삭제', style: { minWidth: 100 }, align: 'center' },
];

const ServiceItemAdd = () => {
  const navigate = useNavigate();

  const initServiceDetailItemListValue = [{
    directInputUseYn: true,
    item: '',
    unit: '',
    price: '',
    memo: '',
    order: 1,
  }]

  const initServiceItemValue = {
    item: '',
    unit: '',
    price: '',
    memo: '',
    type: '',
    serviceDetailItemViewList: initServiceDetailItemListValue,
  }

  const handler = {
    toList: () => {
      navigate('/serviceItem');
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {

    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px', mb: '30px' }}>
      <Grid container spacing={1}>
        <Grid item sm={12}>
          <Formik
            initialValues={ initServiceItemValue }
            enableReinitialize
            onSubmit={handler.submit}
          >
            {({ values, errors, isSubmitting, setFieldValue, handleChange, handleSubmit, setValues }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <h2>항목 정보</h2>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <DataField
                      name="item"
                      label="용역 항목"
                      value={values.item}
                      variant="standard"
                      setFieldValue={setFieldValue}
                      errors={errors}
                      placeholder="입력"
                      required
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <DataField
                      name="unit"
                      label="단위(기본값)"
                      value={values.unit}
                      variant="standard"
                      setFieldValue={setFieldValue}
                      errors={errors}
                      placeholder="입력"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <DataField
                      name="price"
                      label="단가(기본값)"
                      value={values.price}
                      variant="standard"
                      setFieldValue={setFieldValue}
                      errors={errors}
                      placeholder="입력"
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <DataField
                      name="memo"
                      label="비고(기본값)"
                      value={values.memo}
                      variant="standard"
                      setFieldValue={setFieldValue}
                      errors={errors}
                      placeholder="입력"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <FormControl variant="standard" fullWidth>
                      <FormLabel>실험타입</FormLabel>
                      <RadioGroup
                        row
                        aria-label="params-type"
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="공통" control={<Radio />} label="공통" />
                        <FormControlLabel value="F" control={<Radio />} label="F" />
                        <FormControlLabel value="P" control={<Radio />} label="P" />
                        <FormControlLabel value="E" control={<Radio />} label="E" />
                        <FormControlLabel value="A" control={<Radio />} label="A" />
                        <FormControlLabel value="B" control={<Radio />} label="B" />
                        <FormControlLabel value="구검" control={<Radio />} label="구검" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider sx={{ mt: '40px', mb: '40px' }} />
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <h2>세부 항목</h2>
                  </Grid>
                  <Grid item sm={12}>
                    <List style={{backgroundColor: "#ccc"}}>
                      {notiList.map(noti => (
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText primary={noti} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item sm={12}>
                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map(({label, ...props}) => (
                              <TableCell {...props}>
                                {label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: '10px'}}
                        onClick={() => {
                        }}
                      >
                        추가
                      </Button>
                    </Box>
                  </Grid>
                  <Grid sm={12}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      height: '60px',
                    }}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{marginRight: '5px'}}
                        disabled={isSubmitting}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        등록
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handler.toList}
                      >
                        취소
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
            </Formik>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ServiceItemAdd;