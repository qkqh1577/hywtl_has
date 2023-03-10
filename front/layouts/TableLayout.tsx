import {
  Box,
  MenuItem
} from '@mui/material';
import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import TextBox from 'layouts/Text';
import {
  pageSizeList,
  Pagination
} from 'type/Page';
import IconButton from 'layouts/IconButton';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextLink from 'layouts/TextLink';
import Select from 'layouts/Select';

interface Props {
  children: React.ReactNode;
  pagination?: Pagination;
  pageFieldName?: string;
  sizeFieldName?: string;
  sizeOptions?: number[];
  disablePagination?: boolean;
  titleRightComponent?: React.ReactNode;
  formik?: FormikContextType<any>;
  title?: string;
  submitWhenSizeChanged?: boolean;
}

export default function TableLayout(props: Props) {
  const hasTitle = typeof props.title !== 'undefined'
    || typeof props.titleRightComponent !== 'undefined'
    || typeof props.sizeFieldName !== 'undefined';
  const formik = props.formik ?? useContext(FormikContext);
  const sizeFieldName = props.sizeFieldName ?? 'size';
  const pageFieldName = props.pageFieldName ?? 'page';
  const tableRef = useRef<HTMLDivElement>(null);
  const tableHeight = tableRef.current?.offsetHeight ?? 0;
  const size = formik.values[sizeFieldName];
  const [maxTableHeight, setMaxTableHeight] = useState<number>();

  useEffect(() => {
    if (!maxTableHeight || tableHeight > maxTableHeight) {
      setMaxTableHeight(tableHeight);
    }
  }, [tableHeight]);

  useEffect(() => {
    if (props.submitWhenSizeChanged !== false) {
      setMaxTableHeight(undefined);
      formik.handleSubmit();
    }
  }, [size, props.submitWhenSizeChanged]);

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginBottom:   '10px',
      }}>
        {hasTitle && (
          <Box sx={{
            display:    'flex',
            flexWrap:   'nowrap',
            alignItems: 'center',
          }}>
            {props.title && (
              <TextBox variant="body7" sx={{ marginRight: '20px' }}>{props.title}</TextBox>
            )}
            {props.pagination && (
              <TextBox variant="body7" sx={{ marginRight: '20px' }}>??? {props.pagination.totalElements}???</TextBox>
            )}
            {!props.disablePagination && props.pagination && (
              <Box sx={{
                display:     'flex',
                flexWrap:    'nowrap',
                minWidth:    '130px',
                marginRight: '20px',
                alignItems:  'center',
              }}>
                <Select
                  variant="outlined"
                  value={formik.values[sizeFieldName] ?? ''}
                  onChange={(e) => {
                    const value = +(e.target.value as string) || undefined;
                    if (formik.values[sizeFieldName] !== value) {
                      formik.setFieldValue(sizeFieldName, value);
                    }
                  }}>
                  {(props.sizeOptions ?? pageSizeList).map(item => (
                    <MenuItem key={item} value={item}>{item}?????? ??????</MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Box>
        )}
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'flex-end',
          alignItems:     'center',
        }}>
          {props.titleRightComponent}
        </Box>
      </Box>
      <Box
        ref={tableRef}
        sx={{
          display:   'flex',
          flexWrap:  'nowrap',
          width:     '100%',
          minHeight: !maxTableHeight ? `${maxTableHeight}px` : 'auto',
        }}>
        {props.children}
      </Box>
      {!props.disablePagination && props.pagination && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'center',
          width:          '100%',
          marginTop:      '10px',
          paddingRight:   '10px',
          alignItems:     'center',
        }}>
          <IconButton
            shape="square"
            disabled={props.pagination.totalPages === 0 || formik.values[pageFieldName] === 0}
            children={
              <FontAwesomeIcon icon="angles-left" />
            }
            onClick={() => {
              formik.setFieldValue(pageFieldName, 0);
              formik.handleSubmit();
            }}
            sx={{
              margin: '5px',
            }}
          />
          <IconButton
            shape="square"
            disabled={props.pagination.totalPages === 0 || formik.values.page === 0}
            children={
              <FontAwesomeIcon icon="angle-left" />
            }
            onClick={() => {
              formik.setFieldValue(pageFieldName, formik.values[pageFieldName] - 1);
              formik.handleSubmit();
            }}
            sx={{
              margin: '5px',
            }}
          />
          {getPageList(props.pagination)
          .map(page => (
            <Box
              key={page}
              sx={{
                width:          '22px',
                height:         '22px',
                fontSize:       '13px',
                display:        'flex',
                justifyContent: 'center',
                alignItems:     'center',
                margin:         '5px',
              }}>
              {(page === formik.values[pageFieldName] + 1)
                ? (
                  <TextBox variant="body7">
                    {page}
                  </TextBox>
                )
                : (
                  <TextLink
                    onClick={() => {
                      formik.setFieldValue(pageFieldName, page - 1);
                      formik.handleSubmit();
                    }}>
                    {`${page}`}
                  </TextLink>
                )}
            </Box>
          ))}
          {props.pagination.totalPages === 0 && (
            <Box
              sx={{
                width:          '22px',
                height:         '22px',
                fontSize:       '13px',
                display:        'flex',
                justifyContent: 'center',
                alignItems:     'center',
                margin:         '5px',
              }}>
              <TextBox variant="body7">1</TextBox>
            </Box>
          )}
          <IconButton
            shape="square"
            disabled={props.pagination.totalPages === 0 || (+formik.values[pageFieldName] || 0) + 1 === props.pagination.totalPages}
            children={
              <FontAwesomeIcon icon="angle-right" />
            }
            onClick={() => {
              formik.setFieldValue(pageFieldName, formik.values[pageFieldName] + 1);
              formik.handleSubmit();
            }}
            sx={{
              margin: '5px',
            }}
          />
          <IconButton
            shape="square"
            disabled={props.pagination.totalPages === 0 || (+formik.values[pageFieldName] || 0) + 1 === props.pagination.totalPages}
            children={
              <FontAwesomeIcon icon="angles-right" />
            }
            onClick={() => {
              formik.setFieldValue(pageFieldName, props.pagination!.totalPages - 1);
              formik.handleSubmit();
            }}
            sx={{
              margin: '5px',
            }}
          />
        </Box>
      )}
    </Box>
  );
}

function getPageList(pagination: Pagination): number[] {
  const startNum = Math.floor(pagination.number / 10) * 10 + 1;
  const endNum = Math.min(startNum + 9, pagination.totalPages);
  const result: number[] = [];

  for (let i = startNum; i <= endNum; i++) {
    result.push(i);
  }
  return result;
}