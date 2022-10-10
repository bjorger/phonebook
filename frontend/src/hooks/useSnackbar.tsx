import React from "react";
import { RecordContext } from "../providers/apiProvider";

interface ISnackbar {
    initialFetchError: boolean;
    searchError: boolean;
    createError: boolean;
    deleteError: boolean;
}

export enum ErrorType {
    INITIAL_FETCH_ERROR = "initialFetchError",
    SEARCH_ERROR = "searchError",
    CREATE_ERROR = "createError",
    DELETE_ERROR = "deleteError",
}

export const useSnackbar = (): [
    ISnackbar,
    (event: Event | React.SyntheticEvent<Element, Event>, reason?: string | undefined) => void,
    (errorType: ErrorType) => void,
] => {
    const [snackbarState, setSnackbarState] = React.useState<ISnackbar>({
        createError: false,
        deleteError: false,
        initialFetchError: false,
        searchError: false,
    });
    const { state } = React.useContext(RecordContext);

    React.useEffect(() => {
        if (state.initialFetchError) {
            setSnackbarState({ ...snackbarState, initialFetchError: state.initialFetchError });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.initialFetchError]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarState({
            createError: false,
            deleteError: false,
            initialFetchError: false,
            searchError: false,
        });
    };

    const setAppropriateError = (errorType: ErrorType) => {
        setSnackbarState({ ...snackbarState, [errorType]: true });
    };

    return [snackbarState, handleClose, setAppropriateError];
};
