import { Article, Book, ChevronRight, ExpandMore } from "@mui/icons-material";
import { TreeItem, TreeView } from "@mui/lab";
import { Grid, Paper, Typography } from "@mui/material";


export default function Content(props) {

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
                        Course content
                    </Typography>
                </Grid>

                <Grid item>
                    <TreeView
                        defaultCollapseIcon={<ExpandMore />}
                        defaultExpandIcon={<ChevronRight />}
                    >
                        {props.sections.map(section => (
                            <TreeItem
                                key={'s' + section.id}
                                nodeId={'s' + section.id}
                                label={section.name}
                            >
                                {section.lessons.map(lesson => (
                                    <TreeItem
                                        key={'l' + lesson.id}
                                        nodeId={'l' + lesson.id}
                                        label={lesson.name}
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