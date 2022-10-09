import React from "react";
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
            </Layout>
        </Grid>
    );
}

export default App;
