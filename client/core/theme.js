import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiTableCell: {
          root: {  //This can be referred from Material UI API documentation. 
              padding: '2px 2px',
              //backgroundColor: "#eaeaea",
          },
      },
  },
    overrides: {
      MuiRadio: {
        root: {
          padding: 14
        }
      }
    },
    palette: {
      type: "main",
    primary: {
      light: '#7986cb',
      main: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#fffde7',
    //  light: '#8e8e8e',
    //  main: '#616161',
    //  dark: '#373737',
    //  contrastText: '#fffde7',
    },
    secondary: {
        light: "#64b5f6",
        main: "#2196f3",
        dark: "#1976d2",
        contrastText: "#fff",
      //light: '#ffad42',
      //main: '#f57c00',
      //dark: '#bb4d00',
      //contrastText: '#fffde7',
    },

    error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff"
    },
    warning: {
        light: "#ffb74d",
        main: "#ff9800",
        dark:  "#f57c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: { 
        light: "#64b5f6",
        main: "#2196f3",
        dark: "#1976d2",
        contrastText: "#fff",
    },
    success: {
        light: "#81c784",
        main: "#4caf50",
        dark: "#388e3c",
    },
      openTitle: '#455a64',
      protectedTitle: '#f57c00',
      type: 'light'
    }
  })

  export default theme