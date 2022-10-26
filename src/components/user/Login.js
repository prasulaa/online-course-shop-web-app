import { AccountCircle } from "@mui/icons-material";
import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const usernameField = React.createRef();
    const passwordField = React.createRef();

    const handleLogin = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.responseText);

            if (xhr.status === 200) {
                localStorage.setItem('token', 'Bearer ' + response.token);
                props.setIsUserLogged(true);
                navigate("/");
            } else {
                setErrorMsg(response.message);
            }
        });
        xhr.open('POST', "/login");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            username: usernameField.current.value,
            password: passwordField.current.value
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
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Username" variant="standard" inputRef={usernameField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField label="Password" type="password" variant="standard" inputRef={passwordField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleLogin}>
                                Login
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