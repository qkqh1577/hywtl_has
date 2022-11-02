import React, {useCallback, useEffect, useState} from 'react';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import {ProjectDbVO} from "../../domain";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";

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

const theme = {
    dark: 'rdg-dark',
    light: 'rdg-light'
};

export default function List(props: Props) {

    const {filter, schema} = useSelector((root: RootState) => root.projectDb);
    const {list} = props;

    const [columns, setColumns] = useState<Column[]>([]);
    const [rows, setRows] = useState<Row[]>([]);

    const isVisibleAttr = (prefix: string, attrName: string) => {
        const entityType = `${prefix}View`;
        return filter && filter[entityType] && filter[entityType].attributes[attrName];
    };

    const getHumanReadableAttrName = (prefix: string, attrName: string) => {
        try {
            const entityMap = {
                'Project': 'project',
                'ProjectBid': 'bid',
                'ProjectEstimate': 'estimate',
                'ProjectComplexSite': 'complex-site',
                'ProjectMemo': 'memo'
            };
            const entityName = entityMap[prefix];
            return schema[entityName].attributes[attrName].description;
        } catch (e) {
            console.debug(e);
            console.warn(`Cannot find human readable attribute name for [${prefix}.${attrName}]`);
            return attrName;
        }
    }

    const assignGridValues = (prefix: string, entity: any, columns: Column[], row: Row) => {
        Object.keys(entity).forEach(attrName => {
            if (typeof entity[attrName] === 'object' && entity[attrName] !== null) return true;
            if (!isVisibleAttr(prefix, attrName) && prefix !== '') return true;

            const newAttrName = `${prefix}_${attrName}`;
            const column: Column = {
                key: newAttrName,
                name: getHumanReadableAttrName(prefix, attrName)
            };
            columns.push(column);
            row[newAttrName] = entity[attrName];
        });
    }

    const prepareGridData = () => {
        const newColumns: Column[] = [];
        const newRows: Row[] = [];
        list && list.forEach((entities, index) => {
            const {project, projectBid, projectComplexSite, projectEstimate, projectMemo} = entities;
            const row: Row = {id: index};

            assignGridValues('Project', project, newColumns, row);
            projectBid && assignGridValues('ProjectBid', projectBid, newColumns, row);
            projectComplexSite && assignGridValues('ProjectComplexSite', projectComplexSite, newColumns, row);
            projectEstimate && assignGridValues('ProjectEstimate', projectEstimate, newColumns, row);
            projectMemo && assignGridValues('ProjectMemo', projectMemo, newColumns, row);

            for(let i=0;i<10000;i++)
                newRows.push(row);
        });

        setColumns(newColumns);
        setRows(newRows);
    };

    useEffect(() => {
        console.debug('[LIST COMPONENT] filter state has changed');
        prepareGridData();
    }, [list, filter]);

    return (
        <DataGrid className={theme.light} columns={columns} rows={rows} style={{height: '100%'}}/>
    )
}
