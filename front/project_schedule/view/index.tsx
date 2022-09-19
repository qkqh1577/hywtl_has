import React, {
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
import momentPlugin from '@fullcalendar/moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import {
  OnAddModalOpen,
  OnDetailModalOpen
} from 'project_schedule/route/schedule';

interface Props
  extends ListProps,
          ButtonProps {
  isSearched: boolean;
  onAddModalOpen: OnAddModalOpen;
  onDetailModalOpen: OnDetailModalOpen;
  setDate: (startDate: string,
            endDate: string
  ) => void;
}

export default function ProjectSchedule(props: Props) {

  const {
          isSearched,
          setIsSearched,
          list,
          onAddModalOpen,
          onDetailModalOpen
        } = props;

  const [events, setEvents] = useState<EventInput[]>();

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
        marginBottom: '15px',
        marginTop:    '20px',
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
          <Box sx={{
            fontFamily:            'Noto Sans KR',
            width:                 '100%',
            '& .fc-toolbar-chunk': {
              display:                  'flex',
              flexWrap:                 'nowrap',
              alignItems:               'center',
              '& .fc-toolbar-title':    {
                fontSize:    '18px',
                lineHeight:  '24px',
                marginRight: '20px'
              },
              '& .fc-button-group':     {
                marginLeft: 0,
              },
              '& button':               {
                fontFamily:     'Noto Sans KR',
                margin:         0,
                padding:        0,
                borderRadius:   '5px !important',
                display:        'flex',
                justifyContent: 'center',
                alignItems:     'center',
                height:         '24px',
                fontSize:       '11px',
                boxShadow:      'none',
                '& > span':     {
                  fontSize: '11px',
                },
                '&:hover':      {
                  boxShadow: 'none',
                }
              },
              '& .fc-prev-button':      {
                width:           '24px',
                backgroundColor: ColorPalette._386dd6,
                border:          'none',
                marginRight:     '5px',
              },
              '& .fc-next-button':      {
                width:           '24px',
                backgroundColor: ColorPalette._386dd6,
                border:          'none',
                marginRight:     '10px',
              },
              '& .fc-today-button':     {
                padding:         '0 10px',
                border:          `1px solid ${ColorPalette._9bb6ea}`,
                backgroundColor: ColorPalette._e4e9f2,
                color:           ColorPalette._386dd6,
                fontSize:        '11px',
                fontWeight:      'bolder',
              },
              '& .fc-addButton-button': {
                padding:         '0 10px',
                backgroundColor: `${ColorPalette._386dd6} !important`,
                border:          'none',
                color:           ColorPalette._ffffff,
                fontSize:        '11px',
                fontWeight:      'bolder',
              }
            }

          }}>
            <FullCalendar
              locale="ko"
              plugins={[dayGridPlugin, momentPlugin]}
              events={events}
              eventTimeFormat={{
                hour:   '2-digit',
                minute: '2-digit',
                hour12: false
              }}
              eventClick={handleDateClick}
              headerToolbar={{
                left:  'title prev,next,today',
                right: 'addButton'
              }}
              datesSet={({ start, end }) => {
                props.setDate(dayjs(start)
                  .format('YYYY-MM-DD'),
                  dayjs(end)
                  .format('YYYY-MM-DD')
                );
              }}
              titleFormat="MM월 YYYY년"
              buttonText={{
                today: '오늘'
              }}
              customButtons={{
                addButton: {
                  text: '등록',

                  click: () => {
                    onAddModalOpen(true);
                  }
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
