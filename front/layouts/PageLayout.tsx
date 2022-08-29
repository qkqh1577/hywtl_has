import React, { useRef } from 'react';
import {
  Box,
  Paper,
  Typography
} from '@mui/material';
import { TitleProps } from 'components/Title';
import {
  Form,
  FormikContextType,
  FormikProvider,
} from 'formik';
import { ColorPalette } from 'app/view/App/theme';

export interface PageLayoutProps
  extends TitleProps {
  body: React.ReactNode;
  footer?: React.ReactNode;
  modifiedAt?: Date | null;
  modals?: JSX.Element | JSX.Element[];
}

export interface SearchPageLayoutProps
  extends PageLayoutProps {
  filter: React.ReactNode;
}


export interface FormikLayoutProps<T> {
  formik: FormikContextType<T>;
}

interface FormikPageLayoutProps<T>
  extends PageLayoutProps,
          FormikLayoutProps<T> {
}

export default function PageLayout<T>(props: PageLayoutProps | SearchPageLayoutProps | FormikPageLayoutProps<T>) {

  function isFormikForm(props: PageLayoutProps): props is FormikPageLayoutProps<T> {
    return typeof (props as any).formik !== 'undefined';
  }

  const {
          title,
          titleRightComponent,
          modals,
        } = props;
  return (
    <Paper sx={{
      width:    '100%',
      height:   '100%',
      overflow: 'hidden',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        padding:        '20px'
      }}>
        {typeof title === 'string' && (
          <Typography sx={{
            fontSize:   '18px',
            lineHeight: '26px',
            color:      ColorPalette.DarkGray,
            fontWeight: 'bold'
          }}>
            {title}
          </Typography>
        )}
        {typeof title !== 'string' && title}
        {titleRightComponent && (
          <Box sx={{
            display:        'flex',
            width:          '50%',
            flexWrap:       'nowrap',
            justifyContent: 'right',
          }}>
            {titleRightComponent}
          </Box>
        )}
      </Box>
      {isFormikForm(props) && (
        <FormikProvider value={props.formik}>
          <Form>
            <PageContent {...props} />
          </Form>
        </FormikProvider>
      )}
      {!isFormikForm(props) && (
        <PageContent {...props} />
      )}
      {Array.isArray(modals) ? modals.map(modal => <Box key={modal.type}>{modal}</Box>) : modals}
    </Paper>
  );
};

function PageContent(props: PageLayoutProps) {
  function isSearchForm(props: PageLayoutProps): props is SearchPageLayoutProps {
    return typeof (props as any).filter !== 'undefined';
  }

  const filterRef = useRef<HTMLDivElement>(null);
  const filterHeight = filterRef.current?.offsetHeight ?? 0;

  return (
    <>
      {isSearchForm(props) && (
        <Box
          ref={filterRef}
          children={props.filter}
          sx={{
            display: 'flex',
            width:   '100%',
          }}
        />
      )}
      <Box sx={{
        display:                      'flex',
        width:                        '100%',
        flexWrap:                     'wrap',
        padding:                      '20px',
        overflowY:                    'scroll',
        height:                       `calc(100% - ${filterHeight + 66}px)`, // TODO: 실제 계산 높이 필요
        '&::-webkit-scrollbar':       {
          width:           '10px',
          backgroundColor: ColorPalette.Blue['7']
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ColorPalette.DarkBlue['5']
        }
      }}>
        <Box
          children={props.body}
          sx={{
            display: 'flex',
            width:   '100%',
          }}
        />
        {props.footer && (
          <Box
            children={props.footer}
            sx={{
              display: 'flex',
              width:   '100%',
            }}
          />
        )}
      </Box>
    </>
  );
}
