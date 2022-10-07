import React, {
  useEffect,
  useState
} from 'react';
import Select from 'layouts/Select';
import { MenuItem } from '@mui/material';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  option: { key: string, text: string }[];
}

export function ExtensionSelect(props: Props) {
  const { value: initValue, onChange, option } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!initValue) {
      return;
    }
    if (!option || option.length === 0) {
      return;
    }
    setValue(initValue);
  }, [initValue, option]);

  return (
    <Select
      value={value || '선택'}
      onChange={(e) => {
        setValue(e.target.value as string);
        if (onChange) {
          onChange(e.target.value as string);
        }
      }}
    >
      {!value && <MenuItem key="" value="선택">선택</MenuItem>}
      {option.map((item) => (
        <MenuItem key={item.key} value={item.key}>{item.text}</MenuItem>
      ))}
    </Select>
  );
}
