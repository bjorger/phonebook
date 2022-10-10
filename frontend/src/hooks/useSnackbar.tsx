import React from "react";

interface ISnackbar {
    initialFetchError: boolean;
    searchError: boolean;
    createError: boolean;
    deleteError: boolean;
    updateError: boolean;
    loadMoreError: boolean;
}

export enum ErrorType {
    INITIAL_FETCH_ERROR = "initialFetchError",
    SEARCH_ERROR = "searchError",
    CREATE_ERROR = "createError",
    DELETE_ERROR = "deleteError",
    UPDATE_ERROR = "updateError",
    LOADMORE_ERROR = "loadMoreError",
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
        updateError: false,
        loadMoreError: false,
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarState({
            createError: false,
            deleteError: false,
            initialFetchError: false,
            searchError: false,
            updateError: false,
            loadMoreError: false,
        });
    };

    const setAppropriateError = (errorType: ErrorType) => {
        setSnackbarState({ ...snackbarState, [errorType]: true });
    };

    return [snackbarState, handleClose, setAppropriateError];
};
