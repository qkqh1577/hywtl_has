import React, {useCallback, useEffect, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
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

interface ProjectDbSearchData {
    [any: string]: [{
        key: string,
        value: any
    }]
};

export default function Form(props: Props) {

    const {schema, filter, dynamicSelectState} = useSelector((root: RootState) => root.projectDb);
    const dispatch = useDispatch();
    const [state, setState] = useState(false);
    const [searchState, setSearchState] = useState<ProjectDbSearchData>({})
    const setDynamicSelectState = useCallback((entityName: string, searchName: string, value: string) => {
        const newState = {...dynamicSelectState};
        newState[`${entityName}.${searchName}`] = value;
        dispatch(projectDbAction.setDynamicSelectState(newState));
    }, [dynamicSelectState]);

    useEffect(()=>{
        console.debug(`dynamic select state is `, dynamicSelectState);
        return ()=>{
            console.debug('clean dynamic select state');
            dispatch(projectDbAction.setDynamicSelectState({}));
        }
    },[]);

    const toggleDrawer = (isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            setState(isOpen);
        };

    const entities = Object.keys(filter);

    const onSearch = () => {
        console.debug(searchState);
    };

    function updateSearchState(entityName: string, attrName: string, value) {
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
        console.debug(newSearchState)
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
                    control={<Checkbox/>} label={attrInfo.description}
                    onChange={(event) => onChange(attrInfo, event)}/>
                break;
            case "Select":
                tag = (
                    <Select
                        displayEmpty
                        value={dynamicSelectState && dynamicSelectState[`${entityName}.${searchName}`] ? dynamicSelectState[`${entityName}.${searchName}`] : ''}
                        onChange={(event) => onChange(attrInfo, event)}
                    >
                        <MenuItem value=""> {attrInfo.description} 선택 </MenuItem>
                        {
                            Object.keys(attrInfo.option).map(index => {
                                const option = attrInfo.option[index];
                                const optionLabel = (attrInfo.optionLabel[index]) ? attrInfo.optionLabel[index] : option;
                                return (
                                    <MenuItem value={option}>{optionLabel}</MenuItem>
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
                    <Typography>현재 검색 조건: YYYY-MM-DD ~ YYYY-MM-DD (TOTAL 2 RECORDS)</Typography>
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
                                    {Object.keys(attributes).map((attrName) => {
                                        const attrInfo = schema[entityName].attributes[attrName];
                                        if (!attrInfo.search) return true;

                                        return attributes[attrName] && (
                                            <div style={{display: 'inline-flex', marginRight: '10px'}}>
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