import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function CourseList(props) {

    return (
        <Grid
            container
            spacing={1}
            justifyContent='center'
            alignItems='center'
        >
            {props.courses.length === 0 && !props.showNewButton ?
                <Grid item>
                    <Typography
                        variant='h5'
                        sx={{ mt: 4 }}
                    >
                        No courses found
                    </Typography>
                </Grid>
                :
                <>
                    {props.showNewButton ?
                        <Grid item>
                            <NewCourseCard />
                        </Grid>
                        : <></>}
                    {props.courses.map(course => (
                        <Grid
                            item
                            key={course.id}
                            sx={{ m: 1 }}
                        >
                            <Link
                                to={"/courses/" + course.id + '/' + props.urlSufix}
                                style={{ textDecoration: 'none' }}
                            >
                                <Card>
                                    <CardActionArea sx={{ width: 270, height: 250 }}>
                                        <CardMedia
                                            component='img'
                                            src={course.thumbnail}
                                            height='150'
                                        />
                                        <CardContent>
                                            <Typography variant="h5" noWrap>
                                                {course.title}
                                            </Typography>
                                            {props.showPrice ?
                                                <Typography variant="body2" color="text.secondary">
                                                    {course.price + "zł"}
                                                </Typography>
                                                : <></>}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </>
            }
        </Grid>
    );
}


function NewCourseCard(props) {

    return (
        <Link
            to={"/courses/create"}
            style={{ textDecoration: 'none' }}
        >
            <Card>
                <CardActionArea sx={{ width: 270, height: 250 }}>
                    <Grid
                        container
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Grid item>
                            <Add sx={{ fontSize: 100 }} />
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Link>
    );
}