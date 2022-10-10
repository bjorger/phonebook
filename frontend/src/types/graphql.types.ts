export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type Record = {
    __typename?: "Record";
    _id: Scalars["String"];
    firstname: Scalars["String"];
    lastname: Scalars["String"];
    phonenumber: Scalars["String"];
};

export type RecordInput = {
    firstname: Scalars["String"];
    lastname: Scalars["String"];
    phonenumber: Scalars["String"];
};

export type UpdateRecordInput = {
    _id: Scalars["String"];
    firstname?: Scalars["String"];
    lastname?: Scalars["String"];
    phonenumber?: Scalars["String"];
};

export type Query = {
    __typename?: "Query";
    records?: Maybe<Array<Record>>;
    record: Record;
};

export type QueryRecordArgs = {
    id: Scalars["String"];
};

export type Mutation = {
    __typename?: "Mutation";
    createRecord?: Maybe<Record>;
    deleteRecord?: Maybe<Scalars["Int"]>;
    updateRecord?: Maybe<Scalars["Int"]>;
};

export type MutationCreateRecordArgs = {
    record: RecordInput;
};

export type MutationDeleteRecordArgs = {
    id: Scalars["String"];
};

export type MutationUpdateRecordArgs = {
    id: Scalars["String"];
    record: RecordInput;
};
