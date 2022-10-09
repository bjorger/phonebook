import React from "react";
import { useGetRecords } from "../hooks/useRequest";
import { Record } from "../types/graphql.types";

interface APIProviderProps {
    children: React.ReactNode;
}

interface RecordState {
    records: Record[];
}

interface ICtx {
    state: RecordState;
    dispatch: Function;
}

export const RecordContext = React.createContext<ICtx>({
    state: { records: [] },
    dispatch: () => {},
});

export enum RecordActionKind {
    SET_RECORDS = "SET_RECORDS",
    DELETE_RECORD = "DELETE_RECORD",
    ADD_RECORD = "ADD_RECORD",
}

interface RecordAction {
    type: RecordActionKind;
    payload: Record[] | Record | string;
}

const reducer = (state: RecordState, action: RecordAction): RecordState => {
    if (action.type === RecordActionKind.SET_RECORDS) {
        return { ...state, records: action.payload as Record[] };
    } else if (action.type === RecordActionKind.ADD_RECORD) {
        const currentRecords = state.records;
        console.log(action.payload);
        currentRecords.push(action.payload as Record);

        return { ...state, records: currentRecords };
    } else if (action.type === RecordActionKind.DELETE_RECORD) {
        const currentRecords = state.records;

        return { ...state, records: currentRecords.filter(({ _id }) => _id !== action.payload) };
    }

    return state;
};

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const { data, isSuccess } = useGetRecords();
    const [state, dispatch] = React.useReducer(reducer, { records: [] });

    React.useEffect(() => {
        if (isSuccess) {
            dispatch({
                type: RecordActionKind.SET_RECORDS,
                payload: data.records,
            });
        }
    }, [isSuccess, data?.records]);

    return <RecordContext.Provider value={{ state, dispatch }}> {children} </RecordContext.Provider>;
};
