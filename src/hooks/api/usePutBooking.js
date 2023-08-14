import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function usePutBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: putBookingLoading,
    error: putBookingError,
    act: putBooking,
  } = useAsync((data, bookingId) => bookingApi.putBooking(data, bookingId, token), false);

  return {
    booking,
    putBookingLoading,
    putBookingError,
    putBooking,
  };
}
