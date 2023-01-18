import { useEffect, useState } from "react";
import CourseList from "./CourseList";


export default function BoughtCourses(props) {
    const [courses, setCourses] = useState([]);

    const getBoughtCourses = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setCourses(response);
            }
        });
        xhr.open('GET', "https://course-shop-restapi.azurewebsites.net/courses/bought");
        xhr.send();
    }
    
    useEffect(getBoughtCourses, []);
    
    return (
        <CourseList 
            courses={courses}
            urlSufix={'view'}
        />
    );
}