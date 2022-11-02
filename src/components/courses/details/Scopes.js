import { Done } from "@mui/icons-material";
import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";


export default function Scopes(props) {

    return (
        <Paper
            variant='outlined'
            square
            sx={{ m: 1, p: 1 }}
        >
            <Grid
                container
                direction='column'
                spacing={1}
            >
                <Grid item>
                    <Typography
                        variant='h5'
                        wrap='true'
                        sx={{ fontWeight: 'bold' }}
                    >
                        Course scopes
                    </Typography>
                </Grid>

                <Grid item>
                    <List sx={{ m: 0, p: 0 }}>
                        {props.scopes.map((scope, index) => (
                            <ListItem key={index} sx={{ p: 0, pl: 1 }} >
                                <ListItemIcon >
                                    <Done />
                                </ListItemIcon>
                                <ListItemText >
                                    <Typography wrap='true'>
                                        {scope}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
}