import HotelWithoutPayment from '../../../components/Hotel/hotelWithoutPayment';
import useHotel from '../../../hooks/api/useHotel';
import useToken from '../../../hooks/useToken';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HotelsChoice from '../../../components/Hotel/hotelsChoice';
import RoomsChoice from '../../../components/Hotel/hotelRooms';
import styled from 'styled-components';
export default function Hotel() {
  const token = useToken();
  const [hotel, setHotel] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    console.log('Selected:', selectedHotel);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/hotels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      setHotel(res.data);
    }).catch(err => {
      console.log('erro', err.response.status);
      setErrorStatus(err.response.status);
    });
  }, []);

  return (
    <Container>
      {hotel ? <div><HotelsChoice hotel={hotel} setSelectedHotel={setSelectedHotel}/></div> :
        <><HotelWithoutPayment errorStatus={errorStatus}/></>}
      {console.log('selected', selectedHotel)}
      {selectedHotel ? <div><RoomsChoice  hotel={hotel} selectedHotel={selectedHotel} token={token}/></div> : null}
    </Container>
  );  
}

const Container = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
