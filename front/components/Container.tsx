import React, { useState } from 'react';
import {
  Form,
  Formik,
  FormikHelpers,
  FormikProps
} from 'formik';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  EditOff as ResetIcon,
  SaveAs as SaveIcon
} from '@mui/icons-material';
import {
  DataField,
  DateFormat,
  DepartmentSelector,
  Tooltip,
  UserSelector,
  useDialog,
  DataFieldType,
  isCheckbox,
  isDate,
  isInput,
  isSelect,
  Props as DataFieldProps, Option, DataFieldValue
} from 'components';

export type State = {
  values: any;
}

export interface FieldProps extends Omit<DataFieldProps, 'type' | 'errors' | 'value' | 'setFieldValue'> {
  sm: number;
  xl?: number | false;
  lg?: number | false;
  md?: number | false;
  xs?: number | false;
  type?: DataFieldType | 'user' | 'department';
  options?: (Option | DataFieldValue)[];
}

interface Props {
  title: string;
  modifiedAt?: Date;
}

interface SubmitProps extends Props {
  view: any;
  submit: (values: any, callback: () => void) => void;
  updateView: () => void;
  fields: FieldProps[] | ((state: State) => FieldProps[]);
  children?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
}

interface ChildrenProps extends Props {
  children: React.ReactNode;
}

export const mapper = ({
  xl = false,
  lg = false,
  md = false,
  sm,
  xs = false,
  index,
  type,
  ...rest
}: FieldProps & Pick<FormikProps<any>, 'values' | 'setFieldValue' | 'errors'> & {
  index: number;
  edit: boolean;
  containerReadOnly?: boolean;
  containerDisabled?: boolean;
}) => (
  <Grid item
    key={index}
    xl={xl}
    lg={lg}
    md={md}
    sm={sm}
    xs={xs}
  >
    {buildField({ ...rest, type, value: rest.values[rest.name] })}
  </Grid>
);

export const buildField = (props:
    Omit<DataFieldProps, 'type'>
    & Pick<FormikProps<any>, 'values' | 'setFieldValue' | 'errors'>
    & {
    fieldRequired?: boolean,
    fieldDisabled?: boolean,
    fieldReadOnly?: boolean,
    edit: boolean;
    containerReadOnly?: boolean;
    containerDisabled?: boolean;
    type?: DataFieldType | 'user' | 'department';
  }
): React.ReactNode | null => {
  const {
    fieldRequired,
    fieldDisabled,
    fieldReadOnly,
    edit,
    containerReadOnly,
    containerDisabled,
    type,
    ...rest
  } = props;
  const required: boolean | undefined
    = !(fieldReadOnly || fieldDisabled || containerReadOnly || containerDisabled) && edit && fieldRequired;
  const disabled: boolean | undefined = (fieldDisabled || containerDisabled);
  const readOnly: boolean | undefined = (fieldReadOnly || containerReadOnly) || !edit;

  const fieldProps: DataFieldProps = {
    ...rest,
    type: type === 'user' || type === 'department' ? 'select' : type,
    required,
    disabled,
    readOnly,
  };

  if (isInput(fieldProps)) {
    return <DataField {...fieldProps} />;
  }

  if (isSelect(fieldProps)) {
    if (type === 'user') {
      const { options, type, ...selectProps } = fieldProps;
      return <UserSelector  {...selectProps} />;
    }
    if (type === 'department') {
      const { options, type, ...selectProps } = fieldProps;
      return <DepartmentSelector {...selectProps} />;
    }
    return <DataField {...fieldProps} />;
  }

  if (isCheckbox(fieldProps)) {
    return <DataField {...fieldProps} />;
  }

  if (isDate(fieldProps)) {
    return <DataField {...fieldProps} />;
  }
  return <>ERROR: type not declared.</>;
};

const isChildrenProps = (props: Props): props is ChildrenProps => typeof (props as any).submit === 'undefined';

