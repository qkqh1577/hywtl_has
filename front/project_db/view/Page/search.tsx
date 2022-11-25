import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, TextField, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TagIcon from "@mui/icons-material/Tag";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {makeStyles, withStyles} from "@mui/styles";
import {ProjectDbSearch, ProjectDbSearchItems} from "./form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {projectDbAction} from "../../action";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";

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

export default function ProjectSearch() {

    const dispatch = useDispatch();
    const {schema, filter, list, dynamicSelectState} = useSelector((root: RootState) => root.projectDb);
    const [searchState, setSearchState] = useState<ProjectDbSearchItems>({});
    const [searchFrom, setSearchFrom] = useState<Dayjs>(dayjs(new Date()));
    const [searchTo, setSearchTo] = useState<Dayjs>(dayjs(new Date()));

    const onSearch = () => {
        const searchData: ProjectDbSearch = {
            filter: filter,
            search: searchState,
            from: searchFrom,
            to: searchTo
        };
        dispatch(projectDbAction.requestList(searchData));
    };

    const onSearchFromDateChange = (newValue: Dayjs) => {
        setSearchFrom(newValue);
    };

    const onSearchToDateChange = (newValue: Dayjs) => {
        setSearchTo(newValue);
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
                </StyledAccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'inline-flex'}}>
                        <DesktopDatePicker
                            label="검색 시작일"
                            inputFormat="YYYY-MM-DD"
                            onChange={(newValue, strValue) => {
                                if (newValue != null) onSearchFromDateChange(newValue);
                            }}
                            value={searchFrom}
                            renderInput={(params) => <TextField {...params} />}/>

                        <DesktopDatePicker
                            label="검색 종료일"
                            inputFormat="YYYY-MM-DD"
                            onChange={(newValue, strValue) => {
                                if (newValue != null) onSearchToDateChange(newValue);
                            }}
                            value={searchTo}
                            renderInput={(params) => <TextField {...params} />}/>

                        <Button onClick={onSearch}>검색</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}