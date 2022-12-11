import { Box, TextField } from "@mui/material";

export default function PriceFilter(props) {
    return (
        <Box>
            <TextField
                id="outlined-number"
                label="Price min"
                type="number"
                sx={{ m: 1 }}
                onChange={props.handlePriceMin}
                value={props.priceMin}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { min: 0 }
                }}
            />
            <TextField
                id="outlined-number"
                label="Price max"
                type="number"
                sx={{ m: 1 }}
                onChange={props.handlePriceMax}
                value={props.priceMax}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    inputProps: { min: 0 }
                }}
            />
        </Box>
    );
}