import React from 'react';
import { Box } from '@mui/material';
import TextBox from 'layouts/Text';

function DefaultMessage(props) {
  return (
    <>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        marginBottom:  '3px'
      }}>
        <TextBox variant="body2">도로명 + 건설 번호</TextBox>
        <TextBox variant="body12">예) 판교역로 235, 제주첨단로 242</TextBox>
      </Box>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        marginBottom:  '3px'
      }}>
        <TextBox variant="body2">지역명(동/리) + 번지</TextBox>
        <TextBox variant="body12">예) 삼평동 681, 제주 영평동 2181</TextBox>
      </Box>
      <Box sx={{
        display:       'flex',
        flexDirection: 'column',
        marginBottom:  '3px'
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
    </>
  );
}

export default DefaultMessage;
