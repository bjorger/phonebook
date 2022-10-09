import React from "react";
import { AddContact } from "./components/AddContact";
import { ListItem } from "./components/ListItem";
import { Contacts, FlexContainer, Grid, Headline, Layout } from "./components/styled";
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
                    Contacts
                    <AddContact />
                </FlexContainer>
                {state.records.map((record, index) => (
                    <ListItem key={record.firstname + record.lastname + index} record={record} />
                ))}
            </Layout>
        </Grid>
    );
}

export default App;
