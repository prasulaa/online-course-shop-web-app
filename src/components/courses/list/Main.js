import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { RESTAPI_URL } from "../../../properties";
import CourseList from "./CourseList";

export default function Main(props) {
    const [courses, setCourses] = useState([]);

    const getCourses = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                setCourses(response);
            }
        });
        xhr.open('GET', RESTAPI_URL + "/courses");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    };

    useEffect(getCourses, []);

    return (
        <Grid 
            container
            justifyContent='center'
            alignItems='center'
            >
            <Grid item>
                <CourseList courses={courses} />
            </Grid>
        </Grid>
    );
}