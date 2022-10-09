import React from "react";
import styled from "styled-components";
import { AddContact } from "./components/AddContact";
import { ListItem } from "./components/ListItem";
import { Search } from "./components/Searchbar";
import { Contacts, FlexContainer, Grid, Headline, Headline2, Layout } from "./components/styled";
import { RecordContext } from "./providers/apiProvider";

function App() {
    const { state } = React.useContext(RecordContext);

    return (
        <Grid>
            <Layout>
                <FlexContainer>
                    <Contacts fontSize="large" />
                    <Headline textAlign="center">Phone Book App</Headline>
                </FlexContainer>
                <FlexContainer margin="20px 0" justifyContent="space-between">
                    <Headline2>Contacts</Headline2>
                    <AddContact />
                </FlexContainer>
                <Search />
                <Container>
                    {state.records.map((record, index) => (
                        <ListItem key={record.firstname + record.lastname + index} record={record} />
                    ))}
                </Container>
            </Layout>
        </Grid>
    );
}

export default App;

const Container = styled.div`
    border: 1px solid ${({ theme }) => theme.palette.gray};
    border-top: 0px;
`;
