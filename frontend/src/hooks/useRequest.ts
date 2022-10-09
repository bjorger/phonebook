import { QueryObserverIdleResult, useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Record, RecordInput } from "../types/graphql.types";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}graphql`;

export const graphQLClient = new GraphQLClient(API_URL);

export interface IGetRecordsResponse {
    records: Record[];
}

export function useGetRecords(
    take = 25,
    skip = 0,
): UseQueryResult<IGetRecordsResponse, unknown> | QueryObserverIdleResult<IGetRecordsResponse, unknown> {
    return useQuery<IGetRecordsResponse>(
        ["records"],
        async () => {
            const getRecords = await graphQLClient.request(
                gql`
                    query Records($take: Float!, $skip: Float!) {
                        records(take: $take, skip: $skip) {
                            _id
                            firstname
                            lastname
                            phonenumber
                        }
                    }
                `,
                {
                    take,
                    skip,
                },
            );

            return getRecords;
        },
        { keepPreviousData: true },
    );
}

export function useDeleteRecord(id: string): UseMutationResult<Number, unknown, void, unknown> {
    return useMutation<Number>(["delete-record"], async () => {
        const deleteRecord = await graphQLClient.request(
            gql`
                mutation deleteRecord($id: String!) {
                    deleteRecord(id: $id)
                }
            `,
            {
                id,
            },
        );

        return deleteRecord;
    });
}

interface ICreateRecord {
    createRecord: Record;
}

export function useCreateRecord(): UseMutationResult<ICreateRecord, any, RecordInput, unknown> {
    return useMutation<ICreateRecord, any, RecordInput>(["create-record"], async ({ firstname, lastname, phonenumber }) => {
        const createRecord = await graphQLClient.request(
            gql`
                mutation createRecord($firstname: String!, $lastname: String!, $phonenumber: String!) {
                    createRecord(record: { firstname: $firstname, lastname: $lastname, phonenumber: $phonenumber }) {
                        _id
                        firstname
                        lastname
                        phonenumber
                    }
                }
            `,
            {
                firstname,
                lastname,
                phonenumber,
            },
        );

        return createRecord;
    });
}
