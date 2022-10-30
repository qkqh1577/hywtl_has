import React, {useState} from 'react'
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

export default function Filter(props: Props) {
    const {schema} = props;
    const entities: string[] = Object.keys(schema);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = () => {
        console.warn('implement.....');
    };

    return (
        <Box sx={{width: '100%', height: '100%', overflowY: 'scroll'}}>

            {entities.map((entityName, index) => {
                const entityInfo = schema[entityName];
                const attributes = Object.keys(entityInfo.attributes);
                const baseKey = (index + 1) * 1000;
                return (
                    <Accordion key={baseKey}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                        >
                            <Typography>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                />
                                {entityInfo.description}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {attributes.map((attributeName, attributeIndex) => {
                                    const attributeInfo = entityInfo.attributes[attributeName];
                                    return (
                                        <ListItemButton
                                            key={baseKey + attributeIndex + 1}
                                        >
                                            <ListItemText>
                                                <Checkbox
                                                    edge="start"
                                                    tabIndex={-1}
                                                    disableRipple
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