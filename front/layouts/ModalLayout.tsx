import React from 'react';
import {
  Box,
  Modal,
  Paper,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultFunction } from 'type/Function';

export interface ModalLayoutProps {
  open: boolean;
  title: string;
  width?: string | number;
  onClose: DefaultFunction;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function ModalLayout({
                                      open,
                                      title,
                                      width = '80vw',
                                      onClose,
                                      children,
                                      footer,
                                    }: ModalLayoutProps) {
  return (
    <Modal
      open={open}
      onClose={(event,
                reason
      ) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose();
      }}
      disableEscapeKeyDown
    >
      <Paper
        sx={{
          width,
          position:     'absolute',
          top:          '50%',
          left:         '50%',
          transform:    'translate(-50%, -50%)',
          borderRadius: 0,
          maxWidth:     '1850px',
          overflow:     'hidden',
          bgColor:      ColorPalette._b2b4b7,
          boxShadow:    `4px 4px 20px 0px ${ColorPalette._252627}`
        }}>
        <Box sx={{
          display:         'flex',
          justifyContent:  'space-between',
          width:           '100%',
          height:          '50px',
          padding:         '0 20px',
          alignItems:      'center',
          backgroundColor: ColorPalette._2d3a54,
          color:           ColorPalette._ffffff,
        }}>
          <Typography sx={{
            fontSize:   '18px',
            fontWeight: 'bold',
          }}
            children={title}
          />
          <FontAwesomeIcon
            icon="xmark"
            onClick={onClose}
            style={{
              cursor:   'pointer',
              fontSize: '18px',
            }}
          />
        </Box>
        <Box sx={{
          display:      'flex',
          alignContent: 'flex-start',
          width:        '100%',
          flexWrap:     'nowrap',
          overflow:     'hidden',
          maxHeight:    '80vh',
        }}>
          <Box sx={{
            display:                      'flex',
            width:                        '100%',
            padding:                      '20px',
            flexWrap:                     'wrap',
            overflowY:                    'scroll',
            '&::-webkit-scrollbar':       {
              width:           '10px',
              height:          '10px',
              backgroundColor: ColorPalette._e4e9f2,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: ColorPalette._697183,
            }
          }}>

            <Box
              sx={{
                display:        'flex',
                justifyContent: 'center',
                flexWrap:       'wrap',
              }}>
              {children}
            </Box>
            {footer && (
              <Box
                sx={{
                  width:          '100%',
                  justifyContent: 'center',
                  display:        'flex',
                  alignItems:     'center',
                  flex:           1,
                  paddingTop:     '20px',
                }}
                children={footer}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};
