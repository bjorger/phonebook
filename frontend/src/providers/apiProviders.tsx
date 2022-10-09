import React from "react";
import { QueryObserverIdleResult, UseQueryResult } from "react-query";
import { IGetRecordsResponse, useGetRecords } from "../hooks/useRequest";
import { Record } from "../types/graphql.types";

interface APIProviderProps {
    children: React.ReactNode;
}

export const RecordContext = React.createContext<
    UseQueryResult<IGetRecordsResponse, unknown> | QueryObserverIdleResult<IGetRecordsResponse, unknown> | undefined
>(undefined);

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const records = useGetRecords();
    console.log(records);

    return <RecordContext.Provider value={records}> {children} </RecordContext.Provider>;
};
