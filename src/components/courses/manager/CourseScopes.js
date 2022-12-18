import { Add, Delete } from "@mui/icons-material";
import { Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, List, ListItem, ListItemText } from "@mui/material";

export default function CourseScopes(props) {

    return (
        <Grid
            container
            direction='column'
        >
            <Grid item>
                <FormControl 
                    variant='outlined' 
                    sx={{ width: '100%' }}
                    disabled={props.disabled}
                >
                    <InputLabel>Add scope</InputLabel>
                    <OutlinedInput
                        inputRef={props.scopeRef}
                        type='text'
                        label='Add scope'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={props.handleAddScope} 
                                    disabled={props.disabled}
                                >
                                    <Add sx={{ color: theme => theme.palette.text.secondary }}/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>

            <Grid item>
                <List dense={true}>
                    {props.scopes.map((scope, index) => (
                        <ListItem 
                            key={index} 
                            disabled={props.disabled}
                            secondaryAction={
                                <IconButton 
                                    onClick={props.handleDeleteScope(index)}
                                    disabled={props.disabled}
                                >
                                    <Delete sx={{ color: theme => theme.palette.text.secondary }}/>
                                </IconButton>
                            }
                        >
                            <ListItemText>
                                {scope}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}