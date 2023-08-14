import styled from 'styled-components';
import useGetBooking from '../../../hooks/api/useGetBooking';
import { Navigate } from 'react-router-dom';
import { HotelMessage } from './HotelsChoice';

export default function Hotel() {
  const { booking, getBookingLoading } = useGetBooking();

  return (
    <HotelContainer>
      {<HotelPageSwitch
        booking={booking}
        loading={getBookingLoading}
      />}
    </HotelContainer>
  );
}

function HotelPageSwitch({
  booking,
  loading
}) {
  if (loading) {
    return <HotelMessage>Verificando reserva...</HotelMessage>;
  }
  if (booking) {
    return <Navigate to='confirmation' state={{ booking }} />;
  }
  return <Navigate to="choice" />;
}

export const HotelContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
