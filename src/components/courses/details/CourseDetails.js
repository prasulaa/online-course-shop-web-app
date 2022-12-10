import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "./Content";
import Description from "./Description";
import Header from "./Header";
import Scopes from "./Scopes";


export default function CourseDetails(props) {
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

    useEffect(getCourseDetails, []);

    return (
        <Grid container>
            <Grid item
                xs={0}
                sm={2}
            >
            </Grid>
            
            <Grid
                item
                xs={12}
                sm={8}
                container
                justifyContent='center'
                alignItems='stretch'
                direction='column'
            >
                <Grid item>
                    <Header
                        id={course.id}
                        title={course.title}
                        thumbnail={course.thumbnail}
                        difficulty={course.difficulty}
                        categories={course.categories}
                        price={course.price}
                        isUserLogged={props.isUserLogged}
                    />
                </Grid>

                <Grid item>
                    <Scopes scopes={course.scopes} />
                </Grid>

                <Grid item>
                    <Description description={course.description} />
                </Grid>

                <Grid item>
                    <Content sections={course.sections} />
                </Grid>

            </Grid>

            <Grid item
                xs={0}
                sm={2}
            >
            </Grid>
        </Grid>
    );
}