import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import { Link, useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Navbar(props) {

    return (
        <Box sx={{ flexGrow: 1, pb: 1 }}>
            <AppBar position="static" sx={{ background: theme => theme.palette.background.header }}>
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
                                        <StoreIcon sx={{ mr: 1, color: theme => theme.palette.text.header }} />
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
                                            color: theme => theme.palette.text.header
                                        }}
                                    >
                                        COURSE SHOP
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container>
                                {props.isUserLogged ?
                                    <>
                                        <Grid item>
                                            <Link to="/released" style={{ textDecoration: 'none' }}>
                                                <Button sx={{ color: 'common.white' }}>Released</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/bought" style={{ textDecoration: 'none' }}>
                                                <Button sx={{ color: 'common.white' }}>Bought</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <AccountMenu setIsUserLogged={props.setIsUserLogged} />
                                        </Grid>
                                    </>
                                    :
                                    <>
                                        <Grid item>
                                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                                <Button sx={{ color: 'common.white' }}>Login</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                                <Button sx={{ color: 'common.white' }}>Register</Button>
                                            </Link>
                                        </Grid>
                                    </>
                                }
                                <Grid item>
                                    {props.isDarkMode ?
                                        <IconButton sx={{ color: theme => theme.palette.text.header }} onClick={() => props.setDarkMode(false)}>
                                            <LightMode />
                                        </IconButton>
                                        :
                                        <IconButton sx={{ color: theme => theme.palette.text.header }} onClick={() => props.setDarkMode(true)}>
                                            <DarkMode />
                                        </IconButton>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}