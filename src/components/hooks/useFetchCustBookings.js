import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../api";

export default function useFetchCustBookings(customerId) {
    const getCustBookings = async({pageParam=0}) => {
      const res = await API.get(`/bookings/customer/${customerId}?limit=10&page=${pageParam}`);
      return {
        data: res.data,
        nextPage: pageParam + 1,
      };
    };
    return useInfiniteQuery(["customerBookings"], getCustBookings, {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.length < 10) return undefined;
        return lastPage.nextPage;
      },
    });
}


    