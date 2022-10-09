import React from "react";
import styled from "styled-components";
import { Record } from "../types/graphql.types";
import { FlexContainer } from "./styled";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteRecord } from "../hooks/useRequest";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
interface ListItemProps {
    record: Record;
}

export const ListItem: React.FC<ListItemProps> = ({ record }) => {
    const { firstname, lastname, phonenumber, _id } = record;
    const mutation = useDeleteRecord(_id);
    const { dispatch } = React.useContext(RecordContext);

    const onDelete = () => {
        dispatch({
            type: RecordActionKind.DELETE_RECORD,
            payload: record._id,
        });
        mutation.mutate();
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
            <DeleteButton onClick={() => onDelete()} color="error" variant="contained">
                <DeleteIcon />
            </DeleteButton>
        </ListItemContainer>
    );
};

const ListItemContainer = styled(FlexContainer)`
    border-top: 1px solid ${({ theme }) => theme.palette.gray};
    padding: 10px 20px;
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

const DeleteButton = styled(Button)`
    height: 50px;

    svg {
        color: ${({ theme }) => theme.palette.white};
    }
`;
