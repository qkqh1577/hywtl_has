import React, {useCallback, useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox, Chip,
    FormControl,
    FormControlLabel,
    FormHelperText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {withStyles, makeStyles} from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {projectDbAction} from "../../action";
import {ProjectDbSchemaVO} from "../../domain";
import {ProjectDbFilter} from "../../reducer";

interface Props {
}

const useContainerStyle = makeStyles({
    root: {
        width: '100% !important',
        padding: '20px',
    }
});

const StyledAccordionSummary = withStyles({
    root: {
        flexDirection: "column",
        width: '100%',
    },
    content: {
        marginBottom: 0,
    },
    expandIcon: {
        marginRight: 0,
        paddingTop: 0,
    }
})(AccordionSummary);

export interface ProjectDbSearch {
    filter: ProjectDbFilter,
    search: ProjectDbSearchItems
}

export interface ProjectDbSearchItems {
    [any: string]: KeyValuePair[]
};

interface KeyValuePair {
    key: string,
    value: string | number | boolean,
}

/**
 * API 검색용 AttrName을 일반 AttrName으로 변경
 * @param fullAttrName
 */
function getAttrName(fullAttrName: string) {
    const tmpAttrNameArr = fullAttrName.split('.');
    return tmpAttrNameArr[tmpAttrNameArr.length - 1];
}

// function generateSearchConditionStr(searchState: ProjectDbSearchItems, schema: ProjectDbSchemaVO[]) {
//     let result = '';
//     Object.keys(searchState).forEach(entityName => {
//         const values: KeyValuePair[] = searchState[entityName];
//         values.forEach((kv, index) => {
//             const entityInfo = schema[entityName];
//             const attrName = getAttrName(kv.key);
//             const attrInfo = entityInfo.attributes[attrName];
//             result = `${result}${index > 0 ? ',' : ''} ${attrInfo.description}=${kv.value}`
//         });
//     });
//     return result;
// }

export default function Form(props: Props) {

    const {schema, filter, list, dynamicSelectState} = useSelector((root: RootState) => root.projectDb);
    const entities = Object.keys(filter);
    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [searchConditionStr, setSearchConditionStr] = useState('설정된 검색 조건 없음');
    const [searchState, setSearchState] = useState<ProjectDbSearchItems>({})
    const setDynamicSelectState = useCallback((entityName: string, searchName: string, value: string) => {
        const newState = {...dynamicSelectState};
        newState[`${entityName}.${searchName}`] = value;
        dispatch(projectDbAction.setDynamicSelectState(newState));
    }, [dynamicSelectState]);

    useEffect(() => {
        console.debug(`dynamic select state is `, dynamicSelectState);
        return () => {
            console.debug('clean dynamic select state');
            dispatch(projectDbAction.setDynamicSelectState({}));
        }
    }, []);

    // useEffect(() => {
    //     const strSearchCondition = generateSearchConditionStr(searchState, schema);
    //     setSearchConditionStr(`${strSearchCondition} - 검색 결과 ${list.length}건`)
    // }, [list, filter]);

    useEffect(() => {
        const newSearchState = {};

        Object.keys(searchState).forEach((entityName, index) => {
            const attributes = searchState[entityName];
            newSearchState[entityName] = [];

            attributes.forEach(items => {
                const realAttrName = getAttrName(items.key);
                if (filter[entityName][realAttrName]) {
                    newSearchState[entityName].push({
                        key: items.key,
                        value: items.value
                    });
                }
            });
        });

        setSearchState(newSearchState);

    }, [filter]);

    const toggleDrawer = (isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            setState(isOpen);
        };

    const onSearch = () => {
        const searchData: ProjectDbSearch = {
            filter: filter,
            search: searchState
        };
        dispatch(projectDbAction.requestList(searchData));
    };

    const updateSearchState = (entityName: string, attrName: string, value) => {
        let newSearchState = {...searchState};
        if (entityName in newSearchState) {
            if (newSearchState[entityName].some(item => item.key === attrName)) {
                for (let i = 0; i < newSearchState[entityName].length; i++) {
                    if (newSearchState[entityName][i].key === attrName) {
                        newSearchState[entityName][i].value = value;
                        break;
                    }
                }
            } else {
                newSearchState[entityName].push({
                    key: attrName,
                    value: value
                });
            }
        } else {
            newSearchState[entityName] = [{
                key: attrName,
                value: value
            }];
        }
        setSearchState(newSearchState);
    }

    const renderInput = (entityName: string, attrName: string, attrInfo: any) => {
        const searchName = (attrInfo.prefix) ? `${attrInfo.prefix}.${attrName}` : attrName;
        const onChange = (attrInfo, event: React.ChangeEvent<any> | SelectChangeEvent<any>) => {
            const value = event.target.value;
            updateSearchState(entityName, searchName, value);
            setDynamicSelectState(entityName, searchName, value);
        };

        let tag: any;
        const attrType = (attrInfo.option) ? "Select" : attrInfo.type;

        switch (attrType) {
            case "String":
                tag = <TextField
                    type="string" label={attrInfo.description}
                    onChange={(event) => onChange(attrInfo, event)}/>
                break;
            case "Long":
                tag = <TextField
                    type="number" label={attrInfo.description}
                    onChange={(event) => onChange(attrInfo, event)}/>
                break;
            case "Boolean":
                tag = <FormControlLabel
                    control={<Checkbox value={true}/>} label={attrInfo.description}
                    onChange={(event) => onChange(attrInfo, event)}/>
                break;
            case "Select":
                tag = (
                    <Select
                        sx={{minWidth: '180px'}}
                        displayEmpty
                        value={dynamicSelectState && dynamicSelectState[`${entityName}.${searchName}`] ? dynamicSelectState[`${entityName}.${searchName}`] : ''}
                        onChange={(event) => onChange(attrInfo, event)}
                    >
                        <MenuItem key={0} value=""> {attrInfo.description} 선택 </MenuItem>
                        {
                            Object.keys(attrInfo.option).map((key, index) => {
                                const option = attrInfo.option[key];
                                const optionLabel = (attrInfo.optionLabel[key]) ? attrInfo.optionLabel[key] : option;
                                return (
                                    <MenuItem key={index + 1} value={option}>{optionLabel}</MenuItem>
                                );
                            })
                        }
                    </Select>
                )
                ;
                break;
            default:
                tag = <></>
        }

        return tag;
    };

    return (
        <Box className={useContainerStyle().root}>
            <Accordion>
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>
                    {
                        Object.keys(searchState).length >0 && Object.keys(searchState).map((entityName, index) => {
                            return (<div>
                                {
                                    searchState[entityName].map((item, index2) => {
                                        if (item.value === '') return true;
                                        const entityInfo = schema[entityName];
                                        const attrName = getAttrName(item.key);
                                        const attrInfo = entityInfo.attributes[attrName];
                                        return (<Chip
                                            label={`${attrInfo.description}:${item.value}`}
                                            sx={{marginLeft:'3px',marginRight:'3px'}}
                                            variant="outlined"
                                        />);
                                    })
                                }
                                <Chip variant="outlined" label={`검색 결과 - ${list.length}건`}/>
                            </div>);
                        })
                    }
                    {
                        Object.keys(searchState).length === 0 && (
                            <Chip variant="outlined" label={`검색 결과 - ${list.length}건`}/>
                        )
                    }
                    </Typography>
                </StyledAccordionSummary>
                <AccordionDetails>
                    {entities.map((entityName, index) => {
                        const attributes = filter[entityName];
                        let hasCheckedAttr = false;
                        Object.keys(attributes).forEach(attrName => {
                            if (attributes[attrName]) {
                                hasCheckedAttr = true;
                                return false;
                            }
                        });
                        return hasCheckedAttr && (
                            <div key={index}>
                                <h4>
                                    {schema[entityName].description}
                                </h4>
                                <div>
                                    {Object.keys(attributes).map((attrName, index2) => {
                                        const attrInfo = schema[entityName].attributes[attrName];
                                        if (!attrInfo.search) return true;

                                        return attributes[attrName] && (
                                            <div key={index2} style={{display: 'inline-flex', marginRight: '10px'}}>
                                                {renderInput(entityName, attrName, attrInfo)}
                                            </div>
                                        );
                                    })}
                                    <div style={{display: 'inline-flex'}}>
                                        <Button onClick={onSearch}>검색</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}