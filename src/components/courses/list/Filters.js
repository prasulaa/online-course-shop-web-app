import { Search } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, Grid, List, ListItem, Paper, TextField, Typography } from "@mui/material";

export default function Filters(props) {
    return (
        <Paper sx={{ ml: 1, p: 1 }}>
            <Grid
                container
                direction="column"
                sx={{ width: 300 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField label="Title" variant="standard" />
                </Box>

                <Divider sx={{ mt: 1, mb: 1 }} />

                <Typography variant="h5">
                    Categories
                </Typography>
                <Categories
                    categories={props.categories}
                    handleCategory={props.handleCategory}
                />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <Typography variant="h5">
                    Difficulties
                </Typography>
                <Difficulties handleDifficulty={props.handleDifficulty} />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <PriceFilter />

                <Divider sx={{ mt: 1, mb: 1 }} />

                <Button variant="contained">Search</Button>

            </Grid>
        </Paper>
    );
}

function Categories(props) {
    return (
        <List sx={{ width: '100%' }}>
            {props.categories.map((category) => {
                return (
                    <Box key={category.id}>
                        <ListItem
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    onChange={props.handleCategory(category)}
                                />
                            }
                        >
                            <Typography noWrap>
                                {category.name}
                            </Typography>
                        </ListItem>
                        {category.subcategories.length === 0 ? <></> :
                            <Box sx={{ ml: 2 }}>
                                <Categories
                                    categories={category.subcategories}
                                    handleCategory={props.handleCategory}
                                />
                            </Box>}
                    </Box>
                )
            })}
        </List>
    );
}

function Difficulties(props) {
    return (
        <List sx={{ width: '100%' }}>
            {[{ id: 0, name: "Easy" }, { id: 1, name: "Medium" }, { id: 2, name: "Hard" }].map((dif) => {
                return (
                    <ListItem
                        key={dif.id}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={props.handleDifficulty(dif)}
                            />
                        }>
                        <Typography noWrap>
                            {dif.name}
                        </Typography>
                    </ListItem>
                )
            })}
        </List>
    );
}

function PriceFilter(props) {
    return (
        <Box>
            <TextField
                id="outlined-number"
                label="Price min"
                type="number"
                sx = {{ m: 1 }}
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
                sx = {{ m: 1 }}
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