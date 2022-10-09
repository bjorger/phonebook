import React from "react";
import { ListItem } from "./components/ListItem";
import { Contacts, FlexContainer, Grid, Headline, Layout } from "./components/styled";
import { RecordContext } from "./providers/apiProvider";

function App() {
    const { records, isLoading } = React.useContext(RecordContext);

    return (
        <Grid>
            {isLoading ? (
                "Data is being fetched right now"
            ) : (
                <Layout>
                    <FlexContainer>
                        <Contacts fontSize="large" />
                        <Headline textAlign="center">Phone Book App</Headline>
                    </FlexContainer>
                    {records.map((record, index) => (
                        <ListItem key={record.firstname + record.lastname + index} record={record} />
                    ))}
                </Layout>
            )}
        </Grid>
    );
}

export default App;
