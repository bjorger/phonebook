import React from "react";
import { useGetRecords } from "../hooks/useRequest";

interface APIProviderProps {
    children: React.ReactNode;
}

export const RecordContext = React.createContext({});

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const records = useGetRecords();

    return <RecordContext.Provider value={records}> {children} </RecordContext.Provider>;
};
