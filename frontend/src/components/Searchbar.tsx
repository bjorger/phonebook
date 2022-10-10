import { Button, InputBase, Paper } from "@mui/material";
import styled from "styled-components";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSearchRecords } from "../hooks/useRequest";
import React from "react";
import { Record } from "../types/graphql.types";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
import { ErrorType, useSnackbar } from "../hooks/useSnackbar";
import { Snackbar } from "./Snackbar";

export const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const { refetch } = useSearchRecords(searchTerm);
    const { dispatch } = React.useContext(RecordContext);
    const [{ searchError }, , setError] = useSnackbar();

    const onSearch = async () => {
        let recordsToDispatch: Record[] = [];

        if (searchTerm.length > 0) {
            const { data, isError, isSuccess } = await refetch();

            if (isSuccess) {
                recordsToDispatch = data.recordsByLastname;
            } else if (isError) {
                setError(ErrorType.SEARCH_ERROR);
            }
        }

        dispatch({
            type: RecordActionKind.SEARCH_RECORD,
            payload: recordsToDispatch,
        });
    };

    return (
        <Searchbar>
            <Icon />
            <InputBase
                onChange={(e) => setSearchTerm(e.target.value as string)}
                placeholder="Search for contact by last name..."
                inputProps={{ "aria-label": "search for contact by last name ..." }}
            />
            <SearchButton onClick={() => onSearch()} variant="contained">
                Search
            </SearchButton>
            <Snackbar error={searchError} message="Error while executing search query" />
        </Searchbar>
    );
};

const Searchbar = styled(Paper)`
    margin: 10px 0 !important;
    width: 100%;
    border-bottom: 0 !important;
    display: flex;
    align-items: center;
    padding: 10px 0;

    .MuiInputBase-root {
        width: 100%;
    }
`;

const SearchButton = styled(Button)`
    margin-right: 10px !important;
`;

const Icon = styled(SearchIcon)`
    margin: 0 10px;
`;
