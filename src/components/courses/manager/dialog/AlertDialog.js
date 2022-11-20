import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function AlerDialog(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            {props.content ?
                <DialogContent>
                    <DialogContentText>
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                : <></>}
            <DialogActions>
                <Button onClick={props.onClickOK}>OK</Button>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>

        </Dialog>
    );
}