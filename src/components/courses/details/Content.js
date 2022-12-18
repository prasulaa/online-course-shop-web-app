import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/lab";
import { Grid, Paper, Typography } from "@mui/material";


export default function Content(props) {

    const handleClick = props.handleClick ? props.handleClick : (sid, lid) => () => {};

    return (
        <Paper
            variant='outlined'
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
                        Course content
                    </Typography>
                </Grid>

                <Grid item sx={{ width: '100%' }}>
                    <TreeView
                        defaultCollapseIcon={<ExpandMore />}
                        defaultExpandIcon={<ChevronRight />}
                        sx={{ pr: 2 }}
                    >
                        {props.sections.map(section => (
                            <TreeItem
                                key={'s' + section.id}
                                nodeId={'s' + section.id}
                                label={<Typography noWrap>{section.name}</Typography>}
                                onClick={handleClick(section.id, null)}
                            >
                                {section.lessons.map(lesson => (
                                    <TreeItem
                                        key={'l' + lesson.id}
                                        nodeId={'l' + lesson.id}
                                        label={<Typography noWrap>{lesson.name}</Typography>}
                                        onClick={handleClick(section.id, lesson.id)}
                                    />
                                ))}
                            </TreeItem>
                        ))}

                    </TreeView>
                </Grid>
            </Grid>
        </Paper>
    );
}