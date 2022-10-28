import { DefaultFunction } from 'type/Function';
import React from 'react';

export enum DialogStatus {
  OK    = 'OK',
  WARN  = 'WARN',
  ERROR = 'ERROR'
}

export interface AlertVO {
  title: string;
  status: DialogStatus;
  closeText: string;
  afterClose: DefaultFunction;
  children: React.ReactNode;
}

export interface ConfirmVO
  extends AlertVO {
  afterConfirm: DefaultFunction;
  confirmText: string;
}

