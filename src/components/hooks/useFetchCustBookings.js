import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { API } from "../../api";

export default function useFetchCustBookings(customerId) {
    const getCustBookings = async({pageParam=1}) => {
      const res = await API.get(`/bookings/customer/${customerId}?page=${pageParam}`);
      return res.data;
    };
    
    return useInfiniteQuery({
      queryKey:['ownerBookings'],
      queryFn: getCustBookings,
      getNextPageParam:(lastPage) => {
        const currentPage = Number(lastPage.currentPage);
        const totalPages = Number(lastPage.totalPages);
        return (currentPage<totalPages) ? (currentPage+1) : undefined;
    }});
}


    