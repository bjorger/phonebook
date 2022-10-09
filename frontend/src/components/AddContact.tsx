import { Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useCreateRecord } from "../hooks/useRequest";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
interface FormData {
    firstname: string;
    lastname: string;
    phonenumber: string;
}

export const AddContact: React.FC = () => {
    const mutation = useCreateRecord();
    const [modalState, setModalState] = React.useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm<FormData>();
    const { dispatch } = React.useContext(RecordContext);

    const onSubmit = handleSubmit(async (data) => {
        const res = await mutation.mutateAsync(data);
        dispatch({
            type: RecordActionKind.ADD_RECORD,
            payload: res.createRecord,
        });

        setModalState(false);
        reset({
            firstname: "",
            lastname: "",
            phonenumber: "",
        });
    });

    return (
        <>
            <Button variant="contained" onClick={() => setModalState(true)}>
                + Add Contact
            </Button>
            <Modal open={modalState} onClose={() => setModalState(false)}>
                <Form onSubmit={onSubmit}>
                    <TextField variant="outlined" required {...register("firstname")} label="Firstname" />
                    <TextField variant="outlined" required {...register("lastname")} label="Lastname" />
                    <TextField variant="outlined" required {...register("phonenumber")} label="Phonenumber" />
                    <Button type="submit" variant="contained">
                        ADD CONTACT
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

const Form = styled.form`
    background: white;
    display: flex;
    flex-direction: column;
    padding: 30px 50px;

    .MuiTextField-root {
        margin: 10px 0;
    }

    button {
        margin-top: 10px;
    }

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
