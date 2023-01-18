import { Alert, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailField, PasswordField, UsernameField } from "./UserFields";

export default function Register(props) {

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
        >
            <Grid item>
                <RegisterForm />
            </Grid>
        </Grid>
    );
}

function RegisterForm(props) {
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
            } else if (xhr.status === 400) {
                var response = JSON.parse(xhr.responseText);
                setErrorMsg(response.message);
            } else {
                setErrorMsg("Unxpected error occurred");
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
                    <UsernameField textFieldRef={usernameField} />
                </Grid>
                <Grid item>
                    <EmailField textFieldRef={emailField} />
                </Grid>
                <Grid item>
                    <PasswordField textFieldRef={passwordField} repeated={false} />
                </Grid>
                <Grid item>
                    <PasswordField textFieldRef={passwordRepeatField} repeated={true} />
                </Grid>
                <Grid item>
                    <Button onClick={handleRegister} variant='outlined' sx={{ width: '220px' }}>
                        Register
                    </Button>
                </Grid>
                {errorMsg === "" ? <></> :
                    <Grid item>
                        <Alert variant="filled" severity="error">
                            {errorMsg}
                        </Alert>
                    </Grid>
                }
            </Grid>
        </Paper>
    );
}