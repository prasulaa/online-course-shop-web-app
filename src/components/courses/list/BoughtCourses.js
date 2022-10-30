import { useEffect, useState } from "react";
import CourseList from "./CourseList";


export default function BoughtCourses(props) {
    const [courses, setCourses] = useState([]);

    const getReleasedCourses = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCourses(response);
            }
        });
        xhr.open('GET', "/courses/bought");
        xhr.send();
    }
    
    useEffect(getReleasedCourses, []);
    
    return (
        <CourseList 
            courses={courses}
            urlSufix={'edit'}
        />
    );
}