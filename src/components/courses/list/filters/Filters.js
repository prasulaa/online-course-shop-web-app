import { Search } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CategoryChooser from "./CategoryChooser";
import Difficulties from "./Difficulties";
import PriceFilter from "./PriceFilter";
import SortSelect from "./SortSelect";

export default function Filters(props) {
    const [filters, setFilters] = useState(props.filters);

    const handleTitle = (e) => {
        setFilters({ ...filters, title: e.target.value });
    }

    const handleSort = (e) => {
        setFilters({...filters, sort: e.target.value});
    }

    const handleCategory = (category) => () => {
        const oldSize = filters.categories.length;
        const newCategories = filters.categories.filter(c => c !== category.id);
        const newSize = newCategories.length;

        if (oldSize === newSize) {
            newCategories.push(category.id);
        }

        setFilters({ ...filters, categories: newCategories });
    }

    const handleDifficulty = (dif) => () => {
        const oldSize = filters.difficulties.length;
        const newDifficulties = filters.difficulties.filter(c => c !== dif.id);
        const newSize = newDifficulties.length;

        if (oldSize === newSize) {
            newDifficulties.push(dif.id);
        }

        setFilters({ ...filters, difficulties: newDifficulties });
    }

    const handlePriceMin = (e) => {
        setFilters({ ...filters, priceMin: e.target.value })
    }

    const handlePriceMax = (e) => {
        setFilters({ ...filters, priceMax: e.target.value })
    }

    return (
        <Paper sx={{ p: 1, m: 1 }} elevation={5}>
            <Grid
                container
                direction="column"
                sx={{ width: "100%" }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <Search sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
                    <TextField sx={{width: '100%'}} label="Title" variant="standard" onChange={handleTitle} value={filters.title} />
                </Box>

                <Divider sx={{ mt: 1, mb: 1 }} />

                <SortSelect 
                    value={filters.sort}
                    handleSort={handleSort} 
                />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <Typography variant="h5">
                    Categories
                </Typography>
                <CategoryChooser
                    checked={filters.categories}
                    categories={props.categories}
                    handleCategory={handleCategory}
                />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <Typography variant="h5">
                    Difficulties
                </Typography>
                <Difficulties 
                    checked={filters.difficulties}
                    handleDifficulty={handleDifficulty}
                />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <PriceFilter
                    priceMin={filters.priceMin}
                    priceMax={filters.priceMax}
                    handlePriceMin={handlePriceMin}
                    handlePriceMax={handlePriceMax}
                />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <Button
                    variant="contained"
                    onClick={props.handleFilters(filters)}
                >
                    Search
                </Button>

            </Grid>
        </Paper>
    );
}