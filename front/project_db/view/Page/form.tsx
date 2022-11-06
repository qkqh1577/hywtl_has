import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
    Typography
} from "@mui/material";
import {withStyles, makeStyles} from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";

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

export default function Form(props: Props) {

    const {schema, filter} = useSelector((root: RootState) => root.projectDb);
    const [state, setState] = useState(false);
    const toggleDrawer = (isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            setState(isOpen);
        };

    const entities = Object.keys(filter);

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
                        return (
                            <div key={index}>
                                <h2>
                                    {entityName}
                                </h2>
                                <div>
                                    {Object.keys(attributes).map((attrName) => {
                                        const alias = schema[entityName].attributes[attrName].description;
                                        return attributes[attrName] && (
                                            <div> {alias} {attrName}</div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })}

                </AccordionDetails>
            </Accordion>
        </Box>
    )
}