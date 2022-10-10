import React from "react";
import { useGetRecords } from "../hooks/useRequest";
import { Record } from "../types/graphql.types";

interface APIProviderProps {
    children: React.ReactNode;
}

interface RecordState {
    records: Record[];
    searchResult: Record[];
    initialFetchError: boolean;
}

interface ICtx {
    state: RecordState;
    dispatch: Function;
}

export const RecordContext = React.createContext<ICtx>({
    state: { records: [], searchResult: [], initialFetchError: false },
    dispatch: () => {},
});

export enum RecordActionKind {
    SET_RECORDS = "SET_RECORDS",
    DELETE_RECORD = "DELETE_RECORD",
    ADD_RECORD = "ADD_RECORD",
    ON_SEARCH = "ON_SEARCH",
    INITIAL_FETCH_ERROR = "INITIAL_FETCH_ERROR",
}

interface RecordAction {
    type: RecordActionKind;
    payload: Record[] | Record | string | boolean;
}

const reducer = (state: RecordState, action: RecordAction): RecordState => {
    if (action.type === RecordActionKind.SET_RECORDS) {
        return { ...state, records: action.payload as Record[] };
    } else if (action.type === RecordActionKind.ADD_RECORD) {
        const currentRecords = state.records;
        currentRecords.push(action.payload as Record);

        return { ...state, records: currentRecords };
    } else if (action.type === RecordActionKind.DELETE_RECORD) {
        const currentRecords = state.records;

        return { ...state, records: currentRecords.filter(({ _id }) => _id !== action.payload) };
    } else if (action.type === RecordActionKind.ON_SEARCH) {
        console.log(action.payload);
        return { ...state, searchResult: action.payload as Record[] };
    } else if (action.type === RecordActionKind.INITIAL_FETCH_ERROR) {
        return { ...state, initialFetchError: action.payload as boolean };
    }

    return state;
};

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const { data, isSuccess, isError } = useGetRecords();
    const [state, dispatch] = React.useReducer(reducer, { records: [], searchResult: [], initialFetchError: false });

    React.useEffect(() => {
        if (isSuccess) {
            dispatch({
                type: RecordActionKind.SET_RECORDS,
                payload: data.records,
            });
        }

        if (isError) {
            dispatch({
                type: RecordActionKind.INITIAL_FETCH_ERROR,
                payload: isError,
            });
        }
    }, [isSuccess, isError, data?.records]);

    return <RecordContext.Provider value={{ state, dispatch }}> {children} </RecordContext.Provider>;
};
