import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const token = useToken();
  
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel
  } = useAsync(() => hotelApi.getHotel(token));

  return {
    hotel,
    hotelLoading,
    hotelError,
    getHotel
  };
}
