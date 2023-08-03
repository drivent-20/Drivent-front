import HotelWithoutPayment from '../../../components/Hotel/hotelWithoutPayment';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useHotel from '../../../hooks/api/useHotel';
import useToken from '../../../hooks/useToken';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hotel() {
  // const { hotel, hotelError, hotelLoading } = useHotel();
  const token = useToken();
  const [hotel, setHotel] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    // console.log('gg:', token);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      console.log('ok', res.data);
      setHotel(res.data);
    }).catch(err => {
      console.log('erro', err.response.status);
      setErrorStatus(err.response.status);
    });
  }, []);

  return hotel ? <>No Hotel</> : errorStatus === 402 ? <><HotelWithoutPayment /></> : <>406</>;
}
