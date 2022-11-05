import { Download } from "@mui/icons-material";
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import fileDownload from "js-file-download";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function CourseFiles(props) {
    const { id } = useParams();
    const [files, setFiles] = useState([]);

    const getCourseFiles = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setFiles(response);
            }
        });
        xhr.open('GET', '/courses/' + id + '/files');
        xhr.send();
    }

    const handleDownloadFile = (fileId, filename) => () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                fileDownload(xhr.response, filename);
            }
        });
        xhr.open('GET', '/courses/' + id + '/files/' + fileId);
        xhr.responseType = "arraybuffer";
        xhr.send();
    }

    useEffect(getCourseFiles, []);

    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ mt: 1 }}
        >
            <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'><Typography>File name</Typography></TableCell>
                                <TableCell align='center'><Typography>File type</Typography></TableCell>
                                <TableCell align='center'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {files.map(file => (
                                <TableRow key={file.id}>
                                    <TableCell align='center'><Typography>{file.name}</Typography></TableCell>
                                    <TableCell align='center'><Typography>{file.type}</Typography></TableCell>
                                    <TableCell align='center'>
                                        <IconButton onClick={handleDownloadFile(file.id, file.name)}>
                                            <Download color='primary' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}