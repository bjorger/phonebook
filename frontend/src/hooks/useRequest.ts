import { QueryObserverIdleResult, useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Record, RecordInput, UpdateRecordInput } from "../types/graphql.types";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}graphql`;

export const graphQLClient = new GraphQLClient(API_URL);

export interface IGetRecordsResponse {
    records: Record[];
}

export function useGetRecords(
    take = 25,
    skip = 0,
    enabled = true,
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
        { keepPreviousData: true, enabled },
    );
}

interface ISearchRecord {
    recordsByLastname: Record[];
}

export function useSearchRecords(lastname: string): UseQueryResult<ISearchRecord, unknown> | QueryObserverIdleResult<ISearchRecord, unknown> {
    return useQuery<ISearchRecord>(
        ["search-records", lastname],
        async () => {
            const searchRecords = await graphQLClient.request(
                gql`
                    query GetRecordsByLastname($lastname: String!) {
                        recordsByLastname(lastname: $lastname) {
                            _id
                            firstname
                            lastname
                            phonenumber
                        }
                    }
                `,
                {
                    lastname,
                },
            );

            return searchRecords;
        },
        { enabled: false },
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

export function useUpdateRecord(): UseMutationResult<Number, any, UpdateRecordInput, unknown> {
    return useMutation<Number, any, UpdateRecordInput>(["create-record"], async ({ _id, firstname, lastname, phonenumber }) => {
        console.log(phonenumber);
        const updateRecord = await graphQLClient.request(
            gql`
                mutation updateRecord($id: String!, $firstname: String, $lastname: String, $phonenumber: String) {
                    updateRecord(id: $id, record: { firstname: $firstname, lastname: $lastname, phonenumber: $phonenumber })
                }
            `,
            {
                id: _id,
                firstname,
                lastname,
                phonenumber,
            },
        );

        return updateRecord;
    });
}
