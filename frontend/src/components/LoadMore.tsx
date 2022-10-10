import { Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useGetRecords } from "../hooks/useRequest";
import { ErrorType, useSnackbar } from "../hooks/useSnackbar";
import { RecordActionKind, RecordContext } from "../providers/apiProvider";
import { Snackbar } from "./Snackbar";

interface ILoadMoreState {
    take: number;
    skip: number;
}

export const LoadMore: React.FC = () => {
    const [loadMore, setLoadMore] = React.useState<ILoadMoreState>({
        take: 25,
        skip: 25,
    });
    const { dispatch } = React.useContext(RecordContext);
    const { refetch } = useGetRecords(loadMore.take, loadMore.skip, false);
    const [{ updateError }, , setError] = useSnackbar();

    const onLoadMore = async () => {
        const res = await refetch();

        if (res.isError) {
            setError(ErrorType.UPDATE_ERROR);
        } else if (res.data) {
            setLoadMore({
                take: loadMore.take,
                skip: loadMore.skip + 25,
            });
            dispatch({
                type: RecordActionKind.APPEND_RECORDS,
                payload: res.data.records,
            });
        }
    };

    return (
        <>
            <LoadMoreButton variant="contained" onClick={() => onLoadMore()}>
                Load More
            </LoadMoreButton>
            <Snackbar error={updateError} message="Error while fetching new records" />
        </>
    );
};

const LoadMoreButton = styled(Button)`
    width: 100%;
`;
