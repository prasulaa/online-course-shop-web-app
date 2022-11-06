import { Button, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";


export default function Header(props) {

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
                                    <Link to={'/courses/' + props.id + '/buy'} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained">Buy</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}