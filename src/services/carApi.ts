import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
    reducerPath: "carApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://freetestapi.com/api/v1/",
    }),
    endpoints: (builder) => ({
        getCar: builder.query({
            query: () => `cars`,
        }),
    }),
});

export const { useGetCarQuery }: any = carApi;
