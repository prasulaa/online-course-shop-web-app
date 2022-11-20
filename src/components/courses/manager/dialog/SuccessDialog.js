import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function SuccessDialog(props) {

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
                <Button onClick={props.onClose}>OK</Button>
            </DialogActions>

        </Dialog>
    );
}