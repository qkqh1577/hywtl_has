import React, {ReactEventHandler, useCallback, useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox, Chip,
    FormControlLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {withStyles, makeStyles} from '@mui/styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {projectDbAction} from "../../action";
import {ProjectDbFilter} from "../../reducer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TagIcon from '@mui/icons-material/Tag';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {Dayjs} from "dayjs";

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
        // flexDirection: "column",
        // width: '100%',
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
    search: ProjectDbSearchItems,
    from?: Dayjs,
    to?: Dayjs,
}

export interface ProjectDbSearchItems {
    [any: string]: KeyValuePair[]
};

interface KeyValuePair {
    key: string,
    value: string | number | boolean,
}


export default function Form(props: Props) {

    const {schema, filter, list, dynamicSelectState} = useSelector((root: RootState) => root.projectDb);
    const entities = Object.keys(filter);

    const dispatch = useDispatch();
    const [searchState, setSearchState] = useState<ProjectDbSearchItems>({})
    const setDynamicSelectState = useCallback((entityName: string, searchName: string, value: string) => {
        const newState = {...dynamicSelectState};
        newState[`${entityName}.${searchName}`] = value;
        dispatch(projectDbAction.setDynamicSelectState(newState));
    }, [dynamicSelectState]);

    const [searchInputs, setSearchInputs] = useState<DynamicInput[]>([]);

    interface DynamicInput {
        entityName: string,
        attrName: string,
        attrInfo: any,
        value: string | boolean | number
    };
    const prepareInputs = () => {

        const initInputs: DynamicInput[] = [];

        entities.map((entityName, index) => {

            const attributes = filter[entityName];
            let hasCheckedAttr = false;
            Object.keys(attributes).forEach(attrName => {
                if (attributes[attrName]) {
                    hasCheckedAttr = true;
                    return false;
                }
            });

            Object.keys(attributes).map((attrName, index2) => {

                const attrInfo = schema[entityName].attributes[attrName];
                if (!attrInfo.search || !attributes[attrName]) return true;



                initInputs.push({
                    'entityName': entityName,
                    'attrName': attrName,
                    'attrInfo': attrInfo,
                    'value': (attrInfo.type==='Boolean')?false:''
                });

            });
        });

        return initInputs;
    };


    useEffect(() => {
        return () => {
            const initDynamicSelectState = {};
            dispatch(projectDbAction.setDynamicSelectState(initDynamicSelectState));
        }
    }, []);

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
        setSearchInputs(prepareInputs());

    }, [filter]);

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

    //const renderInput = (entityName: string, attrName: string, attrInfo: any) => {
    const renderInput = (inputState: DynamicInput, index) => {
        const {entityName, attrName, attrInfo, value: inputValue} = inputState;

        const searchName = (attrInfo.prefix) ? `${attrInfo.prefix}.${attrName}` : attrName;
        const onChange = (attrInfo, event: React.ChangeEvent<any> | SelectChangeEvent<any>) => {

            let value: any = (attrInfo.type === 'Boolean') ? event.target.checked : event.target.value;
            if (value === false) {
                value = '';
            }
            updateSearchState(entityName, searchName, value);
        };

        let tag: any;
        const attrType = (attrInfo.option) ? "Select" : attrInfo.type;

        switch (attrType) {
            case "String":
                tag = <TextField
                    sx={{marginRight:'3px'}}
                    type="string" label={attrInfo.description}
                    //onBlur={(event) => onChange(attrInfo, event)}
                    //value={dynamicSelectState && dynamicSelectState[`${entityName}.${searchName}`]}/>
                    onChange={(event) => {
                        let newState = [...searchInputs];
                        newState[index].value = event.target.value;

                        setSearchInputs(newState);
                        let value : string = event.target.value;

                        updateSearchState(entityName, searchName, value);
                    }}
                    value={inputValue}/>
                break;
            case "Long":
                tag = <TextField
                    sx={{marginRight:'3px'}}
                    type="number" label={attrInfo.description}
                    onBlur={(event) => onChange(attrInfo, event)}
                    //value={dynamicSelectState && dynamicSelectState[`${entityName}.${searchName}`]}/>
                    value={inputValue}/>
                break;
            case "Boolean":
                tag = <FormControlLabel
                    sx={{marginRight:'3px'}}
                    control={<Checkbox
                        //checked={dynamicSelectState && dynamicSelectState[`${entityName}.${searchName}`] ? dynamicSelectState[`${entityName}.${searchName}`] : false}
                        checked={inputValue as boolean}
                        value={true}/>}
                    label={attrInfo.description}
                    onChange={(event, checked) => {
                        let newState = [...searchInputs];
                        newState[index].value = checked;

                        setSearchInputs(newState);
                        onChange(attrInfo, event);
                    }
                    }/>
                break;
            case "Select":
                tag = (
                    <Select
                        sx={{minWidth: '180px',marginRight:'3px'}}
                        displayEmpty
                        //value={dynamicSelectState && dynamicSelectState[`${entityName}.${searchName}`] ? dynamicSelectState[`${entityName}.${searchName}`] : ''}
                        value={inputValue}
                        onChange={(event) => {

                            let newState = [...searchInputs];
                            newState[index].value = event.target.value;

                            setSearchInputs(newState);
                            onChange(attrInfo, event);

                        }}
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

    const removeSearchFilter = (entityName: string, item: KeyValuePair, event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        setDynamicSelectState(entityName, item.key, '');
        updateSearchState(entityName, item.key, '');
    };

    return (
        <Box className={useContainerStyle().root}>
            <Accordion>
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography component={'span'}>
                        <Chip icon={<TagIcon/>} sx={{backgroundColor: '#d3e9ff', fontWeight: 'bold'}} variant="outlined"
                              label={`검색 결과 - ${list.length}건`}/>
                    </Typography>
                    <Typography component={'span'}>
                        {
                            Object.keys(searchState).length > 0 && Object.keys(searchState).map((entityName, index) => {
                                return (<div key={index}>
                                    {
                                        searchState[entityName].map((item, index2) => {
                                            if (item.value === '') return true;
                                            const entityInfo = schema[entityName];
                                            const attrName = getAttrName(item.key);
                                            const attrInfo = entityInfo.attributes[attrName];
                                            return (<Chip
                                                key={index2 * 1000}
                                                icon={<HighlightOffIcon
                                                    onClick={event => removeSearchFilter(entityName, item, event)}/>}
                                                label={`${attrInfo.description}:${item.value}`}
                                                sx={{marginLeft: '3px', marginRight: '3px'}}
                                                variant="outlined"
                                            />);
                                        })
                                    }
                                </div>);
                            })
                        }
                    </Typography>
                </StyledAccordionSummary>
                <AccordionDetails>
                    {searchInputs.map((item, index) => renderInput(item, index))}
                    <div style={{display: 'inline-flex'}}>
                        <Button onClick={onSearch}>검색</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

function getAttrName(fullAttrName: string) {
    const tmpAttrNameArr = fullAttrName.split('.');
    return tmpAttrNameArr[tmpAttrNameArr.length - 1];
}