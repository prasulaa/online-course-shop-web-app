import { Check, Delete } from "@mui/icons-material";
import { Alert, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemText, OutlinedInput, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertDialog from "../dialog/AlertDialog.js";

export default function SectionManager(props) {
    const initialState = {
        section: {
            id: null,
            name: "",
            lessons: []
        },
        errorMsg: "",
        successMsg: "",
        openDeleteSectionDialog: false,
        openDeleteLessonDialog: false,
        deleteLessonId: null
    }
    const { id } = useParams();
    const [state, setState] = useState(initialState);
    const addLessonRef = createRef();

    const getSection = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                setState((prevState) => ({
                    ...prevState,
                    section: response
                }))
            }
        });
        xhr.open('GET', "/courses/" + id + "/sections/" + props.sectionId);
        xhr.send();
    }

    const handleSaveSectionName = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                props.onContentChange();
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "Section title successfully saved",
                    errorMsg: ""
                }))
            } else if (xhr.status === 400) {
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: response.message,
                    successMsg: ""
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: "Unexpected error occurred during saving",
                    successMsg: ""
                }))
            }
        });
        xhr.open('PUT', "/courses/" + id + "/sections/" + props.sectionId);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            name: state.section.name
        }));
    }

    const handleDeleteSection = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 204) {
                props.onSectionDelete();
                props.onContentChange();
            } else if (xhr.status === 400) {
                handleCloseDeleteSectionDialog();
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: response.message,
                    successMsg: ""
                }))
            } else {
                handleCloseDeleteSectionDialog();
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: "Unexpected error occurred during deleting",
                    successMsg: ""
                }))
            }
        });
        xhr.open('DELETE', "/courses/" + id + "/sections/" + props.sectionId);
        xhr.send();
    }

    const handleDeleteLesson = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 204) {
                props.onContentChange();
                getSection();
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "Lesson successfully deleted"
                }))
            } else if (xhr.status === 400) {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: response.message,
                    successMsg: ""
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: "Unexpected error occurred during deleting",
                    successMsg: ""
                }))
            }
            handleCloseDeleteLessonDialog();
        });
        xhr.open('DELETE', "/courses/" + id + "/sections/" + props.sectionId + "/lessons/" + state.deleteLessonId);
        xhr.send();
    }

    const handleAddLesson = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 201) {
                props.onContentChange();
                getSection();
                addLessonRef.current.value = "";
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "Lesson successfully created"
                }))
            } else if (xhr.status === 400) {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: response.message,
                    successMsg: ""
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: "Unexpected error occurred during deleting",
                    successMsg: ""
                }))
            }
        });
        xhr.open('POST', "/courses/" + id + "/sections/" + props.sectionId + "/lessons");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            name: addLessonRef.current.value,
            data: " "
        }));
    }

    const handleChangeSectionName = (e) => {
        setState((prevState) => ({
            ...prevState,
            section: {
                ...state.section,
                name: e.target.value
            }
        }))
    }

    const handleCloseSuccessAlert = () => {
        setState((prevState) => ({
            ...prevState,
            successMsg: ""
        }))
    }

    const handleCloseErrorAlert = () => {
        setState((prevState) => ({
            ...prevState,
            errorMsg: ""
        }))
    }

    const handleOpenDeleteSectionDialog = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteSectionDialog: true
        }))
    }

    const handleCloseDeleteSectionDialog = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteSectionDialog: false
        }))
    }

    const handleOpenDeleteLessonDialog = (id) => () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteLessonDialog: true,
            deleteLessonId: id
        }))
    }

    const handleCloseDeleteLessonDialog = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteLessonDialog: false,
            deleteLessonId: null
        }))
    }

    const refreshComponent = () => {
        if (state.section.id !== props.sectionId) {
            setState(initialState);
            getSection();
        }
    }

    useEffect(refreshComponent, [props]);

    return (
        <Paper
            variant='outlined'
            square
            sx={{ p: 1 }}
        >
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='stretch'
                spacing={1}
            >
                <Grid item>
                    <Grid
                        container
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Grid item>
                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                Section manager
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color="error"
                                onClick={handleOpenDeleteSectionDialog}
                                sx={{ height: 40, width: 80 }}
                            >
                                Delete
                            </Button>
                            <AlertDialog 
                                open={state.openDeleteSectionDialog}
                                onClose={handleCloseDeleteSectionDialog}
                                onClickOK={handleDeleteSection}
                                title={"Warning!"}
                                content={"Are you sure? You will not be able to undo this change"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {state.errorMsg === "" ? <></> :
                    <Grid item>
                        <Alert
                            variant="outlined"
                            severity="error"
                            onClose={handleCloseErrorAlert}
                        >
                            {state.errorMsg}
                        </Alert>
                    </Grid>
                }
                {state.successMsg === "" ? <></> :
                    <Grid item>
                        <Alert
                            variant="outlined"
                            severity="success"
                            onClose={handleCloseSuccessAlert}
                        >
                            {state.successMsg}
                        </Alert>
                    </Grid>
                }
                <Grid item>
                    <Box>
                        <FormControl
                            variant='outlined'
                            sx={{ width: '100%', mt: 1 }}
                        >
                            <InputLabel>Section name</InputLabel>
                            <OutlinedInput
                                type='text'
                                label='Section name'
                                value={state.section.name}
                                onChange={handleChangeSectionName}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSaveSectionName}>
                                            <Check />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                    <Typography variant='h6' sx={{ mt: 1 }}>
                        Lessons
                    </Typography>
                    <List dense={true}>
                        {state.section.lessons.map(lesson => (
                            <ListItem
                                key={lesson.id}
                                secondaryAction={
                                    <IconButton edge="end" onClick={handleOpenDeleteLessonDialog(lesson.id)}>
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemText 
                                    primary={
                                        <Typography noWrap>{lesson.name}</Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <AlertDialog 
                                open={state.openDeleteLessonDialog}
                                onClose={handleCloseDeleteLessonDialog}
                                onClickOK={handleDeleteLesson}
                                title={"Warning!"}
                                content={"Are you sure? You will not be able to undo this change"}
                            />
                </Grid>
                <Grid item>
                    <Box>
                        <FormControl
                            variant='outlined'
                            sx={{ width: '100%', mt: 1 }}
                        >
                            <InputLabel>Add new lesson</InputLabel>
                            <OutlinedInput
                                inputRef={addLessonRef}
                                type='text'
                                label='Add new lesson'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleAddLesson}>
                                            <Check />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}