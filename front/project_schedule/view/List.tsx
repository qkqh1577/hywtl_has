import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import dayjs from 'dayjs';
import TextLink from 'components/TextLink';
import { ProjectScheduleProps } from 'project_schedule/view/index';

export default function List(props: Pick<ProjectScheduleProps, | 'list' | 'onDetailModalOpen'>) {
  const {
          list,
          onDetailModalOpen
        } = props;

  if (!list || list.length === 0) {
    return (
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
    );
  }
  return (
    <>
      {
        list.map((item) => {
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
