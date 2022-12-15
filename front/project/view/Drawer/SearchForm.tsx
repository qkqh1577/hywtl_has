import React, { useContext, } from 'react';
import {
  Box,
  BoxProps,
  Collapse,
  MenuItem
} from '@mui/material';
import IconButton from 'layouts/IconButton';
import Input from 'layouts/Input';
import Select from 'layouts/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormikContext } from 'formik';
import Button from 'layouts/Button';
import TextBox from 'layouts/Text';
import {
  getSubOptionByOption,
  projectStatusSearchOptionList
} from 'project/parameter';
import { ColorPalette } from 'assets/theme';

export interface SearchFormProps {
  openFilter: boolean;
  toggleFilter: () => void;
  searchFormRef: React.RefObject<HTMLDivElement>;
}

function ItemBox(props: BoxProps) {
  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        overflowX:      'hidden',
        display:        'flex',
        width:          '100%',
        paddingBottom:  '10px',
        flexWrap:       'unwrap',
        alignItems:     'center',
      }}
      {...props}
    />
  );
}

export default function (props: SearchFormProps) {

  const formik = useContext(FormikContext);
  const searchList = formik.values.projectStatusSearchList;
  const keywordOfProjectDetailList = formik.values.keywordOfProjectDetail ?? [];

  return (
    <Box
      ref={props.searchFormRef}
      sx={{
        display:    'flex',
        width:      '100%',
        overflowX:  'hidden',
        padding:    '15px 10px',
        flexWrap:   'wrap',
        alignItems: 'center',
      }}>
      <ItemBox>
        <Input
          key={formik.values.keywordOfProject}
          defaultValue={formik.values.keywordOfProject ?? ''}
          variant="outlined"
          placeholder="프로젝트번호 또는 프로젝트명 검색"
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.keywordOfProject !== value) {
              formik.setFieldValue('keywordOfProject', value);
            }
          }}
        />
        <IconButton
          onClick={props.toggleFilter}
          children={
            <FontAwesomeIcon
              icon="angle-up"
            />
          }
          sx={{
            marginLeft: '10px',
            transition: 'transform .2s',
            transform:  props.openFilter ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      </ItemBox>
      <Collapse
        in={props.openFilter}
        sx={{
          width: '100%',
        }}>
        {searchList.map((item,
                         index
        ) => (
          <ItemBox key={index}>
            <Box sx={{
              width:       '45%',
              marginRight: '10px'
            }}>
              <Select
                displayEmpty
                variant="outlined"
                value={item.projectOption ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.projectStatusSearchList !== value) {
                    formik.setFieldValue(`projectStatusSearchList.${index}.projectOption`, value);
                    formik.setFieldValue(`projectStatusSearchList.${index}.projectSubOption`, '');
                  }
                }}
              >
                <MenuItem disabled value="">상태명</MenuItem>
                {projectStatusSearchOptionList.map((item,
                                                    index
                ) => {
                  return (
                    <MenuItem
                      key={`${item.key}_${index}`}
                      value={item.key}>
                      {item.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box sx={{ width: '45%' }}>
              <Select
                displayEmpty
                variant="outlined"
                value={item.projectSubOption ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.projectStatusSearchList !== value) {
                    formik.setFieldValue(`projectStatusSearchList.${index}.projectSubOption`, value);
                  }
                }}>
                <MenuItem disabled value="">상세 선택</MenuItem>
                {getSubOptionByOption(formik.values.projectStatusSearchList[index].projectOption)
                .map((item,
                      index
                ) => {
                  return (
                    <MenuItem
                      key={`${item.key}_${index}`}
                      value={item.key}>
                      {item.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <IconButton
              shape="square"
              onClick={() => {
                if (index === 0) {
                  formik.setFieldValue(`projectStatusSearchList`, [...formik.values.projectStatusSearchList, {
                    projectOption:    '',
                    projectSubOption: '',
                  }]);
                }
                else {
                  formik.setFieldValue(`projectStatusSearchList`,
                    formik.values.projectStatusSearchList.filter((item,
                                                                  i
                    ) => i !== index));
                }

              }}
              children={
                <FontAwesomeIcon
                  icon={`${index === 0 ? 'add' : 'minus'}`}
                />
              }
              sx={{
                marginLeft: '10px',
              }}
            />
          </ItemBox>
        ))}
        <ItemBox
          sx={{
            display:       'flex',
            width:         '100%',
            paddingBottom: '10px',
            flexWrap:      'unwrap',
            flexDirection: 'column',
          }}>
          <Input
            key={formik.values.keywordOfProjectDetail}
            defaultValue={''}
            variant="outlined"
            placeholder="기본정보 또는 관계사정보 검색어 입력"
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                const value = (e.target as HTMLInputElement).value || undefined;
                if (formik.values.keywordOfProjectDetail !== value) {
                  formik.setFieldValue(`keywordOfProjectDetail`, [...formik.values.keywordOfProjectDetail, value]);
                }
              }
            }}
          />
          {keywordOfProjectDetailList.length > 0 && (
            <Box
              sx={{
                display:      'flex',
                flexWrap:     'wrap',
                width:        '100%',
                border:       `1px solid ${ColorPalette._e4e9f2}`,
                height:       '100px',
                margin:       '10px 0',
                padding:      '10px',
                borderRadius: '5px',
                overflowY:    'auto'
              }}
            >
              {keywordOfProjectDetailList.map((item,
                                               index
              ) => (
                <Box
                  marginRight="10px"
                  key={`${item}_${index}`}
                >
                  <TextBox
                    variant="body21"
                  >
                    {item}
                  </TextBox>
                  <IconButton
                    size="10px"
                    onClick={() => {
                      formik.setFieldValue(`keywordOfProjectDetail`,
                        formik.values.keywordOfProjectDetail.filter((item,
                                                                     i
                        ) => i !== index));
                    }}
                    children={
                      <FontAwesomeIcon
                        icon="minus"
                      />
                    }
                    sx={{
                      marginLeft: '10px',
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
          <TextBox variant="body21">
            검색어 입력 후, 엔터키를 눌러 추가해주세요.
          </TextBox>
        </ItemBox>
      </Collapse>
      <ItemBox>
        <Button
          sx={{
            width:       '100%',
            marginRight: '10px',
          }}
          shape="basic2"
          onClick={() => {
            formik.resetForm();
            formik.handleSubmit();
          }}
        >
          초기화
        </Button>
        <Button
          sx={{
            width: '100%'
          }}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          검색
        </Button>
      </ItemBox>
    </Box>
  );
}
