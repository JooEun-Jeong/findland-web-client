import TitleFont from '@assets/fonts/HakgyoansimSamulhamR.ttf';
import ContentBoldFont from '@assets/fonts/KingSejongInstitute-Bold.ttf';
import ContentFont from '@assets/fonts/KingSejongInstitute-Regular.ttf';

export const themeSelector = (mode: string) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: '0',
          position: 'relative',
          width: '100%',
          height: '100%',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        img: {
          userSelect: 'none',
        },
        '#root': {
          margin: '0',
          width: '100%',
          height: '100%',
          // minWidth: 1920,
        },
        '.hide': {
          visibility: 'hidden',
          opacity: 0,
          display: 'none !important',
        },
        '*:focus': {
          outline: 'none',
          border: 'none',
        },
        '@font-face': {
          fontFamily: 'ConFont',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '1.6rem',
          src: `url(${ContentFont}) format('truetype')`,
        },
        h3: {
          fontFamily: 'ConFont',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '1.8rem',
          src: `url(${TitleFont}) format('truetype')`,
        },
        fallbacks: [
          {
            '@font-face': {
              fontFamily: 'ConFont',
              fontStyle: 'normal',
              fontWeight: 'bold',
              src: `url(${ContentBoldFont}) format('truetype')`,
            },
          },
        ],
      },
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['ConFont'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
