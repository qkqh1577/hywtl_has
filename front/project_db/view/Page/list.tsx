import React from 'react';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import {ProjectDbVO} from "../../domain";
import {ProjectVO} from "../../../project/domain";
import {ProjectEstimateVO} from "../../../project_estimate/domain";

// const columns = [
//     {key: 'id', name: 'ID'},
//     {key: 'title', name: 'Title'},
// ];

const rows = [
    {id: 0, title: 'Example'},
    {id: 1, title: 'Demo'}
];

interface Column {
    key: string,
    name: string
}

interface Row {
    id: number,

    [key: string]: any
}

interface Props {
    list: ProjectDbVO[]
}

function prepare(prefix: string, entity: any, columns: Column[], row: Row) {

    Object.keys(entity).forEach(attrName => {
        if (typeof entity[attrName] === 'object' && entity[attrName] !== null) return true;
        const newAttrName = `${prefix}_${attrName}`;
        const column: Column = {
            key: newAttrName,
            name: attrName
        };
        columns.push(column);
        row[newAttrName] = entity[attrName];
    });
}

export default function List(props: Props) {
    console.debug(props.list);
    const {list} = props;

    const columns: Column[] = [];
    const rows: Row[] = [];

    list && list.forEach((entities, index) => {
        const {project, projectBid, projectComplexSite, projectEstimate, projectMemo} = entities;
        const row: Row = {id: index};

        prepare('', project, columns, row);
        projectBid          && prepare('bid', projectBid, columns, row);
        projectComplexSite  && prepare('projectComplexSite', projectComplexSite, columns, row);
        projectEstimate     && prepare('projectEstimate', projectEstimate, columns, row);
        projectMemo         && prepare('projectMemo', projectMemo, columns, row);

        for(let i=0;i<200;i++){
            rows.push(row);
        }

    });

    return (
        <DataGrid columns={columns} rows={rows} style={{height:'calc(100vh - 200px)'}} />
    )
}
