import { Alert, Snackbar as MUISnackbar } from "@mui/material";
import { useSnackbar } from "../hooks/useSnackbar";

interface ISnackbar {
    error: boolean;
    message: string;
}

export const Snackbar: React.FC<ISnackbar> = ({ error, message }) => {
    const [, handleClose] = useSnackbar();

    return (
        <MUISnackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {message}
            </Alert>
        </MUISnackbar>
    );
};
