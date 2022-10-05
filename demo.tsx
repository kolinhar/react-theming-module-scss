import * as React from 'react';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import variables from './variables.module.scss';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const JsonFormat = (key, val) => {
  if (
    [
      '',
      'mode',
      'primary',
      'secondary',
      'light',
      'dark',
      'main',
      'contrastText',
    ].indexOf(key) !== -1
  ) {
    return val;
  }
};

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        {theme.palette.mode} mode
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <p>
        theme.palette.primary.main === variables.primaryMainDark :
        {theme.palette.primary.main === variables.primaryMainDark
          ? 'true'
          : 'false'}
        <br />
        theme.palette.primary.main === variables.primaryMainLight :
        {theme.palette.primary.main === variables.primaryMainLight
          ? 'true'
          : 'false'}
      </p>
      <pre>{JSON.stringify(theme.palette, JsonFormat, '   ')}</pre>
    </main>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => {
    const {
      primaryLightDark,
      primaryMainDark,
      primaryDarkDark,
      primaryContrastTextDark,
      /*light theme*/
      primaryLightLight,
      primaryMainLight,
      primaryDarkLight,
      primaryContrastTextLight,
      /* SECONDARY */
      /*dark theme*/
      secondaryLightDark,
      secondaryMainDark,
      secondaryDarkDark,
      secondaryContrastTextDark,
      /*light theme*/
      secondaryLightLight,
      secondaryMainLight,
      secondaryDarkLight,
      secondaryContrastTextLight,
    } = variables;
    return createTheme({
      palette: {
        mode,
        primary: {
          light: mode === 'dark' ? primaryLightDark : primaryLightLight,
          main: mode === 'dark' ? primaryMainDark : primaryMainLight,
          dark: mode === 'dark' ? primaryDarkDark : primaryDarkLight,
          contrastText:
            mode === 'dark'
              ? primaryContrastTextDark
              : primaryContrastTextLight,
        },
        secondary: {
          light: mode === 'dark' ? secondaryLightDark : secondaryLightLight,
          main: mode === 'dark' ? secondaryMainDark : secondaryMainLight,
          dark: mode === 'dark' ? secondaryDarkDark : secondaryDarkLight,
          contrastText:
            mode === 'dark'
              ? secondaryContrastTextDark
              : secondaryContrastTextLight,
        },
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
