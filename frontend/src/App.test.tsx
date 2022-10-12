import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Record } from "./types/graphql.types";

const testData: Record[] = [
    {
        _id: "286f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Robin",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
    {
        _id: "286f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Ilse",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
    {
        _id: "286f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Markus",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
    {
        _id: "286f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Miriam",
        lastname: "Hauer",
        phonenumber: "0680 5034612",
    },
    {
        _id: "286f8a46-5f4e-44d6-ae9e-e7ca8dc1495c",
        firstname: "Robin",
        lastname: "Braumann",
        phonenumber: "0680 5034612",
    },
];

test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test("renders data from api correclty", () => {});
