import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://6480af3cf061e6ec4d49b57c.mockapi.io';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getContactsByName: builder.query({
      query: () => `/contacts`,
    }),
  }),
});

export const { useGetContactsByNameQuery } = contactsApi;
