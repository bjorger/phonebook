import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { useUpdateRecord } from "../hooks/useRequest";
import { ErrorType, useSnackbar } from "../hooks/useSnackbar";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
import { Record, UpdateRecordInput } from "../types/graphql.types";
import { RecordButton } from "./ListItem";
import { Modal } from "./Modal";
import { Snackbar } from "./Snackbar";

interface IUpdateRecord {
    record: Record;
}

export const UpdateRecord: React.FC<IUpdateRecord> = ({ record }) => {
    const mutation = useUpdateRecord();
    const [modalState, setModalState] = React.useState<boolean>(false);
    const { dispatch } = React.useContext(RecordContext);
    const [{ updateError }, , setError] = useSnackbar();

    // This has to be done, because "react-hook-form" strictly sticks to the HTML standard
    // That means, that undefined inputs are replaced with an empty string
    // Therefore we strip our data received from the form
    const removeEmptyFields = (data: UpdateRecordInput) => {
        Object.keys(data).forEach((key) => {
            const _key = key as keyof UpdateRecordInput;
            if (data[_key] === "" || data[_key] == null) {
                delete data[_key];
            }
        });

        return data;
    };

    const handleSubmit = async (data: UpdateRecordInput) => {
        console.log(data);
        const strippedData = removeEmptyFields(data);
        const updatedRecord = { ...strippedData, _id: record._id };
        await mutation.mutateAsync(updatedRecord);

        if (mutation.isError) {
            setError(ErrorType.UPDATE_ERROR);
        } else {
            dispatch({
                type: RecordActionKind.UPDATE_RECORD,
                payload: updatedRecord,
            });
        }
    };

    return (
        <>
            <RecordButton onClick={() => setModalState(true)} variant="contained">
                <EditIcon />
                <Snackbar error={updateError} message="Error while updating record" />
            </RecordButton>
            <Modal
                buttonText="Update Contact"
                fieldsRequired={false}
                modalState={modalState}
                setModalState={setModalState}
                submitFunction={handleSubmit}
                defaultValues={record}
            />
        </>
    );
};
