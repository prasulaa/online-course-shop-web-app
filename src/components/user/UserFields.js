import { AccountCircle, AlternateEmail, Lock } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

export function UsernameField(props) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
            <TextField label="Username" variant="standard" inputRef={props.textFieldRef} />
        </Box>
    );
}

export function EmailField(props) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AlternateEmail sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
            <TextField label="Email" variant="standard" inputRef={props.textFieldRef} />
        </Box>
    );
}

export function PasswordField(props) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Lock sx={{ color: theme => theme.palette.text.secondary, mr: 1, my: 0.5 }} />
            <TextField 
                label={props.repeated ? "Repeat passoword" : "Password"} 
                type="password" 
                variant="standard" 
                inputRef={props.textFieldRef} />
        </Box>
    );
}