import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CategoryChooser from "../../list/filters/CategoryChooser";

export default function CategoriesDialog(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>Choose course categories</DialogTitle>
            <DialogContent>
                <CategoryChooser
                    checked={props.checked}
                    categories={props.categories}
                    handleCategory={props.handleCategory}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={props.onClose}
                >
                    Choose
                </Button>
            </DialogActions>
        </Dialog>
    );
}