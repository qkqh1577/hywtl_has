import React from 'react';
import { Box } from '@mui/material';
import { ProjectScheduleShort } from 'project_schedule/domain';
import { ColorPalette } from 'app/view/App/theme';
import dayjs from 'dayjs';
import TextLink from 'components/TextLink';
import { OnDetailModalOpen } from 'project_schedule/route/schedule';

export interface ListProps {
  list?: ProjectScheduleShort[];
  onDetailModalOpen: OnDetailModalOpen;
}

export default function List(props: ListProps) {
  const {
          list,
          onDetailModalOpen
        } = props;
  return (
    <>
      {
        list && list?.map((item,
                           i
        ) => {
          return (
            <Box
              key={item.id}
              sx={{
                display:      'flex',
                width:        '100%',
                height:       '100%',
                flexWrap:     'nowrap',
                border:       `1px solid ${ColorPalette._e4e9f2}`,
                borderRadius: '5px',
                marginBottom: '15px',
                padding:      '15px 15px'
              }}>
              <TextLink
                onClick={() => onDetailModalOpen(item.id)}
                children={
                  `
                ${dayjs(item.startTime)
                  .locale('ko')
                  .format('YYYY년 MM월 DD일 ddd hh:mm')}
                ~
                ${dayjs(item.endTime)
                  .locale('ko')
                  .format('YYYY년 MM월 DD일 ddd hh:mm')}
                [${item.type}] ${item.title}
                `
                }
              />
            </Box>
          );
        })
      }
    </>
  );
};
