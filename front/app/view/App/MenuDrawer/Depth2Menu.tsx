import {
  Box,
  Typography,
} from '@mui/material';
import React from 'react';
import { ColorPalette } from 'app/view/App/theme';
import { Menu } from 'app/domain/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';

interface Props
  extends Menu {

}

export default function Depth2Menu(props: Props) {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onClick = () => {
    if (props.path) {
      console.log(props);
      navigate(props.path);
    }
  };
  return (
    <Box
      onClick={onClick}
      sx={{
        display:        'flex',
        width:          '100%',
        color:          ColorPalette.White,
        flexWrap:       'wrap',
        justifyContent: 'space-between',
        cursor:         props.path ? 'pointer' : 'default'
      }}>
      <Box sx={{
        display:    'flex',
        flexWrap:   'nowrap',
        width:      '100%',
        height:     '38px',
        alignItems: 'center',
      }}>
        <Box sx={{
          display:    'flex',
          flexWrap:   'nowrap',
          alignItems: 'center',
          width:      '100%',
          height:     '100%',
        }}>
          <FontAwesomeIcon
            icon={props.icon}
            style={{
              color:    ColorPalette._4c9eeb,
              padding:  '0 10px',
              fontSize: '6px',
            }}
          />
          <Typography
            children={props.title}
            sx={{
              fontSize: '13px',
              color:    ColorPalette._94a6ca,
            }}
          />
        </Box>
        {props.children && (
          <FontAwesomeIcon
            icon="angle-up"
            style={{
              color:    ColorPalette._697183,
              padding:  '0 10px',
              fontSize: '13px',
            }}
          />
        )}
      </Box>
      {props.children && (
        <Box sx={{
          display:     'flex',
          width:       '100%',
          paddingLeft: '20px',
          flexWrap:    'wrap',
        }}>
          {props.children.map(child => (
            <Box
              key={child.title}
              sx={{
                display:    'flex',
                width:      '100%',
                height:     '38px',
                alignItems: 'center'
              }}>
              <Typography
                children={`- ${child.title}`}
                onClick={() => {
                  if (child.path) {
                    navigate(child.path);
                  }
                }}
                sx={{
                  fontSize: '13px',
                  color:    ColorPalette._94a6ca,
                  cursor:   child.path ? 'pointer' : 'default'
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}