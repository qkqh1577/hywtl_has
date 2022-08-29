import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Form,
  FormikProvider,
} from 'formik';
import { FormikLayoutProps } from 'layouts/PageLayout';
import DateFormat from 'components/DateFormat';
import { ColorPalette } from 'app/view/App/theme';
import IconButton from 'components/IconButton';

export interface SectionLayoutProps<T>
  extends FormikLayoutProps<T> {
  title?: string;
  disableFold?: boolean;
  titleRightComponent?: React.ReactNode;
  modals?: JSX.Element | JSX.Element[];
  children: React.ReactNode;
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
        paddingBottom:  '10px'
      }}>
        <Box sx={{
          display:  'flex',
          flexWrap: 'nowrap'
        }}>
          <Typography>{title}</Typography>
          {!disableFold && (
            <IconButton
              children={<FontAwesomeIcon icon={shrink ? 'angle-down' : 'angle-up'} />}
              onClick={() => {
                formik.setFieldValue('shrink', !shrink);
              }}
            />
          )}
        </Box>
        <Box sx={{
          display:  'flex',
          flexWrap: 'nowrap'
        }}>
          {titleRightComponent}
          <Typography fontSize="12px" fontWeight="bold" marginRight="5px">최종수정일시</Typography>
          <Typography fontSize="12px">
            <DateFormat date={modifiedAt} format="YYYY-MM-DD HH:mm" />
          </Typography>
        </Box>
      </Box>
      <FormikProvider value={props.formik}>
        <Form>
          <Box
            children={props.children}
            sx={{
              display:      'flex',
              width:        '100%',
              padding:      '15px 20px',
              border:       `1px solid ${ColorPalette.Blue['7']}`,
              borderRadius: '5px',
            }}
          />
        </Form>
      </FormikProvider>
      {modals}
    </Box>
  );
};
