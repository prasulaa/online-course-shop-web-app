import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CourseList(props) {

    return (
        <Grid
            container
            spacing={2}
            justifyContent='center'
            alignItems='center'
        >
            {props.courses.map(course => (
                <Grid key={course.id} item>
                    <Link to={"/courses/" + course.id} style={{ textDecoration: 'none' }}>
                        <Card>
                            <CardActionArea sx={{ width: 250, height: 250 }}>
                                <CardMedia
                                    component='img'
                                    src={'data:image/png;base64, ' + course.thumbnail}
                                    height='150'
                                />
                                <CardContent>
                                    <Typography variant="h5">
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.price + "zł"}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}