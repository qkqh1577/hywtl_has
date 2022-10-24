import React from 'react';
import PageLayout, {FormikLayoutProps} from 'layouts/PageLayout';
import List from './list';
import SearchBox from './searchForm';
import {ProjectDbVO} from "../../domain";

interface Props {
    list: ProjectDbVO[]
}

export default function ProjectDbPage(props: Props) {
    return (
        <PageLayout
            title={"영업DB 분석"}
            filter={<SearchBox/>}
            body={<List list={props.list}/>}
        />
    )
}