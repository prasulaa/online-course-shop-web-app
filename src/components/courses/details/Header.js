import { Button, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Header(props) {
    const [owned, setOwned] = useState(false);
    const navigate = useNavigate();

    const checkIfCourseIsOwned = (type) => {
        if (props.isUserLogged) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.find((course) => course.id === props.id)) {
                        setOwned(true);
                    }
                }
            });
            xhr.open('GET', "/courses/" + type);
            xhr.send();
        }
    }

    const handleBuyCourse = () => {
        if (props.isUserLogged) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                if (xhr.status === 204) {
                    setOwned(true);
                } else if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    window.open(response.redirectUri);
                    setOwned(true);
                }
            });
            xhr.open('POST', "/courses/" + props.id + "/buy");
            xhr.send();
        } else {
            navigate("/login");
        }
    }

    const checkOwnedStatus = () => {
        checkIfCourseIsOwned('bought');
        checkIfCourseIsOwned('released');
    }

    useEffect(checkOwnedStatus, [props]);

    return (
        <Paper
            variant='outlined'
            square
            sx={{ m: 1, p: 1 }}
        >
            <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={1}
            >
                <Grid item>
                    <Card>
                        <CardMedia
                            component='img'
                            src={props.thumbnail}
                            height='180'
                            sx={{ height: '180px', maxWidth: '240px' }}
                        />
                    </Card>
                </Grid>

                <Grid item>
                    <Grid
                        container
                        direction='column'
                        justifyContent='space-between'
                    >
                        <Grid item>
                            <Box>
                                <Typography
                                    variant='h5'
                                    sx={{ wordBreak: 'break-word', fontWeight: 'bold' }}
                                >
                                    {props.title}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Typography variant='h6'>
                                {props.difficulty}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant='h6'>
                                {props.categories.join(', ')}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Grid
                                container
                                alignItems='center'
                                direction='row'
                                spacing={2}
                            >
                                <Grid item>
                                    <Typography variant="h6">
                                        {props.price}zł
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        disabled={owned}
                                        onClick={handleBuyCourse}
                                    >
                                        Buy
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}