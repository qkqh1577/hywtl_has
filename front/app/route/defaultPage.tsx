import React from 'react';
import {AppRoute} from 'services/routes';
import {Box} from "@mui/material";
import logo from 'assets/logo_rect_type.jpg';

function Element() {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <img src={logo}
           alt="한양풍동실험연구소 로고"
           style={{
             opacity: 0.1,
             maxWidth: '25vw',
             maxHeight: '25vh',
             width: 'auto',
             height: 'auto'
           }}
      />
    </Box>
  );
}

const defaultPageRoute: AppRoute = {
  path: '*',
  element: <Element/>
};

export default defaultPageRoute;
