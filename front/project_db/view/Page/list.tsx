import React, {useCallback, useEffect, useState} from 'react';

import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import {ProjectDbVO} from "../../domain";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {Skeleton} from "@mui/material";

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

    const isVisibleAttr = (entityType: string, attrName: string) => {
        return filter && filter[entityType] && filter[entityType][attrName];
    };

    const getHumanReadableAttrName = (entityName: string, attrName: string) => {
        try {
            return schema[entityName].attributes[attrName].description;
        } catch (e) {
            console.debug(e);
            console.warn(`Cannot find human readable attribute name for [${entityName}_${attrName}]`);
            return attrName;
        }
    }

    const getHumanReadableAttrValue = (entity: any, entityName: string, attrName: string) => {
        try {
            const attrInfo = schema[entityName].attributes[attrName];
            let result = entity[attrName];

            if ('option' in attrInfo) {
                Object.keys(attrInfo.option).forEach(k => {
                    const attrCode = attrInfo.option[k];
                    if (attrCode === entity[attrName]) {
                        result = attrInfo.optionLabel[k];
                        return false;
                    }
                });
            }

            if(typeof result === 'boolean'){
                result = (result)?'Y':'N';
            }

            return result;
        } catch (e) {
            console.debug(e);
            console.warn(`Cannot find human readable value name for [${entityName}_${attrName}]`);
            return entity[attrName];
        }
    }

    const assignRowValues = (prefix: string, entity: any, row: Row) => {
        Object.keys(entity).forEach(attrName => {
            if (typeof entity[attrName] === 'object' && entity[attrName] !== null) return true;
            if (!isVisibleAttr(prefix, attrName) && prefix !== '') return true;
            const newAttrName = `${prefix}_${attrName}`;
            console.debug(attrName, typeof entity[attrName], isVisibleAttr(prefix, attrName), entity[attrName], getHumanReadableAttrValue(entity, prefix, attrName));
            row[newAttrName] = getHumanReadableAttrValue(entity, prefix, attrName);
        });
    }

    const assignColumnValues = (prefix: string, entity: any, columns: Column[]) => {
        Object.keys(entity).forEach(attrName => {
            if (typeof entity[attrName] === 'object' && entity[attrName] !== null) return true;
            if (!isVisibleAttr(prefix, attrName) && prefix !== '') return true;
            const newAttrName = `${prefix}_${attrName}`;
            const column: Column = {
                key: newAttrName,
                name: getHumanReadableAttrName(prefix, attrName)
            };
            columns.push(column);
        });
    }

    const prepareGridData = () => {
        const newColumns: Column[] = [];
        const newRows: Row[] = [];

        list && list.length > 0 && Object.keys(list[0]).forEach((entityName) => {
            const entityNameReal = entityName.charAt(0).toUpperCase() + entityName.slice(1) + 'View';
            list[0][entityName] && assignColumnValues(entityNameReal, list[0][entityName], newColumns);
        });

        setColumns(newColumns);

        list && list.forEach((entities, index) => {
            const row: Row = {id: index};
            Object.keys(entities).forEach((entityName) => {
                const entityNameReal = entityName.charAt(0).toUpperCase() + entityName.slice(1) + 'View';
                entities[entityName] && assignRowValues(entityNameReal, entities[entityName], row);
            });
            newRows.push(row);
        });
        setRows(newRows);
    };

    useEffect(() => {
        console.debug('[LIST COMPONENT] filter state has changed');
        prepareGridData();
    }, [list, filter]);

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            {/*<Skeleton*/}
            {/*    sx={{ bgcolor: 'grey', position:'absolute', zIndex:1000, left:'0px', top:'0px', width: '100%', height: '100%' }}*/}
            {/*    variant="rectangular"*/}
            {/*/>*/}
            <DataGrid className={theme.light} columns={columns} rows={rows} style={{height: '100%'}}/>
        </div>
    )
}
