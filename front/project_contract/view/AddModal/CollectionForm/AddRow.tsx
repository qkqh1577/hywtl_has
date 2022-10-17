import React, {
  useContext,
  useState
} from 'react';
import { TableRow } from '@mui/material';
import { Td } from 'layouts/Table';
import Button from 'layouts/Button';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import {
  initialProjectContractCollectionStageParameter,
  ProjectContractCollectionStageParameter
} from 'project_contract/parameter';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


export default function AddRow() {

  const formik = useContext(FormikContext);
  const [stage, setStage] = useState<ProjectContractCollectionStageParameter>(initialProjectContractCollectionStageParameter);
  const totalAmount = formik.values.estimate?.plan?.totalAmount ?? 0;

  const onAdd = () => {
    formik.setFieldValue('stageList', [...formik.values.stageList, stage]);
    setStage(initialProjectContractCollectionStageParameter);

  };

  return (
    <TableRow>
      <Td>
        <Input
          key={stage.name}
          variant="outlined"
          defaultValue={stage.name ?? ''}
          placeholder="입력"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (stage.name !== value) {
              setStage((prev) => ({
                ...prev,
                name: value,
              }) as ProjectContractCollectionStageParameter);
            }
          }}
        />
      </Td>
      <Td>
        <Input
          key={stage.ratio}
          type="number"
          variant="outlined"
          defaultValue={stage.ratio ?? ''}
          placeholder="입력"
          onBlur={(e) => {
            const value = +(e.target.value) || undefined;
            if (stage.ratio !== value) {
              setStage((prev) => ({
                ...prev,
                ratio: value,
              }) as ProjectContractCollectionStageParameter);
            }
          }}
        />
      </Td>
      <Td>
        <Input
          isAmount
          readOnly
          key={stage.ratio}
          variant="outlined"
          defaultValue={stage.ratio ? stage.ratio * totalAmount : 0}
        />
      </Td>
      <Td>
        <Input
          key={stage.note}
          variant="outlined"
          defaultValue={stage.note ?? ''}
          placeholder="입력"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (stage.note !== value) {
              setStage((prev) => ({
                ...prev,
                note: value,
              }) as ProjectContractCollectionStageParameter);
            }
          }}
        />
      </Td>
      <Td>
        <DatePicker
          key={stage.expectedDate}
          value={stage.expectedDate ? dayjs(stage.expectedDate)
          .format('YYYY-MM-DD') : null}
          inputFormat="YYYY-MM-DD"
          mask="____-__-__"
          openTo="year"
          onChange={(e,
                     r
          ) => {
            const date = dayjs(e);
            if (stage.expectedDate !== r) {

              if (date.isValid() && date.format('YYYY-MM-DD') === r) {
                setStage((prev) => ({
                  ...prev,
                  expectedDate: r,
                }) as ProjectContractCollectionStageParameter);
              }
              else {
                setStage((prev) => ({
                  ...prev,
                  expectedDate: undefined,
                }) as unknown as ProjectContractCollectionStageParameter);
              }
            }
          }}
          onAccept={(e) => {
            if (e === null) {
              setStage((prev) => ({
                ...prev,
                expectedDate: undefined,
              }) as unknown as ProjectContractCollectionStageParameter);
            }
            else {
              setStage((prev) => ({
                ...prev,
                expectedDate: dayjs(e)
                              .format('YYYY-MM-DD'),
              }) as ProjectContractCollectionStageParameter);
            }
          }}
          renderInput={(parameter) => (
            <Input
              {...parameter.InputProps}
              inputRef={parameter.inputRef}
              inputProps={parameter.inputProps}
              defaultValue={parameter.value}
              onChange={undefined}
              onBlur={parameter.onChange}
            />
          )}
        />
      </Td>
      <Td colSpan={2}>
        <Button onClick={onAdd}>
          기성단계추가
        </Button>
      </Td>
    </TableRow>
  );
}
