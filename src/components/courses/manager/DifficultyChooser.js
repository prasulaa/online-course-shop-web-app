import { FormControl, FormLabel, Radio, FormControlLabel, RadioGroup } from "@mui/material";

export default function DifficultyChooser(props) {
    return (
        <FormControl 
            sx={{ width: '100%' }} 
            disabled={props.disabled}
        >
            <FormLabel>Difficulty</FormLabel>
            <RadioGroup
                row
                onChange={props.handleChange}
                value={props.value}
            >
                <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Easy"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Medium"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Hard"
                    labelPlacement="bottom"
                />
            </RadioGroup>
        </FormControl>
    );
}