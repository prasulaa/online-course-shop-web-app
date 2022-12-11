import { AccountCircle, AlternateEmail, Lock } from "@mui/icons-material";
import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const usernameField = React.createRef();
    const emailField = React.createRef();
    const passwordField = React.createRef();
    const passwordRepeatField = React.createRef();

    const handleRegister = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                navigate("/login");
            } else {
                var response = JSON.parse(xhr.responseText);
                setErrorMsg(response.message);
            }
        });
        xhr.open('POST', "/register");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: usernameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value,
            passwordRepeat: passwordRepeatField.current.value
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
                                Sign up
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Username" variant="standard" inputRef={usernameField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Email" variant="standard" inputRef={emailField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Password" type="password" variant="standard" inputRef={passwordField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Repeat password" type="password" variant="standard" inputRef={passwordRepeatField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleRegister}>
                                Register
                            </Button>
                        </Grid>
                        {errorMsg === "" ? <></> :
                            <Grid item>
                                <Alert variant="outlined" severity="error">
                                    {errorMsg}
                                </Alert>
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}