const Container = (props: ChildrenProps | SubmitProps) => {
  const {
    title,
    modifiedAt,
  } = props;

  const dialog = useDialog();

  const [open, setOpen] = useState<boolean>(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  if (isChildrenProps(props)) {
    const { children } = props;
    return (
      <Paper sx={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '30px'
      }}>
        <Accordion expanded={open}>
          <AccordionSummary>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
              <Grid container
                spacing={2}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Grid item
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                  }}>
                  <Typography sx={{
                    fontWeight: 'bold',
                    marginRight: '4px'
                  }}>
                    {title}
                  </Typography>
                </Grid>
                <Grid item
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                  }}>
                  {modifiedAt && (
                    <>
                      <Typography sx={{
                        fontWeight: 'bold',
                        marginRight: '4px'
                      }}>
                        최종수정일시
                      </Typography>
                      <Typography sx={{
                        marginRight: '8px'
                      }}>
                        <DateFormat date={modifiedAt} format="YYYY-MM-DD HH:mm" />
                      </Typography>
                    </>
                  )}
                  <Button
                    onClick={handleToggle}
                    sx={{
                      maxHeight: '30px'
                    }}>
                    {open ? '접기' : '펴기'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
              mb: '40px',
            }}>
              {children}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    );
  }

  const {
    readOnly,
    disabled,
    view,
    submit,
    updateView,
    fields,
    children,
  } = props as SubmitProps;
  const [edit, setEdit] = useState<boolean>(false);

  const handler = {
    edit: () => {
      setEdit(true);
    },
    submit: (values: any, { setSubmitting, setErrors }: FormikHelpers<any>) => {
      try {
        submit(values, () => {
          setEdit(false);
        });
      } catch (errors: any) {
        setErrors(errors);
      } finally {
        setSubmitting(false);
      }
    },
    updateView
  };

  return (
    <Paper sx={{
      width: '100%',
      boxSizing: 'border-box',
      padding: '30px'
    }}>
      <Formik enableReinitialize initialValues={view} onSubmit={handler.submit}>
        {({ isSubmitting, dirty, handleSubmit, resetForm, values, errors, setFieldValue }) => (
          <Form>
            <Accordion expanded={open}>
              <AccordionSummary>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                  <Grid container
                    spacing={2}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Grid item
                      sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        alignItems: 'center',
                      }}>
                      <Typography sx={{
                        fontWeight: 'bold',
                        marginRight: '4px'
                      }}>
                        {title}
                      </Typography>
                      {open && edit && submit && (
                        <>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            width: '25px',
                            height: '25px',
                            backgroundColor: (theme) => theme.palette.primary.main,
                            borderRadius: '4px'
                          }}>
                            <Tooltip title="수정 내용 저장">
                              <IconButton
                                disabled={isSubmitting || !dirty}
                                onClick={() => {
                                  handleSubmit();
                                }}
                                sx={{
                                  color: '#ffffff',
                                  maxHeight: '21px'
                                }}>
                                <SaveIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box
                            color="primary"
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              width: '25px',
                              height: '25px',
                              backgroundColor: (theme) => theme.palette.primary.main,
                              borderRadius: '4px'
                            }}>
                            <Tooltip title="수정 취소">
                              <IconButton
                                onClick={() => {
                                  if (edit && dirty) {
                                    dialog.rollback(() => {
                                      resetForm();
                                      handler.updateView();
                                      setEdit(false);
                                    });
                                  } else {
                                    setEdit(false);
                                  }
                                }}
                                sx={{
                                  color: '#ffffff',
                                  maxHeight: '21px'
                                }}>
                                <ResetIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </>
                      )}
                      {open && !edit && submit && (
                        <Box
                          color="primary"
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            width: '25px',
                            height: '25px',
                            backgroundColor: (theme) => theme.palette.primary.main,
                            borderRadius: '4px'
                          }}>
                          <Tooltip title="내용 수정">
                            <IconButton
                              onClick={handler.edit}
                              sx={{
                                color: '#ffffff',
                                maxHeight: '21px'
                              }}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </Grid>
                    {!edit && (
                      <Grid item
                        sx={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          alignItems: 'center',
                        }}>
                        {modifiedAt && (
                          <>
                            <Typography sx={{
                              fontWeight: 'bold',
                              marginRight: '4px'
                            }}>
                              최종수정일시
                            </Typography>
                            <Typography sx={{
                              marginRight: '8px'
                            }}>
                              <DateFormat date={modifiedAt} format="YYYY-MM-DD HH:mm" />
                            </Typography>
                          </>
                        )}
                        <Button
                          onClick={handleToggle}
                          sx={{
                            maxHeight: '30px'
                          }}>
                          {open ? '접기' : '펴기'}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '40px',
                }}>
                  <Grid container spacing={2}>
                    {(Array.isArray(fields) ? fields : (fields({ values })))
                    .map((child, index) => mapper({
                        ...child,
                        index,
                        values,
                        setFieldValue,
                        errors,
                        edit,
                        containerDisabled: disabled,
                        containerReadOnly: readOnly,
                      })
                    )}
                  </Grid>
                </Box>
                {children && (
                  <>
                    <Divider />
                    <Box sx={{
                      display: 'flex',
                      width: '100%',
                      mb: '40px',
                    }}>
                      {children}
                    </Box>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default Container;
