import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Box,
  Paper,
  Typography
} from '@mui/material';
import {
  FormikContextType,
  FormikProvider,
} from 'formik';
import { ColorPalette } from 'assets/theme';
import { useLocation } from 'react-router-dom';

interface TitleProps {
  title?: React.ReactNode;
  titleRightComponent?: React.ReactNode;
}

export interface PageLayoutProps
  extends TitleProps {
  body: React.ReactNode;
  footer?: React.ReactNode;
  modifiedAt?: Date | null;
  modals?: JSX.Element | JSX.Element[];
  showTitle?: boolean;
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

  const showTitle = typeof props.showTitle != 'undefined' ? props.showTitle : true;

  return (
    <Paper sx={{
      width:    '100%',
      height:   '100%',
      overflow: 'hidden',
      display:  'flex',
      flexWrap: 'wrap',
    }}>

      {showTitle && (
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          width:          '100%',
          justifyContent: 'space-between',
          padding: '20px 30px 20px 20px'
        }}>
          {typeof title === 'string' && (
            <Typography sx={{
              fontSize:   '18px',
              lineHeight: '26px',
              color:      ColorPalette._252627,
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
        </Box>)
      }
      {isFormikForm(props) && (
        <FormikProvider value={props.formik}>
          <PageContent {...props} />
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

  const { pathname } = useLocation();
  const filterRef = useRef<HTMLDivElement>();
  const [filterHeight, setFilterHeight] = useState<number>(0);

  useEffect(() => {
    setFilterHeight(filterRef.current?.offsetHeight ?? 0);
  }, [pathname]);

  return (
    <>
      <Box
        ref={filterRef}
        children={isSearchForm(props) && props.filter}
        sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'nowrap',
        }}
      />
      <Box sx={{
        display:                      'flex',
        width:                        '100%',
        flexWrap:                     'wrap',
        padding:                      '20px 20px 0 20px',
        overflowY:                    'auto',
        height:                       `calc(100% - ${filterHeight}px)`,
        '&::-webkit-scrollbar':       {
          width:           '10px',
          backgroundColor: ColorPalette._e4e9f2
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ColorPalette._697183
        }
      }}>
        <Box
          children={props.body}
          sx={{
            width: '100%',
          }}
        />
        {props.footer && (
          <Box
            children={props.footer}
            sx={{ width: '100%' }}
          />
        )}
      </Box>
    </>
  );
}
