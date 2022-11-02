import React from 'react';
import PageLayout, {FormikLayoutProps} from 'layouts/PageLayout';
import List from './list';
import SearchBox from './form';
import {ProjectDbSchemaVO, ProjectDbVO} from "../../domain";
import {Box} from "@mui/material";
import Filter from "./filter";
import {ProjectDbFilter} from "../../reducer";

interface Props {
    list: ProjectDbVO[],
    schema: ProjectDbSchemaVO[],
    filter: ProjectDbFilter
}

const ProjectDbList = (props: Props) => {
    return (
        <Box style={{display: 'flex', width: '100%', height: '100%', maxHeight: 'calc(100vh - 280px)'}}>
            <Box style={{display: 'flex', width: 'calc(100% - 200px)'}}>
                <List list={props.list}/>
            </Box>
            <Box style={{display: 'flex', width: '200px'}}>
                <Filter schema={props.schema} filter={props.filter}/>
            </Box>
        </Box>
    );
};

export default function ProjectDbPage(props: Props) {
    return (
        <PageLayout
            title={"영업DB 분석"}
            filter={<SearchBox/>}
            body={<ProjectDbList list={props.list} schema={props.schema} filter={props.filter}/>}
        />
    )
}