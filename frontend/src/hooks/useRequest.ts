import { QueryObserverIdleResult, useQuery, UseQueryResult } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { Record } from "../types/graphql.types";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}graphql`;

const graphQLClient = new GraphQLClient(API_URL);

export interface IGetRecordsResponse {
    records: Record[];
}

export function useGetRecords(
    take = 2,
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
