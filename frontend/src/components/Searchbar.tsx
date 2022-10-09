import { TextField } from "@mui/material";
import styled from "styled-components";
import { Search as SearchIcon } from "@mui/icons-material";

export const Search: React.FC = () => {
    return (
        <Searchbar variant="filled">
            <SearchIcon /> Search of contact by lastname
        </Searchbar>
    );
};

const Searchbar = styled(TextField)`
    margin: 10px 0 !important;
    background: ${({ theme }) => theme.palette.white} !important;
    width: 100%;
    border-bottom: 0 !important;
`;
