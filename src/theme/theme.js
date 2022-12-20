import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#705DAC"
        },
        secondary: {
            main: "#5F5C69"
        },
        background: {
            default: "#23212A",
            paper: "#17161D",
            header: "#17161D"
        },
        text: {
            primary: "rgba(255,255,255,1)",
            secondary: "rgba(200,200,200,1)",
            header: "rgba(255,255,255,1)"
        },
        error: {
            main: "#751B1B"
        },
        success: {
            main: "#204A1B"
        }
    },
});

export const lightTheme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#364982"
        },
        secondary: {
            main: "#364982"
        },
        background: {
            default: "#F0F0F0",
            paper: "#F0F0F0",
            header: "#2A2D34"
        },
        text: {
            primary: "rgba(0,0,0,1)",
            secondary: "rgba(0,0,0,1)",
            header: "rgba(255,255,255,1)"
        },
        error: {
            main: "#AE2828"
        },
        success: {
            main: "#389130"
        }
    },
});