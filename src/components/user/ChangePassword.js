import { AccountCircle, AlternateEmail, Lock, LockOpen } from "@mui/icons-material";
import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";


export default function ChangePassword(props) {
    const [state, setState] = useState({
        errorMsg: '',
        successMsg: ''
    });

    const oldPasswordField = React.createRef();
    const newPasswordField = React.createRef();
    const newPasswordRepeatField = React.createRef();

    const handleResetPassword = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 204) {
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "Password has been changed",
                    errorMsg: ""
                }));
            } else if (xhr.status === 400) {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({ ...prevState, errorMsg: response.message, successMsg: "" }));
            } else {
                setState((prevState) => ({ ...prevState, errorMsg: "Unexpected error occurred", successMsg: "" }));
            }
        });
        xhr.open('POST', "https://course-shop-restapi.azurewebsites.net/user/password/change");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({
            oldPassword: oldPasswordField.current.value,
            newPassword: newPasswordField.current.value,
            newPasswordRepeat: newPasswordRepeatField.current.value
        }));
    }

    const handleCloseErrorAlert = () => {
        setState((prevState) => ({
            ...prevState,
            errorMsg: ""
        }))
    }

    const handleCloseSuccessAlert = () => {
        setState((prevState) => ({
            ...prevState,
            successMsg: ""
        }))
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
                                    letterSpacing: '.1rem',
                                }}
                            >
                                Change password
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LockOpen sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
                                <TextField label="Old password" type="password" variant="standard" inputRef={oldPasswordField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Lock sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
                                <TextField label="New password" type="password" variant="standard" inputRef={newPasswordField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Lock sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
                                <TextField label="New password repeat" type="password" variant="standard" inputRef={newPasswordRepeatField} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleResetPassword} variant='outlined' sx={{ width: '220px' }}>
                                Change
                            </Button>
                        </Grid>
                        {state.successMsg === "" ? <></> :
                            <Grid item>
                                <Alert variant="filled" severity="success" onClose={handleCloseSuccessAlert}>
                                    {state.successMsg}
                                </Alert>
                            </Grid>
                        }
                        {state.errorMsg === "" ? <></> :
                            <Grid item>
                                <Alert variant="filled" severity="error" onClose={handleCloseErrorAlert}>
                                    {state.errorMsg}
                                </Alert>
                            </Grid>
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}