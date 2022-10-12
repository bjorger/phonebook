import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Record } from "./types/graphql.types";
import { ICtx, RecordContext, RecordState } from "./providers/apiProvider";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";

const testData: Record[] = [
    {
        _id: "286f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Robin",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
    {
        _id: "fd0eb1b3-4b9d-4a06-99a8-ff0e5b0d94d1",
        firstname: "Ilse",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
    {
        _id: "6f745c3f-d126-48d8-965b-be9d96e0b06e",
        firstname: "Markus",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
];

const searchData = [
    {
        _id: "311f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Hans",
        lastname: "Peter",
        phonenumber: "0800 123 123",
    },
];

let testState: RecordState = {
    records: testData,
    searchResult: [],
};

let testCtx: ICtx = {
    state: testState,
    dispatch: jest.fn(),
};

let queryClient: QueryClient;

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <RecordContext.Provider value={testCtx}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
            </ThemeProvider>
        </RecordContext.Provider>
    );
};

describe("<App />", () => {
    beforeEach(() => {
        queryClient = new QueryClient();
    });

    test("renders data from api correctly", () => {
        render(
            <Wrapper>
                <App />
            </Wrapper>,
        );

        const linkItems = screen.getAllByTestId("listItem");

        expect(linkItems).toHaveLength(3);
    });

    test("render name correctly", async () => {
        render(
            <Wrapper>
                <App />
            </Wrapper>,
        );

        const item = await screen.findByText("Robin Braumann");

        expect(item).toBeVisible();
    });

    test("render search items", async () => {
        testState = { records: [], searchResult: searchData };
        testCtx = { ...testCtx, state: testState };

        render(
            <Wrapper>
                <App />
            </Wrapper>,
        );

        const item = await screen.findByText("Hans Peter");

        expect(item).toBeVisible();
    });
});
