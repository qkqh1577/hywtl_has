import React, {
  useCallback,
  useEffect
} from 'react';
import {
  FormikContextType,
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectComplexBuildingParameter } from 'project_complex/parameter';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { FieldStatus } from 'components/DataFieldProps';
import CheckboxField from 'components/CheckboxField';
import {
  testTypeList,
  testTypeName
} from 'admin/estimate/content/domain';
import {
  difficultyList,
  ProjectComplexBuildingId
} from 'project_complex/domain';
import { projectComplexAction } from 'project_complex/action';
import { Td } from 'layouts/Table';

interface FormType
  extends ProjectComplexBuildingParameter {
  test1: string[];
}

interface Props
  extends ProjectComplexBuildingParameter {
  onSubmit: (values: ProjectComplexBuildingParameter) => void;
  fieldName: string;
}

function Children({ fieldName, formik }: {
  fieldName: string;
  formik: FormikContextType<FormType>;
}) {

  const dispatch = useDispatch();
  const buildingFileOpen = useCallback((id: ProjectComplexBuildingId) => dispatch(projectComplexAction.buildingFileModal(id)), [dispatch]);
  const { siteList } = useSelector((root: RootState) => root.projectComplex);
  const { buildingList } = useSelector((root: RootState) => root.projectDocument);

  switch (fieldName) {
    case 'name':
      return (
        <TextField
          disableLabel
          name={fieldName}
          label="동명"
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'site.id':
      return (
        <SelectField
          disableLabel
          name={fieldName}
          label="대지 모형"
          options={siteList?.map((item) => ({
            key:  item.id,
            text: item.name ?? ''
          }))}
          onChange={(e) => {
            formik.setFieldValue('siteId', e.target.value);
          }}
          onBlur={() => {
            const siteId = (formik.values as any).site?.id;
            formik.handleSubmit();
          }}
        />
      );
    case 'shape':
      return (
        <TextField
          disableLabel
          name={fieldName}
          label="평면 형상"
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'floorCount':
      return (
        <TextField
          disableLabel
          type="number"
          name={fieldName}
          label="층 수"
          onBlur={() => {
            if (!Number.isSafeInteger(formik.values.floorCount)) {
              formik.setFieldValue(fieldName, undefined);
            }
            formik.handleSubmit();
          }}
        />
      );
    case 'height':
      return (
        <TextField
          disableLabel
          type="number"
          name={fieldName}
          label="건축 높이"
          onBlur={() => {
            if (!formik.values.height || formik.values.height <= 0) {
              formik.setFieldValue(fieldName, undefined);
            }
            formik.handleSubmit();
          }}
        />
      );
    case 'baseArea':
      return (
        <TextField
          disableLabel
          type="number"
          name={fieldName}
          label="기준층 바닥 면적"
          onBlur={() => {
            if (!formik.values.baseArea || formik.values.baseArea <= 0) {
              formik.setFieldValue(fieldName, undefined);
            }
            formik.handleSubmit();
          }}
        />
      );
    case 'ratio':
      return (
        <TextField
          disableLabel
          type="number"
          name={fieldName}
          status={FieldStatus.ReadOnly}
          label="형상비"
        />
      );

    case 'buildingDocument.id':
      return (
        <SelectField
          disableLabel
          name={fieldName}
          status={FieldStatus.ReadOnly}
          label="형상비 검토 파일 ID"
          options={buildingList?.map((item) => ({
            key:  item.id,
            text: item.file.filename
          }))}
          onBlur={() => {
            buildingFileOpen(formik.values.id);
          }}

        />
      );
    case 'specialWindWeightConditionList':
      return (
        <CheckboxField
          name={fieldName}
          label="특별 풍하중 조건"
          disableLabel
          disableAll
          options={['2', '3', '4', '5']}
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'inTest':
      return (
        <CheckboxField
          name="test1"
          label="실험 대상 여부"
          disableLabel
          disableAll
          options={['1']}
          onBlur={() => {
            const value = formik.values.test1;
            if (!value || value.length === 0) {
              formik.setFieldValue('inTest', true);
            }
            else {
              formik.setFieldValue('inTest', false);
            }
            formik.handleSubmit();
          }}
        />
      );
    case 'testTypeList':
      return (
        <CheckboxField
          name={fieldName}
          label="실험 종류"
          disableLabel
          disableAll
          options={testTypeList.map(item => ({
            key:  item as string,
            text: testTypeName(item)
          }))}
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'estimateFigureDifficulty':
      return (
        <SelectField
          disableLabel
          name={fieldName}
          label="견적 제작 난이도"
          options={difficultyList}
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'estimateTestDifficulty':
      return (
        <SelectField
          disableLabel
          name={fieldName}
          label="견적 실험 난이도"
          options={difficultyList}
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'estimateEvaluationDifficulty':
      return (
        <SelectField
          disableLabel
          name={fieldName}
          label="견적 평가 난이도"
          options={difficultyList}
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    case 'estimateReportDifficulty':
      return (
        <SelectField
          disableLabel
          name={fieldName}
          label="견적 보고서 난이도"
          options={difficultyList}
          onBlur={() => {
            formik.handleSubmit();
          }}
        />
      );
    default:
      return <>-</>;
  }
}

export function ProjectComplexBuildingNameCell({ onSubmit, fieldName, ...props }: Props) {

  const dispatch = useDispatch();
  const { requestBuilding } = useSelector((root: RootState) => root.projectComplex);
  const formik = useFormik<FormType>({
    enableReinitialize: true,
    initialValues:      {
      ...props,
      test1: props.inTest ? ['1'] : []
    },
    onSubmit:           (values) => {
      console.log(values);
      onSubmit(values);
    },
  });

  useEffect(() => {
    if (requestBuilding === 'response') {
      formik.setSubmitting(false);
      dispatch(projectComplexAction.requestBuilding('idle'));
      const { height, baseArea } = formik.values;
      if (height && height > 0 && baseArea && baseArea > 0) {
        formik.setFieldValue('ratio', height / Math.sqrt(baseArea));
      }
    }
  }, [requestBuilding]);

  return (
    <Td>
      <FormikProvider value={formik}>
        <Children formik={formik} fieldName={fieldName} />
      </FormikProvider>
    </Td>
  );
}