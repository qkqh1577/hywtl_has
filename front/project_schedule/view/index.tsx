import React from 'react';
import { Box, } from '@mui/material';
import SearchSection from 'project_schedule/view/SearchSection';
import List from 'project_schedule/view/List';
import Calendar from './Calendar';
import { ProjectScheduleShortVO } from 'project_schedule/domain';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project_schedule/route/schedule';

export interface ProjectScheduleProps {
  list?: ProjectScheduleShortVO[];
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
      marginBottom: '20px',
      height:       '100%',
    }}>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
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
