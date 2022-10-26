import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import { Link } from "react-router-dom";

export default function Navbar(props) {

    return (
        <Box sx={{ flexGrow: 1, pb: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Grid item>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <StoreIcon sx={{ mr: 1, color: 'common.white' }}/>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="a"
                                        color='inherit'
                                        sx={{
                                            mr: 1,
                                            display: { xs: 'none', sm: 'flex' },
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        COURSE SHOP
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        {props.isUserLogged ?
                            <Grid item>
                                <Link to="/released" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: 'common.white' }}>Released</Button>
                                </Link>
                                <Link to="/bought" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: 'common.white' }}>Bought</Button>
                                </Link>
                            </Grid>
                            :
                            <Grid item>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: 'common.white' }}>Login</Button>
                                </Link>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Button sx={{ color: 'common.white' }}>Register</Button>
                                </Link>
                            </Grid>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}