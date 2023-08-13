import { HotelButton } from './hotelRooms';
import { Hotel, HotelChoice, HotelChoices, HotelMessage, HotelTitle } from './hotelsChoice';

export default function HotelReserved({ booking, hotel }) {
  return (
    <Hotel>
      <HotelTitle>Escolha de hotel e quarto</HotelTitle>
      <HotelMessage>Você já escolheu seu quarto</HotelMessage>
      <HotelChoices>
        <HotelChoice hotel={hotel} />
      </HotelChoices>
      <HotelButton />
    </Hotel>
  );
}
