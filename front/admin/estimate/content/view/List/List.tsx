import React from 'react';
import { EstimateContentShort } from 'admin/estimate/content/domain';

export interface ListProps {
  list: EstimateContentShort[] | undefined;
}

export default function ({ list }: ListProps) {
  return(
    <div>
      hi
    </div>
  )
};
