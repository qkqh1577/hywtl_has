import { Box, } from '@mui/material';
import React, {
  useContext,
  useRef
} from 'react';
import TextBox from 'layouts/Text';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import useDialog from 'dialog/hook';

interface Props {
  index: number;
  list: string[];
}

export default function ({ index, list }: Props) {

  const { error } = useDialog();
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const newInputRef = useRef<HTMLInputElement>(null);

  if (!edit) {
    return (
      <Box sx={{
        display:        'flex',
        width:          '100%',
        flexWrap:       'wrap',
        justifyContent: 'flex-start',
      }}>
        {list.map((title,
                   i
        ) => (
          <TextBox key={i} variant="body9" sx={{
            display:    'flex',
            width:      '100%',
            margin:     '4px 0',
            height:     '32px',
            alignItems: 'flex-end'
          }}>
            {title}
          </TextBox>
        ))}
      </Box>
    );
  }
  return (
    <Box sx={{
      display:    'flex',
      width:      '100%',
      flexWrap:   'wrap',
      alignItems: 'flex-start',
    }}>
      {list.map((title,
                 i
      ) => {
        const name = `detailList.${index}.titleList.${i}`;
        return (
          <Box
            key={name}
            sx={{
              margin:         '5px 0',
              display:        'flex',
              width:          '100%',
              flexWrap:       'nowrap',
              justifyContent: 'space-between',
              alignItems:     'center',
            }}>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
              width:    'calc(100% - 32px * 3 - 30px)'
            }}>
              <Input
                variant="outlined"
                key={title}
                defaultValue={title ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (title !== value) {
                    formik.setFieldValue(name, value);
                  }
                }}
              />
            </Box>
            <Box sx={{
              display:  'flex',
              flexWrap: 'nowrap',
            }}>
              <IconButton
                tooltip="?????? ?????????"
                shape="square"
                disabled={i === 0}
                children={<FontAwesomeIcon icon="angle-up" />}
                sx={{
                  marginRight: '10px',
                }}
                onClick={() => {
                  const prevList = list.filter((t,
                                                k
                  ) => k !== i);
                  const titleList: string[] = [];
                  for (let k = 0; k < prevList.length; k++) {
                    if (titleList.length === i - 1) {
                      titleList.push(title);
                    }
                    titleList.push(prevList[k]);
                  }
                  formik.setFieldValue(`detailList.${index}.titleList`, titleList);
                }}
              />
              <IconButton
                tooltip="?????? ?????????"
                shape="square"
                disabled={i === list.length - 1}
                children={<FontAwesomeIcon icon="angle-down" />}
                sx={{
                  marginRight: '10px',
                }}
                onClick={() => {
                  const prevList = list.filter((t,
                                                k
                  ) => k !== i);
                  const titleList: string[] = [];
                  for (let k = 0; k < prevList.length; k++) {
                    titleList.push(prevList[k]);
                    if (titleList.length === i + 1) {
                      titleList.push(title);
                    }
                  }
                  formik.setFieldValue(`detailList.${index}.titleList`, titleList);
                }}
              />
              <IconButton
                tooltip="?????? ??????"
                shape="square"
                disabled={list.length <= 1}
                children={<FontAwesomeIcon icon="trash" />}
                onClick={() => {
                  if (list.length === 1) {
                    error('?????? ?????? ????????? ????????? ???????????????.');
                    return;
                  }
                  formik.setFieldValue(`detailList.${index}.titleList`, list.filter((t,
                                                                                     k
                  ) => k !== i));
                }}
              />
            </Box>
          </Box>
        );
      })}
      <Box
        sx={{
          margin:         '5px 0',
          display:        'flex',
          width:          '100%',
          flexWrap:       'nowrap',
          justifyContent: 'flex-end',
          alignItems:     'center',
        }}>
        <Box sx={{
          mr:    1,
          width: '100%'
        }}>
          <Input
            variant="outlined"
            defaultValue={''}
            inputRef={newInputRef}
          />
        </Box>
        <IconButton
          tooltip="?????? ??????"
          shape="square"
          children={<FontAwesomeIcon icon="plus" />}
          onClick={() => {
            const value = newInputRef.current?.value;
            if (!value) {
              error('????????? ??????????????????.');
              return;
            }
            formik.setFieldValue(`detailList.${index}.titleList`, [...list, value]);
            newInputRef.current.value = '';
          }}
        />
      </Box>
    </Box>
  );
}
