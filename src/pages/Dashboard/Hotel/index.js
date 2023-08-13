import HotelWithoutPayment from '../../../components/Hotel/hotelWithoutPayment';
import useHotel from '../../../hooks/api/useHotel';
import HotelsChoice, { HotelMessage } from '../../../components/Hotel/hotelsChoice';
import RoomsChoice from '../../../components/Hotel/hotelRooms';
import styled from 'styled-components';
import { useState } from 'react';
import HotelReserved from '../../../components/Hotel/hotelReserved';
import useGetBooking from '../../../hooks/api/useGetBooking';

export default function Hotel() {
  const { hotel: hotels, hotelError } = useHotel();
  const [selectedHotelIdx, setSelectedHotelIdx] = useState(null);
  const selectedHotel = selectedHotelIdx !== null ? hotels?.at(selectedHotelIdx) : null;

  const { booking, getBookingLoading } = useGetBooking();

  return (
    <Container>
      {getBookingLoading ?
        <HotelMessage>Verificando reserva...</HotelMessage>
        :
        <HotelPageSwitch
          hotelError={hotelError}
          hotels={hotels}
          setSelectedHotelIdx={setSelectedHotelIdx}
          booking={booking}
        />}
      {selectedHotel && <RoomsChoice hotel={selectedHotel} />}
    </Container>
  );
}

function HotelPageSwitch({
  booking,
  hotels,
  hotelError,
  setSelectedHotelIdx
}) {
  const hotel = hotels?.find((hotel) => hotel.id === booking?.Room.hotelId);
  if (booking && hotel) {
    return <HotelReserved hotel={hotel} booking={booking} />;
  }
  if (hotels) {
    return (
      <HotelsChoice
        hotels={hotels}
        setSelectedHotelIdx={setSelectedHotelIdx}
      />
    );
  }
  return (
    <HotelWithoutPayment
      errorStatus={hotelError}
    />
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
