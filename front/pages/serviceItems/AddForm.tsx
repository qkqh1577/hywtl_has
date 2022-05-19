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
  TextField,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import React, {useEffect} from "react";
import {DataField} from "components";
import InfoIcon from "@mui/icons-material/Info";
import {useNavigate} from "react-router-dom";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
import {ServiceItemParameter, useServiceItem} from "services/serviceItem";

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
  { key: 'directInputUseYn', label: '직접입력 사용여부', style: { minWidth: 130 }, align: 'center' },
  { key: 'item', label: '세부 항목명', style: { minWidth: 50 }, align: 'center' },
  { key: 'unit', label: '단위', style: { minWidth: 100 }, align: 'center' },
  { key: 'price', label: '단가', style: { minWidth: 100 }, align: 'center' },
  { key: 'memo', label: '비고', style: { minWidth: 100 }, align: 'center' },
  { key: 'orderButtons', label: '순서', style: { minWidth: 100 }, align: 'center' },
  { key: 'deleteButton', label: '삭제', style: { minWidth: 100 }, align: 'center' },
];

const DirectInputUseYnSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const ServiceItemAdd = () => {
  const navigate = useNavigate();

  const { state: { orderList }, add, getOrderList } = useServiceItem();

  useEffect(() => {
    getOrderList();
  }, []);

  const initServiceDetailItemListValue = [{
    directInputUseYn: true,
    item: '',
    unit: '',
    price: '',
    memo: '',
    orderNumber: 1,
  }]

  const initServiceItemValue = {
    orderNumber: orderList && orderList.length ? orderList.length + 1 : 1,
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
      const params: ServiceItemParameter = {
        orderNumber: values.orderNumber,
        item: values.item,
        unit: values.unit,
        price: values.price,
        memo: values.memo,
        type: values.type,
        serviceDetailItemParameterList: values.serviceDetailItemViewList.length ? values.serviceDetailItemViewList : undefined,
      }

      add(params, (data) => {
        if (data) {
          window.alert('저장하였습니다.');
          navigate('/serviceItem');
        }
        setSubmitting(false);
      });
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
                          {values.serviceDetailItemViewList.map((serviceDetailItemView, i) => {
                            return (
                              <TableRow>
                                <TableCell align="center" style={{maxWidth: '130px'}}>
                                  <FormControl variant="standard" fullWidth>
                                    <FormControlLabel
                                      value={serviceDetailItemView.directInputUseYn}
                                      control={
                                        <DirectInputUseYnSwitch
                                          name={`serviceDetailItemViewList.${i}.directInputUseYn`}
                                          checked={serviceDetailItemView.directInputUseYn}
                                          onChange={handleChange}
                                        />
                                      }
                                      label={(serviceDetailItemView.directInputUseYn && '사용') || '미사용'}
                                    />
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center">
                                  <DataField
                                    name={`serviceDetailItemViewList.${i}.item`}
                                    label=""
                                    value={serviceDetailItemView.item}
                                    setFieldValue={setFieldValue}
                                    errors={errors}
                                    placeholder="입력"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {serviceDetailItemView.directInputUseYn ?
                                    <DataField
                                      name={`serviceDetailItemViewList.${i}.unit`}
                                      label=""
                                      value={serviceDetailItemView.unit}
                                      setFieldValue={setFieldValue}
                                      errors={errors}
                                      variant="standard"
                                      placeholder="입력"
                                    /> :
                                    <TextField
                                      name={`serviceDetailItemViewList.${i}.unit`}
                                      label=""
                                      value={values.unit}
                                      variant="standard"
                                      placeholder="기본값"
                                      fullWidth={true}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                    />
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  {serviceDetailItemView.directInputUseYn ?
                                    <DataField
                                      name={`serviceDetailItemViewList.${i}.price`}
                                      label=""
                                      value={serviceDetailItemView.price}
                                      setFieldValue={setFieldValue}
                                      errors={errors}
                                      placeholder="입력"
                                    /> :
                                    <TextField
                                      name={`serviceDetailItemViewList.${i}.price`}
                                      label=""
                                      value={values.price}
                                      variant="standard"
                                      placeholder="기본값"
                                      fullWidth={true}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                    />
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  {serviceDetailItemView.directInputUseYn ?
                                    <DataField
                                      name={`serviceDetailItemViewList.${i}.memo`}
                                      label=""
                                      value={serviceDetailItemView.memo}
                                      setFieldValue={setFieldValue}
                                      errors={errors}
                                      placeholder="입력"
                                    /> :
                                    <TextField
                                      name={`serviceDetailItemViewList.${i}.memo`}
                                      label=""
                                      value={values.memo}
                                      variant="standard"
                                      placeholder="기본값"
                                      fullWidth={true}
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                    />
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="outlined"
                                    disabled={i+1 === values.serviceDetailItemViewList.length}
                                    onClick={() => {
                                      console.log(serviceDetailItemView.directInputUseYn)
                                    }}
                                  >
                                    <ArrowDropDownSharpIcon />
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    disabled={!i}
                                    style={{ marginLeft: '5px'}}
                                  >
                                    <ArrowDropUpSharpIcon />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    variant="outlined"
                                    onClick={() => {
                                      const {serviceDetailItemViewList, ...rest} = values;
                                      const filteredServiceDetailItemViewList = serviceDetailItemViewList.filter((serviceDetailItemView, index) => index !== i);
                                      setValues({
                                        ...rest,
                                        serviceDetailItemViewList: filteredServiceDetailItemViewList
                                      })
                                    }}
                                  >
                                    삭제
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
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
                          const {serviceDetailItemViewList, ...rest} = values;
                          const newOrderNumber = serviceDetailItemViewList[serviceDetailItemViewList.length-1].orderNumber + 1;
                          setValues({
                            ...rest,
                            serviceDetailItemViewList: [...serviceDetailItemViewList, {
                              directInputUseYn: true,
                              item: '',
                              unit: '',
                              price: '',
                              memo: '',
                              orderNumber: newOrderNumber,
                            }]});
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