import React, {useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
    Typography
} from "@mui/material";
import {withStyles, makeStyles} from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function SearchForm(props: Props) {

    const [state, setState] = useState(false);
    const toggleDrawer = (isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            setState(isOpen);
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
                    <p>검색 조건이 위치할 예정입니다</p>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}