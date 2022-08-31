import {
  projectMemoCategoryName,
  ProjectMemoVO
} from 'project_memo/domain';
import {
  Box,
  Typography
} from '@mui/material';
import React from 'react';
import DateFormat from 'components/DateFormat';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ProjectMemoListProps {
  list: ProjectMemoVO[];
}

export default function ProjectMemoList({ list }: ProjectMemoListProps) {

  return (
    <Box sx={{
      display:    'flex',
      flexWrap:   'wrap',
      width:      '100%',
      flex:       1,
      alignItems: 'flex-start',
      padding:    '0 10px 15px 10px',
    }}>
      {list.map((item) => (
        <Box
          key={item.id}
          sx={{
            display:         'flex',
            flexWrap:        'wrap',
            width:           '100%',
            border:          `1px solid ${ColorPalette._e4e9f2}`,
            borderRadius:    '5px',
            marginTop:       '10px',
            backgroundColor: ColorPalette._fff,
            padding:         '15px',
          }}>
          <Box sx={{
            display:        'flex',
            flexWrap:       'unwrap',
            width:          '100%',
            justifyContent: 'space-between',
            flex:           1,
          }}>
            <Box sx={{
              display:  'flex',
              flexWrap: 'unwrap',
            }}>
              <Typography sx={{
                fontSize:    '13px',
                fontWeight:  'bold',
                marginRight: '10px'
              }}>
                <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
              </Typography>
              <Typography sx={{
                fontSize:   '13px',
                fontWeight: 'bold'
              }}>
                {item.writer.name}
              </Typography>
            </Box>
            {item.writer.id === 1 && (
              <Box sx={{
                display:  'flex',
                flexWrap: 'unwrap',
              }}>
                <FontAwesomeIcon
                  icon="pen"
                  style={{
                    fontSize:    '11px',
                    color:       ColorPalette._9bb6ea,
                    marginRight: '10px',
                  }}
                />
                <FontAwesomeIcon
                  icon="trash"
                  style={{
                    fontSize: '11px',
                    color:    ColorPalette._9bb6ea,
                  }}
                />
              </Box>
            )}
          </Box>
          <Box sx={{
            display:  'flex',
            flexWrap: 'wrap',
            padding:  '12px 0'
          }}>
            <Typography
              component="span"
              sx={{
                fontSize:   '13px',
                color:      ColorPalette._252627,
                wordBreak:  'break-all',
                whiteSpace: 'break-spaces',
              }}>
              <Typography
                component="span"
                sx={{
                  fontSize:    '13px',
                  color:       ColorPalette._386dd6,
                  fontWeight:  'bold',
                  marginRight: '4px'
                }}>
                [{projectMemoCategoryName(item.category)}]
              </Typography>
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}