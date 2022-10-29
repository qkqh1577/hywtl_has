import React from 'react';
import PageLayout, {FormikLayoutProps} from 'layouts/PageLayout';
import List from './list';
import SearchBox from './searchForm';
import {ProjectDbSchemaVO, ProjectDbVO} from "../../domain";
import {Box} from "@mui/material";
import GridFilter from "./gridFilter";

interface Props {
    list: ProjectDbVO[],
    schema: ProjectDbSchemaVO[]
}

function ProjectDbList(props: Props) {
    return (
        <Box style={{display: 'flex', width: '100%', height: '100%', maxHeight:'calc(100vh - 280px)'}}>
            <Box style={{display: 'flex', width: 'calc(100% - 200px)'}}>
                <List list={props.list}/>
            </Box>
            <Box style={{display: 'flex', width: '200px'}}>
                <GridFilter schema={props.schema}/>
            </Box>
        </Box>
    );
}

export default function ProjectDbPage(props: Props) {
    return (
        <PageLayout
            title={"영업DB 분석"}
            filter={<SearchBox/>}
            body={<ProjectDbList list={props.list} schema={props.schema}/>}
        />
    )
}