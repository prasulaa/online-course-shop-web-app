import { Box, Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Content from "../details/Content";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';
import { PermMedia } from "@mui/icons-material";

function Image(props) {
    return (
        <img 
            {...props} 
            style={{ maxWidth: '100%' }} 
            alt='Donwload failed'
        />
    );
}

export default function CourseViewer(props) {
    const { id } = useParams();
    const [course, setCourse] = useState({
        id: id,
        title: '',
        thumbnail: '',
        price: '',
        categories: [],
        difficulty: '',
        scopes: [],
        description: '',
        sections: []
    });
    const [viewedLesson, setViewedLesson] = useState({
        id: null,
        name: '',
        data: ''
    });

    const getCourseDetails = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCourse(response);
            }
        });
        xhr.open('GET', "/courses/" + id + "/details");
        xhr.send();
    }

    const handleChangeLesson = (sectionId, lessonId) => () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setViewedLesson(response);
            }
        });
        xhr.open('GET', "/courses/" + id + "/sections/" + sectionId + "/lessons/" + lessonId);
        xhr.send();
    }

    useEffect(getCourseDetails, []);

    return (
        <Grid
            container
            direction={{ xs: 'column', lg: 'row' }}
        >
            <Grid
                item
                sm={2}
                container
                direction='column'
            >
                <Content
                    sections={course.sections}
                    handleClick={handleChangeLesson}
                />
                <Box sx={{ m: 1 }}>
                    <Link
                        to={'/courses/' + id + '/files'}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            variant='outlined'
                            sx={{ p: 1, width: '100%' }}
                            startIcon={<PermMedia />}
                        >
                            Course files
                        </Button>
                    </Link>
                </Box>
            </Grid>
            <Grid
                item
                sm={8}
            >
                <Paper
                    variant='outlined'
                    square
                    sx={{ m: 1, p: 1 }}
                >
                    <ReactMarkdown
                        children={viewedLesson.data}
                        components={{ img: Image }}
                        rehypePlugins={[rehypeRaw]}
                    />
                </Paper>
            </Grid>
            <Grid
                item
                sm={2}
            >
            </Grid>
        </Grid>
    );
}