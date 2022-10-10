import { Button } from "@mui/material";
import React from "react";
import { useCreateRecord } from "../hooks/useRequest";
import { ErrorType, useSnackbar } from "../hooks/useSnackbar";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
import { RecordInput } from "../types/graphql.types";
import { Modal } from "./Modal";
import { Snackbar } from "./Snackbar";

export const AddContact: React.FC = () => {
    const mutation = useCreateRecord();
    const [modalState, setModalState] = React.useState<boolean>(false);
    const { dispatch } = React.useContext(RecordContext);
    const [{ createError }, , setError] = useSnackbar();

    const handleSubmit = async (data: RecordInput) => {
        const res = await mutation.mutateAsync(data);

        if (mutation.isError) {
            setError(ErrorType.CREATE_ERROR);
        } else {
            dispatch({
                type: RecordActionKind.ADD_RECORD,
                payload: res.createRecord,
            });
        }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setModalState(true)}>
                + Add Contact
            </Button>
            <Modal fieldsRequired={true} modalState={modalState} setModalState={setModalState} submitFunction={handleSubmit} />
            <Snackbar error={createError} message="Error while creating Record" />
        </>
    );
};
