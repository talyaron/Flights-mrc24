// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for flight data
interface FlightData {
  id: number;
  from: string;
  to: string;
  price: number;
  departure_time: string;
  // Add other fields as needed
}

// Define a service using a base URL and expected endpoints
export const fetchDataApi = createApi({
  reducerPath: "fetchData",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({

    // New endpoint for flights search
    searchFlights: builder.query<FlightData[], { 
      from: string; 
      to: string; 
      departDate: string;
      passengers: number;
    }>({
      query: (params) => ({
        url: 'flights/search',
        method: 'GET',
        params: params,
      }),
    }),

    // GET request query
    getFetchData: builder.query<unknown, string>({
      query: (name: string) => {
        return `${name}`;
      },
    }),

    // GET request query
    getDataFromServer: builder.query<{ [key: string]: number }, { url:string }>({
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
  useLazyGetBrandLeadsOrFTDsQuery,
  useGetDataFromServerQuery, 
  useLazyGetDataFromServerQuery,
  usePostDataMutation,
  useSearchFlightsQuery,
} = fetchDataApi;
