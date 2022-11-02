import React, {useEffect, useState} from 'react'
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

interface Props {
    schema: ProjectDbSchemaVO[]
}

interface FilterState {
    [entity: string]: {
        checked: boolean,
        attributes: {
            [attr: string]: boolean
        }
    }
}

export default function Filter(props: Props) {
    const {schema} = props;
    const entities: string[] = Object.keys(schema);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filterState, setFilterState] = useState<FilterState>({});

    useEffect(() => {
        //TODO: LOAD INITIAL FILTER STATE (CURRENT: RANDOM DATA)
        const initialFilterState = {};
        entities.map((entityName, index) => {
            const entityInfo = schema[entityName];
            const attributes = Object.keys(entityInfo.attributes);
            const initialAttrState = {};
            attributes.map((attributeName, attributeIndex) => {
                const attributeInfo = entityInfo.attributes[attributeName];
                initialAttrState[attributeName] = attributeIndex % 2 === 0;
            });
            initialFilterState[entityInfo.type] = {
                checked: true,
                attributes: initialAttrState
            };
        });
        setFilterState(initialFilterState);
    }, [schema]);

    const onEntityItemChange = (event: React.ChangeEvent<HTMLInputElement>, entityType: string) => {
        const checked = event.target.checked;
        const newFilterState = {...filterState};
        newFilterState[entityType].checked = checked;

        const attributes = Object.keys(newFilterState[entityType].attributes);
        attributes.forEach((attrName) => {
            newFilterState[entityType].attributes[attrName] = checked;
        });
        setFilterState(newFilterState);
    };

    const onAttributeItemChange = (event: React.ChangeEvent<HTMLInputElement>, entityType: string, attributeName: string) => {
        const checked = event.target.checked;
        const newFilterState = {...filterState};
        newFilterState[entityType].attributes[attributeName] = checked;
        setFilterState(newFilterState);
    };

    return (
        <Box sx={{width: '100%', height: '100%', overflowY: 'scroll'}}>

            {entities.map((entityName, index) => {
                const entityInfo = schema[entityName];
                const entityType = entityInfo.type;
                const attributes = Object.keys(entityInfo.attributes);
                const baseKey = (index + 1) * 1000;
                const entityItemChecked = entityType in filterState && filterState[entityType].checked;

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
                                    const attrItemChecked = entityItemChecked &&
                                        filterState[entityType].attributes[attributeName];

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