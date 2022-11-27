import { Add } from "@mui/icons-material";
import { Alert, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../details/Content";
import LessonManager from "./LessonManager";
import SectionManager from "./SectionManager";

export default function ContentManager(props) {
    const { id } = useParams();
    const [state, setState] = useState({
        course: {
            id: id,
            title: '',
            thumbnail: '',
            price: '',
            categories: [],
            difficulty: '',
            scopes: [],
            description: '',
            sections: []
        },
        sectionId: null,
        lessonId: null,
        errorMsg: ""
    });
    const sectionNameRef = React.createRef();

    const getCourseDetails = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({
                    ...prevState,
                    course: response
                }))
            }
        });
        xhr.open('GET', "/courses/" + id + "/details");
        xhr.send();
    }

    const handleContentClick = (sid, lid) => () => {
        setState((prevState) => ({
            ...prevState,
            sectionId: sid,
            lessonId: lid
        }))
    }

    const handleAddSection = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 201) {
                state.course.sections.push(response);
                setState({
                    ...state,
                    course: {
                        ...state.course,
                        sections: state.course.sections
                    },
                    errorMsg: ""
                })
            } else if (xhr.status === 400) {
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
        xhr.open('POST', "/courses/" + id + "/sections");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            name: sectionNameRef.current.value
        }));
    }

    useEffect(getCourseDetails, []);

    return (
        <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            sx={{ width: '100vw' }}
        >
            <Grid item md={3} lg={2} zeroMinWidth sx={{ width: '100%' }}>
                <Content
                    sections={state.course.sections}
                    handleClick={handleContentClick}
                />
                <Box sx={{ m: 1 }}>
                    <FormControl
                        variant='outlined'
                        sx={{ width: '100%' }}
                        disabled={props.disabled}
                    >
                        <InputLabel>Add section</InputLabel>
                        <OutlinedInput
                            inputRef={sectionNameRef}
                            type='text'
                            label='Add scope'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleAddSection}>
                                        <Add />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                {state.errorMsg === "" ? <></> :
                    <Alert
                        variant="outlined"
                        severity="error"
                        sx={{ m: 1 }}
                    >
                        {state.errorMsg}
                    </Alert>
                }
            </Grid>
            <Grid item md={9} lg={10} zeroMinWidth sx={{ width: '100%' }}>
                <Box sx={{ m: 1 }}>
                    {state.lessonId === null
                        ? state.sectionId === null
                            ? <></>
                            : <SectionManager 
                                sectionId={state.sectionId}
                                onContentChange={getCourseDetails}
                                onSectionDelete={handleContentClick(null, null)}
                            />
                        : <LessonManager
                            sectionId={state.sectionId}
                            lessonId={state.lessonId}
                            onLessonNameChange={getCourseDetails}
                        />
                    }
                </Box>
            </Grid>
        </Grid>
    );
}