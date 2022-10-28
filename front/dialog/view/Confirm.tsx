import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import {
  ConfirmVO,
  DialogStatus
} from 'dialog/domain';
import Button from 'layouts/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from 'layouts/Text';
import { ColorPalette } from 'assets/theme';

interface Props
  extends ConfirmVO {
  open: boolean;
  onClose: DefaultFunction;
  onConfirm: DefaultFunction;
}

export default function Confirm(props: Props) {

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 0,
        }
      }}>
      <DialogTitle sx={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        minWidth:        '25vw',
        backgroundColor: ColorPalette._2d3a54,
        color:           ColorPalette._ffffff,
        height:          '50px',
        padding:         '0 20px',
      }}>
        <Box sx={{
          display:        'flex',
          justifyContent: 'space-between',
          width:          '100%',
          flexWrap:       'wrap',
          alignContent:   'center',
          alignItems:     'center',
        }}>
          <TextBox variant="heading2">{props.title}</TextBox>
          <FontAwesomeIcon
            icon="xmark"
            onClick={props.onClose}
            style={{
              cursor:   'pointer',
              fontSize: '18px',
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{
          flexWrap:   'wrap',
          display:    'flex',
          width:      '100%',
          paddingTop: '20px',
        }}>
          {props.children}
        </Box>
      </DialogContent>
      <DialogActions sx={{
        justifyContent: 'center',
        paddingBottom:  '20px',
      }}>
        <Button
          onClick={props.onConfirm}
          color={
            props.status === DialogStatus.ERROR
              ? 'error'
              :
              props.status === DialogStatus.WARN
                ? 'warning'
                : undefined
          }>
          {props.confirmText}
        </Button>
        <Button onClick={props.onClose} shape="basic2">
          {props.closeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}