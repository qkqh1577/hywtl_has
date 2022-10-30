import React from 'react';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import {ProjectDbVO} from "../../domain";

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

const theme = {
    dark: 'rdg-dark',
    light: 'rdg-light'
};

export default function List(props: Props) {
    const {list} = props;
    const columns: Column[] = [];
    const rows: Row[] = [];

    list && list.forEach((entities, index) => {
        const {project, projectBid, projectComplexSite, projectEstimate, projectMemo} = entities;
        const row: Row = {id: index};

        prepare('', project, columns, row);
        projectBid && prepare('bid', projectBid, columns, row);
        projectComplexSite && prepare('projectComplexSite', projectComplexSite, columns, row);
        projectEstimate && prepare('projectEstimate', projectEstimate, columns, row);
        projectMemo && prepare('projectMemo', projectMemo, columns, row);

        rows.push(row);

    });

    return (
        <DataGrid className={theme.light} columns={columns} rows={rows} style={{height: '100%'}}/>
    )
}
