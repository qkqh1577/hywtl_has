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
    name: string,
    frozen: boolean
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

const listClassname = makeStyles({
    root: {
        position: 'relative', width: '100%', height: '100%',
        '& .rdg-header-row': {
            color: '#2d3a54',
            backgroundColor: '#e4e9f2'
        },
        '& .filter-cell': {
            outline:'none !important',
            lineHeight: '35px',
            padding: 0,
        },
        '& .rdg-cell-frozen-last': {
            borderRight: '2px solid navy',
            boxSizing: 'border-box'
        }
    },
    filter: {
        inlineSize: '100%',
        padding: '2px',
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
            <div style={{height: '20px'}}>{column.name}</div>
            {filters.enabled && <div>{children({ref, tabIndex, filters})}</div>}
        </>
    );
}

export default function List(props: Props) {

    const classes = listClassname();
    const {list} = props;
    const {filter, schema} = useSelector((root: RootState) => root.projectDb);
    const [columns, setColumns] = useState<Column[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [filters, setFilters] = useState<Filter>({enabled: true});

    useEffect(() => {
        prepareGridData();
    }, [list, filter]);

    const isVisibleAttr = (entityType: string, attrName: string) => {
        return filter && filter[entityType] && filter[entityType][attrName];
    };

    const getHumanReadableAttrName = (entityName: string, attrName: string) => {
        try {
            return schema[entityName].attributes[attrName].description;
        } catch (e) {
            console.warn(`Cannot find human readable attribute name for [${entityName}_${attrName}]`);
            return attrName;
        }
    }

    const getHumanReadableAttrValue = (entity: any, entityName: string, attrName: string) => {
        try {
            const attrInfo = schema[entityName].attributes[attrName];
            let result = entity[attrName];

            if (attrInfo.prefix) {
                result = entity[attrInfo.prefix][attrName];
            }

            if ('option' in attrInfo) {
                Object.keys(attrInfo.option).forEach(k => {
                    const attrCode = attrInfo.option[k];
                    if (attrInfo.prefix) {
                        if (attrCode === entity[attrInfo.prefix][attrName]) {
                            result = attrInfo.optionLabel[k];
                            return false;
                        }
                    } else {
                        if (attrCode === entity[attrName]) {
                            result = attrInfo.optionLabel[k];
                            return false;
                        }
                    }
                });
            }
            if (typeof result === 'boolean') {
                result = (result) ? 'Y' : 'N';
            }
            return result;
        } catch (e) {
            console.warn(`Cannot find human readable value name for [${entityName}_${attrName}]`);
            return entity[attrName];
        }
    }

    const assignColumnValues = (prefix: string, entityInfo: any, columns: Column[]) => {
        const entityNames = getSortedKeys(entityInfo);
        entityNames.forEach(attrName => {
            if (!isVisibleAttr(prefix, attrName) && prefix !== '') return true;

            const newAttrName = `${prefix}_${attrName}`;
            const attrInfo = schema[prefix].attributes[attrName];
            const frozen = typeof attrInfo.frozen == 'undefined' ? false : attrInfo.frozen;

            const column: Column = {
                key: newAttrName,
                name: getHumanReadableAttrName(prefix, attrName),
                frozen: frozen
            };

            const defaultWidth = 100;
            if (attrInfo.width) {
                column['width'] = defaultWidth * attrInfo.width;
            } else {
                column['width'] = defaultWidth;
            }

            column['headerCellClass'] = filterColumnClassName;
            column['headerRenderer'] = (p) => {
                return (
                    <FilterRenderer<Row, unknown, HTMLInputElement> {...p}>
                        {({filters, ...rest}) => {
                            if (attrInfo.option) {
                                return (
                                    <select
                                        tabIndex={rest.tabIndex}
                                        className={classes.filter}
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
                                            Object.keys(attrInfo.option).map((key) => {
                                                const optionLabel = attrInfo.optionLabel[key];
                                                return (
                                                    <option key={key} value={optionLabel}>{optionLabel}</option>
                                                )
                                            })
                                        }
                                    </select>
                                )
                            } else if (attrInfo.type === 'Boolean') {
                                return (
                                    <select
                                        tabIndex={rest.tabIndex}
                                        className={classes.filter}
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
                                        className={classes.filter}
                                        value={filters[p.column.key]}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                [p.column.key]: e.target.value
                                            })
                                        }
                                        onKeyDown={inputStopPropagation}
                                    />
                                )
                            }
                        }
                        }
                    </FilterRenderer>
                )
            }
            columns.push(column);
        });
    }

    function getSortedKeys(entityInfo) {
        const tmpArr: any[] = [];
        Object.keys(entityInfo.attributes).forEach((attrName) => {
            const attrInfo = entityInfo.attributes[attrName];
            tmpArr.push({...attrInfo, attrName});
        });
        const sortedTmpArr = tmpArr.sort((a, b) => a.order > b.order ? 1 : -1);
        return sortedTmpArr.map(item => item.attrName);
    }

    const prepareGridData = () => {
        const newColumns: Column[] = [];
        const newRows: Row[] = [];
        Object.keys(schema).reverse().forEach((entityName) => {
            const entityInfo = schema[entityName];
            assignColumnValues(entityName, entityInfo, newColumns);
        });
        const newFilter = {...filters};
        newColumns.forEach((col) => {
            newFilter[col.key] = '';
        });
        setFilters(newFilter);
        setColumns(newColumns);

        list && list.forEach((entities, index) => {
            const row: Row = {id: index};
            Object.keys(schema).reverse().forEach((entityName) => {
                const entityInfo = schema[entityName];
                const viewAttrName = entityName.charAt(0).toLowerCase() + entityName.slice(1).replace('View', '');
                const viewData = entities[viewAttrName];
                if (!viewData) return true;
                Object.keys(entityInfo.attributes).forEach(attrName => {
                    if (!isVisibleAttr(entityName, attrName) && entityName !== '') return true;
                    const attrInfo = entityInfo.attributes[attrName];
                    const newAttrName = `${entityName}_${attrName}`;
                    if (attrInfo.prefix) {
                        row[newAttrName] = getHumanReadableAttrValue(viewData, entityName, attrName);
                    } else {
                        if (typeof viewData[attrName] === 'object' && viewData[attrName] !== null) return true;
                        row[newAttrName] = getHumanReadableAttrValue(viewData, entityName, attrName);
                    }
                });
            });
            newRows.push(row);
        });
        setRows(newRows);
    };

    const filteredRows = useMemo(() => {
        return rows.filter((r) => {
            let validRow = true;
            Object.keys(filters).forEach(columnName => {
                if (columnName === 'enabled') return true;
                const columnValue = filters[columnName];
                let valid = true;
                if (filters[columnName]) {
                    if (r[columnName]) {
                        valid = `${r[columnName]}`.includes(columnValue)
                    } else {
                        // skip null rows
                        valid = false;
                    }
                }

                if (!valid) {
                    validRow = false;
                    return false;
                }
            })
            return validRow;
        });
    }, [rows, filters]);

    return (
        <div className={classes.root}>
            <FilterContext.Provider value={filters}>
                <DataGrid
                    className={theme.light}
                    headerRowHeight={filters.enabled ? 56 : undefined}
                    defaultColumnOptions={{
                        // sortable: true,
                        resizable: true
                    }}
                    columns={columns}
                    rows={filteredRows}
                    style={{height: '100%'}}
                />
            </FilterContext.Provider>
        </div>
    )

}



