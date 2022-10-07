import React, {
  useEffect,
  useState
} from 'react';
import Input from 'layouts/Input';

interface ExtensionInputProps {
  value?: string;
  type?: string;
  onBlur?: (value: string) => void;
}

export function ExtensionInput(props: ExtensionInputProps) {
  const { value: initValue, type, onBlur } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!initValue) {
      return;
    }
    setValue(initValue);
  }, [initValue]);

  return (
    <Input
      type={type || 'text'}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e.target.value);
        }
      }}
    />
  );
}
