import { Box, } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import momentPlugin from '@fullcalendar/moment';
import dayjs from 'dayjs';
import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import { ProjectScheduleProps } from 'project_schedule/view/index';

function EventContent(props: {
  event: EventInput;
}) {
  const { event } = props;
  return (
    <Box sx={{
      padding: '4px',
    }}>
      <span style={{
        fontWeight:  'bold',
        marginRight: '4px',
      }}>
      {event.allDay ? '종일' : dayjs(event.start as Date | string)
      .format('HH:mm')}
        </span>
      <span style={{
        marginRight: '4px',
        fontWeight:  'normal',
      }}>
         [{event.type}]
      </span>
      <span style={{
        fontWeight:   'normal',
        textOverflow: 'ellipsis',
        whiteSpace:   'normal',
        overflow:     'hidden',
        overflowWrap: 'anywhere',
        lineHeight:   '20px',
      }}>
      {event.title}
      </span>
    </Box>
  );
}

interface ContextMenuProps {
  top: number;
  left: number;
  eventList: EventInput[];
  width: number;
}

// TODO: pop menu
function ContextMenu(props: ContextMenuProps) {

  return (
    <Box sx={{
      backgroundColor: ColorPalette._2d3a54,
      borderRadius:    '5px',
      padding:         '10px',
      width:           `${props.width}px`,
      position:        'absolute',
      zIndex:          10,
    }}>
      {props.eventList.map(event => (
        <EventContent event={event} />
      ))}
    </Box>
  );
}

function DayCellContent(props: {
  date: Date;
  dow: number;
  isOther: boolean;
  events: EventInput[] | undefined;
}) {
  const ref = useRef(null);
  const instance = dayjs(props.date);
  const date = instance.date();
  const dateStart = dayjs(instance.format('YYYY-MM-DD') + '00:00:00');
  const dateEnd = dayjs(instance.format('YYYY-MM-DD') + '23:59:59');
  const eventList =
          props.events?.map((event) => ({
            start: dayjs(event.start as string),
            end:   dayjs(event.end as string),
          }))
               .filter(item =>
                 item.start.isBefore(dateEnd) && item.end.isAfter(dateStart));
  const eventCount = eventList?.length ?? 0;
  const isSun = props.dow === 0;
  const isSat = props.dow === 6;
  const onClick = () => {
    if (eventCount === 0 || !ref || !ref.current) {
      return;
    }

  };
  return (
    <Box
      sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: eventCount > 0 ? 'space-between' : 'flex-end',
        color:          !props.isOther ? (
          isSat
            ? ColorPalette._0047d3
            : isSun
              ? ColorPalette._eb4c4c
              : ColorPalette._252627
        ) : ColorPalette._b2b4b7,
      }}>
      {eventCount > 0 && (
        <span
          ref={ref}
          onClick={onClick}
          style={{
            color:  ColorPalette._386dd6,
            cursor: 'pointer'
          }}>
                    +{eventCount}건
                  </span>
      )}
      <span>
                {date}
                </span>
    </Box>
  );
}

