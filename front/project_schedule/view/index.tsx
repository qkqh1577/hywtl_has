import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import SearchSection, { ButtonProps } from 'project_schedule/view/SearchSection';
import List, { ListProps } from 'project_schedule/view/List';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project_schedule/route/schedule';
import { useDispatch } from 'react-redux';
import { ProjectScheduleQuery } from 'project_schedule/query';
import { projectScheduleAction } from 'project_schedule/action';

interface Props
  extends ListProps,
          ButtonProps {
  isSearched: boolean;
  onAddModalOpen: OnAddModalOpen;
  onDetailModalOpen: OnDetailModalOpen;
}

export const StyleWrapper = styled.div`
  .fc-toolbar-chunk{
    display: flex;
  }

  .fc-daygrid-day-frame{
    padding: 0px 5px
  }
  
  .fc-daygrid-day-number{
    padding: 12px 7px 0px 0px
  }
  
  .fc-event-time{
    color: #ffffff
  }
  
  .fc-event-title{
    color: #ffffff
  }
  
  .date-box{
    padding: 10px;
    border: 1px #e4e9f2;
    background-color: #4c9eeb;
    font-size: 13px bold #386dd6 
  }
`;

export default function ProjectSchedule(props: Props) {

  const {
          isSearched,
          setIsSearched,
          list,
          onAddModalOpen,
          onDetailModalOpen
        } = props;

  const [events, setEvents] = useState<EventInput[]>();
  const dispatch = useDispatch();
  const getList = useCallback((query: ProjectScheduleQuery) => dispatch(projectScheduleAction.getList(query)), [dispatch]);

  useEffect(() => {
    if (list) {
      setEvents(list.map((item) => {
        return {
          id:        `${item.id}`,
          title:     `${item.type} ${item.title}`,
          start:     dayjs(item.startTime)
                     .format('YYYY-MM-DD'),
          end:       dayjs(item.endTime)
                     .add(1, 'd')
                     .format('YYYY-MM-DD'),
          allDay:    item.allDay,
          className: 'date-box',
        };
      }));
    }
    else {
      setEvents(undefined);
    }
  }, [list]);

  const handleDateClick = (arg) => {
    onDetailModalOpen(arg.event.id);
  };
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
        border:       `1px solid ${ColorPalette._e4e9f2}`,
        borderRadius: '5px',
        marginBottom: '15px',
        padding:      '15px 15px'
      }}>
        <SearchSection
          isSearched={isSearched}
          setIsSearched={setIsSearched}
        />
      </Box>
      {isSearched && <List list={list} onDetailModalOpen={onDetailModalOpen} />}
      {isSearched && Array.isArray(list) && list.length === 0 && (
        <Box
          sx={{
            display:        'flex',
            justifyContent: 'center',
            width:          '100%',
            height:         '100%',
            flexWrap:       'nowrap',
            border:         `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius:   '5px',
            marginBottom:   '15px',
            padding:        '15px 15px'
          }}>
          <Typography>검색된 결과가 없습니다.</Typography>
        </Box>
      )}
      <Box sx={{
        width: '100%',
      }}>
        {!isSearched && (
          <StyleWrapper>
            <FullCalendar
              locale="ko"
              plugins={[dayGridPlugin]}
              events={({ start, end }) => {
                getList({
                  startDate: dayjs(start)
                             .format('YYYY-MM-DD'),
                  endDate:   dayjs(end)
                             .format('YYYY-MM-DD'),
                });
                return events;
              }}
              eventTimeFormat={{
                hour:   '2-digit',
                minute: '2-digit',
                hour12: false
              }}

              eventClick={handleDateClick}
              headerToolbar={{
                left:  'title prev next today',
                right: 'addButton'
              }}
              buttonText={{
                today: '오늘'
              }}
              customButtons={{
                addButton: {
                  text:  '등록',
                  click: () => {
                    onAddModalOpen(true);
                  }
                }
              }}
            />
          </StyleWrapper>
        )}
      </Box>
    </Box>
  );
};
