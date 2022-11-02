import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../details/Content";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw';

function Image(props) {
    return <img {...props} style={{maxWidth: '100%'}} />
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
        data: '# TEST '
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
            >
                <Content
                    sections={course.sections}
                    handleClick={handleChangeLesson}
                />
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
                        components={{img: Image}}
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