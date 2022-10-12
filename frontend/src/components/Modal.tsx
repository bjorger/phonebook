import { Button, Modal as MUIModal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Record } from "../types/graphql.types";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";

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
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const phoneNumberRegex = /^[0-9*# +]+$/;

    React.useEffect(() => {
        reset({
            firstname: defaultValues ? defaultValues.firstname : "",
            lastname: defaultValues ? defaultValues.lastname : "",
            phonenumber: defaultValues ? defaultValues.phonenumber : "",
        });
    }, [defaultValues]);

    const onSubmit = handleSubmit(async (data) => {
        submitFunction(data);

        setModalState(false);
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
                    required={true}
                    id={defaultValues ? `${defaultValues._id}_phonenumber` : "phonenumber"}
                    {...register("phonenumber", {
                        validate: (value: string) => {
                            console.log("Hallo");
                            return phoneNumberRegex.test(value);
                        },
                    })}
                    label="Phonenumber"
                />
                <ErrorMessage errors={errors} name="phonenumber" render={() => <Error>Please only use 0-9 and +- # for the phonenumber</Error>} />
                <Button type="submit" variant="contained">
                    {buttonText}
                </Button>
            </Form>
        </MUIModal>
    );
};

const Error = styled.p`
    color: ${({ theme }) => theme.palette.error};
    ${({ theme }) => theme.fonts.error};
`;

const Form = styled.form`
    background: white;
    display: flex;
    flex-direction: column;
    padding: 30px 50px;
    min-width: 300px;

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
