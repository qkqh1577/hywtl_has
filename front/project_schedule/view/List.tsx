import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ProjectScheduleShort } from 'project_schedule/domain';
import { ColorPalette } from 'app/view/App/theme';
import dayjs from 'dayjs';

export interface ListProps {
  list?: ProjectScheduleShort[];
}

export default function List({ list }: ListProps) {

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
              <Typography>{
                dayjs(item.startTime).locale('ko').format('YYYY년 MM월 DD일 ddd hh:mm')} ~
                {dayjs(item.endTime).locale('ko').format('YYYY년 MM월 DD일 ddd hh:mm')}
                [{item.type}] {item.title}
              </Typography>
            </Box>
          );
        })
      }
    </>
  );
};
