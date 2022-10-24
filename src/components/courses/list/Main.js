import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { RESTAPI_URL } from "../../../properties";
import CourseList from "./CourseList";
import Filters from "./Filters";

export default function Main(props) {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({});

    const getCourses = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCourses(response);
            }
        });
        xhr.open('GET', RESTAPI_URL + "/courses");
        xhr.send();
    };

    const getCategories = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCategories(response);
            }
        });
        xhr.open('GET', RESTAPI_URL + "/categories");
        xhr.send();
    }

    const handleCategory = (category) => () => {
        // TODO
    }

    const handleDifficulty = (dif) => () => {
        // TODO
    }

    useEffect(getCourses, []);
    useEffect(getCategories, []);

    return (
        <Stack
            direction="row"
        >
            <Filters 
                categories={categories}
                handleCategory={handleCategory}
                handleDifficulty={handleDifficulty}
            />
            <CourseList courses={courses} />
        </Stack>
    );
}