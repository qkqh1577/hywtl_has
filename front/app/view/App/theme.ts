import {
  createTheme,
} from '@mui/material/styles';
import Bold from 'assets/font/noto_sans_kr/NotoSansKR-Bold.otf';
import Black from 'assets/font/noto_sans_kr/NotoSansKR-Black.otf';
import Light from 'assets/font/noto_sans_kr/NotoSansKR-Light.otf';
import Medium from 'assets/font/noto_sans_kr/NotoSansKR-Medium.otf';
import Thin from 'assets/font/noto_sans_kr/NotoSansKR-Thin.otf';
import Regular from 'assets/font/noto_sans_kr/NotoSansKR-Regular.otf';

export const ColorPalette = {
  DarkBlue:  {
    '1': '#2d3a54',
    '2': '#242e43',
    '3': '#414d65',
    '4': '#4c576d',
    '5': '#697183',
  },
  Blue:      {
    '1': '#386dd6',
    '2': '#4c9eeb',
    '3': '#9bb6ea',
    '4': '#d7e2f7',
    '5': '#d2e7fa',
    '6': '#cddaf5',
    '7': '#e4e9f2',
    '8': '#f1f5fc',
  },
  Yellow:    '#ffb72b',
  DarkGray:  '#252627',
  Grey:      {
    '1': '#9b9ea4',
    '2': '#b2b4b7',
    '3': '#94a6ca'
  },
  White:     '#fff',
  '_fff':    '#fff',
  '_9b9ea4': '#9b9ea4',
  '_b2b4b7': '#b2b4b7',
  '_94a6ca': '#94a6ca',
  '_ffb72b': '#ffb72b',
  '_252627': '#252627',
  '_386dd6': '#386dd6',
  '_4c9eeb': '#4c9eeb',
  '_9bb6ea': '#9bb6ea',
  '_d7e2f7': '#d7e2f7',
  '_d2e7fa': '#d2e7fa',
  '_cddaf5': '#cddaf5',
  '_e4e9f2': '#e4e9f2',
  '_f1f5fc': '#f1f5fc',
  '_2d3a54': '#2d3a54',
  '_242e43': '#242e43',
  '_414d65': '#414d65',
  '_4c576d': '#4c576d',
  '_697183': '#697183',
  '_0047d3': '#0047d3'
};

const mainTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'].join(','),
  },
  palette:    {
    primary:   {
      main: '#2d3a54',
    },
    secondary: {
      main: '#386dd6',
    },
    error:     {
      main: '#ff0000',
    },
    warning:   {
      main: '#ffb72b',
    },
    text:      {
      primary: '#252627'// dark grey
    },
    action:    {
      active:             '#5470ff',
      hover:              '#5470FF38',
      selected:           '#5470ff',
      disabled:           '#494949',
      disabledBackground: '#f1eaff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 100;
          src: url(NotoSansKR-Thin.woff2) format('woff2'),
               url(NotoSansKR-Thin.woff) format('woff'),
               url(${Thin}) format('opentype');
        }
        @font-face {
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 300;
          src: url(NotoSansKR-Light.woff2) format('woff2'),
               url(NotoSansKR-Light.woff) format('woff'),
               url(${Light}) format('opentype');
        }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 400;
           src: url(NotoSansKR-Regular.woff2) format('woff2'),
                url(NotoSansKR-Regular.woff) format('woff'),
                url(${Regular}) format('opentype');
         }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 500;
           src: url(NotoSansKR-Medium.woff2) format('woff2'),
                url(NotoSansKR-Medium.woff) format('woff'),
                url(${Medium}) format('opentype');
         }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 700;
           src: url(NotoSansKR-Bold.woff2) format('woff2'),
                url(NotoSansKR-Bold.woff) format('woff'),
                url(${Bold}) format('opentype');
         }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 900;
           src: url(NotoSansKR-Black.woff2) format('woff2'),
                url(NotoSansKR-Black.woff) format('woff'),
                url(${Black}) format('opentype');
         }
      `
    },
    MuiTypography:  {
      defaultProps:   {
        fontFamily: 'Noto Sans KR',
      },
      styleOverrides: {
        root: {
          fontFamily: 'Noto Sans KR',
        }
      }
    },
    MuiLink:        {
      styleOverrides: {
        root: {
          cursor: 'pointer'
        }
      }
    },
    MuiIconButton:  {
      defaultProps: {
        color: 'primary',
      }
    },
    MuiButton:      {
      defaultProps: {
        color:   'primary',
        variant: 'contained',
      },
    }
  }
});

export default mainTheme;