export default function ProjectScheduleCalendar(props: ProjectScheduleProps) {

  const { list, onDetailModalOpen } = props;
  const [events, setEvents] = useState<EventInput[]>();

  const handleDateClick = (arg) => {
    onDetailModalOpen(arg.event.id);
  };

  useEffect(() => {
    if (list) {
      setEvents(list.map((item) => ({
        ...item,
        id:    `${item.id}`,
        start: dayjs(item.startTime)
               .format('YYYY-MM-DD hh:mm'),
        end:   dayjs(item.startTime)
               .format('YYYY-MM-DD')
               ===
               dayjs(item.endTime)
               .format('YYYY-MM-DD') ? dayjs(item.endTime)
        .format('YYYY-MM-DD hh:mm') : (item.allDay ? dayjs(item.endTime)
          .add(1, 'd')
          .format('YYYY-MM-DD hh:mm')
          : dayjs(item.endTime)
          .format('YYYY-MM-DD hh:mm')),
      })));
    }
    else {
      setEvents(undefined);
    }
  }, [list]);

  return (
    <Box sx={{
      width: '100%',
    }}>
      <Box sx={{
        width:                   '100%',
        fontFamily:              'Noto Sans KR',
        fontSize:                '13px',
        fontWeight:              'bold',
        '& .fc-daygrid.fc-view': {
          'table, thead, tbody, tfoot, tr, th, td': {
            border: 'none',
          },
          '& > table ':                             {
            height:                `${46 + 150 * 6}px`,
            '& *':                 {
              overflow: 'hidden !important',
            },
            '& > thead > tr > th': {
              borderTop:            `1px solid ${ColorPalette._e4e9f2}`,
              borderLeft:           `1px solid ${ColorPalette._e4e9f2}`,
              borderRight:          `1px solid ${ColorPalette._e4e9f2}`,
              borderBottom:         `5px solid ${ColorPalette._e4e9f2}`,
              borderTopLeftRadius:  '5px',
              borderTopRightRadius: '5px',
              color:                ColorPalette._252627,
              '& th > div':         {
                height:         '40px',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }
            },
            '& > tbody > tr > td': {
              border:                  `1px solid ${ColorPalette._e4e9f2}`,
              borderBottomLeftRadius:  '5px',
              borderBottomRightRadius: '5px',
              '& .fc-daygrid-body':    {
                width:                '100% !important',
                '& > table':          {
                  width:     '100% !important',
                  maxHeight: `${150 * 6}px`,
                },
                '& > table > tbody ': { // calender date table
                  '& > tr:not(:last-child) > td': {
                    borderBottom: `1px solid ${ColorPalette._e4e9f2}`,
                  },
                  '& > tr > td:not(:last-child)': {
                    borderRight: `1px solid ${ColorPalette._e4e9f2}`,
                  },
                  '& td.fc-daygrid-day':          {
                    height: '150px',
                  },
                  '& .fc-daygrid-day-top':        {
                    opacity: 1,
                    padding: '12px 12px 0 12px',
                    '& > a': {
                      width: '100%',
                    }
                  },
                  '& .fc-daygrid-event':          {
                    borderRadius:    '5px',
                    backgroundColor: ColorPalette._4c9eeb,
                    color:           ColorPalette._ffffff,
                    fontSize:        '13px',
                    padding:         '2px 4px 4px 4px',
                    border:          'none',
                    maxHeight:       '50px',
                    alignItems:      'flex-start',
                    lineHeight:      '20px',
                    margin:          '2px 5px',
                    cursor:          'pointer'
                  },
                  '& .fc-day-today':              {
                    backgroundColor: ColorPalette._f1f5fc,
                  }
                },
              }
            }
          }
        },

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
            padding:         '0 16px',
            width:           '64px',
            backgroundColor: `${ColorPalette._386dd6} !important`,
            border:          'none',
            color:           ColorPalette._ffffff,
            height:          '32px',
            fontSize:        '13px',
            fontWeight:      'normal',
            boxShadow:       'none',
            wordBreak:       'keep-all',
            whiteSpace:      'nowrap',
            '&:hover':       {
              boxShadow: 'none',
            }
          }
        },
      }}>
        <FullCalendar
          locale="ko"
          handleWindowResize
          height="1030px"
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
          fixedWeekCount={true}
          customButtons={{
            addButton: {
              text:  '등록',
              click: () => {
                props.onAddModalOpen(true);
              }
            }
          }}
          dayCellContent={(params) => (
            <DayCellContent
              isOther={params.isOther}
              dow={params.dow}
              date={params.date}
              events={events}
            />
          )}
          eventContent={(params) => (
            <EventContent event={{
              ...params.event._def.extendedProps,
              title:  params.event.title,
              id:     params.event.id,
              allDay: params.event.allDay,
              start:  params.event.start!,
              end:    params.event.end!,
            }} />
          )}
        />
      </Box>
    </Box>
  );
}

