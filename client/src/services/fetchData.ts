// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Flight } from "../model/flightsModel";


// Define a service using a base URL and expected endpoints
export const fetchDataApi = createApi({
  reducerPath: "fetchData",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    // New endpoint for flights search
    searchFlights: builder.query<Flight[],{ from: string; to: string; departDate: string; passengers: number }>({
      query: (params) => ({
        url: "flights/filter-flights",
        method: "GET",
        params,
      }),
    }),

    // GET request query
    getFetchData: builder.query<unknown, string>({
      query: (name: string) => {
        return `${name}`;
      },
    }),

    // GET request query
    fetchData: builder.query<
      { [key: string]: number },
      { url: string }>({
      query: ({ url }) => `${url}`,
    }),

    // POST request mutation
    postData: builder.mutation<unknown, { path: string; body: any }>({
      query: ({ path, body }) => ({
        url: path,
        method: "POST",
        body, // Body is passed directly to the POST request
      }),
    }),
  }),
});

// Export hooks for usage in function components
export const {
  useGetFetchDataQuery,
  useFetchDataQuery,
  useLazyFetchDataQuery,
  usePostDataMutation,
  useSearchFlightsQuery,
} = fetchDataApi;
