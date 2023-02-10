import React from 'react';
import PageLayout, { FormikLayoutProps } from 'layouts/PageLayout';
import { BusinessQuery } from 'business/query';
import List, { ListProps } from 'business/view/Page/List';
import SearchForm from 'business/view/Page/SearchForm';

interface Props
    extends ListProps,
        FormikLayoutProps<BusinessQuery> {
}

export default function Minyoungpage(props: Props) {
    return (
        <h2>hi</h2>
    );
};