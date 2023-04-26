import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#dd7404",
    },
    secondary: {
      main: "#000000",
    },
    info: {
      main: "#fff",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "black",
          height: 70,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        h6: {
          fontSize: 30,
          fontWeight: "bolder",
          color: "white",
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "medium",
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          backgroundColor: "#dd704",
          borderRadius: "1px",
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },
  },
});
