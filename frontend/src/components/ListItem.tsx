import React from "react";
import styled from "styled-components";
import { Record } from "../types/graphql.types";
import { FlexContainer } from "./styled";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteRecord } from "../hooks/useRequest";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
import { ErrorType, useSnackbar } from "../hooks/useSnackbar";
import { Snackbar } from "./Snackbar";
import { UpdateRecord } from "./UpdateRecord";
interface ListItemProps {
    record: Record;
}

export const ListItem: React.FC<ListItemProps> = ({ record }) => {
    const { firstname, lastname, phonenumber, _id } = record;
    const mutation = useDeleteRecord(_id);
    const { dispatch } = React.useContext(RecordContext);
    const [{ deleteError }, , setError] = useSnackbar();

    const onDelete = () => {
        mutation.mutate();

        if (mutation.isError) {
            setError(ErrorType.DELETE_ERROR);
        } else {
            dispatch({
                type: RecordActionKind.DELETE_RECORD,
                payload: record._id,
            });
        }
    };

    return (
        <ListItemContainer justifyContent="space-between" background="white">
            <div>
                <Name>
                    {firstname} {lastname}
                </Name>
                <Phonenumber href={`tel:${phonenumber}`}>
                    <LocalPhoneIcon fontSize="small" />
                    {phonenumber}
                </Phonenumber>
            </div>
            <div>
                <UpdateRecord _id={_id} />
                <RecordButton onClick={() => onDelete()} color="error" variant="contained">
                    <DeleteIcon />
                </RecordButton>
            </div>

            <Snackbar error={deleteError} message="Error while deleting record" />
        </ListItemContainer>
    );
};

const ListItemContainer = styled(FlexContainer)`
    border: 1px solid ${({ theme }) => theme.palette.gray};
    border-bottom: 0;
    padding: 10px 20px;

    &:last-child {
        border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
    }
`;

const Phonenumber = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
    color: ${({ theme }) => theme.palette.gray};

    svg {
        margin-right: 10px;
    }
`;

const Name = styled.h3`
    margin: 10px 0;
`;

export const RecordButton = styled(Button)`
    height: 50px;
    margin: 0 5px !important;

    svg {
        color: ${({ theme }) => theme.palette.white};
    }
`;
