import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  InputAdornment,
} from '@mui/material';
import {ColorPalette} from 'assets/theme';
import {
  BusinessId,
  BusinessIdWithManagerId,
  BusinessManagerId,
  BusinessVO
} from 'business/domain';
import {businessApi} from 'business/api';
import Input, {InputProps} from 'layouts/Input';
import {businessSelectorAction} from './BusinessSelector/action';
import {ModalProps} from "./BusinessSelector/route/BusinessSelectorModalRoute";

interface FieldProps
  extends Omit<InputProps,
    | 'endAdornment'
    | 'startAdornment'
    | 'onChange'
    | 'onClick'> {
  allowMyBusiness?: boolean;
  onChange?: (business: BusinessIdWithManagerId) => void;
  withEmployee?: BusinessManagerId;
  hasEmployee?: boolean;
}

export default function BusinessSelector(props: FieldProps) {
  const {
    allowMyBusiness,
    onChange,
    value,
    withEmployee,
    hasEmployee,
    ...restProps
  } = props;
  const dispatch = useDispatch();
  const [detail, setDetail] = useState<BusinessVO>();
  const onClick = useCallback((modalProps: ModalProps) => dispatch(businessSelectorAction.setModal(modalProps)), [dispatch]);

  useEffect(() => {
    if (value) {
      businessApi
        .getOne(value as BusinessId)
        .then(setDetail)
        .catch(() => {
          setDetail(undefined);
        });
    }
  }, [value]);

  return (
    <Input
      {...restProps}
      value={detail?.name ?? ''}
      onClick={() => {
        if (restProps.disabled || restProps.readOnly) {
          return;
        }
        onClick({
          id: detail?.id,
          allowMyBusiness,
          withEmployee,
          hasEmployee,
          afterConfirm: (business) => {
            if (onChange) {
              onChange(business!);
            }
          }
        });
      }}
      endAdornment={
        <InputAdornment position="end" sx={{marginRight: '10px'}}>
          <FontAwesomeIcon
            icon="building"
            style={{
              fontSize: '16px',
              color: ColorPalette._386dd6,
              cursor: 'pointer'
            }}
          />
        </InputAdornment>
      }
    />
  );
}
