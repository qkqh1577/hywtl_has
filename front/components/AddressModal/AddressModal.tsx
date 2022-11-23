import React, { useCallback } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { ColorPalette } from 'assets/theme';
import { addressAction } from 'components/AddressModal/action';
import TextBox from 'layouts/Text';

export const AddressModal = (props) => {
  const dispatch = useDispatch();
  const { addressModal } = useSelector((state: RootState) => state.address);
  const onClose = useCallback(() => dispatch(addressAction.addressModal(false)), [dispatch]);
  return (
    <ModalLayout
      title="주소 검색"
      width="30vw"
      open={!!addressModal}
      onClose={onClose}
      footer={
        <Box sx={{
          width:          '100%',
          margin:         '20px 0',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
        }}>
          <Button
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              console.log('저장');
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={onClose}>
            취소
          </Button>
        </Box>}
    >
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'wrap',
        height:   '100%',
      }}>
        <Box sx={{
          display:      'flex',
          width:        '100%',
          flexWrap:     'nowrap',
          padding:      '10px',
          border:       `1px solid ${ColorPalette._e4e9f2}`,
          marginBottom: '10px',
        }}>
          <Box sx={{
            display:     'flex',
            flexWrap:    'nowrap',
            width:       '100%',
            marginRight: '10px',
          }}>
            <Input
              variant="outlined"
              placeholder="입력"
              value={''}
              onChange={(e) => {
                const value = e.target.value || undefined;
                // if (value !== keyword) {
                //   setKeyword(value);
                // }
              }}
            />
          </Box>
          <Box sx={{
            display:  'flex',
            flexWrap: 'nowrap',
          }}>
            <Button sx={{ marginRight: '10px' }} onClick={() => {}}>
              검색
            </Button>
          </Box>
        </Box>
        <Box sx={{
          display:  'flex',
          width:    '100%',
          flexWrap: 'nowrap',
          padding:  '10px',
          border:   `1px solid ${ColorPalette._e4e9f2}`,
        }}>
          <Box sx={{
            display:       'flex',
            flexDirection: 'column',
            height:        '40vh',
            padding:       '10px'
          }}>
            <Box sx={{
              display:       'flex',
              flexDirection: 'column',
              marginBottom: '3px'
            }}>
              <TextBox variant="body2">도로명 + 건설 번호</TextBox>
              <TextBox variant="body12">예) 판교역로 235, 제주첨단로 242</TextBox>
            </Box>
            <Box sx={{
              display:       'flex',
              flexDirection: 'column',
              marginBottom: '3px'
            }}>
              <TextBox variant="body2">지역명(동/리) + 번지</TextBox>
              <TextBox variant="body12">예) 삼평동 681, 제주 영평동 2181</TextBox>
            </Box>
            <Box sx={{
              display:       'flex',
              flexDirection: 'column',
              marginBottom: '3px'
            }}>
              <TextBox variant="body2">지역명(동/리) + 건물명(아파트명)</TextBox>
              <TextBox variant="body12">예) 분당 주공, 연수동 주공 3차</TextBox>
            </Box>
            <Box sx={{
              display:       'flex',
              flexDirection: 'column',
            }}>
              <TextBox variant="body2">사서함명 + 번호</TextBox>
              <TextBox variant="body12">예) 분당우체국사서함 1~100</TextBox>
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display:   'flex',
          width:     '100%',
          flexWrap:  'nowrap',
          padding:   '10px',
          border:    `1px solid ${ColorPalette._e4e9f2}`,
          marginTop: '10px',
        }}>
          <Box sx={{
            display:     'flex',
            flexWrap:    'nowrap',
            width:       '100%',
            marginRight: '10px',
          }}>
            <DataFieldWithLabel label="상세주소">
              <Input
                variant="outlined"
                placeholder="입력"
                value={''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  // if (value !== keyword) {
                  //   setKeyword(value);
                  // }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </ModalLayout>
  );
};
