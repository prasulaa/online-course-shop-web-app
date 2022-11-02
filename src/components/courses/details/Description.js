import { Grid, Paper, Typography } from "@mui/material";


export default function Description(props) {

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
                        Description
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1' wrap='true'>
                        {props.description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}