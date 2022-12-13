import { AccountCircle, AlternateEmail, Lock } from "@mui/icons-material";
import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [state, setState] = useState({
        loginForm: true,
        errorMsg: '',
        successMsg: ''
    });
    const navigate = useNavigate();

    const usernameField = React.createRef();
    const passwordField = React.createRef();
    const emailField = React.createRef();

    const handleLogin = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                props.setIsUserLogged(true);
                navigate("/");
            } else {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({ ...prevState, errorMsg: response.message }));
            }
        });
        xhr.open('POST', "/login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: usernameField.current.value,
            password: passwordField.current.value
        }));
    }

    const handleResetPassword = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 204) {
                setState((prevState) => ({ 
                    ...prevState, 
                    successMsg: "Email has been sent to you",
                    loginForm: true
                }));
            } else if (xhr.status === 400) {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({ ...prevState, errorMsg: response.message }));
            }
        });
        xhr.open('POST', "/user/password/reset?email=" + emailField.current.value);
        xhr.send();
    }

    const handleChangeFormState = () => {
        setState((prevState) => ({ 
            ...prevState, 
            loginForm: !prevState.loginForm,
            errorMsg: "",
            successMsg: ""
        }));
    }

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
        >
            <Grid item>
                <Paper sx={{ maxWidth: 'sm', p: 2, mt: 3 }} elevation={3}>
                    <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Grid item>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                }}
                            >
                                Sign in
                            </Typography>
                        </Grid>
                        {state.loginForm ?
                            <>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField label="Username" variant="standard" inputRef={usernameField} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField label="Password" type="password" variant="standard" inputRef={passwordField} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleLogin} variant='outlined' sx={{ width: '220px' }}>
                                        Login
                                    </Button>
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField label="Email" variant="standard" inputRef={emailField} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleResetPassword} variant='outlined' sx={{ width: '220px' }}>
                                        Reset
                                    </Button>
                                </Grid>
                            </>
                        }
                        {state.successMsg === "" ? <></> :
                            <Grid item>
                                <Alert variant="outlined" severity="success">
                                    {state.successMsg}
                                </Alert>
                            </Grid>
                        }
                        {state.errorMsg === "" ? <></> :
                            <Grid item>
                                <Alert variant="outlined" severity="error">
                                    {state.errorMsg}
                                </Alert>
                            </Grid>
                        }
                        <Grid item>
                            <Button onClick={handleChangeFormState}>{state.loginForm ? "Reset password" : "Back to login"}</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}