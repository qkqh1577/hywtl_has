import React from 'react';
import PageLayout from 'components/PageLayout';
import SearchForm, { SearchFormProps } from 'user/view/Page/SearchForm';
import List, { ListProps } from 'user/view/Page/List';
import Footer, { FooterProps } from 'user/view/Page/Footer';

interface Props
  extends SearchFormProps,
          ListProps,
          FooterProps {
}

export default function (props: Props) {

  return (
    <PageLayout
      title="유저 목록"
      filter={<SearchForm {...props} />}
      body={<List {...props} />}
      footer={<Footer {...props} />
      }
    />
  );
};
