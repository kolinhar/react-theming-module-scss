import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import variablesModuleScss from './variables.module.scss';
import variablesScss from './variables.scss';
import variablesModuleCss from './variables.module.css';
import variablesCss from './variables.css';
const variablesModuleScssR = require('./variables.module.scss');
const variablesScssR = require('./variables.scss');
const variablesModuleCssR = require('./variables.module.css');
const variablesCssR = require('./variables.css');

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const JsonFormat = (key: string, val: any) => {
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

const findMyVar = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName);
};

const isGoodValue = (val) => {
  return val !== '' && JSON.stringify(val) !== '{}' ? (
    <span className="green">OK</span>
  ) : (
    <span className="red">KO</span>
  );
};

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [forceWhite, setForceWhite] = useState<'dark' | ''>('');

  // console.log("findMyVar('--my-color')", findMyVar('--my-color'));
  // console.log("findMyVar('--my-module-color')", findMyVar('--my-module-color'));
  // console.log('findMyVar("myScssVar")', findMyVar('myScssVar'));

  const changeToWhite = React.useCallback(() => {
    //just add/remove a class to parent element
    setForceWhite((oldVal) => {
      if (oldVal === 'dark') {
        return '';
      }
      return 'dark';
    });
  }, []);

  return (
    <main className={forceWhite}>
      <Box
        sx={{
          display: 'flex',
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
          onClick={() => {
            colorMode.toggleColorMode();
            changeToWhite();
          }}
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
        <b>
          {theme.palette.primary.main === variablesModuleScss.primaryMainDark
            ? 'true'
            : 'false'}
        </b>
        <br />
        theme.palette.primary.main === variables.primaryMainLight :
        <b>
          {theme.palette.primary.main === variablesModuleScss.primaryMainLight
            ? 'true'
            : 'false'}
        </b>
      </p>
      <pre>{JSON.stringify(theme.palette, JsonFormat, '   ')}</pre>
      <section className={variablesModuleScss['flex-line']}>
        <div
          className={variablesModuleScss.square}
          style={{ borderColor: theme.palette.primary.main }}
        >
          primary main
        </div>
        <div
          className={variablesModuleScss.square}
          style={{ borderColor: theme.palette.primary.light }}
        >
          primary light
        </div>
        <div
          className={variablesModuleScss.square}
          style={{ borderColor: theme.palette.primary.dark }}
        >
          primary dark
        </div>
        <div
          className={variablesModuleScss.square}
          style={{ borderColor: theme.palette.secondary.main }}
        >
          secondary main
        </div>
        <div
          className={variablesModuleScss.square}
          style={{ borderColor: theme.palette.secondary.light }}
        >
          secondary light
        </div>
        <div
          className={variablesModuleScss.square}
          style={{ borderColor: theme.palette.secondary.dark }}
        >
          secondary dark
        </div>
      </section>
      <hr />
      <article>
        <table>
          <caption>
            <h1>Importation depuis une feuille styles</h1>
          </caption>
          <thead>
            <tr>
              <th></th>
              <th>variables.css</th>
              <th>variables.scss</th>
              <th>variables.module.css</th>
              <th>variables.module.scss</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowSpan={2}>import</th>
              <th>{isGoodValue(variablesCss)}</th>
              <th>{isGoodValue(variablesScss)}</th>
              <th>{isGoodValue(variablesModuleCss)}</th>
              <th>{isGoodValue(variablesModuleScss)}</th>
            </tr>
            <tr>
              <td>{JSON.stringify(variablesCss)}</td>
              <td>{JSON.stringify(variablesScss)}</td>
              <td>{JSON.stringify(variablesModuleCss)}</td>
              <td>{variablesModuleScss.primaryLightDark}</td>
            </tr>
            <tr>
              <th rowSpan={2}>require</th>
              <th>{isGoodValue(variablesCssR)}</th>
              <th>{isGoodValue(variablesScssR)}</th>
              <th>{isGoodValue(variablesModuleCssR)}</th>
              <th>{isGoodValue(variablesModuleScssR)}</th>
            </tr>
            <tr>
              <td>{JSON.stringify(variablesCssR)}</td>
              <td>{JSON.stringify(variablesScssR)}</td>
              <td>{JSON.stringify(variablesModuleCssR)}</td>
              <td>{variablesModuleScssR.primaryLightDark}</td>
            </tr>
            <tr className="facultatif">
              <th rowSpan={2}>DOM</th>
              <th>{isGoodValue(findMyVar('--my-color'))}</th>
              <th>{isGoodValue(findMyVar('myScssVar'))}</th>
              <th>{isGoodValue(findMyVar('--my-module-color'))}</th>
              <th>{isGoodValue(findMyVar('primaryLightDark'))}</th>
            </tr>
            <tr className="facultatif">
              <td>{findMyVar('--my-color')}</td>
              <td>{findMyVar('myScssVar')}</td>
              <td>{findMyVar('--my-module-color')}</td>
              <td>{findMyVar('primaryLightDark')}</td>
            </tr>
          </tbody>
        </table>
      </article>
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
    } = variablesModuleScss;
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
