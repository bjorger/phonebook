import React from "react";
import { ListItem } from "./components/ListItem";
import { Contacts, FlexContainer, Grid, Headline, Layout } from "./components/styled";
import { RecordContext } from "./providers/apiProviders";

function App() {
    const records = React.useContext(RecordContext);

    return (
        <Grid>
            <Layout>
                <FlexContainer>
                    <Contacts fontSize="large" />
                    <Headline textAlign="center">Phone Book App</Headline>
                </FlexContainer>
                {records?.data?.records.map((record) => (
                    <ListItem key={record.firstname + record.lastname} record={record} />
                ))}
            </Layout>
        </Grid>
    );
}

export default App;
