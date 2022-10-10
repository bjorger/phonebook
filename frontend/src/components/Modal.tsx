import { Button, Modal as MUIModal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Record } from "../types/graphql.types";

interface IModal {
    submitFunction: Function;
    modalState: boolean;
    setModalState: Function;
    fieldsRequired: boolean;
    buttonText: string;
    defaultValues?: Record;
}

interface FormData {
    firstname: string;
    lastname: string;
    phonenumber: string;
}

export const Modal: React.FC<IModal> = ({ modalState, setModalState, submitFunction, fieldsRequired, buttonText, defaultValues }) => {
    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = handleSubmit(async (data) => {
        submitFunction(data);

        setModalState(false);
        reset({
            firstname: "",
            lastname: "",
            phonenumber: "",
        });
    });

    return (
        <MUIModal open={modalState} onClose={() => setModalState(false)}>
            <Form onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    defaultValue={defaultValues?.firstname}
                    required={fieldsRequired}
                    {...register("firstname")}
                    label="Firstname"
                />
                <TextField
                    variant="outlined"
                    defaultValue={defaultValues?.lastname}
                    required={fieldsRequired}
                    {...register("lastname")}
                    label="Lastname"
                />
                <TextField
                    variant="outlined"
                    defaultValue={defaultValues?.phonenumber}
                    required={fieldsRequired}
                    {...register("phonenumber")}
                    label="Phonenumber"
                />
                <Button type="submit" variant="contained">
                    {buttonText}
                </Button>
            </Form>
        </MUIModal>
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
