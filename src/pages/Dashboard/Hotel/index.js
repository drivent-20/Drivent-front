import HotelWithoutPayment from '../../../components/Hotel/hotelWithoutPayment';
import useHotel from '../../../hooks/api/useHotel';
import HotelsChoice from '../../../components/Hotel/hotelsChoice';
import RoomsChoice from '../../../components/Hotel/hotelRooms';
import styled from 'styled-components';
import { useState } from 'react';

export default function Hotel() {
  const { hotel: hotels, hotelError } = useHotel();
  const [selectedHotelIdx, setSelectedHotelIdx] = useState(null);

  const selectedHotel = selectedHotelIdx !== null ? hotels?.at(selectedHotelIdx) : null;
  
  return (
    <Container>
      {hotels ?
        <HotelsChoice
          hotels={hotels}
          setSelectedHotelIdx={setSelectedHotelIdx}
        />
        :
        <HotelWithoutPayment
          errorStatus={hotelError}
        />
      }
      {selectedHotel && <RoomsChoice selectedHotel={selectedHotel} />}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
