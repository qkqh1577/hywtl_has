import React, {useCallback, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  TextField,
  TextFieldProps,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TagIcon from "@mui/icons-material/Tag";
import {makeStyles, withStyles} from "@mui/styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {ProjectDbSearchCondition} from "../../reducer";
import {projectDbAction} from "../../action";

const useContainerStyle = makeStyles({
  root: {
    width: '100% !important',
    padding: '0',
    margin: '20px 20px 0px 20px',
    zIndex:1000,
    maxHeight: '56px'
  }
});

const StyledAccordionSummary = withStyles({
  root: {
    // flexDirection: "column",
    // width: '100%',
  },
  content: {
    margin: 0,
  },
  expandIcon: {
    marginRight: 0,
    paddingTop: 0,
  },
})(AccordionSummary);

export default function ProjectSearch() {

  const dispatch = useDispatch();
  const {list, search} = useSelector((root: RootState) => root.projectDb);

  const setSearch = useCallback(
    (searchState) => dispatch(projectDbAction.setSearch(searchState))
    , [search]);

  const [searchState] = useState<ProjectDbSearchCondition>({});
  const [searchFrom, setSearchFrom] = useState<Dayjs>(dayjs(new Date()));
  const [searchTo, setSearchTo] = useState<Dayjs>(dayjs(new Date()));

  const onSearch = useCallback(() => {
    setSearch({
      search: searchState,
      from: searchFrom,
      to: searchTo
    });
  }, [searchState, searchFrom, searchTo]);

  const onSearchFromDateChange = (newValue: Dayjs) => {
    setSearchFrom(newValue);
  };

  const onSearchToDateChange = (newValue: Dayjs) => {
    setSearchTo(newValue);
  };

  function onChangeSearchFrom() {
    return (newValue) => {
      if (newValue != null) onSearchFromDateChange(newValue);
    };
  }

  function onChangeSearchTo() {
    return (newValue) => {
      if (newValue != null) onSearchToDateChange(newValue);
    };
  }

  return (
    <Box className={useContainerStyle().root}>
      <Accordion sx={{overflow:'visible'}}>
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
              onChange={onChangeSearchFrom()}
              value={searchFrom}
              renderInput={TextFieldForDatePicker()}/>

            <DesktopDatePicker
              label="검색 종료일"
              inputFormat="YYYY-MM-DD"
              onChange={onChangeSearchTo()}
              value={searchTo}
              renderInput={TextFieldForDatePicker()}/>

            <Button onClick={onSearch}>검색</Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

function TextFieldForDatePicker() {
  return (props: TextFieldProps) => (
    <TextField {...props} />
  )
}