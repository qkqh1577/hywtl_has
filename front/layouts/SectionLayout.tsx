import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
} from '@mui/icons-material';
import {
  Form,
  FormikProvider,
} from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import IconButton from 'components/IconButton';
import DateFormat from 'components/DateFormat';

export interface SectionLayoutProps<T>
  extends FormikLayoutProps<T> {
  title?: string;
  disableFold?: boolean;
  titleRightComponent?: React.ReactNode;
  modals?: JSX.Element | JSX.Element[];
  body: React.ReactNode;
}

export default function SectionLayout<T extends object>(props: SectionLayoutProps<T>) {

  const {
          title,
          disableFold,
          titleRightComponent,
          formik,
          modals
        } = props;
  const shrink: boolean | undefined = (formik.values as any).shrink ?? undefined;
  const modifiedAt: Date | null | undefined = (formik.values as any).modifiedAt ?? undefined;

  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
      overflow: 'hidden'
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        justifyContent: 'space-between',
      }}>
        <Box>
          <Typography>{title}</Typography>
          {!disableFold && (
            <IconButton
              children={shrink ? <DownIcon /> : <UpIcon />}
              onClick={() => {
                formik.setFieldValue('shrink', !shrink);
              }}
            />
          )}
        </Box>
        <Box>
          {titleRightComponent}
          <Typography>최종수정일시</Typography>
          <Typography>
            <DateFormat date={modifiedAt} format="YYYY-MM-DD HH:mm" />
          </Typography>
        </Box>
      </Box>
      <FormikProvider value={props.formik}>
        <Form>
          <Box
            children={props.body}
            sx={{
              display: 'flex',
              width:   '100%',
              mb:      '40px',
            }}
          />
        </Form>
      </FormikProvider>
      {modals}
    </Box>
  );
};
