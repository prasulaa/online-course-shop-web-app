import { Delete, Download, FileUpload } from "@mui/icons-material";
import { Alert, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import fileDownload from "js-file-download";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertDialog from "../dialog/AlertDialog";


export default function FileManager(props) {
    const [state, setState] = useState({
        files: [],
        successMsg: "",
        errorMsg: "",
        openDeleteFileDialog: false,
        deleteFileId: null
    });
    const { id } = useParams();

    const getCourseFiles = () => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                setState((prevState) => ({
                    ...prevState,
                    files: response
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errorMsg: "An error occurred during getting files"
                }))
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

    const handleDeleteFile = () => {
        handleCloseDeleteFileDialog();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 204) {
                getCourseFiles();
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "File successfully deleted",
                    errorMsg: ""
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "",
                    errorMsg: "An error occurred during deleting file"
                }));
            }
        });
        xhr.open('DELETE', '/courses/' + id + '/files/' + state.deleteFileId);
        xhr.send();
    }

    const handleUploadFile = (e) => {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);

        fetch("/courses/" + id + "/files", {
            method: "post",
            body: formData
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    return Promise.reject("Error occurred during saving file");
                }
            })
            .then((response) => {
                state.files.push(response);
                setState((prevState) => ({
                    ...prevState,
                    files: state.files,
                    successMsg: "File successfully uploaded",
                    errorMsg: ""
                }))
            })
            .catch((error) => {
                setState((prevState) => ({
                    ...prevState,
                    successMsg: "",
                    errorMsg: error
                }))
            });
    }

    const handleCloseSuccessAlert = () => {
        setState((prevState) => ({
            ...prevState,
            successMsg: ""
        }))
    }

    const handleCloseErrorAlert = () => {
        setState((prevState) => ({
            ...prevState,
            errorMsg: ""
        }))
    }

    const handleOpenDeleteFileDialog = (id) => () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteFileDialog: true,
            deleteFileId: id
        }))
    }

    const handleCloseDeleteFileDialog = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteFileDialog: false,
            deleteFileId: null
        }))
    }

    useEffect(getCourseFiles, []);

    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ mt: 1 }}
            spacing={1}
        >
            {state.errorMsg === "" ? <></> :
                <Grid item>
                    <Alert
                        variant="outlined"
                        severity="error"
                        onClose={handleCloseErrorAlert}
                    >
                        {state.errorMsg}
                    </Alert>
                </Grid>
            }
            {state.successMsg === "" ? <></> :
                <Grid item>
                    <Alert
                        variant="outlined"
                        severity="success"
                        onClose={handleCloseSuccessAlert}
                    >
                        {state.successMsg}
                    </Alert>
                </Grid>
            }
            <Grid item>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'><Typography>File ID</Typography></TableCell>
                                <TableCell align='center'><Typography>File name</Typography></TableCell>
                                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }} align='center'><Typography>File type</Typography></TableCell>
                                <TableCell align='center'>
                                    <Button
                                        sx={{ width: '80px' }}
                                        variant='outlined'
                                        component='label'
                                        endIcon={<FileUpload />}
                                    >
                                        New
                                        <input onChange={handleUploadFile} hidden type="file" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.files.map(file => (
                                <TableRow key={file.id}>
                                    <TableCell align='center'><Typography>{file.id}</Typography></TableCell>
                                    <TableCell align='center'><Typography sx={{ width: 'auto', textOverflow: 'ellipsis', overflow: 'hidden' }}>{file.name}</Typography></TableCell>
                                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }} align='center'><Typography>{file.type}</Typography></TableCell>
                                    <TableCell align='center'>
                                        <IconButton onClick={handleDownloadFile(file.id, file.name)}>
                                            <Download color='primary' />
                                        </IconButton>
                                        <IconButton onClick={handleOpenDeleteFileDialog(file.id)}>
                                            <Delete color='primary' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <AlertDialog
                    open={state.openDeleteFileDialog}
                    onClose={handleCloseDeleteFileDialog}
                    onClickOK={handleDeleteFile}
                    title={"Warning!"}
                    content={"Are you sure? You will not be able to undo this change"}
                />
            </Grid>
        </Grid>
    )
}