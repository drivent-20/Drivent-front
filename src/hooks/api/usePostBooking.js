import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function usePostBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: postBookingLoading,
    error: postBookingError,
    act: postBooking,
  } = useAsync((data) => bookingApi.postBooking(data, token), false);

  return {
    booking,
    postBookingLoading,
    postBookingError,
    postBooking,
  };
}
