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
}

interface RecordAction {
    type: RecordActionKind;
    payload: Record[];
}

const reducer = (state: RecordState, action: RecordAction): RecordState => {
    if (action.type === RecordActionKind.SET_RECORDS) {
        return { ...state, records: action.payload };
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
