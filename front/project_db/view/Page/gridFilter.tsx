import React, {useState} from 'react'
import {Box, Checkbox, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ProjectDbSchemaVO} from "../../domain";
import InboxIcon from '@mui/icons-material/Inbox';

interface Props {
    schema: ProjectDbSchemaVO[]
}

export default function GridFilter(props: Props) {
    const {schema} = props;
    const entities: string[] = Object.keys(schema);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = () => {
      console.warn('implement.....');
    };

    return (
        <Box sx={{width:'100%', height:'100%', overflowY:'scroll'}}>
            <List>
                {entities.map((entityName)=>{
                    console.warn(entityName);
                    const entityInfo = schema[entityName];
                    const attributes = Object.keys(entityInfo.attributes);
                    return (
                        <React.Fragment>
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick()}
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={entityInfo.description} />
                            </ListItemButton>
                            {attributes.map((attributeName)=>{
                                const attributeInfo = entityInfo.attributes[attributeName];
                                console.debug(attributeInfo)
                                return (
                                    <ListItemButton>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                        <ListItemText primary={attributeInfo.description} />
                                    </ListItemButton>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </List>
        </Box>
    );
}