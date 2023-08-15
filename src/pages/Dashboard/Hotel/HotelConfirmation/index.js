import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HotelButton } from '../../../../components/Hotel/hotelRooms';
import useHotel from '../../../../hooks/api/useHotel';
import { ChoiceOption, Hotel, HotelChoice, HotelMessage, HotelTitle, roomTypesMap } from '../HotelsChoice';
import { HotelContainer } from '..';
import useGetBooking from '../../../../hooks/api/useGetBooking';

export default function HotelConfirmation() {
  const { hotel: hotels, hotelLoading } = useHotel();
  const { booking, getBookingLoading } = useGetBooking();

  const navigate = useNavigate();

  function handleChangeRoom() {
    navigate('/dashboard/hotel/choice/edit');
  }

  if (hotelLoading || getBookingLoading) {
    return <HotelMessage>Carregando reserva...</HotelMessage>;
  }

  const hotel = hotels?.find((hotel) => booking?.Room.hotelId === hotel.id);
  const roomType = Object.values(roomTypesMap).at(booking?.Room.capacity - 1);
  const bookingLength = booking?.Room.Booking?.length ?? 0;

  return (
    <HotelContainer>
      <Hotel>
        <HotelTitle>Escolha de hotel e quarto</HotelTitle>
        <HotelMessage>Você já escolheu seu quarto</HotelMessage>
        <HotelChoice readOnly checked hotel={hotel}>
          <ChoiceOption>
            <h2>Quarto reservado</h2>
            <h3>{booking.Room.name} ({roomType})</h3>
          </ChoiceOption>
          <ChoiceOption>
            <h2>Pessoas no seu quarto</h2>
            <h3>{occupationMessage(bookingLength)}</h3>
          </ChoiceOption>
        </HotelChoice>
        <HotelButtonEdit onClick={handleChangeRoom}>TROCAR DE QUARTO</HotelButtonEdit>
      </Hotel>
    </HotelContainer>
  );
}

function occupationMessage(bookingLength) {
  if (bookingLength === 1) {
    return 'Apenas você';
  }
  return `Você e mais ${bookingLength - 1}`;
}

const HotelButtonEdit = styled(HotelButton)`
  visibility: visible;
  pointer-events: all;
  margin-top: 32px;
`;
