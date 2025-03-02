// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for flight data
interface FlightData {
  flight_id: number;
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  origin: string;
  destination: string;
  airplane_id: number;
}

// Define a service using a base URL and expected endpoints
export const fetchDataApi = createApi({
  reducerPath: "fetchData",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    // New endpoint for flights search
    searchFlights: builder.query<FlightData[],{ from: string; to: string; departDate: string; passengers: number }>({
      query: (params) => ({
        url: "flights/search-flights",
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
    getDataFromServer: builder.query<
      { [key: string]: number },
      { url: string }
    >({
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
  useGetDataFromServerQuery,
  useLazyGetDataFromServerQuery,
  usePostDataMutation,
  useSearchFlightsQuery,
} = fetchDataApi;
