import { Add, Check, Save } from "@mui/icons-material";
import { Alert, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import MDEditor, { commands } from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function LessonManager(props) {
    const initialState = {
        lesson: {
            id: null,
            name: "",
            data: null
        },
        errorMsg: "",
        successMsg: ""
    };
    const { id } = useParams();
    const [state, setState] = useState(initialState);

    const getLesson = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                setState((prevState) => ({
                    ...prevState,
                    lesson: response
                }))
            }
        });
        xhr.open('GET', "/courses/" + id + "/sections/" + props.sectionId + "/lessons/" + props.lessonId);
        xhr.send();
    }

    const handleSaveLessonData = (data) => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "Lesson data successfully saved",
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
        xhr.open('PUT', "/courses/" + id + "/sections/" + props.sectionId + "/lessons/" + props.lessonId);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            data: data
        }));
    }

    const handleSaveLessonName = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                props.onLessonNameChange();
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "Lesson title successfully saved",
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
        xhr.open('PUT', "/courses/" + id + "/sections/" + props.sectionId + "/lessons/" + props.lessonId);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            name: state.lesson.name
        }));
    }

    const handleCloseSuccessAlert = () => {
        setState({
            ...state,
            successMsg: ""
        })
    }

    const handleCloseErrorAlert = () => {
        setState({
            ...state,
            errorMsg: ""
        })
    }

    const handleChangeLessonData = (value) => {
        setState({
            ...state,
            lesson: {
                ...state.lesson,
                data: value
            }
        })
    }

    const handleChangeLessonName = (e) => {
        setState({
            ...state,
            lesson: {
                ...state.lesson,
                name: e.target.value
            }
        })
    }

    const refreshComponent = () => {
        if (state.lesson.id !== props.lessonId) {
            setState(initialState);
            getLesson();
        }
    }

    useEffect(refreshComponent, [props]);

    const save = {
        name: "save",
        keyCommand: "save",
        buttonProps: {},
        icon: (
            <svg height="12" width="35">
                <text x="2" y="11" fill="LightGray">Save</text>
            </svg>
        ),
        execute: (state, api) => {
            handleSaveLessonData(state.text);
        }
    }

    return (
        <Grid
            container
            direction="column"
            spacing={1}
        >
            <Grid item>
                <Box sx={{ m: 0 }}>
                    <FormControl
                        variant='outlined'
                        sx={{ width: '100%' }}
                    >
                        <InputLabel>Lesson name</InputLabel>
                        <OutlinedInput
                            type='text'
                            label='Lesson name'
                            value={state.lesson.name}
                            onChange={handleChangeLessonName}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSaveLessonName}>
                                        <Check />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
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

            {state.lesson.data === null ?
                <></> :
                <Grid item>
                    <MDEditor
                        value={state.lesson.data}
                        onChange={handleChangeLessonData}
                        extraCommands={[commands.codeEdit, commands.codeLive, commands.codePreview, commands.divider, commands.fullscreen, commands.divider, save]}
                    />
                </Grid>
            }
        </Grid>

    );
}