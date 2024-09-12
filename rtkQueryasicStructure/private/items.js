import { privateAPI } from './index';

export const itemsAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    getItems: build.query({
      query: params => {
       

        return {
          url: '/accounting/list/items',
          params: params,
        };
      },
      providesTags: ['itemsList'],
    }),

  }),
});

export const {
  useGetItemsQuery,
} = itemsAPI;
