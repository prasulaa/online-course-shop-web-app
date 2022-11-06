import { Add, Delete, FileUpload } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemText, OutlinedInput, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryChooser from "../list/CategoryChooser";

export default function CreateCourse(props) {
    const [state, setState] = useState({
        errorMsg: '',
        checkedCategories: [],
        categories: [],
        openCategoryDialog: false,
        scopes: [],
        difficulty: null,
        price: 0.0,
        thumbnail: ''
    });
    const navigate = useNavigate();
    const titleRef = React.createRef();
    const descriptionRef = React.createRef();
    const scopeRef = React.createRef();

    const handleCreateCourse = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                navigate("/released");
            } else {
                var response = JSON.parse(xhr.responseText);
                setState({
                    ...state,
                    errorMsg: response.message
                })
            }
        });
        xhr.open('POST', "/courses");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            title: titleRef.current.value,
            thumbnail: state.thumbnail,
            price: state.price,
            categories: state.checkedCategories,
            difficulty: state.difficulty,
            scopes: state.scopes,
            description: descriptionRef.current.value
        }));
    }

    const getCategories = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setState({
                    ...state,
                    categories: response
                });
            }
        });
        xhr.open('GET', "/categories");
        xhr.send();
    }

    const handleChangeDifficulty = (e) => {
        setState({
            ...state,
            difficulty: e.target.value
        });
    }

    const handlePriceChange = (e) => {
        setState({
            ...state,
            price: e.target.value
        });
    }

    const handleAddScope = () => {
        if (scopeRef.current.value !== '') {
            state.scopes.push(scopeRef.current.value);
            scopeRef.current.value = '';
            setState({ ...state });
        }
    }

    const handleDeleteScope = (index) => () => {
        state.scopes.splice(index, 1);
        setState({ ...state });
    }

    const handleOpenCategoriesDialog = () => {
        setState({
            ...state,
            openCategoryDialog: true
        });
    }

    const handleCloseCategoriesDialog = () => {
        setState({
            ...state,
            openCategoryDialog: false
        });
    }

    const handleCategory = (category) => () => {
        const oldSize = state.checkedCategories.length;
        const newCategories = state.checkedCategories.filter(c => c !== category.id);
        const newSize = newCategories.length;

        if (oldSize === newSize) {
            newCategories.push(category.id);
        }

        setState({ ...state, checkedCategories: newCategories });
    }

    const handleThumbnailUpload = (e) => {
        var reader = new FileReader();
        var file = e.target.files[0];
    
        reader.onload = (upload) => {
            setState({
                ...state,
                thumbnail: upload.target.result
            });
        };
        reader.onerror = (error) => {
            setState({
                ...state,
                errorMsg: error
            });
        }

        reader.readAsDataURL(file);
    }


    useEffect(getCategories, []);

    console.log(state);

    return (
        <Grid
            container
        >
            <Grid item xs={0} sm={1} md={2} />
            <Grid item xs={12} sm={10} md={8} >
                <Paper sx={{ p: 2, m: 1 }} elevation={3}>
                    <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        alignItems='stretch'
                        spacing={2}
                    >
                        <Grid item>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                }}
                            >
                                Create course
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Title"
                                inputRef={titleRef}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Price"
                                type="number"
                                sx={{ width: '100%' }}
                                onChange={handlePriceChange}
                                value={state.price}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <DifficultyChooser handleChange={handleChangeDifficulty} />
                        </Grid>
                        <Grid 
                            item
                            container
                            direction='row'
                            justifyContent='space-evenly'
                            alignItems='center'
                            spacing={1}
                        >
                            <Grid item>
                            <Button
                                variant='outlined'
                                onClick={handleOpenCategoriesDialog}
                            >
                                Choose categories
                            </Button>
                            <CategoriesDialog
                                open={state.openCategoryDialog}
                                onClose={handleCloseCategoriesDialog}
                                checked={state.checkedCategories}
                                categories={state.categories}
                                handleCategory={handleCategory}
                            />
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='outlined'
                                    component='label'
                                    endIcon={<FileUpload />}
                                >
                                    Upload thumbnail
                                    <input onChange={handleThumbnailUpload} hidden accept="image/*" type="file" />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <CreateScopes
                                scopes={state.scopes}
                                handleAddScope={handleAddScope}
                                handleDeleteScope={handleDeleteScope}
                                scopeRef={scopeRef}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Description"
                                type="password"
                                multiline
                                inputRef={descriptionRef}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item>
                            <Button 
                                onClick={handleCreateCourse}
                                variant='contained' 
                                sx={{ width: '100%' }}
                            >
                                Create
                            </Button>
                        </Grid>
                        {state.errorMsg === "" ? <></> :
                            <Grid item>
                                <Alert variant="outlined" severity="error">
                                    {state.errorMsg}
                                </Alert>
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={0} sm={1} md={2} />
        </Grid>
    );
}

function CategoriesDialog(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>Choose course categories</DialogTitle>
            <DialogContent>
                <CategoryChooser
                    checked={props.checked}
                    categories={props.categories}
                    handleCategory={props.handleCategory}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={props.onClose}
                >
                    Choose
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function CreateScopes(props) {

    return (
        <Grid
            container
            direction='column'
        >
            <Grid item>
                <FormControl variant='outlined'>
                    <InputLabel>Add scope</InputLabel>
                    <OutlinedInput
                        inputRef={props.scopeRef}
                        type='text'
                        label='Add scope'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={props.handleAddScope}>
                                    <Add />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>

            <Grid item>
                <List dense={true}>
                    {props.scopes.map((scope, index) => (
                        <ListItem key={index}
                            secondaryAction={
                                <IconButton onClick={props.handleDeleteScope(index)}>
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText>
                                {scope}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

function DifficultyChooser(props) {
    return (
        <FormControl sx={{ width: '100%' }}>
            <FormLabel>Difficulty</FormLabel>
            <RadioGroup
                row
                onChange={props.handleChange}
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