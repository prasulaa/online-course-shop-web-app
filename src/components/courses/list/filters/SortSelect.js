import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SortSelect(props) {
    return (
        <FormControl>
            <InputLabel>Sort</InputLabel>
            <Select
                value={props.value}
                label="Sort"
                onChange={props.handleSort}
            >
                <MenuItem value={"ASC"}>Price ascending</MenuItem>
                <MenuItem value={"DESC"}>Price descending</MenuItem>
            </Select>
        </FormControl>
    );
}