import { Delete, Edit, FileUpload } from "@mui/icons-material";
import { Alert, Button, Grid, Paper, responsiveFontSizes, TextField, ToggleButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DifficultyChooser from "./DifficultyChooser";
import CategoriesDialog from "./CategoriesDialog";
import CourseScopes from "./CourseScopes";
import SuccessDialog from "./dialog/SuccessDialog";
import AlerDialog from "./dialog/AlertDialog";

export default function CourseManager(props) {
    const { id } = useParams();
    const [state, setState] = useState({
        successDialogOpen: false,
        deleteDialogOpen: false,
        edit: false,
        errorMsg: '',
        openCategoryDialog: false,
        categories: [],
        title: '',
        thumbnail: '',
        price: 0.0,
        checkedCategories: [],
        difficulty: null,
        scopes: [],
        description: ''
    });
    const navigate = useNavigate();
    const scopeRef = React.createRef();

    const handleUpdateCourse = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                handleOpenSuccessDialog();
            } else if (xhr.status === 400) {
                var response = JSON.parse(xhr.responseText);
                setState({
                    ...state,
                    errorMsg: response.message
                })
            } else {
                setState({
                    ...state,
                    errorMsg: "Unexpected error occurred"
                })
            }
        });
        xhr.open('PUT', "/courses/" + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            title: state.title,
            thumbnail: state.thumbnail,
            price: state.price,
            categories: state.checkedCategories,
            dofficulty: state.difficulty,
            scopes: state.scopes,
            description: state.description
        }));
    }

    const convertCategories = (checkedCategories, categories) => {
        var allcategories = [];
        categories.forEach(category => {
            allcategories.push(category);
            allcategories.push(...category.subcategories);
        })

        var converted = [];
        checkedCategories.forEach(category => {
            var convertedCategory = allcategories.find(c => c.name === category);
            converted.push(convertedCategory.id)
        })
        return converted;
    }

    const convertDifficulty = (difficulty) => {
        if (difficulty === "EASY") {
            return 0;
        } else if (difficulty === "MEDIUM") {
            return 1;
        }
        else if (difficulty === "HARD") {
            return 2;
        } else {
            return -1;
        }
    }

    const getCourseDetails = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setState(prevState => {
                    return {
                        ...prevState,
                        title: response.title,
                        thumbnail: response.thumbnail,
                        price: response.price,
                        checkedCategories: convertCategories(response.categories, prevState.categories),
                        difficulty: convertDifficulty(response.difficulty),
                        scopes: response.scopes,
                        description: response.description
                    }
                });
            }
        });
        xhr.open('GET', "/courses/" + id + "/details");
        xhr.send();
    }

    const getCategories = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setState(prevState => {
                    return {
                        ...prevState,
                        categories: response
                    }
                });
            }
        });
        xhr.open('GET', "/categories");
        xhr.send();
    }

    const initState = () => {
        getCategories();
        getCourseDetails();
    }

    const handleTitle = (e) => {
        setState({
            ...state,
            title: e.target.value
        });
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

    const handleDescription = (e) => {
        setState({
            ...state,
            description: e.target.value
        });
    }

    const handleOpenSuccessDialog = () => {
        setState({
            ...state,
            successDialogOpen: true
        })
    }

    const handleCloseSuccessDialog = () => {
        setState({
            ...state,
            successDialogOpen: false,
            edit: false
        })
    }

    const handleOpenDeleteDialog = () => {
        setState({
            ...state,
            deleteDialogOpen: true
        })
    }

    const handleCloseDeleteDialog = () => {
        setState({
            ...state,
            deleteDialogOpen: false,
            edit: false
        })
    }

    const handleDeleteCourse = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 204) {
                navigate("/released")
            } else {
                setState({
                    ...state,
                    errorMsg: "Unexpected error occurred",
                    deleteDialogOpen: false
                })
            }
        });
        xhr.open('DELETE', "/courses/" + id);
        xhr.send();
    }

    useEffect(initState, []);

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
                        <Grid
                            item
                            container
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
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
                                    Edit course
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid
                                    container
                                    direction='row'
                                    alignItems='center'
                                    spacing={2}
                                >
                                    <Grid item>
                                        <ToggleButton
                                            value="check"
                                            selected={state.edit}
                                            onChange={() => {
                                                setState({ ...state, edit: !state.edit })
                                            }}
                                            sx={{ height: 40, width: 80 }}
                                        >
                                            <Edit />
                                        </ToggleButton>
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            to={"/courses/" + id + "/edit/content"} 
                                            style={{textDecoration: 'none'}}
                                        >
                                        <Button
                                            variant='contained'
                                            sx={{ height: 40, width: 80 }}
                                        >
                                            Content
                                        </Button>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            color="error"
                                            sx={{ height: 40, width: 80 }}
                                            onClick={handleOpenDeleteDialog}
                                            disabled={!state.edit}
                                        >
                                            Delete
                                        </Button>
                                        <AlerDialog 
                                            open={state.deleteDialogOpen}
                                            onClose={handleCloseDeleteDialog}
                                            onClickOK={handleDeleteCourse}
                                            title={"Warning!"}
                                            content={"Are you sure? You will not be able to undo this change"}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Title"
                                value={state.title}
                                disabled={!state.edit}
                                onChange={handleTitle}
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
                                disabled={!state.edit}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: { min: 0 }
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <DifficultyChooser
                                value={state.difficulty}
                                disabled={!state.edit}
                                handleChange={handleChangeDifficulty}
                            />
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
                                    disabled={!state.edit}
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
                                    disabled={!state.edit}
                                >
                                    Upload thumbnail
                                    <input onChange={handleThumbnailUpload} hidden accept="image/*" type="file" />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <CourseScopes
                                scopes={state.scopes}
                                handleAddScope={handleAddScope}
                                handleDeleteScope={handleDeleteScope}
                                disabled={!state.edit}
                                scopeRef={scopeRef}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Description"
                                multiline
                                value={state.description}
                                disabled={!state.edit}
                                onChange={handleDescription}
                                sx={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleUpdateCourse}
                                disabled={!state.edit}
                                variant='contained'
                                sx={{ width: '100%' }}
                            >
                                Update
                            </Button>
                            <SuccessDialog 
                                open={state.successDialogOpen}
                                onClose={handleCloseSuccessDialog}
                                title={"Course has been updated successfully"}
                            />
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