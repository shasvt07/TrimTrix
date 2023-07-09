import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { API } from "../../api";

export default function useFetchOwnBookings(ownerId) {

  const getOwnBookings = async({pageParam=1}) => {
      const res = await API.get(`/bookings/owner/${ownerId}?page=${pageParam}`);
      return res.data;
   }

  return useInfiniteQuery({
      queryKey:['ownerBookings'],
      queryFn: getOwnBookings,
      getNextPageParam:(lastPage) => {

        const currentPage = Number(lastPage.currentPage);
        const totalPages = Number(lastPage.totalPages);
        return (currentPage<totalPages) ? (currentPage+1) : undefined;
      }
  });
}