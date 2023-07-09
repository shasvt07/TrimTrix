import { useQuery } from "@tanstack/react-query";
import {getOwnerBookings } from "../../actions/bookings/bookings";

export default function useFetchOwnBookings() {

    const getOwnBookings = async(customerId) => {
        const res = await getOwnerBookings(customerId);
        return res;
    }
  return useQuery(["ownerBookings"], getOwnBookings);
}