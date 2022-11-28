import React, {useCallback, useEffect, useState} from 'react'
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, Typography
} from "@mui/material";
import {ProjectDbSchemaVO} from "../../domain";
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ProjectDbFilter} from "../../reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import ProjectDbPage from "./index";
import {projectDbAction, ProjectDbAction} from "../../action";

interface Props {
    schema: ProjectDbSchemaVO[],
    filter: ProjectDbFilter
}

export default function Filter(props: Props) {
    const dispatch = useDispatch();
    const {schema} = props;
    const {filter} = useSelector((root: RootState) => root.projectDb);

    const setFilter = useCallback(
        (filterState) => dispatch(projectDbAction.setFilter(filterState))
        , [dispatch]);

    const onEntityItemChange = (event: React.ChangeEvent<HTMLInputElement>, entityType: string) => {
        const checked = event.target.checked;
        const newFilterState = {...filter};

        if (!newFilterState[entityType]) newFilterState[entityType] = {};
        Object.keys(newFilterState[entityType]).forEach((attrName) => {
            newFilterState[entityType][attrName] = checked;
        });
        setFilter(newFilterState);
    };

    const onAttributeItemChange = (event: React.ChangeEvent<HTMLInputElement>, entityType: string, attributeName: string) => {
        const checked = event.target.checked;
        const newFilterState = {...filter};
        newFilterState[entityType][attributeName] = checked;
        setFilter(newFilterState);
    };

    return (
        <Box sx={{width: '100%', height: '100%', overflowY: 'scroll'}}>

            {Object.keys(schema).reverse().map((entityName, index) => {
                const entityInfo = schema[entityName];
                const entityType = entityInfo.type;
                const attributes = Object.keys(entityInfo.attributes);
                const baseKey = (index + 1) * 1000;
                let entityItemChecked = false;

                if (entityType in filter) {
                    Object.keys(filter[entityType]).forEach(attrName => {
                        if (filter[entityType][attrName]) {
                            entityItemChecked = true;
                            return false;
                        }
                    });
                }

                return (
                    <Accordion key={baseKey}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography>
                                <Checkbox
                                    checked={entityItemChecked}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        onEntityItemChange(event, entityType);
                                    }}
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    size="small"
                                />
                                {entityInfo.description}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {attributes.map((attributeName, attributeIndex) => {
                                    const attributeInfo = entityInfo.attributes[attributeName];
                                    const attrItemChecked = entityType in filter && filter[entityType][attributeName];

                                    return (
                                        <ListItemButton
                                            key={baseKey + attributeIndex + 1}
                                        >
                                            <ListItemText>
                                                <Checkbox
                                                    checked={attrItemChecked}
                                                    onChange={(event) => {
                                                        onAttributeItemChange(event, entityType, attributeName);
                                                    }}
                                                    edge="start"
                                                    tabIndex={-1}
                                                    disableRipple
                                                    size="small"
                                                />
                                                {attributeInfo.description}
                                            </ListItemText>
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                );
            })}

        </Box>
    );
}