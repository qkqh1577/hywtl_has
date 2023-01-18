import {DefaultFunction} from 'type/Function';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  UserId,
  UserVO
} from 'user/domain';
import {userApi} from 'user/api';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import DepartmentTree from "./DepartmentTree";
import {ListDepartment} from "../../department_tree/entity";
import UserList from './UserList';
import departmentTreeApi from "../../department_tree/api";
import {FormikProvider, useFormik} from "formik";
import {UserWithDepartmentIdQuery} from "../../user/query";
import {Progress} from "../Progress";
import SelectedUserList from "./SelectedUserList";

interface Props {
  open: boolean;
  multi: boolean | undefined;
  title?: string;
  value?: UserId | UserId[];
  departmentId?: number,
  onClose: DefaultFunction;
  onChange: (value: UserId | UserId[] | undefined) => void;
}

export default function UserSelectorModal(props: Props) {
  const [userList, setUserList] = useState<UserVO[] | undefined>(undefined);
  const [selectedUserList, setSelectedUserList] = useState<UserVO[] | undefined>(undefined);
  const [departmentList, setDepartmentList] = useState<ListDepartment[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const search = useCallback((values: UserWithDepartmentIdQuery) => {
    setLoading(true);
    userApi.getListByDepartmentId({
      keyword: values.keyword,
      departmentId: values.departmentId
    }).then((values) => {
      setUserList(values);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    });
  }, []);


  const getSelectedUserList = useCallback((query: UserId[], callback: (selectedUsers: UserVO[]) => void) => {
    userApi.getListByDepartmentId({}).then(callback);
  }, []);

  const excludeSelectedUserList = useCallback((user: UserVO) => {
    if (selectedUserList) {
      setSelectedUserList([
        ...selectedUserList.filter((value) => value.id !== user.id)
      ]);
    }
  }, [selectedUserList]);

  const formik = useFormik<UserWithDepartmentIdQuery>({
    initialValues: {keyword: undefined, departmentId: props?.departmentId},
    onSubmit: (values => {
      search(values);
    })
  });

  const handleKeywordChange = useCallback((e) => {
    const value = e.target.value || undefined;
    if (formik.values.keyword !== value) {
      formik.setFieldValue('departmentId', undefined);
      formik.setFieldValue('keyword', value);
    }
  }, [formik]);

  useEffect(() => {
    if (props.open) {
      departmentTreeApi.getAll().then(setDepartmentList);
      getSelectedUserList([], (selectedUsers) => {
        if(Array.isArray(props?.value)){
          const compArr: UserId[] = props.value;
          setSelectedUserList([...selectedUsers.filter((user)=>compArr.includes(user.id))]);
        } else {
          setSelectedUserList(selectedUsers.filter(value1 => value1.id === props?.value));
        }
      });
      search({
        departmentId: props.departmentId,
      });
    } else {
      formik.resetForm();
      setSelectedUserList(undefined);
      setDepartmentList(undefined);
      setUserList(undefined);
    }
  }, [props.open]);

  useEffect(() => {
    formik.setFieldValue('departmentId', props.departmentId);
  }, [props.departmentId]);

  return (
    <ModalLayout
      width="50vw"
      open={props.open}
      title={props.title ?? '유저 선택'}
      onClose={props.onClose}
      children={
        <FormikProvider value={formik}>
          <Progress loading={loading} sx={{backgroundColor: 'rgba(0,0,0,0.15)'}}/>
          <Box sx={{
            display: 'flex',
            width: '100%',
            minWidth: '900px',
            flexWrap: 'wrap',
            height: 'calc(50vh - 120px)',
          }}>
            <Box sx={{
              display: 'flex',
              width: '100%',
              flexWrap: 'nowrap',
              padding: '10px',
            }}>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                width: '70%',
                marginRight: '10px',
              }}>
                <DataFieldWithLabel label="검색어">
                  <Input
                    key={formik.values.keyword}
                    variant="standard"
                    defaultValue={formik.values.keyword ?? ''}
                    placeholder="전체 부서 사용자 대상 검색"
                    onBlur={handleKeywordChange}
                  />
                </DataFieldWithLabel>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                width: 'calc(30% - 10px)',
              }}>
                <Button sx={{marginRight: '10px'}} onClick={() => {
                  formik.handleSubmit();
                }}>
                  검색
                </Button>
                <Button
                  disabled={!formik.values.keyword && !formik.values.departmentId}
                  shape="basic2"
                  onClick={() => {
                    formik.setFieldValue('keyword', undefined);
                    formik.setFieldValue('departmentId', undefined);
                    formik.handleSubmit();
                  }}>
                  초기화
                </Button>
              </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              width: '100%',
              height: 'calc(100% - 40px)',
              flexWrap: 'wrap',
            }}>
              <Box
                sx={{
                  display: 'flex',
                  width: '44%',
                  height: '100%',
                  margin: '0 0.5%',
                  flexWrap: 'wrap',
                  border: '1px solid #e4e9f2',
                  borderRadius: '5px',
                }}>
                <DepartmentTree departmentList={departmentList}/>
              </Box>
              <Box
                className="scroll-bar-holder"
                sx={{
                  display: 'flex',
                  width: '40%',
                  height: '100%',
                  margin: '0 0.5%',
                  overflowY: 'auto',
                  flexWrap: 'wrap',
                  border: '1px solid #e4e9f2',
                  borderRadius: '5px',
                  alignItems: 'baseline',
                  alignContent: 'start'
                }}>
                <UserList
                  multi={props.multi}
                  userList={userList}
                  selectedUserList={selectedUserList}
                  onChange={(user, checked) => {
                    if (props.multi) {
                      setSelectedUserList(
                        checked ?
                          selectedUserList?.filter((value) => value === user) :
                          [...selectedUserList ? selectedUserList : [], user]);
                    } else {
                      setSelectedUserList([user]);
                    }
                  }}/>
              </Box>
              <Box
                className="scroll-bar-holder"
                sx={{
                  display: 'flex',
                  width: '13%',
                  height: '100%',
                  margin: '0 0.5%',
                  overflowY: 'auto',
                  flexWrap: 'wrap',
                  border: '1px solid #e4e9f2',
                  borderRadius: '5px',
                  alignItems: 'baseline',
                  alignContent: 'start'
                }}>
                <SelectedUserList
                  userList={selectedUserList}
                  onUserClick={excludeSelectedUserList}
                />
              </Box>
            </Box>
          </Box>
        </FormikProvider>
      }
      footer={
        <Box sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}>
          <Button
            sx={{
              marginRight: '10px'
            }}
            onClick={() => {
              props.onClose();
              if (props.multi) {
                const result: UserId[] = [];
                selectedUserList?.forEach((user) => {
                  result.push(user.id);
                });
                props.onChange(result);
              } else {
                props.onChange(selectedUserList ? selectedUserList.length > 0 ? selectedUserList[0].id : undefined : undefined);
              }
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={props.onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}