import {
  projectMemoCategoryList,
  projectMemoCategoryName,
  ProjectMemoId,
  ProjectMemoVO
} from 'project_memo/domain';
import {
  Box,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import DateFormat from 'layouts/DateFormat';
import { ColorPalette } from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultFunction } from 'type/Function';
import TextBox from 'layouts/Text';
import UserIcon from 'layouts/UserIcon';
import { FormikProvider } from 'formik';
import { LoginVO } from 'login/domain';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectMemoChangeParameter } from 'project_memo/parameter';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import useDialog from 'dialog/hook';
import Button from 'layouts/Button';
import CircularProgress from '../../../components/CircularProgress';

export interface ProjectMemoListProps
  extends FormikLayoutProps<ProjectMemoChangeParameter> {
  loading: boolean,
  login: LoginVO | undefined;
  list: ProjectMemoVO[];
  onDelete: DefaultFunction<ProjectMemoId>;
  onChange: DefaultFunction<ProjectMemoChangeParameter>;
}

export default function ProjectMemoList({
                                          loading,
                                          login,
                                          list,
                                          onDelete,
                                          formik,
                                          onChange
                                        }: ProjectMemoListProps) {
  const { confirm } = useDialog();
  const siblingHeight = 306;
  return (
    <Box
      className="scroll-bar-holder"
      sx={{
        display:    'flex',
        width:      '100%',
        height:     `calc(100% - ${siblingHeight}px)`,
        flexWrap:   'nowrap',
        flexDirection: 'column',
        overflowY:  'auto',
        alignItems: 'flex-start',
        padding:    '0 10px 15px 10px',
    }}>
      {list && Array.isArray(list) && list.length === 0 && (
        <Box
          sx={{
            display:         'flex',
            flexWrap:        'wrap',
            width:           '100%',
            border:          `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius:    '5px',
            marginBottom:    '10px',
            backgroundColor: ColorPalette._ffffff,
            padding:         '15px',
            justifyContent:  'center',
          }}>
          <TextBox variant="body2" sx={{minHeight:'30px', lineHeight:'30px'}}>
            {loading && (
              <CircularProgress size={30}/>
            )}
            {!loading && (
              <>???????????? ????????? ????????????.</>
            )}
          </TextBox>
        </Box>
      )}
      {list && list.map((item) => (
        <Box
          key={item.id}
          sx={{
            display:         'flex',
            flexWrap:        'wrap',
            width:           '100%',
            border:          `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius:    '5px',
            marginBottom:    '10px',
            backgroundColor: ColorPalette._ffffff,
            padding:         '15px',
          }}>
          <Box sx={{
            display:        'flex',
            flexWrap:       'unwrap',
            width:          '100%',
            justifyContent: item.writer.id === (login?.id ?? 1) ? 'space-between' : 'flex-start',
            alignItems:     'center',
          }}>
            <Box sx={{
              display:    'flex',
              flexWrap:   'unwrap',
              alignItems: 'center',
            }}>
              <Typography sx={{
                fontSize:    '13px',
                fontWeight:  'bold',
                marginRight: '4px'
              }}>
                <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
              </Typography>
              <Typography sx={{
                fontSize:    '13px',
                fontWeight:  'bold',
                marginRight: '4px',
              }}>
                {item.writer.department.name === '???????????????????????????' ? '??????' : item.writer.department.name}
              </Typography>
              <Typography sx={{
                fontSize:   '13px',
                fontWeight: 'bold'
              }}>
                {item.writer.name}
              </Typography>
            </Box>
            {item.writer.id === (login?.id ?? 1) && (
              <Box sx={{
                display:    'flex',
                flexWrap:   'unwrap',
                visibility: formik.values.id === item.id ? 'hidden' : 'visible'
              }}>
                <Tooltip title={'??????'}>
                  <FontAwesomeIcon
                    icon={'pen'}
                    style={{
                      cursor:      'pointer',
                      fontSize:    '11px',
                      color:       ColorPalette._9bb6ea,
                      marginRight: '10px',
                    }}
                    onClick={() => {
                      formik.setValues({
                        id:          item.id,
                        description: item.description,
                        category:    item.category,
                      });
                    }}
                  />
                </Tooltip>
                <Tooltip title={'??????'}>
                  <FontAwesomeIcon
                    icon="trash"
                    style={{
                      cursor:   'pointer',
                      fontSize: '11px',
                      color:    ColorPalette._9bb6ea,
                    }}
                    onClick={() => {
                      confirm({
                        children:     '?????? ????????? ?????????????????????????',
                        afterConfirm: () => {
                          onDelete(item.id);
                        },
                        confirmText:  '??????',
                      });
                    }}
                  />
                </Tooltip>
              </Box>
            )}
          </Box>
          {item.modifiedAt && (
            <Box sx={{
              display:    'flex',
              flexWrap:   'unwrap',
              alignItems: 'center',
            }}>
              <Typography sx={{
                fontSize:    '11px',
                fontWeight:  'bold',
                marginRight: '4px'
              }}>
                (<DateFormat date={item.modifiedAt} format="YYYY-MM-DD HH:mm" /> ?????????)
              </Typography>
            </Box>
          )}
          {formik.values.id !== item.id && (
            <Box sx={{
              display:  'flex',
              flexWrap: 'wrap',
              width:    '100%',
              padding:  '12px 0'
            }}>
              <Typography
                component="span"
                sx={{
                  fontSize:   '13px',
                  color:      ColorPalette._252627,
                  wordBreak:  'break-all',
                  whiteSpace: 'break-spaces',
                }}>
                <Typography
                  component="span"
                  sx={{
                    fontSize:    '13px',
                    color:       ColorPalette._386dd6,
                    fontWeight:  'bold',
                    marginRight: '4px'
                  }}>
                  [{projectMemoCategoryName(item.category)}]
                </Typography>
                <TextBox variant="body9">
                  {item.description}
                </TextBox>
              </Typography>
            </Box>
          )}
          {formik.values.id === item.id && (
            <Box sx={{
              display:  'flex',
              width:    '100%',
              flexWrap: 'wrap',
              padding:  '12px 0'
            }}>
              <FormikProvider value={formik}>
                <Box sx={{
                  display:      'flex',
                  width:        '100%',
                  border:       `1px solid ${ColorPalette._e4e9f2}`,
                  marginBottom: '5px'
                }}>
                  <Input
                    required
                    multiline
                    variant="outlined"
                    placeholder="?????? ??????"
                    key={formik.values.description}
                    defaultValue={formik.values.description ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.description !== value) {
                        formik.setFieldValue('description', value);
                      }
                    }}
                  />
                </Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width:   '100%'
                }}>
                  <Box sx={{
                    display: 'flex',
                    width:   '100%',
                  }}>
                    <Select
                      variant="outlined"
                      value={formik.values.category ?? ''}
                      onChange={(e) => {
                        const value = e.target.value || undefined;
                        if (formik.values.category !== value) {
                          formik.setFieldValue('category', value);
                        }
                      }}>
                      {projectMemoCategoryList.map(item => (
                        <MenuItem key={item} value={item}>
                          {projectMemoCategoryName(item)}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{
                    display:        'flex',
                    width:          '100%',
                    justifyContent: 'space-between',
                  }}>
                    <Button
                      sx={{
                        margin: '0px 5px'
                      }}
                      onClick={() => {
                        if (formik.values.id === item.id) {
                          formik.handleSubmit();
                        }
                      }}
                    >
                      ??????
                    </Button>
                    <Button
                      shape="basic2"
                      onClick={() => {
                        if (formik.values.id === item.id) {
                          formik.setValues({} as ProjectMemoChangeParameter);
                        }
                      }}
                    >
                      ??????
                    </Button>
                  </Box>
                </Box>
              </FormikProvider>
            </Box>
          )}
          <Box sx={{
            display:        'flex',
            flexWrap:       'wrap',
            width:          '100%',
            justifyContent: 'flex-start',
          }}>
            {formik.values.id !== item.id && item.isOpenedAttendanceList && (
              <>
                {item.attendanceList?.map((item) => (
                  <UserIcon
                    key={item}
                    user={item}
                    sx={{
                      marginRight: '4px',
                    }}
                  />
                ))}
                <Box
                  onClick={() => {
                    onChange({
                      id:                     item.id,
                      description:            item.description,
                      category:               item.category,
                      isOpenedAttendanceList: false,
                    });
                  }}
                  sx={{
                    display:         'flex',
                    width:           '25px',
                    height:          '25px',
                    justifyContent:  'center',
                    fontSize:        '18px',
                    borderRadius:    '25px',
                    backgroundColor: ColorPalette._386dd6,
                    color:           ColorPalette._f1f5fc,
                    border:          `1px solid ${ColorPalette._e4e9f2}`,
                    overflow:        'hidden',
                    cursor:          'pointer',
                    alignItems:      'center',
                  }}>
                  <Typography sx={{
                    fontSize: '10px',
                  }}>
                    ??????
                  </Typography>
                </Box>
              </>
            )}
            {formik.values.id !== item.id
              && (Array.isArray(item.attendanceList) && item.attendanceList.length > 0)
              && !item.isOpenedAttendanceList && (
                <Box
                  onClick={() => {
                    onChange({
                      id:                     item.id,
                      description:            item.description,
                      category:               item.category,
                      isOpenedAttendanceList: true,
                    });
                  }}
                  sx={{
                    display:         'flex',
                    width:           '25px',
                    height:          '25px',
                    justifyContent:  'center',
                    fontSize:        '18px',
                    borderRadius:    '25px',
                    backgroundColor: ColorPalette._386dd6,
                    color:           ColorPalette._f1f5fc,
                    border:          `1px solid ${ColorPalette._e4e9f2}`,
                    overflow:        'hidden',
                    cursor:          'pointer',
                    alignItems:      'center',
                  }}>
                  <Typography sx={{
                    fontSize: '10px',
                  }}>
                    ??????
                  </Typography>
                </Box>
              )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
