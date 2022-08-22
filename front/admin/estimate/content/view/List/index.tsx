import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { EstimateContentQuery } from 'admin/estimate/content/query';
import List, { ListProps } from 'admin/estimate/content/view/List/List';

interface Props
  extends ListProps,
          FormikLayoutProps<EstimateContentQuery> {}

export default function EstimateContentList(props: Props) {
  return (
    <PageLayout body={<List {...props}/>} />
  )
}
