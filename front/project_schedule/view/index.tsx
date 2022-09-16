import React from 'react';
import { Box } from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import SearchSection from 'project_schedule/view/SearchSection';
import List, { ListProps } from 'project_schedule/view/List';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import styled from '@emotion/styled';

interface Props
  extends ListProps {

}

export const StyleWrapper = styled.div`
  .fc-toolbar-chunk{
    display: flex;
  }
`;

export default function ProjectSchedule(props: Props) {
  const eventList = props.list?.map((item) => {
    return {
      title:  `${item.type} ${item.title}`,
      start:  dayjs(item.startTime)
              .format('YYYY-MM-DD'),
      end:    dayjs(item.endTime)
              .format('YYYY-MM-DD'),
      allDay: item.allDay,
    };
  });

  const handleDateClick = (arg) => {
    alert(arg.alert());
  };

  console.log(eventList);
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
        <SearchSection />
      </Box>
      <List {...props} />
      <Box sx={{
        width: '100%',
      }}>
        <StyleWrapper>
          <FullCalendar
            locale="ko"
            plugins={[dayGridPlugin]}
            events={eventList}
            headerToolbar={
              {
                left:  'title prev next today',
                right: 'addButton'
              }
            }

            buttonText={
              {
                today: '오늘'
              }
            }
            customButtons={
              {
                addButton: {
                  text:  '등록',
                  click: () => {
                    console.log('click');
                  }
                }
              }
            }
          />
        </StyleWrapper>
      </Box>
    </Box>
  );
};
