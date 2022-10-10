import { Button, Modal as MUIModal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IModal {
    submitFunction: Function;
    modalState: boolean;
    setModalState: Function;
    fieldsRequired: boolean;
}

interface FormData {
    firstname: string;
    lastname: string;
    phonenumber: string;
}

export const Modal: React.FC<IModal> = ({ modalState, setModalState, submitFunction, fieldsRequired }) => {
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
                <TextField variant="outlined" required={fieldsRequired} {...register("firstname")} label="Firstname" />
                <TextField variant="outlined" required={fieldsRequired} {...register("lastname")} label="Lastname" />
                <TextField variant="outlined" required={fieldsRequired} {...register("phonenumber")} label="Phonenumber" />
                <Button type="submit" variant="contained">
                    ADD CONTACT
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
