import React from 'react';
import { Box, } from '@mui/material';
import SearchSection from 'project_schedule/view/SearchSection';
import List from 'project_schedule/view/List';
import Calendar from './Calendar';
import { ProjectScheduleShort } from 'project_schedule/domain';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project_schedule/route/schedule';

export interface ProjectScheduleProps {
  list?: ProjectScheduleShort[];
  onAddModalOpen: OnAddModalOpen;
  onDetailModalOpen: OnDetailModalOpen;
  setDate: (startDate: string,
            endDate: string
  ) => void;
  setKeyword: (keyword: string) => void;
  isSearchForm: boolean;
}

export default function ProjectSchedule(props: ProjectScheduleProps) {

  const {
          list,
          onDetailModalOpen,
          setKeyword,
          isSearchForm,
        } = props;

  return (
    <Box sx={{
      display:      'flex',
      width:        '100%',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
      flex:         1,
    }}>
      <Box sx={{
        display:      'flex',
        width:        '100%',
        flexWrap:     'nowrap',
        marginBottom: '15px',
        marginTop:    '20px',
      }}>
        <SearchSection isSearchForm={isSearchForm} setKeyword={setKeyword} />
      </Box>
      {isSearchForm && (
        <List list={list} onDetailModalOpen={onDetailModalOpen} />
      )}
      {!isSearchForm && (
        <Calendar {...props} />
      )}

    </Box>
  );
};
