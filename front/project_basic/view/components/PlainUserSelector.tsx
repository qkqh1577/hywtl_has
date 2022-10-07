import React, {
  useEffect,
  useState
} from 'react';
import {
  UserId,
  UserVO
} from 'user/domain';
import { userApi } from 'user/api';
import { ExtensionSelect } from 'project_basic/view/components/ExtensionSelect';

interface Props {
  selectedUserId?: UserId;
  onChange?: (value: UserId | '') => void;
}

export function PlainUserSelector(props: Props) {
  const { selectedUserId: initValue, onChange } = props;
  const [value, setValue] = useState<UserId | ''>('');
  const [list, setList] = useState<UserVO[]>([]);

  useEffect(() => {
    userApi.getList()
           .then(setList)
           .catch(() => setList([]));
  }, []);

  useEffect(() => {
    if (!initValue) {
      return;
    }
    setValue(initValue);
  }, [initValue]);

  return (
    <ExtensionSelect
      value={value as string}
      onChange={(v) => {
        if (onChange) {
          onChange(v as UserId | '');
        }
      }}
      option={list.map((item) => ({
        key:  item.id ? item.id as unknown as string : '',
        text: item.name
      }))}
    />
  );
}
