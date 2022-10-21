import { createTheme } from '@mui/material/styles';
import OTFBold from 'assets/font/noto_sans_kr/NotoSansKR-Bold.otf';
import OTFBlack from 'assets/font/noto_sans_kr/NotoSansKR-Black.otf';
import OTFLight from 'assets/font/noto_sans_kr/NotoSansKR-Light.otf';
import OTFMedium from 'assets/font/noto_sans_kr/NotoSansKR-Medium.otf';
import OTFThin from 'assets/font/noto_sans_kr/NotoSansKR-Thin.otf';
import OTFRegular from 'assets/font/noto_sans_kr/NotoSansKR-Regular.otf';

import WOFFBold from 'assets/font/noto_sans_kr/NotoSansKR-Bold.woff';
import WOFFBlack from 'assets/font/noto_sans_kr/NotoSansKR-Black.woff';
import WOFFLight from 'assets/font/noto_sans_kr/NotoSansKR-Light.woff';
import WOFFMedium from 'assets/font/noto_sans_kr/NotoSansKR-Medium.woff';
import WOFFThin from 'assets/font/noto_sans_kr/NotoSansKR-Thin.woff';
import WOFFRegular from 'assets/font/noto_sans_kr/NotoSansKR-Regular.woff';

import WOFF2Bold from 'assets/font/noto_sans_kr/NotoSansKR-Bold.woff2';
import WOFF2Black from 'assets/font/noto_sans_kr/NotoSansKR-Black.woff2';
import WOFF2Light from 'assets/font/noto_sans_kr/NotoSansKR-Light.woff2';
import WOFF2Medium from 'assets/font/noto_sans_kr/NotoSansKR-Medium.woff2';
import WOFF2Thin from 'assets/font/noto_sans_kr/NotoSansKR-Thin.woff2';
import WOFF2Regular from 'assets/font/noto_sans_kr/NotoSansKR-Regular.woff2';

export const ColorPalette = {
  '_ffffff':     '#ffffff',
  '_9b9ea4':     '#9b9ea4',
  '_b2b4b7':     '#b2b4b7',
  '_94a6ca':     '#94a6ca',
  '_ffb72b':     '#ffb72b',
  '_252627':     '#252627',
  '_386dd6':     '#386dd6',
  '_4c9eeb':     '#4c9eeb',
  '_9bb6ea':     '#9bb6ea',
  '_d7e2f7':     '#d7e2f7',
  '_d2e7fa':     '#d2e7fa',
  '_cddaf5':     '#cddaf5',
  '_e4e9f2':     '#e4e9f2',
  '_f1f5fc':     '#f1f5fc',
  '_2d3a54':     '#2d3a54',
  '_242e43':     '#242e43',
  '_414d65':     '#414d65',
  '_4c576d':     '#4c576d',
  '_697183':     '#697183',
  '_0047d3':     '#0047d3',
  '_eb4c4c':     '#eb4c4c',
  '_f4f4f4':     '#f4f4f4',
  '_a7abb2':     '#a7abb2',
  'transparent': 'transparent',
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
      main: ColorPalette._eb4c4c,
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
          src: url(${WOFF2Thin}) format('woff2'),
               url(${WOFFThin}) format('woff'),
               url(${OTFThin}) format('opentype');
        }
        @font-face {
          font-family: 'Noto Sans KR';
          font-style: normal;
          font-weight: 300;
          src: url${WOFF2Light}) format('woff2'),
               url(${WOFFLight}) format('woff'),
               url(${OTFLight}) format('opentype');
        }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 400;
           src: url(${WOFF2Regular}) format('woff2'),
                url(${WOFFRegular}) format('woff'),
                url(${OTFRegular}) format('opentype');
         }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 500;
           src: url(${WOFF2Medium}) format('woff2'),
                url(${WOFFMedium}) format('woff'),
                url(${OTFMedium}) format('opentype');
         }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 700;
           src: url(${WOFF2Bold}) format('woff2'),
                url(${WOFFBold}) format('woff'),
                url(${OTFBold}) format('opentype');
         }
        @font-face {
           font-family: 'Noto Sans KR';
           font-style: normal;
           font-weight: 900;
           src: url(${WOFF2Black}) format('woff2'),
                url(${WOFFBlack}) format('woff'),
                url(${OTFBlack}) format('opentype');
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
          cursor: 'pointer',
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
    },
  }
});

export default mainTheme;