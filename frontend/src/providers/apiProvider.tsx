import React from "react";
import { useGetRecords } from "../hooks/useRequest";
import { Record } from "../types/graphql.types";

interface APIProviderProps {
    children: React.ReactNode;
}

interface IRecordContext {
    records: Record[];
    setRecords: Function;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}

export const RecordContext = React.createContext<IRecordContext>({
    records: [],
    setRecords: () => {},
    isLoading: false,
    isError: false,
    isSuccess: false,
});

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const { data, isLoading, isError, isSuccess } = useGetRecords();
    const [records, setRecords] = React.useState<Record[]>([]);

    React.useEffect(() => {
        if (isSuccess) {
            setRecords(data.records);
        }
    }, [isSuccess, data?.records]);

    return <RecordContext.Provider value={{ records, setRecords, isLoading, isError, isSuccess }}> {children} </RecordContext.Provider>;
};
