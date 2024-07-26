// themeSelector.ts
import TitleFont from '@assets/fonts/HakgyoansimSamulhamR.ttf';
import ContentBoldFont from '@assets/fonts/KingSejongInstitute-Bold.ttf';
import ContentFont from '@assets/fonts/KingSejongInstitute-Regular.ttf';

export const themeSelector = (mode: string) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '#root': {
          margin: '0',
          width: '100%',
          height: 'calc(var(--vh, 1vh) * 100)', // Use the --vh variable
        },
        html: {
          margin: '0',
          position: 'relative',
          width: '100%',
          height: '100%', // Ensure html takes full height
        },
        body: {
          margin: '0',
          width: '100%',
          height: '100%', // Ensure body takes full height
          minHeight: 'calc(var(--vh, 1vh) * 100)', // Use the --vh variable
          // touchAction: 'none',
          // overflow: 'hidden',
        },
        img: {
          userSelect: 'none',
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
          fontSize: '1rem',
          src: `url(${ContentFont}) format('truetype')`,
        },
        h3: {
          fontFamily: 'ConFont',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '1rem',
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
