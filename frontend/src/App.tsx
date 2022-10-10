import React from "react";
import { AddContact } from "./components/AddContact";
import { ListItem } from "./components/ListItem";
import { LoadMore } from "./components/LoadMore";
import { Search } from "./components/Searchbar";
import { Snackbar } from "./components/Snackbar";
import { Contacts, FlexContainer, Grid, Headline, Headline2, Layout } from "./components/styled";
import { useSnackbar } from "./hooks/useSnackbar";
import { RecordContext } from "./providers/apiProvider";

function App() {
    const { state } = React.useContext(RecordContext);
    const [{ initialFetchError }] = useSnackbar();
    let recordsToDisplay = state.searchResult.length > 0 ? state.searchResult : state.records;

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
                {recordsToDisplay.map((record, index) => (
                    <ListItem key={record.firstname + record.lastname + index} record={record} />
                ))}
                <LoadMore />
                <Snackbar error={initialFetchError} message="Error while fetching data from server" />
            </Layout>
        </Grid>
    );
}

export default App;
