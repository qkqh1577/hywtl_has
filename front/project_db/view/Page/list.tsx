import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import 'react-data-grid/lib/styles.css';
import DataGrid, {HeaderRendererProps, useFocusRef} from 'react-data-grid';
import {ProjectDbVO} from "../../domain";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {makeStyles} from "@mui/styles";

interface Props {
    list: ProjectDbVO[]
}

interface Column {
    key: string,
    name: string
}

interface Row {
    id: number,

    [key: string]: any
}

const theme = {
    dark: 'rdg-dark',
    light: 'rdg-light'
};

interface Filter extends Omit<Row, 'id' | 'complete'> {
    enabled: boolean;
}

const FilterContext = createContext<Filter | undefined>(undefined);

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.stopPropagation();
    }
}

function selectStopPropagation(event: React.KeyboardEvent<HTMLSelectElement>) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.stopPropagation();
    }
}

const filterClassname = makeStyles({
    root: {
        inlineSize: '100%',
        padding: '4px',
        fontSize: '14px',
    }
});

const filterColumnClassName = 'filter-cell';

function FilterRenderer<R, SR, T extends HTMLOrSVGElement>({
                                                               isCellSelected,
                                                               column,
                                                               children
                                                           }: HeaderRendererProps<R, SR> & {
    children: (args: {
        ref: React.RefObject<T>;
        tabIndex: number;
        filters: Filter;
    }) => React.ReactElement;
}) {
    const filters = useContext(FilterContext)!;
    const {ref, tabIndex} = useFocusRef<T>(isCellSelected);

    return (
        <>
            <div style={{height:'20px'}}>{column.name}</div>
            {filters.enabled && <div>{children({ref, tabIndex, filters})}</div>}
        </>
    );
}

export default function List(props: Props) {

    const classes = filterClassname();
    const {list} = props;
    const {filter, schema} = useSelector((root: RootState) => root.projectDb);
    const [columns, setColumns] = useState<Column[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [filters, setFilters] = useState<Filter>({enabled:true});

    useEffect(() => {
        console.debug('[LIST COMPONENT] filter state has changed');
        prepareGridData();
    }, [list, filter]);

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

            if (typeof result === 'boolean') {
                result = (result) ? 'Y' : 'N';
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

            const attrInfo = schema[prefix].attributes[attrName];
            // filter extension
            // see https://github.com/adazzle/react-data-grid/blob/main/website/demos/HeaderFilters.tsx

            column['headerCellClass'] = filterColumnClassName;
            column['headerRenderer'] = (p) => {
                return (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({filters, ...rest}) => {
                            if(attrInfo.option) {
                                return (
                                    <select
                                        tabIndex={rest.tabIndex}
                                        className={classes.root}
                                        value={filters[p.column.key]}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                [p.column.key]: e.target.value
                                            })
                                        }
                                        onKeyDown={selectStopPropagation}
                                    >
                                        <option key={0} value="">전체</option>
                                        {
                                            Object.keys(attrInfo.option).map((key, index) => {
                                                const optionValue = attrInfo.option[key];
                                                const optionLabel = attrInfo.optionLabel[key];
                                                return (
                                                    <option key={index + 1} value={optionLabel}>{optionLabel}</option>
                                                )
                                            })
                                        }
                                    </select>
                                )
                            } else if(attrInfo.type === 'Boolean'){
                                return (
                                    <select
                                        tabIndex={rest.tabIndex}
                                        className={classes.root}
                                        value={filters[p.column.key]}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                [p.column.key]: e.target.value
                                            })
                                        }
                                        onKeyDown={selectStopPropagation}
                                    >
                                        <option key={0} value="">전체</option>
                                        <option key={1} value="Y">Y</option>
                                        <option key={2} value="N">N</option>

                                    </select>
                                )
                            } else {
                                return (
                                    <input
                                        {...rest}
                                        className={classes.root}
                                        value={filters[p.column.key]}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                [p.column.key]: e.target.value
                                            })
                                        }
                                        onKeyDown={inputStopPropagation}
                                    />
                                )}
                            }
                        }
                    </FilterRenderer>
                )
            }

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

        //// filter support
        const newFilter = {...filters};
        newColumns.forEach((col)=>{
            newFilter[col.key]='';
        });
        setFilters(newFilter);
        //////

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

    const filteredRows = useMemo(() => {
        return rows.filter((r) => {
            let validRow = true;
            Object.keys(filters).forEach(columnName => {
                if(columnName === 'enabled') return true;
                const columnValue = filters[columnName];
                let valid = true;
                if(filters[columnName]) {
                    if(r[columnName]){
                        valid= `${r[columnName]}`.includes(columnValue)
                    } else {
                        // skip null rows
                        valid = false;
                    }
                }

                if(!valid){
                    validRow=false;
                    return false;
                }
            })
            return validRow;
        });
    }, [rows, filters]);

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <FilterContext.Provider value={filters}>
                <DataGrid
                    className={theme.light}
                    headerRowHeight={filters.enabled ? 70 : undefined}
                    columns={columns}
                    rows={filteredRows}
                    style={{height: '100%'}}
                />
            </FilterContext.Provider>
        </div>
    )

}



