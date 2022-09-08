import React, { useRef } from 'react';
import {
  Box,
  Modal,
  Paper,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ModalLayoutProps {
  open: boolean;
  title: string;
  width?: string | number;
  onClose: () => void;
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

  const footerRef = useRef<HTMLDivElement>(null);
  const footerHeight = footerRef.current?.offsetHeight ?? 0;
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
      <Paper sx={{
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -50%)',
        width,
        maxWidth:  '1850px',
        maxHeight: '80vh',
        overflow:  'hidden',
        bgColor:   ColorPalette.Grey['2'],
        boxShadow: `4px 4px 20px 0px ${ColorPalette.DarkGray}`
      }}>
        <Box sx={{
          display:         'flex',
          justifyContent:  'space-between',
          width:           '100%',
          height:          '50px',
          padding:         '0 20px',
          alignItems:      'center',
          backgroundColor: ColorPalette.DarkBlue['1'],
          color:           ColorPalette.White,
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
          display:        'flex',
          height:         'calc(100% - 50px)',
          padding:        '20px',
          justifyContent: 'center',
          alignContent:   'flex-start',
          flexWrap:       'wrap',
          flex:           1,
          overflowY:      'auto'
        }}>
          <Box sx={{
            display: 'flex',
            width:   '100%',
            height:  `calc(100% - ${footerHeight + 60}px)`,
          }}>
            {children}
          </Box>
          {footer && (
            <Box
              ref={footerRef}
              sx={{
                width:          '100%',
                justifyContent: 'center',
                display:        'flex',
                alignItems:     'center',
                flex:           1,
                paddingTop:     '20px',
                height:         'auto'
              }}
              children={footer}
            />
          )}
        </Box>
      </Paper>
    </Modal>
  );
};
