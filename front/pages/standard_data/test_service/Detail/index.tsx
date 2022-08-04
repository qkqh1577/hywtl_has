import React, {
  useEffect,
  useState
} from 'react';
import {
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  Form,
  Formik,
  FormikHelpers
} from 'formik';
import {
  initTestServiceTemplateView as initView,
  TestServiceDetailTemplate,
  TestServiceDetailTemplateParameter,
  TestServiceDetailTemplateView as DetailView,
  TestServiceTemplateParameter,
  TestServiceTemplateView as View,
  testTypeList,
  useTestServiceTemplate,
} from 'services/standard_data/test_service_template';
import { useDialog } from 'components';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import PageLayout from 'components/PageLayout';
import TotalPriceField from './TotalPriceField';
import DetailList from './DetailList';
import CancelButton from './CancelButton';

const getTotalPrice = (detailList: (TestServiceDetailTemplate | DetailView)[]): number | '' => {
  if (!detailList || detailList.length === 0) {
    return '';
  }
  return detailList
  .map(item => item.unitPrice)
  .filter(n => n !== '')
  .map(n => n as number)
  .reduce((a,
           b
  ) => a + b, 0);
};

export default function TestServiceDetail() {
  const { id: idString } = useParams<{ id: string }>();
  const id = typeof idString === 'undefined' || idString === 'add' ? null : (Number.isNaN(+idString) ? null : +idString);

  const location = useLocation();
  const navigate = useNavigate();
  const dialog = useDialog();
  const {
          detail,
          getOne,
          clearOne,
          add,
          change,
        } = useTestServiceTemplate();
  const [view, setView] = useState<View>(initView);

  const handler = {
    submit: (values: any,
             { setSubmitting, setErrors }: FormikHelpers<any>
            ) => {
      const errors: any = {};

      const title: string = values.title;
      if (!title) {
        errors.title = '용역 항목 입력은 필수입니다.';
      }

      const testType: string = values.testType;
      if (!testType) {
        errors.testType = '실험 타입 입력은 필수입니다.';
      }

      const detailList: TestServiceDetailTemplateParameter[] = (values.detailList as DetailView[])
      .map((item: any,
            index
      ) => {
        const detailErrors: any = {};

        const id: number | undefined = item.id || undefined;
        const titleList: string[] = item.titleList.filter((t: string) => t !== '');
        if (titleList.length === 0) {
          detailErrors.titleList = '세부 항목은 하나 이상 필수입니다.';
        }

        const unit: string = item.unit;
        if (!unit) {
          detailErrors.unit = '단위 항목 입력은 필수입니다.';
        }

        const unitPrice: number = item.unitPrice;
        if (!unitPrice && unitPrice !== 0) {
          detailErrors.unitPrice = '단가 항목 입력은 필수입니다.';
        }

        const memo: string | undefined = item.memo || undefined;

        const keys = Object.keys(detailErrors);
        if (keys.length > 0) {
          for (let errorIndex = 0; errorIndex < keys.length; errorIndex++) {
            errors[`detailList[${index}].${keys[errorIndex]}`]
              = detailErrors[keys[errorIndex]];
          }
          return null;
        }

        const detailParams: TestServiceDetailTemplateParameter = {
          id,
          titleList,
          unit,
          unitPrice,
          memo,
        };
        return detailParams;
      })
      .filter(item => item !== null)
      .map(item => item as TestServiceDetailTemplateParameter);

      if (detailList.length === 0) {
        errors['detailList.size'] = '세부 항목은 하나 이상 필수입니다.';
      }

      if (Object.keys(errors).length > 0) {
        setSubmitting(false);
        setErrors(errors);
        return;
      }

      const params: TestServiceTemplateParameter = {
        title,
        testType,
        detailList,
      };
      if (id === null) {
        add(params, () => {
          dialog.alert('등록되었습니다.');
        });
      }
      else {
        change(id, params, () =>  {
          dialog.alert('변경되었습니다.');
        });
      }
      setSubmitting(false);
    },
  };

  useEffect(() => {
    if (id) {
      getOne(id);
    }
    return () => {
      clearOne();
    };
  }, [id]);

  useEffect(() => {
    setView({
      edit:       view.edit,
      title:      detail?.title ?? initView.title,
      testType:   detail?.testType ?? initView.testType,
      totalPrice: getTotalPrice(detail?.detailList ?? initView.detailList),
      detailList: detail?.detailList.map((item) => ({
        id:        item.id,
        titleList: item.titleList,
        unit:      item.unit,
        unitPrice: item.unitPrice,
        memo:      item.memo ?? '',
      })) ?? initView.detailList
    });
  }, [detail]);

  return (
    <PageLayout
      title="용역 항목 상세 정보"
      body={
        <Formik
          enableReinitialize
          initialValues={view}
          onSubmit={handler.submit}
        >
          {({
              values,
              isSubmitting,
              setFieldValue,
              handleSubmit
            }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <h2>항목 정보</h2>
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    required
                    name="title"
                    label="용역 항목"
                  />
                </Grid>
                <Grid item sm={6}>
                  <SelectField
                    required
                    name="testType"
                    label="실험 타입"
                    options={testTypeList}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TotalPriceField />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <h2>세부 항목</h2>
                </Grid>
                <Grid item sm={12}>
                  <DetailList />
                </Grid>
              </Grid>
              {values.edit && (
                <Box sx={{
                  display: 'flex',
                  width:   '100%',
                  mt:      '40px',
                }}>
                  <CancelButton />
                  <Button
                    disabled={isSubmitting}
                    onClick={() => {
                      handleSubmit();
                    }}>
                    {id === null ? '등록' : '수정'}
                  </Button>
                </Box>
              )}
              {!values.edit && id && (
                <Box sx={{
                  display: 'flex',
                  width:   '100%',
                  mt:      '40px',
                }}>
                  <Button
                    color="secondary"
                    onClick={() => {
                      navigate('/test-service', { state: location.state });
                    }}>
                    목록
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      // TODO: 삭제
                    }}>
                    삭제
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    onClick={() => {
                      setFieldValue('edit', true);
                    }}>
                    수정
                  </Button>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      }
    />
  );
};