import React from "react";
import styled from "styled-components";
import { Record } from "../types/graphql.types";
import { FlexContainer } from "./styled";

interface ListItemProps {
    record: Record;
}

export const ListItem: React.FC<ListItemProps> = ({ record }) => {
    const { firstname, lastname, phonenumber, _id } = record;

    return (
        <ListItemContainer justifyContent="space-between" background="white">
            <div>
                <div>
                    {firstname} {lastname}
                </div>
                <div>{phonenumber}</div>
            </div>
        </ListItemContainer>
    );
};

const ListItemContainer = styled(FlexContainer)`
    border: 1px solid ${({ theme }) => theme.palette.gray};
`;
