import { createTheme } from "@mui/material";

export const theme = createTheme({
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
        },
        error: {
            main: "#751B1B"
        },
        success: {
            main: "#204A1B"
        }
    },
});