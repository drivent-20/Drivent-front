import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useGetBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: getBookingLoading,
    error: getBookingError,
    act: getBooking,
  } = useAsync(() => bookingApi.getBooking(token));

  return {
    booking,
    getBookingLoading,
    getBookingError,
    getBooking,
  };
}
