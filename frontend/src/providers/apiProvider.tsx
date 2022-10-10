import React from "react";
import { useGetRecords } from "../hooks/useRequest";
import { ErrorType, useSnackbar } from "../hooks/useSnackbar";
import { Record, UpdateRecordInput } from "../types/graphql.types";

interface APIProviderProps {
    children: React.ReactNode;
}

interface RecordState {
    records: Record[];
    searchResult: Record[];
}

interface ICtx {
    state: RecordState;
    dispatch: Function;
}

export const RecordContext = React.createContext<ICtx>({
    state: { records: [], searchResult: [] },
    dispatch: () => {},
});

export enum RecordActionKind {
    SET_RECORDS = "SET_RECORDS",
    APPEND_RECORDS = "APPEND_RECORDS",
    DELETE_RECORD = "DELETE_RECORD",
    ADD_RECORD = "ADD_RECORD",
    SEARCH_RECORD = "SEARCH_RECORD",
    UPDATE_RECORD = "UPDATE_RECORD",
    INITIAL_FETCH_ERROR = "INITIAL_FETCH_ERROR",
}

interface RecordAction {
    type: RecordActionKind;
    payload: Record[] | Record | UpdateRecordInput | string | boolean;
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
    } else if (action.type === RecordActionKind.SEARCH_RECORD) {
        return { ...state, searchResult: action.payload as Record[] };
    } else if (action.type === RecordActionKind.UPDATE_RECORD) {
        const updatedRecord = action.payload as UpdateRecordInput;
        const index = state.records.findIndex((record) => record._id === updatedRecord._id);

        if (index === -1) {
            return state;
        }

        const updatedRecords = state.records;

        updatedRecords[index] = { ...updatedRecords[index], ...updatedRecord };

        return { ...state, records: updatedRecords };
    } else if (action.type === RecordActionKind.APPEND_RECORDS) {
        return { ...state, records: state.records.concat(action.payload as Record[]) };
    }
    return state;
};

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const { data, isSuccess, isError } = useGetRecords();
    const [state, dispatch] = React.useReducer(reducer, { records: [], searchResult: [] });
    const [, , setError] = useSnackbar();
    const [isInitialLoad, setIsInitialLoad] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (isInitialLoad) {
            if (isSuccess) {
                dispatch({
                    type: RecordActionKind.SET_RECORDS,
                    payload: data.records,
                });
                setIsInitialLoad(false);
            }

            if (isError) {
                setError(ErrorType.INITIAL_FETCH_ERROR);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError, data?.records]);

    return <RecordContext.Provider value={{ state, dispatch }}> {children} </RecordContext.Provider>;
};
