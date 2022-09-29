import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DateFormat from 'components/DateFormat';
import { ColorPalette } from 'app/view/App/theme';
import IconButton from 'components/IconButton';
import TextBox from 'layouts/Text';

export interface SectionLayoutProps {
  title?: string;
  disableFold?: boolean;
  titleRightComponent?: React.ReactNode;
  modals?: JSX.Element | JSX.Element[];
  children: React.ReactNode;
  modifiedAt?: Date | null;
}

export default function SectionLayout(props: SectionLayoutProps) {

  const {
          title,
          disableFold,
          titleRightComponent,
          modifiedAt,
          modals
        } = props;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Box sx={{
      width:         '100%',
      display:       'flex',
      flexWrap:      'wrap',
      overflow:      'hidden',
      paddingBottom: '20px',
    }}>
      <Box sx={{
        width:          '100%',
        display:        'flex',
        justifyContent: 'space-between',
        paddingBottom:  '10px',
        height:         '100%',
        alignItems:     'center'
      }}>
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          height:         '100%',
          alignItems:     'center',
          justifyContent: 'space-between',
          width:          'calc(100% - 197px)',
        }}>
          <Box sx={{
            display:        'flex',
            flexWrap:       'nowrap',
            justifyContent: 'flex-start',
          }}>
            <TextBox variant="body7" sx={{ marginRight: '10px' }}>
              {title}
            </TextBox>
            {!disableFold && (
              <IconButton
                children={<FontAwesomeIcon icon="angle-up" />}
                onClick={() => {
                  setOpen(!open);
                }}
                sx={{
                  transition: 'transform .2s',
                  transform:  open ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            )}
          </Box>
          <Box sx={{
            display:        'flex',
            flexWrap:       'nowrap',
            justifyContent: 'flex-end',
          }}>
            {titleRightComponent}
          </Box>
        </Box>
        <Box sx={{
          display:    'flex',
          flexWrap:   'nowrap',
          height:     '100%',
          alignItems: 'center',
        }}>
          {modifiedAt && (
            <>
              <Typography fontSize="12px" fontWeight="bold" marginRight="2px">최종수정일시</Typography>
              <Typography fontSize="12px">
                <DateFormat date={modifiedAt} format="YYYY-MM-DD HH:mm" />
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Collapse
        in={open}
        collapsedSize="1px"
        sx={{
          width: '100%'
        }}>
        <Box sx={{
          display:  'flex',
          flexWrap: 'nowrap',
          width:    '100%',
        }}>
          <Box
            children={props.children}
            sx={{
              display:      'flex',
              width:        '100%',
              padding:      '15px 20px',
              border:       `1px solid ${ColorPalette._e4e9f2}`,
              borderRadius: '5px',
            }}
          />
        </Box>
      </Collapse>
      {modals}
    </Box>
  );
};