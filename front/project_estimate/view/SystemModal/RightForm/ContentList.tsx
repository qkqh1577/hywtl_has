import { ColorPalette } from 'assets/theme';
import {
  Table,
  Td,
  Th
} from 'layouts/Table';
import {
  Box,
  TableBody,
  TableHead,
  TableRow
} from '@mui/material';
import IconButton from 'layouts/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import React, {
  useContext,
  useState
} from 'react';
import { FormikContext } from 'formik';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';
import TextBox from 'layouts/Text';
import VariableList from 'admin/estimate/content/view/Detail/VariableList';

type Props = {
  variableList?: EstimateContentVariableVO[];
}
export default function (props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const contentList = formik.values.contentList;
  const [tempContent, setTempContent] = useState<string>();
  console.log(props.variableList);
  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'wrap',
      width:          '100%',
      justifyContent: 'space-between',
      alignItems:     'flex-start',
    }}>
      <Box sx={{
        width:        `${edit ? '69%' : '100%'}`,
        display:      'flex',
        flexWrap:     'wrap',
        border:       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius: '5px',
        margin:       '10px 0px',
        padding:      '10px',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              {edit && (<Th />)}
              <Th sx={{ width: '80%' }}>내용</Th>
              {edit && (<Th>순서</Th>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {contentList.map((content,
                              i
            ) => (
              <TableRow key={`${i}_${content}`}>
                {edit && (
                  <Td>
                    <Box sx={{
                      display:        'flex',
                      width:          '100%',
                      flexWrap:       'nowrap',
                      justifyContent: 'center',
                    }}>
                      <IconButton
                        shape="square"
                        onClick={() => {
                          formik.setFieldValue('contentList', contentList.filter((c,
                                                                                  j
                          ) => j !== i));
                        }}>
                        <FontAwesomeIcon icon="minus" />
                      </IconButton>
                    </Box>
                  </Td>
                )}
                <Td>
                  <Input
                    key={content}
                    readOnly={!edit}
                    defaultValue={typeof content === 'object' ? content.content : content}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (content !== value) {
                        const result: (string | undefined)[] = [];
                        for (let j = 0; j < contentList.length; j++) {
                          result.push(i === j ? value : contentList[j]);
                        }
                        formik.setFieldValue('contentList', result);
                      }
                    }}
                  />
                </Td>
                {edit && (
                  <Td>
                    <Box sx={{
                      display:        'flex',
                      width:          '100%',
                      justifyContent: 'space-around',
                      flexWrap:       'nowrap',
                    }}>
                      <IconButton
                        shape="square"
                        disabled={i === 0}
                        onClick={() => {
                          const prevList = contentList.filter((c,
                                                               j
                          ) => j !== i);
                          const result: (string | undefined)[] = [];
                          for (let j = 0; j < prevList.length; j++) {
                            if (result.length === i - 1) {
                              result.push(content);
                            }
                            result.push(prevList[j]);
                          }
                          formik.setFieldValue('contentList', result);
                        }}>
                        <FontAwesomeIcon icon="angle-up" />
                      </IconButton>
                      <IconButton
                        shape="square"
                        disabled={i === contentList.length - 1}
                        onClick={() => {
                          const prevList = contentList.filter((c,
                                                               j
                          ) => j !== i);
                          const result: (string | undefined)[] = [];
                          for (let j = 0; j < prevList.length; j++) {
                            result.push(prevList[j]);
                            if (result.length === i + 1) {
                              result.push(content);
                            }
                          }
                          formik.setFieldValue('contentList', result);
                        }}>
                        <FontAwesomeIcon icon="angle-down" />
                      </IconButton>
                    </Box>
                  </Td>
                )}
              </TableRow>
            ))}
            {edit && (
              <TableRow>
                <Td colSpan={2}>
                  <Input
                    key={tempContent}
                    defaultValue={tempContent ?? ''}
                    variant="outlined"
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (tempContent !== value) {
                        setTempContent(value);
                      }
                    }}
                  />
                </Td>
                <Td>
                  <Button
                    disabled={!tempContent}
                    shape="small"
                    onClick={() => {
                      if (!tempContent) {
                        return;
                      }
                      formik.setFieldValue('contentList', [...contentList, tempContent]);
                      setTempContent(undefined);
                    }}>
                    추가
                  </Button>
                </Td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      {
        edit && props.variableList && (
          <Box sx={{
            display:  'flex',
            width:    '30%',
            flexWrap: 'wrap',
          }}>
            <TextBox variant="body8">
              *내용으로 변수명을 입력 시, 해당 변수에 해당하는 데이터가 보여집니다
            </TextBox>
            <VariableList {...props} />
          </Box>
        )
      }
    </Box>
  )
}
